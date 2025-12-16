'use client'
import Comment, { NoComments } from "./Comment";
import { FaHome,  FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import AddNewComent from "./AddNewComment";
import LoadingComments from "./LoadingComments";
import SharePage from "./SharePage";

export interface IPostRequest {
    title: string;
    slug: string;
    summary: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    viewCount: number;
}

export interface IComment {
    comment: string;
    createdAt: Timestamp;
    user: string;
}

export default function PostData({post_data}: {post_data: IPostRequest}) {
    const [addNewComent, setAddNewCommnet] = useState<boolean>(false);
    const [newCommentAdded, setNewCommentAdded] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [sorter, setSorter] = useState<boolean>(true);

    const router = useRouter();

    const [comments, setComments] = useState<IComment[]>([]);

    const sortRecent = () => {
        setComments(prev =>
            [...prev].sort((a, b) => a.createdAt.seconds - b.createdAt.seconds)
        )
        setSorter(prev => !prev);
    }
    const sortLast = () => {
        setComments(prev =>
            [...prev].sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
        )
        setSorter(prev => !prev);
    }

    useEffect(() => {
        setLoading(true);

        fetch('/api/post/get_comments',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({slug: post_data.slug})
        })
        .then((res) => {
            res.json()
            .then((data) => {
                if (data?.data) {
                    const newComments: IComment[] = data?.data;
                    setComments([...newComments]);
                    sortLast();
                }
            })
        })
        .catch((err) => console.error(err))
        .finally(() => {
            setLoading(false);
        })
        
    }, [ , newCommentAdded])
    
    const addComment = () => {
        setAddNewCommnet(true);
    }


    return (
        <div className="rounded-md w-full p-4 lg:p-6">
            <div className="w-full text-center">
                <div className="flex flex-col gap-8 lg:flex-row lg:gap-28 max-w-7xl mx-auto">
                    <div className="post-container text-left w-full  lg:w-3/4">
                        <h1>{post_data.title}</h1>

                        <div className="items-center flex-wrap justify-start text-sm/tight text-zinc-400 flex gap-3 md:gap-5">
                            <p className=" p-2 rounded-md">Última atualização: {post_data.createdAt}</p>
                            <p className=" p-2 rounded-md">Última atualização: {post_data.updatedAt}</p>
                            <p className=" p-2 rounded-md">Visualizações: {post_data.viewCount}</p> 


                            <div className="actions-section items-center w-full justify-between flex rounded-md lg:flex-row flex-col lg:items-center items-start gap-5">

                                <button onClick={() => router.push('/')} className="p-2 bg-blue-600! hover:bg-blue-500! cursor-pointer  rounded-md text-zinc-900 font-black flex gap-5 items-center" >Voltar <FaHome /></button>

                                <SharePage slug={post_data.slug}></SharePage>
                            </div>


                        </div>

                        <hr /> 

                        <div className="text-justify text-zinc-400 rounded-xl">
                            <div dangerouslySetInnerHTML={{__html: post_data.content}}></div>
                        </div>
                    </div>

                    <div className="comments-container text-left w-full lg:w-1/3">
                        <h3>Comentários</h3>
                        <p>Veja o que as pessoas estão falando sobre essa postagem!</p>


                        <hr />
                        
                        { loading ? <LoadingComments /> : <div className="comments p-2 rounded-md">
                            
                            <div className="comment-controls flex gap-2 items-center mb-2">
                                { sorter ? 
                                    <button
                                        className="bg-zinc-900! flex items-center gap-2 hover:bg-zinc-800!" 
                                        onClick={sortLast}
                                    >
                                        <FaSortAmountDown size={20} />
                                    </button> 
                                    : 
                                    <button 
                                        className="bg-zinc-900! flex items-center gap-2 hover:bg-zinc-800!"
                                        onClick={sortRecent}
                                    >
                                        <FaSortAmountUp size={20} />
                                    </button>
                                }
                                { addNewComent ? <AddNewComent state={setAddNewCommnet} slug={post_data.slug} setNewComment={setNewCommentAdded} ></AddNewComent> : <button className="text-sm rounded-sm! bg-blue-950! hover:bg-blue-800! cursor-pointer" onClick={addComment}><p>Adicionar novo comentario</p></button>}

                            </div>
                            <p className="text-zinc-700">{comments.length} comentários.</p>


                            <ul className="flex flex-col gap-2 p-0! lg:max-h-[60vh] lg:overflow-auto">
                                {comments.length > 0 ? comments.map((comment, key) => (
                                    <Comment comment={comment} key={key}></Comment>
                                )) : <NoComments key={0}></NoComments>
                                }
                            </ul>
                        </div>}

                    </div>

                </div>
                
            </div>
        </div>
    )
}