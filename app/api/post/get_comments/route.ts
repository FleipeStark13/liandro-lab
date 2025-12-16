import { GetComments } from "@/services/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req: NextRequest) {
    try {

        const { slug } = await req.json();

        const data = await GetComments(slug);

        console.log(`Resultado recebido na api de get_comments: ${data}`);

        if (!data) { return NextResponse.json({message: "error!"}, {status: 500}) }
        else {
            return NextResponse.json(
                {data: data},
                {status: 200}
            )
        }
    } catch (err) {
        console.log(`Error fetching posts: ${err}`)
        return NextResponse.json(
            {message: "error!"},
            {status: 500}
        )
    }
}