import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// POST /api/auth/forgot-password
export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // 1. Проверяем email
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // 2. Проверяем, что пользователь существует
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Идеально: НЕ раскрывать, есть ли такой email
      return NextResponse.json(
        { message: "If the account exists, we sent reset instructions" },
        { status: 200 }
      );
    }

    // 3. Генерируем токен
    const token = crypto.randomUUID();

    // 4. Создаём токен сброса пароля
    await prisma.passwordResetToken.create({
      data: {
        email,
        token,
        expires: new Date(Date.now() + 1000 * 60 * 15), // 15 min
      },
    });

    // 5. Формируем ссылку
    const resetUrl = `${
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    }/auth/reset-password?token=${token}`;

    // 6. Отправляем письмо через Resend
    try {
      if (!process.env.RESEND_API_KEY) {
        if (process.env.NODE_ENV === "development") {
          console.log("🔗 [DEV] Reset password link:", resetUrl);
        }
      } else {
        const result = await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
          to: email,
          subject: "Reset your password",
          html: `
            <p>Hello${user.name ? `, ${user.name}` : ""}</p>
            <p>You requested a password reset. Click the button below to set a new password.</p>
            <p>
              <a href="${resetUrl}" 
                 style="
                   display:inline-block;
                   padding:10px 18px;
                   background:#ff6539;
                   color:#ffffff;
                   text-decoration:none;
                   border-radius:6px;
                   font-weight:600;
                 ">
                Reset password
              </a>
            </p>
            <p>If the button does not work, copy and paste this link into your browser:</p>
            <p><a href="${resetUrl}">${resetUrl}</a></p>
            <p>This link will expire in 15 minutes.</p>
          `,
        });

        if (result.error) {
          console.error("Resend API error:", result.error);
          throw new Error(`Resend API error: ${JSON.stringify(result.error)}`);
        }

        if (process.env.NODE_ENV === "development") {
          console.log("🔗 [DEV] Reset password link:", resetUrl);
        }
      }
    } catch (sendError) {
      console.error("Failed to send email:", sendError);
      if (process.env.NODE_ENV === "development") {
        console.log("🔗 [DEV] Reset password link:", resetUrl);
      }
    }

    return NextResponse.json({ message: "Reset email sent" }, { status: 200 });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
