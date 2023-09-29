"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieSection from "@/components/MovieSection";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";

export default function Home() {
  const session = useSession();
  const router = useRouter();
  const { isOpen, closeModal } = useInfoModal();
  if (session.status === "unauthenticated") {
    router.push("/auth");
  }
  if (session.status === "authenticated") {
    return (
      <>
        <InfoModal visible={isOpen} onClose={closeModal} />
        <Navbar />
        <Billboard />
        <MovieSection />
      </>
    );
  }
}

// For Server Component

// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import { authOptions } from "./api/auth/[...nextauth]/authOptions";

// import Navbar from "@/components/Navbar";
// import Billboard from "@/components/Billboard";
// import MovieSection from "@/components/MovieSection";
// import InfoModal from "@/components/InfoModal";

// export default async function Home() {
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     redirect("/auth");
//   }
//   return (
//     <>
//       <InfoModal visible />
//       <Navbar />
//       <Billboard />
//       <MovieSection />
//     </>
//   );
// }
