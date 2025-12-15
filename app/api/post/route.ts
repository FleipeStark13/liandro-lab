import GetTokenStatus from "@/services/getToken";
import { NextRequest, NextResponse } from "next/server";
import { IPost, MakePost } from "@/services/db";
import { Timestamp } from "firebase/firestore";

interface IData {
    title: string,
    slug: string,
    summary: string,
    content: string,
    viewCount: string
}

export async function POST(req: NextRequest) {
    const validate = await GetTokenStatus(req);

    if (validate) {

        const { title, slug, summary, content, viewCount }:IData = await req.json();
        
        if (!title || !slug || !summary || !content || !viewCount == undefined) {
            return NextResponse.json(
                { message: "Can't get empty data."},
                { status: 400 }
            )
        }

        const docData: IPost = {
            title: title,
            slug: slug,
            summary: summary,
            content: content,
            createdAt: Timestamp.fromDate(new Date()),
            updatedAt: Timestamp.fromDate(new Date()),
            viewCount: 0
        }

        const post = await MakePost(docData);
        if (post) {
            return NextResponse.json(
                {message: "Success to append!"},
                {status: 200}
            )
        } else {
            return NextResponse.json(
                {message: "Can't append data!"},
                {status: 500}
            )
        }

    }
    
}