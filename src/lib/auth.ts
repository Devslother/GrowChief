import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  useSecureCookies: process.env.NODE_ENV === "production",
  // Для Netlify важно установить NEXTAUTH_URL в env переменных
  // Это должно быть: https://your-domain.netlify.app
  session: {
    strategy: "jwt", // рекомендовано для App Router
    maxAge: 30 * 24 * 60 * 60, // 30 дней
  },
  events: {
    async createUser(message) {
      if (process.env.NODE_ENV === "development") {
        console.log("✅ User created:", message.user.email);
      }
    },
    async linkAccount({ account, user }) {
      if (account.provider === "google" && user.email) {
        // Проверяем, существует ли другой пользователь с таким email
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (existingUser && existingUser.id !== user.id) {
          // Если найден другой пользователь с таким email, обновляем связь Account
          await prisma.account.updateMany({
            where: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
            data: {
              userId: existingUser.id,
            },
          });
        }
      }
    },
  },

  providers: [
    // GOOGLE LOGIN (только если credentials установлены)
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true, // Разрешаем связывание аккаунтов по email
          }),
        ]
      : []),

    // EMAIL + PASSWORD LOGIN
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        try {
          // 1. Нахожу пользователя
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user || !user.password) {
            throw new Error("Invalid email or password");
          }

          // 2. Проверяю пароль
          const valid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!valid) {
            throw new Error("Invalid email or password");
          }

          // 3. Возвращаю объект пользователя (будет в JWT)
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error("Authorize error:", error);
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.id && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },

    async signIn({ user, account }) {
      if (account?.provider === "google" && !user?.email) {
        console.error("Google OAuth: No email in user object");
        return false;
      }
      return true;
    },
  },

  pages: {
    signIn: "/auth/login", // кастомная страница логина
    error: "/auth/login", // страница ошибки
  },
};
