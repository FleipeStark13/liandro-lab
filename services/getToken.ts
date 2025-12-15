import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import ValidateJwtToken from "./validate_jwt";

export default async function GetTokenStatus (req: NextRequest) {
    try {
        const token = req.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.redirect(new URL('/login', req.url));
        } else {
            const validate = await ValidateJwtToken(token);
            if (!validate) {
                return NextResponse.redirect(new URL('/login', req.url));
            } else {
                return true;
            }
        }
    } catch (err) {
        console.log(`Can't get the token: ${err}`);
        return NextResponse.redirect(new URL('/login', req.url));
    }
}