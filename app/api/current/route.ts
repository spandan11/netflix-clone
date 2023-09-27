import { NextResponse } from "next/server";
import serverAuth from "@/libs/serverAuth";

const current = async () => {
  try {
    const { currentUser } = await serverAuth();
    return NextResponse.json(currentUser, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ status: 400 });
  }
};

export { current as GET };
