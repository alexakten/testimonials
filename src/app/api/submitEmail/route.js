import { MongoClient } from "mongodb";

export async function POST(req) {
  try {
    // Parse the request body
    const requestBody = await req.json();
    const userEmail = requestBody.email;

    // Validate the email address
    if (!userEmail || !userEmail.includes('@')) {
      return new Response(JSON.stringify({ message: 'Invalid email address.' }), {
        status: 422,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Connect to MongoDB
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    console.log("Connected to Database"); // Log when connected to the database
    const db = client.db("mendly-db");

    // Insert the email into the collection
    await db.collection('Waitlist Emails').insertOne({ email: userEmail });
    client.close();

    // Return a success response
    return new Response(JSON.stringify({ message: 'Email added!' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    // Handle any errors
    console.error(error); // Log the error for debugging
    return new Response(JSON.stringify({ message: 'Error processing request.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// export async function GET(req) {
//   console.log("Hello Console");
//   // Connect to MongoDB
//   const client = await MongoClient.connect(process.env.MONGODB_URI);
//   console.log("Connected to Database"); // Log when connected to the database
//   const db = client.db("mendly-db");
//   return new Response("Hello world");
// }
