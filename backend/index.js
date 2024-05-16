import express, { request, response } from "express";
import { PORT, mongoBDURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

app.get('/', (request,response) =>{
  console.log(request)
  return response.status(234).send("Hello")
});

app.post('/books',async (request,response) =>{
  try{
    if(
        !request.body.title||
        !request.body.author||
        !request.body.publishYear
    ){
      return response.status(400).send({
          message : "Send all required fields: title, author, publishYear",
      });
    }
    const newBooks = {
      
    }

  }
  catch(error){
    console.log(error.message);
    response.status(500).send({message: error.message})
  }

});

mongoose
  .connect(mongoBDURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

  })
  .catch((error) => {
    console.log(error);
  })
