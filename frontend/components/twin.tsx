'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Send, User } from 'lucide-react';
import { suggestedquestions } from '@/lib/profile';

/** Circular photo avatar for the Digital Twin, with a subtle gradient ring. */
function TwinAvatar({ size }: { size: number }) {
    return (
        <div
            className="rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 p-[1.5px] shadow-[0_0_16px_-4px_rgba(139,92,246,0.7)]"
            style={{ width: size, height: size }}
        >
            <div className="relative h-full w-full overflow-hidden rounded-full bg-ink">
                <Image src="/profile.png" alt="Mahes" fill sizes={`${size}px`} className="object-cover" />
            </div>
        </div>
    );
}

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

// Module-scope factory keeps the impure id/timestamp generation out of the
// component render scope (React 19 react-hooks/purity rule).
let messageCounterSeed = 0;
function createMessage(role: Message['role'], content: string): Message {
    messageCounterSeed += 1;
    return {
        id: `${role}-${messageCounterSeed}`,
        role,
        content,
        timestamp: new Date(),
    };
}

export default function Twin() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string>('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async (text?: string) => {
        const content = (text ?? input).trim();
        if (!content || isLoading) return;

        const userMessage = createMessage('user', content);

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: content,
                    session_id: sessionId || undefined,
                }),
            });

            if (!response.ok) throw new Error('Failed to send message');

            const data = await response.json();

            if (!sessionId) {
                setSessionId(data.session_id);
            }

            const assistantMessage = createMessage('assistant', data.response);

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Error:', error);
            // Add error message
            const errorMessage = createMessage(
                'assistant',
                'Sorry, I encountered an error. Please try again.'
            );
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="glass flex h-full flex-col overflow-hidden rounded-3xl shadow-[0_0_60px_-20px_rgba(139,92,246,0.4)]">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-hairline bg-gradient-to-r from-violet-600/25 to-cyan-500/15 p-5">
                <TwinAvatar size={40} />
                <div>
                    <h2 className="text-base font-semibold text-white">Mahes&apos; Digital Twin</h2>
                    <p className="flex items-center gap-1.5 text-xs text-zinc-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_2px_rgba(52,211,153,0.6)]" />
                        Online · replies in a few seconds
                    </p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto p-5">
                {messages.length === 0 && (
                    <div className="flex h-full flex-col items-center justify-center text-center">
                        <div className="mb-4">
                            <TwinAvatar size={64} />
                        </div>
                        <p className="font-medium text-zinc-200">Hi, I&apos;m Mahes&apos; Digital Twin.</p>
                        <p className="mt-2 max-w-sm text-sm text-zinc-500">
                            Ask about my AI work, backend experience, or how I approach engineering.
                        </p>
                        <div className="mt-6 flex flex-wrap justify-center gap-2">
                            {suggestedquestions.map((q) => (
                                <button
                                    key={q}
                                    onClick={() => sendMessage(q)}
                                    className="rounded-full border border-hairline bg-glass px-3.5 py-1.5 text-xs text-zinc-300 transition-colors hover:border-violet-400/50 hover:text-white"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex gap-3 ${
                            message.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                    >
                        {message.role === 'assistant' && (
                            <div className="flex-shrink-0">
                                <TwinAvatar size={32} />
                            </div>
                        )}

                        <div
                            className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${
                                message.role === 'user'
                                    ? 'bg-gradient-to-br from-violet-500 to-indigo-500 text-white'
                                    : 'glass text-zinc-100'
                            }`}
                        >
                            <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                            <p
                                className={`mt-1.5 text-[11px] ${
                                    message.role === 'user' ? 'text-violet-100/80' : 'text-zinc-500'
                                }`}
                            >
                                {message.timestamp.toLocaleTimeString()}
                            </p>
                        </div>

                        {message.role === 'user' && (
                            <div className="flex-shrink-0">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline bg-glass text-zinc-300">
                                    <User className="h-4 w-4" />
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {isLoading && (
                    <div className="flex justify-start gap-3">
                        <div className="flex-shrink-0">
                            <TwinAvatar size={32} />
                        </div>
                        <div className="glass rounded-2xl px-4 py-3">
                            <div className="flex gap-1.5">
                                <div className="h-2 w-2 rounded-full bg-violet-400 animate-bounce" />
                                <div className="h-2 w-2 rounded-full bg-violet-400 animate-bounce delay-100" />
                                <div className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce delay-200" />
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-hairline p-4">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Ask about my experience..."
                        className="flex-1 rounded-xl border border-hairline bg-glass px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 transition-shadow focus:border-violet-400/50 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                        disabled={isLoading}
                    />
                    <button
                        onClick={() => sendMessage()}
                        disabled={!input.trim() || isLoading}
                        className="flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-500 to-cyan-400 px-4 text-ink transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <Send className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
