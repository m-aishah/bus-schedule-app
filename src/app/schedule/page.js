// Main Schedule Page - with all the bs schedule info and bus stops on Map UI.z
"use client";
import TerminalsPage from "../../components/TerminalsPage";
import { useState, useEffect } from "react";
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
    <div>
      {/* <OneTerminal /> */}
      <TerminalsPage terminals={terminals} />
      {/* Map UI */}
      {/* Bus stops and their respective arrival times */}
      {/* Bus schedule */}
    </div>
  );
};
export default App;
