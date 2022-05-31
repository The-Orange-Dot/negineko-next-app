const key = process.env.CORS_KEY;
import { NextApiRequest, NextApiResponse } from "next";

export type Req = NextApiRequest & {
  method: "POST" | "GET" | "PATCH" | "DELETE";
  query: { streamersId: string };
  emit: string;
  headers: { key: string };
  body: {
    mods: string[];
  };
};

export type Res = NextApiResponse;
