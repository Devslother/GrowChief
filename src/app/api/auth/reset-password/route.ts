import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and password are required" },
        { status: 400 }
      );
    }

    // 1. Find token in PasswordResetToken table
    const resetRecord = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!resetRecord || resetRecord.expires < new Date()) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // 2. Find user by email
    const user = await prisma.user.findUnique({
      where: { email: resetRecord.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Update user password
    await prisma.user.update({
      where: { email: user.email! },
      data: {
        password: hashedPassword,
      },
    });

    // 5. Delete token (ONE-TIME USE)
    await prisma.passwordResetToken.delete({
      where: { token },
    });

    return NextResponse.json({ message: "Password updated" }, { status: 200 });
  } catch (e) {
    console.error("RESET PASSWORD ERROR:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
