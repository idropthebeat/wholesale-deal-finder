// Auth disabled for now
export default function handler(req, res) {
  return res.status(200).json({ message: 'Auth is currently disabled.' });
}
