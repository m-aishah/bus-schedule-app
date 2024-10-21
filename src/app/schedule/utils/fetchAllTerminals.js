import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

const fetchAllDocuments = async (collectionName) => {
  try {
    const collectionRef = collection(db, collectionName);
    const querySnapshot = await getDocs(collectionRef);

    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });

    return documents;
  } catch (error) {
    console.error("Error fetching documents: ", error);
  }
};

export default fetchAllDocuments;
