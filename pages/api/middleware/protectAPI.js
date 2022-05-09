import { server } from "../../../config";

const protectAPI = (handler) => {
  return async (req, res) => {
    if (!server.includes(req.rawHeaders[1])) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    return handler(req, res);
  };
};

export default protectAPI;
