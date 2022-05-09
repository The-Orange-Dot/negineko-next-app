import { server } from "../../../config";

const protectAPI = (handler) => {
  return async (req, res) => {
    if (`https://${req.headers.host}` !== server) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    console.log(req.headers.host);
    return handler(req, res);
  };
};

export default protectAPI;
