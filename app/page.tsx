'use client'
import Link from "next/link";
import { GetPosts } from "@/services/db";
import { useEffect, useState } from "react";
import { IPost } from "@/services/db";

export default function Home() {
  const [posts, setPosts] = useState<IPost[]>([]); 

  useEffect(() => {
    console.log(posts)
  }, [posts])

  useEffect(() => {
    fetch('/api/getPosts')
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data?.body.forEach((x: IPost, i: number) => {
        setPosts(data?.body ?? [])
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">

        {posts.map((post: IPost, key: number) => (
          <div className="border-2 border-zinc-700 p-5 rounded-md" key={key}>
            <h1>{post.title}</h1>
            <Link className="font-bold text-blue-600 italic" href={`/blog/${post.slug}`}>Ir para postagem.</Link>
            <p>{post.summary}</p>
          </div>
        ))}

      </main>
    </div>
  );
}
