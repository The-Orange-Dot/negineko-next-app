import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../source/types/next";

const Test = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === "POST") {
    const user = req.body;
    const io = res.socket.server.io;
    let id: string;

    // io.sockets.socketsJoin(user);

    // io.sockets.fetchSockets()

    io.once("connection", (socket) => {
      console.log(socket.id);
    });
  }
  res.end();
};

export default Test;
