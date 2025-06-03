'use client'

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";

export interface Message {
    id: number | string;
    content: string;
    sender: string;
    sentiment?: 'positive' | 'negative' | 'neutral' | 'unknown';
    room: string;
    createdAt: string;
}

export default function Chat() {
    // ✅ States
    const { push } = useRouter();
    const { data: session } = useSession();
    const [messages, setMessages] = useState<Message[]>([]);
    const [text, setText] = useState('');
    const [username, setUsername] = useState<string>('');
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const socketRef = useRef<Socket | null>(null);
    const room = 'support-room';

    // ✅ Fetch initial messages
    const loadMessages = async () => {
        const response = await fetch(`http://localhost:8000/messages/${room}`);
        const data = await response.json();
        setMessages(data);
    };

    // ✅ 1. Establish socket connection and event listeners (once)
    useEffect(() => {
        const socket = io('http://localhost:8000');
        socketRef.current = socket;

        socket.on('newMessage', (message: Message) => {
            console.log('🟢 Received newMessage:', message);
            setMessages((prev) => [...prev, message]);
        });

        socket.on('userNotification', (msg: string) => {
            setMessages((prev) => [
                ...prev,
                {
                    id: `system-${Date.now()}`,
                    content: msg,
                    sender: 'System',
                    room,
                    createdAt: new Date().toISOString(),
                }
            ]);
            toast('🔔 ' + msg);
        });

        loadMessages();

        return () => {
            socket.disconnect();
        };
    }, []);

    // ✅ 2. After session is ready, join room and announce
    useEffect(() => {
        if (session && socketRef.current) {
            const name = session.user.name;
            setUsername(name);
            socketRef.current.emit('join', room);
            socketRef.current.emit('userJoined', name);
        }
    }, [session]);

    // ✅ 3. Auto-scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // ✅ Message send handler
    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim() || !socketRef.current) return;

        socketRef.current.emit('sendMessage', {
            room,
            content: text,
            sender: username,
        });

        audioRef.current?.play();
        setText('');
    };

    if (!session) return (
        <div className="text-white p-4">
            <p>You must be logged in.</p>
            <button onClick={() => signIn('google')} className="mt-2 bg-white text-black px-4 py-2 rounded">
                Sign in
            </button>
        </div>
    );

    return (
        <div className="h-screen bg-gray-900 text-white p-4">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-medium ">Support Chat</h1>
                <div className="flex items-center gap-2 relative group">
                    <h2 className="text-2xl font-bold">
                        {session.user?.name}
                    </h2>
                    <img src="/assets/imgs/user.png" className="w-10 object-contain" alt="" />

                    {/* Dropdown */}
                    <div className="absolute top-full left-0 bg-gray-800 rounded-lg p-2 z-10 h-0 overflow-hidden group-hover:h-32 transition-all duration-300">
                        <button
                            onClick={() => {
                                signOut()
                                toast('You have been signed out.')
                                push('/')
                            }}
                            className="mt-2 bg-white text-black px-4 py-2 rounded transition-all duration-300 cursor-pointer shadow-lg shadow-black/50 hover:bg-white/70">
                            Sign out
                        </button>
                    </div>
                </div>
            </div>
            <div className="h-4/5 overflow-y-auto bg-gray-800 rounded-lg p-4">
                {messages.map((msg) => (
                    <div key={msg.id} className="mb-2 flex items-start justify-between">
                        <div>
                            <span className="font-semibold">{msg.sender}: </span>
                            <span>{msg.content}</span>
                        </div>
                        {msg.sentiment && (
                            <span
                                className={`text-xs ml-2 rounded-full px-2 py-1 ${msg.sentiment === 'positive'
                                    ? 'bg-green-600 text-white'
                                    : msg.sentiment === 'negative'
                                        ? 'bg-red-600 text-white'
                                        : 'bg-gray-600 text-white'
                                    }`}
                            >
                                {msg.sentiment}
                            </span>
                        )}
                    </div>
                ))}
                <div ref={bottomRef}></div>
            </div>
            <form onSubmit={handleSend} className="flex mt-4 gap-2">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="flex-grow p-2 rounded bg-gray-700 text-white"
                    placeholder="Type your message..."
                />
                <button type="submit" className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-400">
                    Send
                </button>
                <audio src="/assets/sounds/message-send-sound.mp3" ref={audioRef}></audio>
            </form>
        </div>
    );
}
