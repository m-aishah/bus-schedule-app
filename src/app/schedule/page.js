// Main Schedule Page - with all the bs schedule info and bus stops on Map UI.z
"use client";
import TerminalsPage from "../../components/TerminalsPage";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import fetchAllDocuments from "./utils/fetchAllTerminals";
const App = () => {
  const [terminals, setTerminals] = useState([]);

  useEffect(() => {
    async function fetchAllTerminals(collectionName) {
      try {
        const documents = await fetchAllDocuments(collectionName);
        setTerminals(documents);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    }

    fetchAllTerminals("locations");
  }, []);

  return (
    <Box sx={{ paddingTop: "100px" }}>
      <TerminalsPage terminals={terminals} />
    </Box>
  );
};
export default App;
