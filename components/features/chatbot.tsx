"use client";

import { useState, useRef, useEffect } from "react";
import { Message, MessageContent } from "@/components/ui/message";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm Carlos's AI assistant. What would you like to know about his projects or skills?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const sendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry boss, error connecting to the server." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30 transition-transform hover:scale-105 z-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-[#121212]"
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-[350px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-8rem)] flex flex-col shadow-2xl border-[#E4E4E7] dark:border-[#27272A] bg-white dark:bg-[#1A1A1A] z-50 animate-in slide-in-from-bottom-5">
          <CardHeader className="p-4 border-b border-[#E4E4E7] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#121212] rounded-t-xl shrink-0">
            <CardTitle className="text-base font-bold text-[#18181B] dark:text-[#F4F4F5] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Carlos MIGUEL SANDRINO
            </CardTitle>
          </CardHeader>
          
          <CardContent 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scroll-smooth"
          >
            {messages.map((msg, i) => (
              <Message key={i} align={msg.role === "user" ? "end" : "start"}>
                <MessageContent>
                  <Bubble variant={msg.role === "user" ? "default" : "muted"}>
                    <BubbleContent>
                      {msg.content}
                    </BubbleContent>
                  </Bubble>
                </MessageContent>
              </Message>
            ))}
            {isLoading && (
              <Message align="start">
                <MessageContent>
                  <Bubble variant="muted">
                    <BubbleContent>
                      <span className="flex gap-1 items-center h-4">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </span>
                    </BubbleContent>
                  </Bubble>
                </MessageContent>
              </Message>
            )}
          </CardContent>

          <CardFooter className="p-4 border-t border-[#E4E4E7] dark:border-[#27272A] bg-[#FAFAFA] dark:bg-[#121212] rounded-b-xl shrink-0">
            <form onSubmit={sendMessage} className="flex w-full gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Carlos..."
                className="flex-1 bg-white dark:bg-[#1A1A1A] border-[#E4E4E7] dark:border-[#27272A] focus-visible:ring-blue-500"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="bg-blue-600 hover:bg-blue-700 text-white shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
