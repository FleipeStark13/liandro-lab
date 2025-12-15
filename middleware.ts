import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import ValidateJwtToken from "./services/validate_jwt";

export default async function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        const validate = await ValidateJwtToken(token);

        if (validate) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    } catch (err) {
        console.log(`Can't login the user: ${err}`)
        return NextResponse.redirect(new URL('/login', req.url));
    }

}

export const config = {
    matcher: ['/admin/:page*'],
}