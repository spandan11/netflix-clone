import { NextResponse } from "next/server";
import prisma from "@/prisma";
import bcrypt from "bcrypt";
import { ConnectToDb } from "@/utils/ConnectToDb";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    await ConnectToDb();
    const userExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userExist) {
      return NextResponse.json({ message: "user already Exist", status: 400 });
    }
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });
    return NextResponse.json({ user }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({}, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
