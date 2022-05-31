//Fetches approved mods to display
export const fetchMods = async (username: string) => {
  const modsData = await fetch(`/api/users/${username}`, {
    headers: { key: "orange_is_orange" },
  });

  const mods = await modsData.json();

  return mods;
};

//Fetches approved mods for socket rooms
export const fetchModNames = async (username: string) => {
  console.log(username);

  type ModType = {
    id: string;
    streamer: string;
    name: string;
    pending: boolean;
    image: string;
  };
  const modsData = await fetch(`/api/users/${username}`, {
    headers: { key: "orange_is_orange" },
  });
  const mods = await modsData.json();
  const modNames = mods.map((mod: ModType) => {
    return mod.name;
  });

  return modNames;
};
