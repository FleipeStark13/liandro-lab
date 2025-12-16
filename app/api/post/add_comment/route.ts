import { AddComment } from "@/services/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {        
        const { slug, payload } = await req.json();
        const validate = await AddComment(slug, payload)
        
        if (validate) {
            return NextResponse.json(
                { message: 'Comentário adicionado ao banco'},
                { status: 200}
            )
        } else {
            return NextResponse.json(
                { message: 'Não foi possível adicionar comentário.'},
                { status: 500}
            )
        }

    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: 'error'},
            { status: 500}
        )
    }
}