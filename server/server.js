
const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3001;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: "../client" });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Add middleware for handling the body parser
  server.use(express.json());

  // Serve the files on the .next folder under the '/' route
  server.get('/_next/*', (req, res) => {
    return handle(req, res);
  });

  // Serve the static files located in the public folder
  server.get('/public/*', (req, res) => {
    return handle(req, res);
  });

  // Custom routes go here

  // The default route, don't edit this
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});





// require("dotenv").config();

// const MongoClient = require("mongodb").MongoClient;
// const cors = require("cors");
// const path = require('path');

// const express = require("express");
// const app = express();
// const port = 3003; // You can choose another port if you want


// app.use(cors()); // Enabling CORS for all routes
// app.use(express.json()); // Parse incoming request bodies as JSON


// const token = jwt.sign({ uid: user.uid }, process.env.JWT_SECRET, { expiresIn: '1h' });

// // Set the token as a secure, httpOnly cookie
// res.cookie('token', token, { 
//     httpOnly: true,
//     secure: true, 
//     sameSite: 'strict', 
//     maxAge: 3600000 // 1 hour in milliseconds
// });

// const uri = process.env.MONGODB_URI;

// let db; // Variable to hold the database instance

// MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then((client) => {
//     console.log("Connected to Database");
//     db = client.db("your-database-name");
//   })
//   .catch((error) => console.error(error));



//   app.post("/generate-token", async (req, res) => {
//     const { uid } = req.body; // you'll send the user's Firebase UID from the frontend

//     // Generate JWT
//     const token = jwt.sign({ uid }, process.env.JWT_SECRET, {
//         expiresIn: "1h" // token will expire in 1 hour
//     });

//     res.json({ token });
// });



// app.post("/submit-review", (req, res) => {
//   const reviewsCollection = db.collection("reviews");
//   reviewsCollection
//     .insertOne(req.body)
//     .then((result) => {
//       res.json({
//         message: "Review submitted successfully",
//         id: result.insertedId,
//       });
//     })
//     .catch((error) => {
//       console.error(error);
//       res
//         .status(500)
//         .json({ error: "An error occurred while submitting the review" });
//     });
// });

// app.get("/user-reviews/:userId", (req, res) => {
//   const userId = req.params.userId;
//   const reviewsCollection = db.collection("reviews");
//   reviewsCollection
//     .find({ userId }) // find reviews that match the userId
//     .toArray()
//     .then((results) => res.json(results))
//     .catch((error) => console.error(error));
// });

// app.post("/submit-email", (req, res) => {
//   const emailsCollection = db.collection("emails");
//   emailsCollection
//     .insertOne(req.body)
//     .then((result) => {
//       res.json({
//         message: "Email submitted successfully",
//         id: result.insertedId,
//       });
//     })
//     .catch((error) => {
//       console.error(error);
//       res
//         .status(500)
//         .json({ error: "An error occurred while submitting the email" });
//     });
// });

// app.use(express.static(path.join(__dirname, '../client/build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

// // Start the Express server
// app.listen(port);
