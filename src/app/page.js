"use client";
import React from "react";
import dynamic from "next/dynamic";

const SchedulePageContent = dynamic(
  () => import("@/components/SchedulePageContent"),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading...
      </div>
    ),
  }
);

export default function Page() {
  return <SchedulePageContent />;
}
