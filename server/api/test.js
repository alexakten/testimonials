module.exports = (req, res) => {
  // Set CORS headers to allow any domain
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
  }

  // Respond with a simple message regardless of the domain
  res.status(200).json({ message: "Hello World" });
};
