import serverAuth from "@/libs/serverAuth";
import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: any) {
  try {
    await serverAuth();
    const { movieId } = params;
    if (typeof movieId !== "string") {
      throw new Error("Invalid movieId");
    }
    if (!movieId) {
      throw new Error("Invalid movieId");
    }
    const movie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    if (!movie) {
      throw new Error("Invalid movieId");
    }
    return NextResponse.json(movie, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ status: 500 });
  }
}
