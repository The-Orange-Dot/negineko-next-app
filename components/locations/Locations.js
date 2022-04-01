import { fetchLocations } from "../../lib/fetchLocations";

export async function getStaticProps() {
  // Instead of fetching your `/api` route you can call the same
  // function directly in `getStaticProps`
  const locations = await loadPosts();

  // Props returned will be passed to the page component
  return { props: { locations } };
}
