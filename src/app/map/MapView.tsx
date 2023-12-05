"use client";
import { Station } from "@/types";
import { Box, Paper, Typography } from "@mui/material";
import { LatLngExpression, icon } from "leaflet";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

export function MapController({ position }: { position: LatLngExpression }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(position);
  }, [map, position]);

  return null;
}

export default function MapView({
  position,
  markers,
}: {
  position: LatLngExpression;
  markers: Station[];
}) {
  const markerIcon = icon({
    iconUrl: "/marker.webp",
    iconSize: [18, 45], // size of the icon
  });
  return (
    <div>
      <Box height={400} sx={{ maxHeight: "400px" }}>
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <MapController position={position} />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {markers.map((m) => {
            if (!m.latitude && !m.longitude) return null;
            return (
              <Marker
                key={m.id}
                position={[m.latitude, m.longitude]}
                alt="marker"
                icon={markerIcon}
              >
                <Popup>{m.extra.address}</Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </Box>
      <Paper sx={{ display: "flex", flexDirection: "column", p: 1 }}>
        <Typography variant="caption">Stations are marked with pin!</Typography>
        <Typography variant="caption">
          See all or filter a specific bike station.
        </Typography>
      </Paper>
    </div>
  );
}
