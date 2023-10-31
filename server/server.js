require("dotenv").config();

const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");

const express = require("express");
const app = express();
const port = 3003; // You can choose another port if you want

app.use(cors()); // Enabling CORS for all routes
app.use(express.json()); // Parse incoming request bodies as JSON

const uri = process.env.MONGODB_URI;

let db; // Variable to hold the database instance

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to Database");
    db = client.db("your-database-name");
  })
  .catch((error) => console.error(error));

app.post("/submit-review", (req, res) => {
  const reviewsCollection = db.collection("reviews");
  reviewsCollection
    .insertOne(req.body)
    .then((result) => {
      res.json({
        message: "Review submitted successfully",
        id: result.insertedId,
      });
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while submitting the review" });
    });
});

app.get("/reviews", (req, res) => {
  const reviewsCollection = db.collection("reviews");
  reviewsCollection
    .find()
    .toArray()
    .then((results) => res.json(results))
    .catch((error) => console.error(error));
});

// Start the Express server
app.listen(port);
