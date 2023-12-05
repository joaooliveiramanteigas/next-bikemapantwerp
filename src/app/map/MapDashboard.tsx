"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Station } from "@/types";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { LatLngExpression } from "leaflet";
import { useState } from "react";
import MapView from "./MapView";

export default function MapDashboard({
  mainPosition,
  stations,
  defaultStationId,
}: {
  mainPosition: number[];
  stations: Station[];
  defaultStationId: string | null;
}) {
  const [value, setValue] = useState<Station | undefined>(
    defaultStationId
      ? stations.find((s) => s.id === defaultStationId)
      : stations[0]
  );
  const [inputValue, setInputValue] = useState("");
  const defaultProps = {
    options: stations,
    getOptionLabel: (option: Station) => option.name,
  };
  const [favorites, setFavorites] = useLocalStorage<string[]>("favorites", []);

  const addFavorite = (id: string) => {
    setFavorites((value) => {
      return [...value, id];
    });
  };
  const removeFavorite = (id: string) => {
    setFavorites((value) => {
      return value.filter((value) => value !== id);
    });
  };
  const markers = value ? [value] : stations;
  const position: LatLngExpression = value
    ? ([value.latitude, value.longitude] as [number, number])
    : (mainPosition as [number, number]);

  const isFavorite = favorites.includes(value?.id || "");
  return (
    <div>
      <Card sx={{ marginY: 2 }}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {value?.name ? value.name : "Select a station"}
          </Typography>
          <Box display="flex">
            <Box display="flex" flexDirection="column" sx={{ flex: 1 }}>
              <Typography color="textSecondary">Address</Typography>
              <Typography color="textSecondary">
                {value?.extra.address || "N/A"}{" "}
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" sx={{ flex: 1 }}>
              <Typography color="textSecondary">Status </Typography>
              <Typography color="textSecondary">
                {value?.extra.status || "N/A"}{" "}
              </Typography>
            </Box>
          </Box>
        </CardContent>
        <CardActions>
          {isFavorite ? (
            <Button
              size="small"
              color="primary"
              onClick={() => {
                if (value?.id) {
                  removeFavorite(value?.id);
                }
              }}
            >
              Remove favorite
            </Button>
          ) : (
            <Button
              size="small"
              color="primary"
              onClick={() => {
                if (value?.id) {
                  addFavorite(value?.id);
                }
              }}
            >
              Add favorite
            </Button>
          )}
        </CardActions>
      </Card>

      <Button onClick={() => setValue(undefined)}>All</Button>

      <Autocomplete
        {...defaultProps}
        value={value}
        onChange={(event: any, newValue: Station | null) => {
          if (newValue) setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="station-search"
        disableClearable
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              label="Search station"
              variant="standard"
              inputProps={{
                ...params.inputProps,
                autoComplete: "street-address",
              }}
            />
          );
        }}
      />
      <MapView markers={markers} position={position} />
    </div>
  );
}
