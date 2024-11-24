import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const fetchRouteIds = async (source, destination) => {
  try {
    const routesRef = collection(db, "routes");
    const q = query(
      routesRef,
      where("from", "==", source),
      where("to", "==", destination)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.id);
  } catch (error) {
    console.error("Error fetching route ids: ", error);
    return [];
  }
};

const busServices = ["akva", "cimen", "eul_bus"];

const fetchSchedules = async (dayCategory, startTime, source, destination) => {
  const convertTimeToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    return parseInt(hours) * 60 + parseInt(minutes);
  };

  if (!startTime || !/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(startTime)) {
    // console.warn("Invalid or empty startTime:", startTime);
    return {};
  }

  const startTimeMinutes = convertTimeToMinutes(startTime);

  try {
    const schedules = {};
    const routeIds = await fetchRouteIds(source, destination);

    if (routeIds.length === 0) {
      // console.log("No routes found for the given source and destination");
      return schedules;
    }

    const schedulesRef = collection(db, "schedules");

    for (const busService of busServices) {
      const q = query(
        schedulesRef,
        where("bus_service", "==", busService),
        where("route", "in", routeIds)
      );

      const querySnapshot = await getDocs(q);
      const serviceSchedules = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const times = data.main_route[dayCategory] || [];

        const filteredTimes = times.filter((time) => {
          const timeMinutes = convertTimeToMinutes(time);
          return timeMinutes >= startTimeMinutes;
        });

        if (filteredTimes.length > 0) {
          serviceSchedules.push({
            ...data,
            main_route: {
              ...data.main_route,
              [dayCategory]: filteredTimes,
            },
          });
        }
      });

      if (serviceSchedules.length > 0) {
        schedules[busService] = serviceSchedules;
      }
    }
    return schedules;
  } catch (error) {
    console.error("Error fetching schedules:", error);
    return {}; // Return empty object on error
  }
};

const fetchBusStops = async (busStopId) => {
  try {
    const busStopsRef = collection(db, "stops");
    const q = query(busStopsRef, where("id", "==", busStopId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Error fetching bus stops: ", error);
    return [];
  }
};

export { fetchRouteIds, fetchSchedules, fetchBusStops };
