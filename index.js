const express = require("express");
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = 5000;

app.use(cors());

const uri = process.env.DATABASE_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    console.log("Successfully connected to MongoDB!");

    const makeupCollection = client
      .db("makeup-world-db")
      .collection("makeups");

      app.get("/makeups", async (req, res) => {
        const data = await makeupCollection.find({}).toArray();
        res.send(data);
      });

      app.get("/makeups/:id", async (req, res) => {
        const {id} = req.params;
        const data = await makeupCollection.findOne({_id: new ObjectId(id) });
        res.send(data);
      });
  } 
  finally {
  }
}
run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/data", (req, res) => {
  res.send("Ami onk valo tomay chara thakte pari!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


