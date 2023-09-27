import { NextResponse } from "next/server";
import serverAuth from "@/libs/serverAuth";
import prisma from "@/prisma";

const random = async () => {
  try {
    await serverAuth();
    const movieCount = await prisma.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);

    const randomMovies = await prisma.movie.findMany({
      take: 1,
      skip: randomIndex,
    });
    return NextResponse.json(randomMovies[0], { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
};

export { random as GET };
