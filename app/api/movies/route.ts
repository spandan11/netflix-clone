import serverAuth from "@/libs/serverAuth";
import prisma from "@/prisma";
import { NextResponse } from "next/server";

const movies = async () => {
  try {
    await serverAuth();
    const movies = await prisma.movie.findMany();
    return NextResponse.json(movies, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export { movies as GET };
