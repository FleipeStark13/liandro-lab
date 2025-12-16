'use client'
import { useState } from "react";
import { FacebookShareButton, FacebookIcon, PinterestShareButton, PinterestIcon, RedditShareButton, RedditIcon, WhatsappIcon, WhatsappShareButton, LinkedinIcon, LinkedinShareButton, EmailShareButton, EmailIcon,  } from "next-share";
import { FaCopy } from "react-icons/fa";
export default function SharePage({slug}: {slug: string}) {
    const [statusMessage, setStatusMessage] = useState<string>('');



    const url = `https://liandro-lab.vercel.app/blog/${slug}`;
    
    const handleCopyUrl = () => {
        navigator.clipboard.writeText(url);
        setStatusMessage('Link copiado!');
        setTimeout(() => {
            setStatusMessage('')
        }, 1500)
    }

    return (
        <div>
            <p>Compartilhe!</p>

            <div className="lg:flex-row flex lg:gap-2 gap-1">

                <FacebookShareButton url={url}>
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
                
                <RedditShareButton url={url}>
                    <RedditIcon size={32} round />
                </RedditShareButton>
                
                <LinkedinShareButton url={url}>
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>

                <EmailShareButton url={url}>
                    <EmailIcon size={32} round />
                </EmailShareButton>

                <button className="bg-zinc-600! rounded-sm! cursor-pointer flex items-center" onClick={handleCopyUrl}>
                    <FaCopy width={32} height={32} ></FaCopy>
                </button>

            </div>

            {
                statusMessage ? <p className="text-sm text-green-600 bg-green-500/5 p-2 mt-2 border-green-500 rounded-md">{statusMessage}</p> : <></>
            }

        </div>
    )
}