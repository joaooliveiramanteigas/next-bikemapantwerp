import { RootNetworkObject } from "@/types";

export async function getNetworkData(): Promise<RootNetworkObject> {
  const res = await fetch("http://api.citybik.es/v2/networks/velo-antwerpen");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
