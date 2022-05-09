import { server } from "../config/index";

export const getStaticProps = async () => {
  const res = await fetch(`${server}/api/locations`, {
    headers: { key: "orange_is_orange" },
  });
  const data = await res.json();

  return {
    props: { locations: data },
  };
};
