'use client'
import { Timestamp } from "firebase/firestore";
import { SetStateAction, Dispatch, useState, ChangeEvent, useEffect } from "react";

export interface IComment {
    comment: string;
    user: string;
    createdAt: any;
}

export default function AddNewComent({state, slug, setNewComment}: {state: Dispatch<SetStateAction<boolean>>;slug: string; setNewComment: Dispatch<SetStateAction<boolean>>}) {

    const [comment, setComment] = useState<string>('')
    const [isUser, setIsUser] = useState<boolean>(true);
    const [user, setUser] = useState<string>('');

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            setIsUser(false);
        } else {
            setUser(user)
        }
    }, [])

    const handleAddNewComent = () => {
        const timestamp = Date.now();
        console.log(`Timestamp ${timestamp}`)
        const current_user = localStorage.getItem('user');

        if (!current_user) {
            setIsUser(false);
        }

        const payload: IComment = {
            comment: comment,
            user: user,
            createdAt: Timestamp.now().toJSON(),
        }

        if (payload && slug) {
            fetch('/api/post/add_comment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    slug: slug,
                    payload: payload
                })
            })
            .then((res) => {
                if (res.ok) {
                    setNewComment(prev => !prev);
                    state(false);
                }
            })
            .catch((err) => {
                console.error(err);
                alert('Não foi possível adicionar um novo comentário!');
            })
        } else {
            alert('Slug ou Payload vazios!');
        }

    }

    const handleAddUser = () => {

        const add = () => {
            if (user.length <= 3) {
                alert("Por favor insira um nome maior!")
            } else {
                localStorage.setItem('user', user);
                setIsUser(true);
            }
        }

        return (
            <div className="flex gap-2 items-center justify-center mb-5">
                <input
                    onChange={(e) => {setUser(e.target.value)}}
                    value={user}
                    required
                    placeholder="Insira um nome de usuário"
                    className="mb-0!"
                />
                <button className="bg-zinc-600! cursor-pointer p-1 rounded-md! hover:bg-zinc-400" onClick={add}>Salvar</button>
            </div>
        )
    }

    return (
        <div>
            {isUser ? <p className="text-sm! text-zinc-700">Hello: {user}</p> : <p className="text-sm! text-zinc-700">Insira um nome de usúario para comentar...</p>}
            { isUser ? <></> : handleAddUser()}
            <div>
                <textarea onChange={(e) => setComment(e.target.value)}></textarea>
                <div className="actions flex gap-5">
                    <button className="hover:bg-blue-600! cursor-pointer bg-blue-700! text-sm! rounded-md!" onClick={handleAddNewComent}>Salvar</button>
                    <button className="hover:bg-zinc-600! cursor-pointer bg-zinc-700! text-sm! rounded-md!" onClick={() => {state(false)}}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}