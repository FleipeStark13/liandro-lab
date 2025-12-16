'use client'
import Link from "next/link";
import { GetPosts } from "@/services/db";
import { useEffect, useState } from "react";
import { IPost } from "@/services/db";
import { FaLink } from "react-icons/fa";
import Post, { NoPosts } from "./components/Posts";

export default function Home() {
  const [posts, setPosts] = useState<IPost[]>([]); 

  useEffect(() => {
    console.log(posts)
  }, [posts])

  useEffect(() => {
    fetch('/api/getPosts')
    .then((res) => res.json())
    .then((data) => {

      if (data?.body) {
        console.log(data);
        data?.body.forEach((x: IPost, i: number) => {
          setPosts(data?.body ?? [])
        })
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-max flex-col items-center justify-center py-32 gap-2 px-16 bg-white dark:bg-black sm:items-start">

        {posts.length > 0 ? posts.map((postagem: IPost, key: number) => (
          <Post post={postagem} key={key}/>
        )) : <NoPosts></NoPosts>}

      </main>
    </div>
  );
}
