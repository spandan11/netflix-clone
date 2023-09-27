import serverAuth from "@/libs/serverAuth";
import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function GET<Params extends Record<string, any>>(
  req: Request,
  { params }: { params: Params }
) {
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
