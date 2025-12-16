'use clinet'
import { useEffect, useState } from "react";
import { IComment } from "./AddNewComment";
export default function LastComments({slug}: {slug: string}) {

    const [loading, setLoading] = useState<boolean>(false);
    const [comments, setComments] = useState<IComment[]>([]);

    useEffect(() => {
        setLoading(true);

        fetch('/api/post/get_comments',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({slug: slug})
        })
        .then((res) => {
            res.json()
            .then((data) => {
                if (data?.data) {
                    const newComments: IComment[] = data?.data;
                    setComments([...newComments]);
                }
            })
        })
        .catch((err) => console.error(err))
        .finally(() => {
            setLoading(false);
        })
        
    }, []);

    const defaultComment = () => {
        
        const showd = comments.slice(0, 3);

        return (
            <>  
                <p className="text-zinc-700">{comments.length} Comentários.</p>

                {showd.map((comment, index) => (
                    <ul key={index} className="p-0!">
                        <div className="flex gap-2 items-center">
                            <div className="comment-head flex gap-5">
                                <p className="text-blue-800 text-md"><strong>{comment.user}: </strong></p>
                            </div>
                            <div className="comment">
                                <p className="text-zinc-300 text-sm">{comment.comment.length > 10 ? comment.comment.slice(0, 10) : comment.comment}</p>
                            </div>
                        </div>
                    </ul>
                ))}
            </>
        )
        
    }

    return (
        <>
            {comments.length > 0 ? defaultComment() : <p>Ainda não há comentários!</p>}        
        </>
    )

}