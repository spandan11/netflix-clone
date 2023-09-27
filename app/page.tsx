import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieSection from "@/components/MovieSection";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth");
  }
  return (
    <>
      <Navbar />
      <Billboard />
      <MovieSection />
    </>
  );
}
