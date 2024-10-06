"use client";

import OneTerminal from "@/components/OneTerminal";
import { useEffect, useState } from "react";

const OneTerminalPage = ({ params }) => {
  const [id, setId] = useState(null);

  useEffect(() => {
    if (params.id) {
      setId(params.id);
      console.log("Terminal id:", params.id);
    }
  }, [params.id]);

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <OneTerminal id={id} />
    </div>
  );
};

export default OneTerminalPage;
