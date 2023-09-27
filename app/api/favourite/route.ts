import { NextResponse } from "next/server";
import { without } from "lodash";
import serverAuth from "@/libs/serverAuth";
import prisma from "@/prisma";

export async function POST(req: Request) {
  try {
    const { currentUser } = await serverAuth();
    const { movieId } = await req.json();

    const existingMovie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    if (!existingMovie) {
      throw new Error("Invalid Id");
    }
    const user = await prisma.user.update({
      where: {
        email: currentUser.email || "",
      },
      data: {
        favouriteIds: {
          push: movieId,
        },
      },
    });
    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { currentUser } = await serverAuth();
    const { movieId } = await req.json();
    const existingMovie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    if (!existingMovie) {
      throw new Error("Invalid Id");
    }
    const updatedFavouriteIds = without(currentUser.favouriteIds, movieId);
    const updatedUser = await prisma.user.update({
      where: {
        email: currentUser.email || "",
      },
      data: {
        favouriteIds: updatedFavouriteIds,
      },
    });
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ status: 500 });
  }
}
