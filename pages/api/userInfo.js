export default function handler(req, res) {
  if (req.method === "GET") {
    const secret = "6a189h8gvw8pjxlsh8l7vdy1rp46jn";
    const client = "05rkef9kwzbr5jdi4ahjbuj3uc83ov";
    res.status(200).json({ secretKey: secret, clientId: client });
  }
}
