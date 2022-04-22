import prisma from "../lib/prisma";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  const locations = await prisma.location.findMany({});
  return { props: { locations } };
};
