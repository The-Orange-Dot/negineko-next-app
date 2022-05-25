import { NextApiRequest } from "next";
import { Socket } from "socket.io";
import { NextApiResponseServerIO } from "../../source/types/next";

const Test = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === "POST") {
    // get message
    const message = req.body;

    // dispatch to channel "message"
    res?.socket?.server?.io?.emit("message", message);

    // return message
    res.status(201).json(message);
  }

  res?.socket?.server?.io?.emit("test", "this is a test");

  res.status(200).json("this is a test");
};

export default Test;
