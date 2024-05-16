import express, { request, response } from "express";
import { PORT, mongoBDURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
	console.log(request);
	return response.status(234).send("Hello");
});

//Method to post a book
app.post("/books", async (request, response) => {
	try {
		if (
			!request.body.title ||
			!request.body.author ||
			!request.body.publishYear
		) {
			return response.status(400).send({
				message: "Send all required fields: title, author, publishYear",
			});
		}
		const newBook = {
			title: request.body.title,
			author: request.body.author,
			publishYear: request.body.publishYear,
		};
		const book = await Book.create(newBook);
		return response.status(201).send(book);
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
});

//get all books
app.get("/books", async (request, response) => {
	try {
		const books = await Book.find();
		return response.status(200).json({
			count: books.length,
			data: books,
		});
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
});

//get a book by id
app.get("/books/:id", async (request, response) => {
	try {
		const { id } = request.params;
		const book = await Book.findById(id);
		return response.status(200).json(book);
	} catch (error) {
		console.log(error.message);
		response.status(500).send({ message: error.message });
	}
});

app.put("/books/:id", async (request, response) => {
	try {
		if (
			!request.body.title ||
			!request.body.author ||
			!request.body.publishYear
		) {
			return response.status(400).send({
				message: "Send all required fields: title, author, publishYear",
			});
		}
		const { id } = request.params;
		const result = await Book.findByIdAndUpdate(id, request.body);
		if (!result) {
			return response.status(404).send({ message: "Book not found" });
		}
		return response.status(200).send({ message: "Book updated successfully" });
	} catch (error) {
		console.log(error.message);
		return response.status(500).send({ message: "Invalid ID" });
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
	});
