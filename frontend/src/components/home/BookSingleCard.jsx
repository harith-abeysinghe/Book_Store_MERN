import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

const BookSingleCard = ({ book }) => {
	return (
		<div
			key={book._id}
			className="border-2 border-sky-400 rounded-lg px-4 m-2 py-2 relative hover:shadow-x1"
		>
			<h2 className="absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg">
				{book.publishYear}
			</h2>
			<h4 className="my-2 text-gray-500">{book._id}</h4>
			<div className="flex justify-center books-center">
				<PiBookOpenTextLight className="text-5xl text-sky-700" />
				<h2 className="text-2xl">{book.title}</h2>
			</div>
			<div className="flex justify-start books-center gap-x-2">
				<BiUserCircle className="text-2xl text-red-300" />
				<h2 className="text-xl">{book.author}</h2>
			</div>
			<div className="flex justify-start books-center gap-x-2 mt-4 p-4">
				<Link to={`/books/details/${book._id}`}>
					<BsInfoCircle className="text-2xl text-blue-500 hover:text-blue-700" />
				</Link>
				<Link to={`/books/edit/${book._id}`}>
					<AiOutlineEdit className="text-2xl text-green-500 hover:text-green-700" />
				</Link>
				<Link to={`/books/delete/${book._id}`}>
					<MdOutlineDelete className="text-2xl text-red-500 hover:text-red-700" />
				</Link>
			</div>
		</div>
	);
};

export default BookSingleCard;
