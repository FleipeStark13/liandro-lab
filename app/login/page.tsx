"use client"

import { useState } from "react"
import { useRouter } from "next/navigation";
export default function Page() {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();
    const api = '/api/auth';

    const handleLogin = () => {
        fetch(`${api}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })
        .then((res) => {
            if(res.ok) {
                router.push('/admin/home');
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <div>
            <h1>Login Page!</h1>

            <input type="email" onChange={(e) => setEmail(e.target.value)} />
            <br />
            <br />
            <input type="password" onChange={(e) => setPassword(e.target.value)} />

            <br />
            <br />
            <button className="bg-blue-700 p-5 w-56" onClick={handleLogin}>Enviar</button>

        </div>
    )
}