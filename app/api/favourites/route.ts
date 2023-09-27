import { NextResponse } from "next/server";
import serverAuth from "@/libs/serverAuth";
import prisma from "@/prisma";

export async function GET() {
  try {
    const { currentUser } = await serverAuth();
    const favouriteMovies = await prisma.movie.findMany({
      where: {
        id: {
          in: currentUser?.favouriteIds,
        },
      },
    });
    return NextResponse.json(favouriteMovies, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ status: 500 });
  }
}
