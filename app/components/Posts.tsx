import { IPost } from "@/services/db";
import Link from "next/link";
import { FaCalendarDay, FaEye, FaLink } from "react-icons/fa";
import { Timestamp } from "firebase/firestore";
import SharePage from "./SharePage";
import LastComments from "./LastComments";
export default function Post({post}: {post: IPost}) {
    const formatDate = (date: Timestamp) => {

        return new Date(date.seconds * 1000).toLocaleString();
    }

    const url = `/blog/${post.slug}`
    

    return (
        <div className="w-full bg-zinc-900 border border-zinc-800 p-5 rounded-md hover:bg-zinc-800">
            <h1>{post.title}</h1>
            <p>{post.summary}</p>

            <SharePage slug={post.slug} />

            <hr />
            
            <Link className="flex items-center gap-5 font-light text-blue-600 italic" href={url}>Ir para postagem. <FaLink /> </Link>

            <hr className="border-zinc-600!" />

            <div className="status-post flex justify-between gap-5 lg:gap-0 lg:flex-row flex-col">
                <p className="flex items-center gap-2 text-sm text-zinc-600"><FaEye></FaEye> Visualizações: {post.viewCount}</p>
                <p className="flex items-center gap-2 text-sm text-zinc-600"><FaCalendarDay></FaCalendarDay> Data de postagem: {formatDate(post.createdAt)}</p>
            </div>
            
            <hr />

            <div>
                <h3 className="text-md font-black">Últimos comentários:</h3>
                <LastComments slug={post.slug}></LastComments>
            </div>

        </div>
    )
}

export function NoPosts() {
    return (
        <div className="w-full bg-zinc-900 border border-zinc-700 p-5 rounded-md hover:bg-zinc-700">
            <h1>Ops...</h1>
            <p>Parece que ainda não há nenhuma postagem por aqui :( tente voltar mais tarde!</p>
        </div>
    )
}