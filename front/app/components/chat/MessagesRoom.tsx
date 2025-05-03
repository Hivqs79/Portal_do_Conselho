/*
 * Copyright 2025 Pedro Henrique Panstein, Pedro Augusto Wilhelm, Mateus Henrique Bosquetti, Kaua Eggert, Vinícius Eduardo dos Santos.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
  updateLastMessage: (roomId: number, message: string) => void;
}

export default function MessagesRoom({
  roomId,
  userId,
  updateLastMessage,
}: MessagesRoomProps) {
  const { colorByModeSecondary } = useThemeContext();
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Messages[]>([]);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);

  useEffect(() => {
    try {
      console.log("room fetch id: ", roomId);
      const fetchMessages = async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_CHAT_API}/message/messages-room/${roomId}`
        );
        const data = await response.json();
        console.log(data);
        setMessages(data as Messages[]);
      };
      fetchMessages();
    } catch (error) {
      console.log(error);
    }
  }, [roomId]);

  useEffect(() => {
    if (roomId && userId) {
      const newEventSource = new EventSource(
        `${process.env.NEXT_PUBLIC_URL_KAFKA_WORKSERVICE_API}/events/chat/${roomId}/${userId}`
      );

      newEventSource.onmessage = (event) => {
        try {
          const newMessage = JSON.parse(event.data);
          setMessages((prev) => [...prev, newMessage]);
          updateLastMessage(roomId, newMessage.content);

          setTimeout(() => {
            if (messagesContainerRef.current) {
              messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight;
            }
          }, 100);
        } catch (error) {
          console.error("Error parsing SSE message:", error);
        }
      };

      newEventSource.onerror = (error) => {
        console.error("EventSource failed:", error);
        newEventSource.close();
      };

      setEventSource(newEventSource);

      return () => {
        newEventSource.close();
      };
    }
  }, [roomId, userId, updateLastMessage]);

  useEffect(() => {
    // Scroll to bottom
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (message: string) => {
    try {
      console.log("room fetch id: ", roomId);
      console.log("message fetch: ", message);
      console.log("userId fetch: ", userId);
      await fetch(`${process.env.NEXT_PUBLIC_URL_CHAT_API}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: message,
          senderId: userId,
          roomId: roomId,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

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
          <Message
            key={message.id}
            content={message.content}
            time={message.currentTimeDate}
            type={message.senderId === userId ? "sender" : "receiver"}
          />
        ))}
      </Box>

      <Box>
        <InputMessage sendMessage={sendMessage} />
      </Box>
    </Box>
  );
}
