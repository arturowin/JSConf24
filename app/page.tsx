"use client";

import {useRef, RefObject} from 'react';
import Image from 'next/image';
import { useChat } from "ai/react";
import ReactMarkdown from "react-markdown";
import logo from "assets/images/jsconf-logo.svg";
import ww from "assets/images/walter-white.png";

const scrollIntoView = (containerRef: RefObject<HTMLDivElement>) => {
    if(containerRef.current){
        containerRef.current.scrollTo(0, containerRef.current.scrollHeight)
    }
}
export default function Chat() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
      api: '/api/handlers/chat',
      onFinish: (message) => {
          scrollIntoView(containerRef);
      }
  });

  const onSubmit = (e:  React.FormEvent<HTMLFormElement>) => {
      handleSubmit(e);
      setTimeout(() => scrollIntoView(containerRef), 100);
  }

  return (
    <div className="mx-auto w-full h-full overflow-scroll max-w-lg py-24 flex flex-col stretch pt-4 pb-28 no-scrollbar" ref={containerRef}>
        <Image src={logo} alt="" width="100" height="80" className="fixed top-4 left-6"/>
        {messages.length > 0
            ? messages.map((m) => (
                <div key={m.id} className="whitespace-pre-wrap">
                    {m.role === "user" ?
                        <div className="mt-2 mb-2 flex w-full justify-end items-center">
                            <div>
                                <div className="flex items-center gap-2">
                                    <Image className="w-10 h-10 rounded-full" src={ww}
                                         alt="Walter"/>
                                    <div className="font-medium dark:text-white">
                                        <div>Հաճախորդ</div>
                                    </div>
                                </div>
                                <div className="mt-2 text-right">
                                    <ReactMarkdown>{m.content}</ReactMarkdown>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="mt-2 mb-2">
                                <div className="flex items-center gap-4">
                                    <Image className="w-10 h-10 rounded-full" src={logo}
                                         alt="Ninja"/>
                                    <div className="font-medium dark:text-white">
                                        <div>Նինջա</div>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <ReactMarkdown>{m.content}</ReactMarkdown>
                                </div>
                        </div>
                    }
                </div>
            ))
            : null}

        <form onSubmit={onSubmit}>
            <input
                autoFocus
                className="fixed w-full max-w-md bottom-0 border border-gray-300 rounded mb-8 shadow-xl p-2"
                value={input}
                placeholder="Հարցրու ինձ"
                onChange={handleInputChange}
            />
        </form>
    </div>
  );
}
