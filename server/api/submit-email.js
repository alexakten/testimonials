const Cors = require('cors');
const MongoClient = require("mongodb").MongoClient;

// Initializing the cors middleware
const cors = Cors({
  methods: ['POST'], // Adjust the methods as per your requirements
  origin: 'https://www.mendly.app', // Adjust the origin or set to true to allow all origins
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error if something goes wrong
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

module.exports = async (req, res) => {
    // Run CORS middleware and handle any potential errors
    await runMiddleware(req, res, cors({ origin: true }));

    // Only handle POST requests
    if (req.method !== 'POST') {
        res.status(405).send('Method Not Allowed');
        return;
    }

    // Database URI
    const uri = "mongodb+srv://alexakten:PyTQwSFdp0ILsN1x@cluster0.lhqgzw0.mongodb.net/?retryWrites=true&w=majority";

    try {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        
        const db = client.db("your-database-name");
        const emailsCollection = db.collection("emails");

        const result = await emailsCollection.insertOne(req.body);
        res.status(200).json({ message: "Email submitted successfully", id: result.insertedId });

        await client.close();
    } catch (error) {
        console.error("Database connection failed", error);
        res.status(500).json({ error: "An error occurred while submitting the email" });
    }
};
