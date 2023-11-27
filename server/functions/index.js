const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const jwt = require("jsonwebtoken");
const path = require("path");

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

const uri = "mongodb+srv://alexakten:PyTQwSFdp0ILsN1x@cluster0.lhqgzw0.mongodb.net/?retryWrites=true&w=majority";
let db;

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

app.get("/user-reviews/:userId", (req, res) => {
  const userId = req.params.userId;
  const reviewsCollection = db.collection("reviews");
  reviewsCollection
    .find({ userId }) // find reviews that match the userId
    .toArray()
    .then((results) => res.json(results))
    .catch((error) => console.error(error));
});

app.post("/submit-email", (req, res) => {
  const emailsCollection = db.collection("emails");
  emailsCollection
    .insertOne(req.body)
    .then((result) => {
      res.json({
        message: "Email submitted successfully",
        id: result.insertedId,
      });
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while submitting the email" });
    });
});

app.use(express.static(path.join(__dirname, "../../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

exports.api = functions.https.onRequest(app);
