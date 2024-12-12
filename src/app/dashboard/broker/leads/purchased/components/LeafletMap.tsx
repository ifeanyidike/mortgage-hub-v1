import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { cn, fetchCoordinates } from "@/app/utils";

const customIcon = L.divIcon({
  html: `<i class="ki-solid ki-geolocation text-3xl text-success"></i>`,
  className: "leaflet-marker",
  bgPos: [10, 10],
  iconAnchor: [20, 37],
  popupAnchor: [0, -37],
});

type Props = {
  coordinates: Record<"lat" | "lon", number> | null | undefined;
  setCoordinates: React.Dispatch<
    React.SetStateAction<Record<"lat" | "lon", number> | null | undefined>
  >;
  location?: Record<"address" | "city" | "province", string> | null | undefined;
  opacity?: number;
  height?: string;
  zoom?: number;
};

const LeafletMap = React.memo(
  ({
    coordinates,
    setCoordinates,
    location,
    opacity = 0.5,
    height = "!h-80",
    zoom = 15,
  }: Props) => {
    useEffect(() => {
      (async () => {
        if (!location) {
          setCoordinates(undefined);
          return;
        }
        const addr = `${location?.address || ""} ${location?.city || " "} ${
          location?.province || ""
        }`;

        console.log("location", location, addr);

        const coordinates = await fetchCoordinates(addr);
        console.log("coordinates", coordinates);
        if (coordinates) {
          setCoordinates(coordinates);
        }
      })();
    }, [location]);
    if (!coordinates) return null;
    return (
      <MapContainer
        fadeAnimation={true}
        center={[coordinates.lat, coordinates.lon]}
        zoom={zoom}
        className={cn("rounded-xl !w-full overflow-y-hidden  ", height)}
      >
        <TileLayer
          opacity={opacity}
          // attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[coordinates.lat, coordinates.lon]} icon={customIcon}>
          <Popup>
            {location?.address} {location?.city} {location?.province}
          </Popup>
        </Marker>
      </MapContainer>
    );
  }
);

export default LeafletMap;
