import { Inter } from "next/font/google";
import React, { useState } from "react";
import HomeMain from "@/components/home/Home";
const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  return (
    <>
      <main>
        <HomeMain />
      </main>
    </>
  );
}
