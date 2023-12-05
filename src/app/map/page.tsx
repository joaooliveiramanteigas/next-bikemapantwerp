import { getNetworkData } from "@/libs/api";
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Skeleton,
  Typography,
} from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

const MapDashboard = dynamic(() => import("./MapDashboard"), {
  loading: () => (
    <Card sx={{ maxWidth: "full", m: 2 }}>
      <CardHeader
        title={
          <Skeleton
            animation="wave"
            height={10}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        }
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
      />
      <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      <CardContent>
        <React.Fragment>
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} width="80%" />
        </React.Fragment>
      </CardContent>
    </Card>
  ),
  ssr: false,
});

export default async function Map({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const defaultStationId = searchParams?.id || null;
  const stationsNetworkData = await getNetworkData();
  const stations = stationsNetworkData.network.stations;
  const mainPosition = [
    stationsNetworkData.network.location.latitude,
    stationsNetworkData.network.location.longitude,
  ];
  return (
    <main style={{ height: "calc(100vh - 90px)" }}>
      <Container maxWidth="sm" style={{ marginTop: "20px" }}>
        <Typography variant="h1" fontSize={32} textAlign="center">
          Map - {stationsNetworkData.network.name}
        </Typography>

        <MapDashboard
          defaultStationId={defaultStationId}
          mainPosition={mainPosition}
          stations={stations}
        />
      </Container>
    </main>
  );
}
