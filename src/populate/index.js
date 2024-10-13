import { db } from "../firebase.js";
import { collection, addDoc } from "firebase/firestore";

// Create a new location
const createLocation = async (name, coordinates, services) => {
  const locationRef = collection(db, "locations");
  const docRef = await addDoc(locationRef, {
    name: name,
    coordinates: coordinates,
    services: services,
  });
  return docRef; // Return the DocumentReference to access its ID
};

// Create a new route
const createRoute = async (from, to) => {
  const routeRef = collection(db, "routes");
  const docRef = await addDoc(routeRef, {
    from: from,
    to: to,
  });
  return docRef; // Return the DocumentReference to access its ID
};

// Create a new bus service
const createBusService = async (name, routes, active) => {
  const busServiceRef = collection(db, "bus_services");
  const docRef = await addDoc(busServiceRef, {
    name: name,
    routes: routes, // Array of route IDs
    active: active,
  });
  return docRef; // Return the DocumentReference to access its ID
};

// Create a new schedule
const createSchedule = async (busService, routeId, times) => {
  const scheduleRef = collection(db, "schedules");
  const docRef = await addDoc(scheduleRef, {
    bus_service: busService,
    route: routeId, // Reference to the route document
    times: times,
  });
  return docRef; // Return the DocumentReference to access its ID
};

// Create a new price
const createPrice = async (from, to, price) => {
  const priceRef = collection(db, "prices");
  const docRef = await addDoc(priceRef, {
    from: from,
    to: to,
    price: price,
  });
  return docRef; // Return the DocumentReference to access its ID
};

// Example Usage
const createData = async () => {
  const lefkeCoordinates = { lat: 35.208, lng: 32.998 };
  const guzelyurtCoordinates = { lat: 35.195, lng: 33.036 };

  // Create locations
  await createLocation("Lefke", lefkeCoordinates, ["akva", "cimen", "eul_bus"]);
  await createLocation("Guzelyurt", guzelyurtCoordinates, [
    "akva",
    "cimen",
    "eul_bus",
  ]);

  // Create route
  const routeDoc1 = await createRoute("Lefke", "Guzelyurt");
  console.log("Route created with ID:", routeDoc1.id);
  const routeDoc2 = await createRoute("Guzelyurt", "Lefke");
  console.log("Route created with ID:", routeDoc2.id);
  // Access the ID correctly

  // Create bus service
  const akvaBusService = await createBusService(
    "Akva",
    [routeDoc1.id, routeDoc2.id],
    true
  );
  console.log("Bus service created with ID:", akvaBusService.id); // Access the ID correctly

  // Create schedule
  const scheduleTimes = {
    weekdays: {
      eul_merkez: ["09:00", "10:00", "11:00", "12:00"],
      eul_guzelyurt: ["11:00", "12:00"],
    },
    weekends: {
      eul_merkez: ["08:00", "09:30"],
      eul_guzelyurt: ["12:00", "13:30"],
    },
  };
  await createSchedule("akva", routeDoc1.id, scheduleTimes);
  await createSchedule("cimen", routeDoc1.id, scheduleTimes);
  await createSchedule("eul_bus", routeDoc1.id, scheduleTimes);
  await createSchedule("akva", routeDoc2.id, scheduleTimes);
  await createSchedule("cimen", routeDoc2.id, scheduleTimes);
  await createSchedule("eul_bus", routeDoc2.id, scheduleTimes);

  // Create price
  await createPrice("Lefke", "Guzelyurt", 50);

  console.log("Data successfully saved");
};

createData();
