"use client";
import React, { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";

// Dynamic import of the actual page component
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
