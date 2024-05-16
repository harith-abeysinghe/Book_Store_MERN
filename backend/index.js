import express, { request, response } from "express";
import { PORT, mongoBDURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS
//Option 1: allow all origins wiht default of cors(*)
app.use(cors());

//Option 2: allow only specific origins
// app.use(
// 	cors({
// 		origin: "http://localhost:1234",
// 		methods: ["GET", "POST", "PUT", "DELETE"],
// 		allowedHeaders: ["Content-Type"],
// 	})
// );

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
