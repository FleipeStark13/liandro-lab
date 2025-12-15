import checkUser from "@/services/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: "Invalid input!" },
                { status: 401 }
            )
        }

        const validate = await checkUser(email, password)

        console.log(validate);

        if (validate) {

            const secret: any = process.env.NEXT_JWT_SECRET_KEY;
            const token = jwt.sign({email}, secret, {expiresIn: '1h'});

            const response = NextResponse.json(
                {message: "Success to login!"},
                {status: 200},
            )

            response.cookies.set({
                name: 'token',
                value: token,
                httpOnly: true,
                path: '/',
                maxAge: 60 * 60
            });

            return response;
        } else {
            return NextResponse.json(
                { message: "Can't login, server error."},
                {status: 500}
            )
        }

    } catch (err) {
        console.error(`Can't get the user data ${err}`)
        return NextResponse.json(
            { message: 'Internal server error.' },
            { status: 500 }
        )
    }
}