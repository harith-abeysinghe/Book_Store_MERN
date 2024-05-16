import React, { useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { useNavigate, useParams } from "react-router-dom";

const DeleteBook = () => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { id } = useParams();

	const handleDeleteBook = () => {
		setLoading(true);
		axios
			.delete(`http://localhost:1234/books/${id}`)
			.then((response) => {
				setLoading(false);
				navigate("/");
			})
			.catch((error) => {
				console.log(error.message);
				alert("Failed to delete book");
				setLoading(false);
			});
	};

	return (
		<div>
			<BackButton />
			<h1 className="text-3xl my-4">Delete Book</h1>
			{loading ? <Spinner /> : ""}
			<div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
				<h3 className="text-2xl">Are you sure you want to delete this book?</h3>
				<div className="flex justify-between items-center mt-4">
					<button
						onClick={handleDeleteBook}
						className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
					>
						Delete
					</button>
					<button
						onClick={() => navigate("/")}
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteBook;
