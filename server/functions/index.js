const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const jwt = require("jsonwebtoken");
const path = require("path");

// Create an Express application
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Database URI
const uri = "mongodb+srv://alexakten:PyTQwSFdp0ILsN1x@cluster0.lhqgzw0.mongodb.net/?retryWrites=true&w=majority"
// Connect to MongoDB
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to Database");
    
    // Assign DB instance to 'db'
    const db = client.db("your-database-name");

    // Define your routes here
    app.post("/submit-email", (req, res) => {
      const emailsCollection = db.collection("emails");
      emailsCollection.insertOne(req.body)
        .then((result) => {
          res.json({ message: "Email submitted successfully", id: result.insertedId });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ error: "An error occurred while submitting the email" });
        });
    });

    // Start the Express server inside the MongoDB connection success callback
    const server = app.listen(5002, () => console.log("Server started on port 5002"));
  })
  .catch((error) => {
    console.error("Database connection failed", error);
    process.exit(1); // Exit the process if the DB connection fails
  });


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

app.get("/user-reviews/:userId", (req, res) => {
  const userId = req.params.userId;
  const reviewsCollection = db.collection("reviews");
  reviewsCollection
    .find({ userId }) // find reviews that match the userId
    .toArray()
    .then((results) => res.json(results))
    .catch((error) => console.error(error));
});


app.use(express.static(path.join(__dirname, "../../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

exports.api = functions.https.onRequest(app);
