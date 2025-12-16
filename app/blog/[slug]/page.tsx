import { GetPostBySlug, IPost, updateViews } from "@/services/db";
import { redirect } from "next/navigation";
import PostData from "@/app/components/PostData";
import { IPostRequest } from "@/app/components/PostData";
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

    updateViews(slug);

    const post_created = new Date(data.createdAt.seconds * 1000).toDateString();
    const post_updated = new Date(data.updatedAt.seconds * 1000).toDateString();


    const post_request: IPostRequest = {
        title: data.title,
        slug: data.slug,
        summary: data.summary,
        content: data.content,
        createdAt: post_created,
        updatedAt: post_updated,
        viewCount: data.viewCount,

    }


    return (
        <>
            <PostData post_data={post_request}></PostData>
        </>
    )

}