//This will pre-render the locations server-side from the API fetch for faster loading
import { server } from "../config/index";

export const loadLocations = async () => {
  const res = await fetch(`${server}/api/locations`);
  const data = await res.json();

  return data;
};
