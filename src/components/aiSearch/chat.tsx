"use client";

import { Fragment, useEffect, useState } from "react";
import { useChat } from "ai/react";
import { AiOutlineSend } from "react-icons/ai";

import { cn } from "@/lib/utils";

export default function Chat({ pageContent }: { pageContent: string }) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
  } = useChat();

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (!isMounted) {
      setMessages([
        {
          id: "1",
          role: "system",
          content: `You are a friendly AI assistant that helps people with the answer to their questions. You are given context or information about something and you answer the question from that given context or information only. If you donot find the answer to the question in that context or information then you simply say 'I dont know please try again with a different question'. The context or information is given as: \n ${pageContent}`,
        },
        {
          id: "2",
          role: "assistant",
          content: "Hello, I am your virtual assistant. How can I help you?",
        },
      ]);
      setIsMounted(true);
    }
  }, [isMounted, setMessages, pageContent]);

  return (
    <div className="w-full flex flex-col items-center justify-between h-full gap-y-2 max-h-max mt-3">
      <ul className="h-96 w-full overflow-y-auto gap-y-2 flex flex-col justify-start">
        {messages.map((message) =>
          message.role !== "system" ? (
            <Fragment key={message.id}>
              <li className={cn("flex items-end flex-row", "my-4 mx-2")}>
                <article className="prose break-words text-base dark:text-white">
                  <span className="capitalize">{message.role}</span>
                  <span>
                    {" : "} {message.content}
                  </span>
                </article>
              </li>
              <hr />
            </Fragment>
          ) : null,
        )}
      </ul>

      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center gap-x-3 w-full"
      >
        <input
          className="w-full border border-gray-300 rounded-xl shadow-sm py-3 px-4 outline-none text-sm"
          value={input}
          placeholder="Ask me anything..."
          onChange={handleInputChange}
        />
        <button
          disabled={input.length > 0 ? false : true}
          type="submit"
          className={cn(
            "rounded-xl p-3 border border-gray-300 transition-colors duration-150 ease-in-out",
            input.length > 0 ? "bg-blue-500" : "bg-white",
          )}
        >
          <AiOutlineSend
            className={cn(
              "w-6 h-6",
              input.length > 0 ? "text-white" : "text-gray-800",
            )}
          />
        </button>
      </form>
    </div>
  );
}
