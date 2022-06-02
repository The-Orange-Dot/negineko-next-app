import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export type LocationType = {
  id: number;
  name: string;
  category: string;
  address: string;
  map: string;
  description: string[];
  website: string;
  twitter: string;
  instagram: string;
  createdAt: Date | string;
  caption: string;
  twitchClip: string;
  twitchVideo: string;
  thumbnail: string;
  sns: string;
  likes: number;
  prefecture: string;
  city: string;
};

export type ProductType = {
  id: string;
  name: string;
  price_id: string;
  images: string[];
  description: string;
  price: string;
  sold: boolean;
  buyer: string;
};
