const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
app.use(cors())
app.use(bodyParser.json())
const port = process.env.PORT || 5055



const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ckgfu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const eventCollection = client.db("volunteer").collection("event");

app.get('/events', (req, res) => {
    eventCollection.find()
    .toArray((arr , item) => {
      res.send(item)
    })
})

  app.post('/addEvent', (req, res) => {
    const newEvent =  req.body;
    eventCollection.insertOne(newEvent)
    .then(res => {
      // console.log("insertedCount ", res);
      res.send(res.insertedCount > 0)
    })
    // console.log("adding new event" , newEvent);
  })

  // console.log('deata base connected');

});









app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})