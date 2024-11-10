import React, { useEffect, useState, useCallback } from "react";
import { Box, Button, CircularProgress } from "@mui/material";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsRenderer,
  InfoWindow,
} from "@react-google-maps/api";
import { MapPin, Bus } from "lucide-react";

const libraries = ["places", "directions"];

const MapContainer = ({ busStops, source, destination }) => {
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedStop, setSelectedStop] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const locationCoordinates = {
    Lefke: { lat: 35.1175, lng: 32.8464 },
    Guzelyurt: { lat: 35.1537804, lng: 32.878825 },
    Girne: { lat: 35.3364, lng: 33.3182 },
    Nicosia: { lat: 35.1856, lng: 33.3823 },
    Yedidalga: { lat: 35.1754, lng: 32.8129 },
  };

  const sourceCoords = locationCoordinates[source];
  const destCoords = locationCoordinates[destination];

  const mapStyles = {
    height: "100%",
    width: "100%",
    borderRadius: "8px",
  };

  const defaultCenter = {
    lat: 35.2456,
    lng: 33.0266,
  };

  // Custom marker icons using SVG paths
  const markerIcons = {
    source: {
      path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
      fillColor: "#ff5722",
      fillOpacity: 1,
      strokeWeight: 1,
      strokeColor: "#ffffff",
      scale: 2,
      anchor: { x: 12, y: 24 },
    },
    destination: {
      path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
      fillColor: "#4caf50",
      fillOpacity: 1,
      strokeWeight: 1,
      strokeColor: "#ffffff",
      scale: 2,
      anchor: { x: 12, y: 24 },
    },
    user: {
      path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
      fillColor: "#1976d2",
      fillOpacity: 1,
      strokeWeight: 1,
      strokeColor: "#ffffff",
      scale: 2,
      anchor: { x: 12, y: 24 },
    },
    busStop: {
      path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
      fillColor: "#2196f3",
      fillOpacity: 1,
      strokeWeight: 1,
      strokeColor: "#ffffff",
      scale: 1.5,
      anchor: { x: 12, y: 24 },
    },
  };

  const fetchDirections = useCallback(
    (directionsService) => {
      if (!sourceCoords || !destCoords || !directionsService) return;

      const waypoints =
        busStops?.map((stop) => ({
          location: {
            lat: Number(stop.coordinates.lat),
            lng: Number(stop.coordinates.lon),
          },
          stopover: true,
        })) || [];

      directionsService.route(
        {
          origin: sourceCoords,
          destination: destCoords,
          waypoints: waypoints,
          travelMode: "DRIVING",
          optimizeWaypoints: true,
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);
            setIsLoading(false);
          } else {
            console.error(`Directions request failed: ${status}`);
            setIsLoading(false);
          }
        }
      );
    },
    [sourceCoords, destCoords, busStops]
  );

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  const onMapLoad = useCallback(
    (mapInstance) => {
      setMap(mapInstance);
      const directionsService = new window.google.maps.DirectionsService();
      fetchDirections(directionsService);

      if (sourceCoords && destCoords) {
        const bounds = new window.google.maps.LatLngBounds();
        bounds.extend(sourceCoords);
        bounds.extend(destCoords);
        busStops?.forEach((stop) => {
          bounds.extend({
            lat: Number(stop.coordinates.lat),
            lng: Number(stop.coordinates.lon),
          });
        });
        if (userLocation) bounds.extend(userLocation);
        mapInstance.fitBounds(bounds);
      }
    },
    [sourceCoords, destCoords, busStops, userLocation, fetchDirections]
  );

  return (
    <Box sx={{ height: "100%", width: "100%", position: "relative" }}>
      <LoadScript
        googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}
        libraries={libraries}
      >
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={sourceCoords || defaultCenter}
          onLoad={onMapLoad}
          options={{
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
            zoomControl: true,
            styles: [
              {
                featureType: "transit",
                elementType: "all",
                stylers: [{ visibility: "on" }],
              },
            ],
          }}
        >
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                suppressMarkers: true,
                polylineOptions: {
                  strokeColor: "#1976d2",
                  strokeWeight: 4,
                },
              }}
            />
          )}

          {sourceCoords && (
            <Marker
              position={sourceCoords}
              icon={markerIcons.source}
              onClick={() =>
                setSelectedStop({
                  name: `Source: ${source}`,
                  position: sourceCoords,
                })
              }
            />
          )}

          {destCoords && (
            <Marker
              position={destCoords}
              icon={markerIcons.destination}
              onClick={() =>
                setSelectedStop({
                  name: `Destination: ${destination}`,
                  position: destCoords,
                })
              }
            />
          )}

          {userLocation && (
            <Marker
              position={userLocation}
              icon={markerIcons.user}
              onClick={() =>
                setSelectedStop({
                  name: "Your Location",
                  position: userLocation,
                })
              }
            />
          )}

          {busStops?.map((stop, index) => (
            <Marker
              key={index}
              position={{ lat: stop.coordinates[0], lng: stop.coordinates[1] }}
              icon={markerIcons.busStop}
              onClick={() =>
                setSelectedStop({
                  name: stop.name,
                  position: {
                    lat: stop.coordinates[0],
                    lng: stop.coordinates[1],
                  },
                })
              }
            />
          ))}

          {selectedStop && (
            <InfoWindow
              position={selectedStop.position}
              onCloseClick={() => setSelectedStop(null)}
            >
              <div>{selectedStop.name}</div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>

      {isLoading && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {sourceCoords && destCoords && (
        <Box
          sx={{
            position: "absolute",
            bottom: 16,
            right: 16,
            zIndex: 1000,
          }}
        >
          <a
            href={`https://www.google.com/maps/dir/?api=1&origin=${sourceCoords.lat},${sourceCoords.lng}&destination=${destCoords.lat},${destCoords.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#1976d2",
                color: "white",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
            >
              Open in Google Maps
            </Button>
          </a>
        </Box>
      )}
    </Box>
  );
};

export default MapContainer;
