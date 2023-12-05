"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import { Station } from "@/types";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function FavoriteStations({
  stations,
}: {
  stations: Station[];
}) {
  const router = useRouter();
  const [favorites, setFavorites] = useLocalStorage<string[]>("favorites", []);

  const removeFavorite = (id: string) => {
    setFavorites((value) => {
      return value.filter((value) => value !== id);
    });
  };

  const favoritedStations = stations.filter((s) => favorites.includes(s.id));

  return (
    <>
      {favoritedStations.length === 0 && (
        <Card sx={{ marginY: 2 }}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Start adding favorites!
            </Typography>
          </CardContent>
        </Card>
      )}
      {favoritedStations.map((favorite) => {
        return (
          <Card key={favorite.id} sx={{ marginY: 2 }}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {favorite?.name}
              </Typography>
              <Box display="flex">
                <Box display="flex" flexDirection="column" sx={{ flex: 1 }}>
                  <Typography color="textSecondary">Address</Typography>
                  <Typography color="textSecondary">
                    {favorite?.extra.address}{" "}
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="column" sx={{ flex: 1 }}>
                  <Typography color="textSecondary">Status </Typography>
                  <Typography color="textSecondary">
                    {favorite?.extra.status}{" "}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => {
                  router.push(`/map?id=${favorite.id}`);
                }}
              >
                Go
              </Button>
              <Button
                size="small"
                color="primary"
                onClick={() => {
                  if (favorite?.id) {
                    removeFavorite(favorite?.id);
                  }
                }}
              >
                Remove favorite
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </>
  );
}
