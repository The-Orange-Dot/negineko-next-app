import prisma from "../lib/prisma";

export const getStaticProps = async () => {
  const locations = await prisma.locations.findMany({});
  return { props: { locations } };
};
