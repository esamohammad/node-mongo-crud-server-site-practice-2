const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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



    //Read/Get
    app.get('/users', async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    //update korar jonno data get kore
    app.get('/users/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const user = await userCollection.findOne(query);
      res.send(user);
    })


    //creat
    app.post('/users', async (req, res) => {
      const user = req.body;
      console.log(user);
      const result = await userCollection.insertOne(user)
      res.send(result);
    });



//put or patch korbo-(update)-- duitar bisheshotto ache ....so put diye kortechi..delete ar age dilam ok---

app.put('/users/:id', async (req, res) => {
  const id = req.params.id;
  const filter = { _id: ObjectId(id) };
  const updatedUser = req.body;
  console.log(updatedUser)
 
})

























    //delete 
    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id;
      // console.log('trying to delete', id);
      const query = { _id: ObjectId(id) }
      const result = await userCollection.deleteOne(query);
      console.log(result);
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