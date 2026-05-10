"use client";

import dynamic from "next/dynamic";

export const DynamicLinwisHeroCanvas = dynamic(
  () => import("./LinwisCanvas").then((mod) => mod.LinwisHeroCanvas),
  {
    ssr: false,
    loading: () => <div className="h-full w-full bg-black" />,
  }
);
