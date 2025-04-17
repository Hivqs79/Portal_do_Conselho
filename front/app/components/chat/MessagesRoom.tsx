"use client";
import { useThemeContext } from "@/hooks/useTheme";
import { Box } from "@mui/material";
import Message from "./Message";
import InputMessage from "./InputMessage";
import { useEffect, useRef, useState } from "react";

type Messages = {
  id: number;
  content: string;
  currentTimeDate: string;
  senderId: number;
  roomConversation: RoomConversation;
};

type RoomConversation = {
  id: number;
  usersId: number[];
};

interface MessagesRoomProps {
  roomId: number;
  userId: number;
}

export default function MessagesRoom({ roomId, userId }: MessagesRoomProps) {
  const { colorByModeSecondary } = useThemeContext();
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Messages[]>([]);

  useEffect(() => {
    try {
      console.log("room fetch id: ", roomId);
      const fetchMessages = async () => {
        const resposnse = await fetch(
          `http://localhost:8082/message/messages-room/${roomId}`
        );
        const data = await resposnse.json();
        console.log(data);
        setMessages(data as Messages[]);
      };
      fetchMessages();
    } catch (error) {
      console.log(error);
    }
  }, [roomId]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, []);

  return (
    <Box
      style={{ borderColor: colorByModeSecondary }}
      className="flex flex-col justify-between border-2 border-t-0 rounded-b-normal h-full p-2"
    >
      <Box
        ref={messagesContainerRef}
        className="h-full scroll-smooth max-h-[calc(100vh-430px)] overflow-y-auto flex flex-col gap-4 p-2 mb-2"
      >
        {messages.map((message) => (
          <Message key={message.id} content={message.content} time={message.currentTimeDate} type={message.senderId === userId ? "sender" : "receiver"} />
        ))}
      </Box>

      <Box>
        <InputMessage />
      </Box>
    </Box>
  );
}
