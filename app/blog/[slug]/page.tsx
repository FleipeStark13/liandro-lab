import { GetPostBySlug, IPost } from "@/services/db";
import { redirect } from "next/navigation";


interface PostPageProps {
    params: {
        slug: string
    }
}

export default async function PostPage({params}: PostPageProps) {


    const { slug } = await params;
    
    const data:IPost = await GetPostBySlug(slug) as IPost

    if (!data) {
        redirect('/')
    }

    const createdAt = new Date(data.createdAt.seconds * 1000).toDateString();
    const updatedAt = new Date(data.updatedAt.seconds * 1000).toDateString();

    return (
        <div className="h-fit rounded-md p-5">
            
            <div className="border-zinc-900 border-1 p-5 box-border rounded-md">
                <h1>{data.title}</h1>
                <article>
                    <h4>Sumário</h4>
                    <p>{data.summary}</p>
                </article>

                <hr /> 

                <div className="flex items-center text-zinc-400 text-sm flex gap-5">
                    <p className="bg-zinc-900 p-2 rounded-md">Última atualização: {createdAt}</p>
                    <p className="bg-zinc-900 p-2 rounded-md">Última atualização: {updatedAt}</p>
                    <p className="bg-zinc-700 p-2 rounded-md">Visualizações: {data.viewCount}</p> 
                </div>

                <hr /> 

                <div className="bg-zinc-900 rounded-xl p-5">
                    <div dangerouslySetInnerHTML={{__html: data.content}}></div>
                </div>

            </div>
            

        </div>
    )

}