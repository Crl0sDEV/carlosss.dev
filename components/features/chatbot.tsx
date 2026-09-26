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
        className="fixed bottom-6 right-6 w-13 h-13 liquid-glass-interactive bg-neutral-900/90 dark:bg-white/10 hover:bg-neutral-900 dark:hover:bg-white/15 text-white rounded-full flex items-center justify-center shadow-xl border border-white/30 dark:border-white/15 transition-transform hover:scale-105 z-50 focus:outline-none focus:ring-2 focus:ring-neutral-400"
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-22 right-6 w-[360px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-7rem)] flex flex-col shadow-2xl liquid-glass rounded-2xl border border-white/60 dark:border-white/10 z-50 animate-in slide-in-from-bottom-5 overflow-hidden">
          <CardHeader className="p-4 border-b border-black/5 dark:border-white/5 liquid-glass-subtle shrink-0">
            <CardTitle className="text-sm font-sans font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Carlos Miguel Sandrino
              </span>
              <span className="font-mono text-[10px] tracking-wider uppercase text-neutral-400 dark:text-neutral-500">
                AI Assistant
              </span>
            </CardTitle>
          </CardHeader>
          
          <CardContent 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scroll-smooth bg-transparent"
          >
            {messages.map((msg, i) => (
              <Message key={i} align={msg.role === "user" ? "end" : "start"}>
                <MessageContent>
                  <Bubble variant={msg.role === "user" ? "default" : "muted"}>
                    <BubbleContent className={msg.role === "user" ? "text-sm" : "text-sm bg-black/[0.03] dark:bg-white/[0.05] border border-black/5 dark:border-white/5"}>
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
                    <BubbleContent className="bg-black/[0.03] dark:bg-white/[0.05] border border-black/5 dark:border-white/5">
                      <span className="flex gap-1 items-center h-4">
                        <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </span>
                    </BubbleContent>
                  </Bubble>
                </MessageContent>
              </Message>
            )}
          </CardContent>

          <CardFooter className="p-3 border-t border-black/5 dark:border-white/5 liquid-glass-subtle shrink-0">
            <form onSubmit={sendMessage} className="flex w-full gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about architecture, stack, projects..."
                className="flex-1 text-sm bg-white/60 dark:bg-white/5 border-black/10 dark:border-white/10 focus-visible:ring-neutral-400 rounded-lg"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 rounded-lg shrink-0 transition-colors">
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
