import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
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
							<th className="border border-slate-600 rounded-md">No</th>
							<th className="border border-slate-600 rounded-md">Title</th>
							<th className="border border-slate-600 rounded-md max-md:hidden">
								Author
							</th>
							<th className="border border-slate-600 rounded-md max-md:hidden">
								Publish Year
							</th>
							<th className="border border-slate-600 rounded-md">Operations</th>
						</tr>
					</thead>

					<tbody>
						{books.map((book, index) => (
							<tr key={book._id} className="h-8">
								<td className="border border-slate-700 rounded-md text-center">
									{index + 1}
								</td>
								<td className="border border-slate-700 rounded-md text-center">
									{book.title}
								</td>
								<td className="border border-slate-700 rounded-md text-center max-md:hidden">
									{book.author}
								</td>
								<td className="border border-slate-700 rounded-md text-center max-md:hidden">
									{book.publishYear}
								</td>
								<td className="border border-slate-700 rounded-md text-center max-md:hidden">
									<div className="flex justify-center gap-x-4">
										<Link
											to={`/books/details/${book._id}`}
											className="text-blue-500 hover:text-blue-700"
										>
											<BsInfoCircle className="text-2xl" />
										</Link>
										<Link
											to={`/books/edit/${book._id}`}
											className="text-green-500 hover:text-green-700"
										>
											<AiOutlineEdit className="text-2xl" />
										</Link>
										<Link
											to={`/books/delete/${book._id}`}
											className="text-red-500 hover:text-red-700"
										>
											<MdOutlineDelete className="text-2xl" />
										</Link>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	);
};

export default Home;
