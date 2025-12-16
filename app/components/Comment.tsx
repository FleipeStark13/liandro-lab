import { Timestamp } from "firebase/firestore";
import { IComment } from "./PostData";
import { FaCalendar } from "react-icons/fa";
export default function Comment({comment}: {comment: IComment}) {

    const formatDate = (date: Timestamp) => {

        return new Date(date.seconds * 1000).toLocaleDateString();
    }

	return (
		<div className="border-l border-zinc-600 divst-none! p-2">
			<div className="comment-head flex gap-5">
				<p className="text-blue-600 text-md"><strong>{comment.user}</strong></p>
				<p className="text-zinc-600 flex items-center gap-2"> <FaCalendar size={12} /> {formatDate(comment.createdAt)}</p>
			</div>

			<div className="comment">
				<p className="text-zinc-300 text-sm">{comment.comment}</p>
			</div>

		</div>
	)
}

export function NoComments() {
	return (
		<div className="border-l border-zinc-600 divst-none! p-2">
			<div className="comment">
				<p className="text-zinc-300 text-sm">Ops... ainda não há comentários! Seja o primeiro a adicionar um comentário.</p>
			</div>
		</div>
	)
}