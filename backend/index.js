import express, { request, response } from "express";
import { PORT, mongoBDURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
	console.log(request);
	return response.status(234).send("Hello");
});

app.use("/books", booksRoute);

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
	});
