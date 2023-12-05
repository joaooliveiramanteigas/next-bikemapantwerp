import { Container, Typography } from "@mui/material";
import Link from "next/link";
import FavoriteStations from "./FavoriteStations";
import { getNetworkData } from "@/libs/api";

export default async function Home() {
  const stationsNetworkData = await getNetworkData();

  return (
    <main style={{ height: "calc(100vh - 90px)" }}>
      <Container maxWidth="sm" style={{ marginTop: 20 }}>
        <Typography variant="h1" textAlign="center" fontSize={32}>
          Antwerp bike map
        </Typography>

        <FavoriteStations stations={stationsNetworkData.network.stations} />

        <Link href="/map">
          <Typography variant="caption" fontSize={16}>
            Go to map
          </Typography>
        </Link>
      </Container>
    </main>
  );
}
