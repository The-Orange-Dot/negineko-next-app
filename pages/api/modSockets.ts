import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../source/types/next";

const Test = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  const io = res?.socket?.server?.io;

  if (req.method === "POST") {
    if (req.body === "test") {
      io.to("").emit("test", "This is a test to modControls");
    }

    const user = req.body;
    let id: string;

    io.once("connection", (socket) => {
      console.log(socket.id);
    });
  }
  res.end();
};

export default Test;
