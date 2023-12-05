export interface StationExtra {
  address: string;
  status: string;
  uid: number;
}

export interface Station {
  empty_slots: number;
  extra: StationExtra;
  free_bikes: number;
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  timestamp: string;
}

export interface NetworkLocation {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface Network {
  company: string[];
  href: string;
  id: string;
  location: NetworkLocation;
  name: string;
  stations: Station[];
}

export interface RootNetworkObject {
  network: Network;
}
