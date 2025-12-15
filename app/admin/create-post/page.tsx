'use client'
import Tiptap from "@/app/components/EditorClient";
import { useState } from "react";

export default function Page() {

    return(
        <>
            <div className="flex flex-col h-dvh bg-zinc-500">
                <Tiptap/>
            </div>
        </>
    )
}   