const MongoClient = require("mongodb").MongoClient;

module.exports = async (req, res) => {
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
