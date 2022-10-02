import express from "express";
import{MongoClient} from "mongodb";
import * as dotenv from "dotenv";
import cors from "cors"
dotenv.config()
// const express = require('express')

const app = express()
app.use(express.json());
app.use(cors())
const PORT=process.env.PORT;
const  MONGO_URL=process.env.URL
// const  MONGO_URL="mongodb://127.0.0.1:27017";
 async function createConnection() {
 const client = new MongoClient(MONGO_URL); 
 await client.connect(); 
 console.log("Mongo is connected ✨🎊😎");
 return client;
 }

 const client=await createConnection();

app.get('/', function (req, res) {
  res.send('Hel World')
})

app.post('/productcreate', async function (req, res) {
    const add_product = req.body;
    console.log(add_product);
    const result = await client.db("mongodb").collection("products").insertMany(add_product);
    res.send(result);
    console.log(result);
  });
  app.post('/bookedlist', async function (req, res) {
    const add_product = req.body;
    console.log(add_product);
    const result = await client.db("mongodb").collection("bookings").insertOne(add_product);
    res.send(result);
    console.log(result);
  });
  
  app.get('/getallproducts', async function (req, res) {
    const all_products = await client.db("mongodb").collection("products").find({}).toArray();
    res.send(all_products);
    console.log(all_products);
  });

  app.get('/getallbookedlist', async function (req, res) {
    const all_products = await client.db("mongodb").collection("bookings").find({}).toArray();
    res.send(all_products);
    console.log(all_products);
  });

app.listen(PORT,()=>{
    console.log("done")
})