"use client";

import OneTerminal from "@/components/OneTerminal";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const OneTerminalPage = ({ params }) => {
  const [id, setId] = useState(null);
  const [busCompanies, setBusCompanies] = useState([]);
  const [terminalHeadingName, setTerminalHeadingName] = useState("");

  useEffect(() => {
    if (params.id) {
      setId(params.id);
      console.log("Terminal id:", params.id);

      const fetchData = async () => {
        const locationRef = doc(db, "locations", params.id);
        const locationDoc = await getDoc(locationRef);

        if (locationDoc.exists()) {
          const locationData = locationDoc.data();
          setTerminalHeadingName(locationData.name.trim());

          const busServiceQuery = query(
            collection(db, "bus_services"),
            where("terminal", "==", locationData.name.trim()),
          );

          const busServiceDocs = await getDocs(busServiceQuery);
          const busServicesData = [];

          for (const busServiceDoc of busServiceDocs.docs) {
            const busServiceData = busServiceDoc.data();
            const scheduleQuery = query(
              collection(db, "schedules"),
              where("bus_service", "==", busServiceData.name),
            );

            const scheduleDocs = await getDocs(scheduleQuery);

            for (const scheduleDoc of scheduleDocs.docs) {
              const scheduleData = scheduleDoc.data();
              const routeRef = doc(db, "routes", scheduleData.route);
              const routeDoc = await getDoc(routeRef);
              const routeData = routeDoc.exists ? routeDoc.data() : {};

              if (busServiceData.routes.includes(scheduleData.route)) {
                busServicesData.push({
                  name: busServiceData.name,
                  phone: busServiceData.phone_number,
                  schedules: {
                    from: routeData.from,
                    to: routeData.to,
                    price: scheduleData.main_route.price,
                    times: {
                      weekdays: scheduleData.main_route.weekdays,
                      weekend: scheduleData.main_route.weekend,
                    },
                  },
                });
              }
            }
          }

          setBusCompanies(busServicesData);
        }
      };

      fetchData();
    }
  }, [params.id]);

  if (!id) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <OneTerminal
        id={id}
        busCompanies={busCompanies}
        terminalHeadingName={terminalHeadingName}
      />
    </div>
  );
};

export default OneTerminalPage;
