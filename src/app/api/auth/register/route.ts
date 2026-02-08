import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, password, companyName } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = crypto.randomUUID();

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        companyName,
        provider: "credentials",
      },
    });

    // Send welcome email
    try {
      if (process.env.RESEND_API_KEY) {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
          to: email,
          subject: "Welcome to GrowChief!",
          html: `
            <p>Hello${user.name ? `, ${user.name}` : ""}!</p>
            <p>Thank you for registering with GrowChief. Your account has been created successfully.</p>
            <p>You can now log in and start using our platform.</p>
            <p>
              <a href="${
                process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
              }/auth/login" 
                 style="
                   display:inline-block;
                   padding:10px 18px;
                   background:#ff6539;
                   color:#ffffff;
                   text-decoration:none;
                   border-radius:6px;
                   font-weight:600;
                 ">
                Log in
              </a>
            </p>
            <p>If you have any questions, feel free to contact us.</p>
          `,
        });
      }
    } catch (sendError) {
      console.error("Failed to send welcome email:", sendError);
      // Don't block registration if email failed to send
    }

    return NextResponse.json(
      { message: "User registered successfully", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
