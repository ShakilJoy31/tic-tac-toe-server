// import { StreamChat } from 'stream-chat';
const {StreamChat } = require('stream-chat')
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://shakiDB:MTrZCU6Ar0AmQD1I@cluster0.jnuewna.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();
    const usersCollection = client.db("tic--tac-toe").collection("users");
    app.post('/user', async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      return res.send(result);
    })
    

    //  Getting the logged in user
    app.post('/loggedInUser', async (req, res) => {
      const query = {};
      const cursor = usersCollection.find(query);
      const users = await cursor.toArray();
      const logedUser = req.body;
      return res.send(users);
    })

    app.post('/player', async (req, res) => {
      const query = {};
      const cursor = usersCollection.find(query);
      const users = await cursor.toArray();
      const player = req.body;
      users.map(u => {
        const playerEmail = u?.email;
        if (playerEmail === player.player) {
          return res.send(u);
        }
      })
    })

  }
  finally {

  }
}

app.listen(port, () => {
  console.log('Listing to the port', port);
})


run().catch(console.dir);