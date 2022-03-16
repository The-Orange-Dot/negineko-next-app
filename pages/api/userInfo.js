export default function handler(req, res) {
  if (req.method === "GET") {
    const secret = process.env.SECRET_KEY;
    const client = process.env.CLIENT_ID;
    res.status(200).json({ secretKey: secret, clientId: client });
  }
}
