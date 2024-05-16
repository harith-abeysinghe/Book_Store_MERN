import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get("http://localhost:1234/books")
			.then((response) => {
				setBooks(response.data.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error.message);
				setLoading(false);
			});
	}, []);

	return (
		<div className="p-4">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl my-8">Books List</h1>
				<Link
					to="/books/create"
					className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
				>
					<MdOutlineAddBox className="text-sky-800 text-4xl" />
				</Link>
			</div>
			{loading ? (
				<Spinner />
			) : (
				<table className="w-full border-separate">
					<thead>
						<tr>
							<th className="border border-gray-600">No</th>
							<th className="border border-gray-600">Title</th>
							<th className="border border-gray-600">Author</th>
							<th className="border border-gray-600">Publish Year</th>
						</tr>
					</thead>
				</table>
			)}
		</div>
	);
};

export default Home;
