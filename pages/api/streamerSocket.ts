import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../source/types/next";

const Test = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === "POST") {
    const user = req.body;
    const io = res?.socket?.server?.io;
    let id: string;

    let counter = 0;
    io.once("connection", (socket) => {
      console.log(socket.id);
      counter++;
      console.log(counter);
      socket.on("disconnect", () => {
        counter--;
        console.log(counter);
      });
    });
  }
  res.end();
};

export default Test;
