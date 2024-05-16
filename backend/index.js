import express, { request, response } from "express";
import { PORT, mongoBDURL } from "./config.js";
import mongoose from "mongoose";

const app = express();

app.get('/', (request,response) =>{
  console.log(request)
  return response.status(234).send("Hello")
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
