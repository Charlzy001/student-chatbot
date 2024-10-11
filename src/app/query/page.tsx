"use client"
import { useChat } from "ai/react";
import { Atom, Send } from "lucide-react";
import { useEffect, useState } from "react";

// Helper function to format timestamps
const formatTimestamp = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };


export default function Home() {
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
    const [botIsTyping, setBotIsTyping] = useState(false); // State to track if the bot is typing

    useEffect(() => {
     // Scroll to the bottom when a new message is added
      const messageContainer = document.getElementById('message-container');
      messageContainer?.scrollTo(0, messageContainer.scrollHeight);
    }, [messages]);

    useEffect(() => {
        // Show "Bot is typing..." indicator when the bot is processing the message
        if (isLoading) {
          setBotIsTyping(true);
        } else {
          setBotIsTyping(false);
        }
      }, [isLoading]);
    
    return (
        <div className="container mx-auto px-4"  id="message-container">
            <div className="pt-4 pb-32">
                {messages.map((message) => (
                    <div key={message.id} className={`mb-4 py-2 px-4 rounded-lg ${message.role === 'assistant' && 'bg-blue text-white-800 bg-blue-500 text-white' }`}>
                        {/* <div className="max-w-3xl mx-auto py-6 flex prose break-words">
                            {message.role === 'assistant' && <span><Atom className="" /></span>}
                            <div className="ml-3 rounded-lg"> */}
                                {/* {message.content} */}
                                <div className="flex items-start">
              {message.role === "assistant" && <Atom className="text-blue-500 mr-2" />}
              <div className="flex flex-col">
                <div className="break-words">{message.content}</div>
                                  {/* Display timestamp for each message */}
                <div className="text-xs text-gray-500 mt-1">
                  {message.createdAt ? formatTimestamp(new Date(message.createdAt)) : 'No date available'}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                 {/* Bot typing indicator */}
        {botIsTyping && (
          <div className="max-w-3xl mx-auto py-6 flex prose break-words">
            <span className="text-gray-500 italic">Bot is typing...</span>
          </div>
        )}

                <form onSubmit={handleSubmit} className="fixed inset-x-0 bottom-10 flex mx-auto items-center justify-center">
                    <input 
                        placeholder="Send a message" 
                        value={input} 
                        onChange={handleInputChange} 
                        className="flex-grow max-w-3xl shadow-xl py-2 px-4 h-10 rounded-md border border-input bg-white text-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <button 
                        type="submit" 
                        disabled={!input || isLoading} 
                        className={`ml-2 py-2 px-4 rounded-md text-sm bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 ${
                            isLoading && "opacity-50 cursor-not-allowed"
                          }`}
                    >
                        <Send />
                    </button>
                </form>
            </div>
        </div>
    );
}
