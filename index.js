const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://dbUser2:8B9yli9b7UXukYWs@cluster0.rgzq2ah.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    const userCollection = client.db('nodeMongoCrud').collection('users');
    
    app.post('/users', async (req, res) => {
      const user = req.body;
      console.log(user);
      const result = await userCollection.insertOne(user)
      res.send(result);
  });

  }
  finally {

  }
}

run().catch(err => console.log(err));


app.get('/', (req, res) => {
  res.send('Hello World!-- Server is Running!!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// dbUser2
// 8B9yli9b7UXukYWs