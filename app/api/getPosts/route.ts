import { GetPosts } from "@/services/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const posts = await GetPosts()
        if (posts) {
            return NextResponse.json(
                {body: posts},
                {status: 200}
            )
        } else {
            return NextResponse.json(
                {message: "Can't get posts!"},
                {status: 500}
            )
        }
    } catch(err) {
        console.log(err);
        return NextResponse.json(
            {message: "Can't get posts!"},
            {status: 500}
        )
    }
}