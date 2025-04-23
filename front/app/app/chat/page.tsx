"use client";
import HeaderMessagesRoom from "@/components/chat/HeaderMessagesRoom";
import MessagesRoom from "@/components/chat/MessagesRoom";
import SidebarRooms from "@/components/chat/SidebarRooms";
import LogoIcon from "@/components/LogoIcon";
import { useRoleContext } from "@/hooks/useRole";
import { useThemeContext } from "@/hooks/useTheme";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Chat() {
  const { userId, role } = useRoleContext();
  const [roomsData, setRoomsData] = useState<Room[]>();
  const [selectedUser, setSelectedUser] = useState<{
    userId: number;
    name: string;
    roomId: number;
  } | null>(null);
  const { primaryColor, colorByModeSecondary } = useThemeContext();
  const [eventSource, setEventSource] = useState<EventSource | null>(null);
  const [lastMessages, setLastMessages] = useState<Record<number, string>>({});

  const fetchRooms = async () => {
    try {
      if (userId && userId > 0) {
        console.log("Fetching rooms for user ID:", userId);
        const response = await fetch(
          `http://localhost:8082/room/findAllRoomsOfAUser/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch rooms");
        }
        const data = await response.json();
        console.log("Rooms data: ", data);
        setRoomsData(data);
      }
    } catch (error) {
      console.log("Error fetching rooms:", error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [userId]);

  useEffect(() => {
    if (userId && userId > 0) {
      // Fecha a conexão existente se houver
      if (eventSource) {
        eventSource.close();
      }

      // Cria nova conexão SSE para atualizações de sala
      const newEventSource = new EventSource(
        `http://localhost:3090/events/rooms/${userId}`
      );

      newEventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("Nova atualização de sala recebida:", data);

          if (data.type === "room_created" || data.type === "room_updated") {
            // Atualiza a lista de salas
            fetchRooms(); // Re-fetch para garantir consistência

            // Ou alternativamente, atualize o estado diretamente:
            // setRoomsData(prevRooms => [...(prevRooms || []), data.room]);
          }
        } catch (error) {
          console.error("Error parsing room update:", error);
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
  }, [userId]);

  const updateLastMessage = (roomId: number, message: string) => {
    setLastMessages(prev => ({
      ...prev,
      [roomId]: message
    }));
  };

  console.log("Selected user: ", selectedUser);

  return (
    <Box className="flex gap-4 h-full">
      <SidebarRooms
        userRole={role ? role : ""}
        userRoleId={userId ? userId : 0}
        roomsData={roomsData ? roomsData : []}
        onUserSelect={setSelectedUser}
        lastMessages={lastMessages}
      />
      <Box className="w-full">
        {selectedUser ? (
          <Box className="h-full max-h-[calc(100vh-64px)] flex flex-col">
            <HeaderMessagesRoom
              selectedUser={
                selectedUser ? selectedUser : { userId: 0, name: "" }
              }
            />
            <MessagesRoom
              key={selectedUser ? selectedUser.roomId : 0}
              userId={userId ? userId : 0}
              roomId={selectedUser ? selectedUser.roomId : 0}
              updateLastMessage={updateLastMessage}
            />
          </Box>
        ) : (
          <Box className="flex flex-col justify-center items-center h-full gap-10">
            <LogoIcon className="max-w-60 max-h-60" color={primaryColor} />
            <Typography
              color={colorByModeSecondary}
              className="text-center"
              variant="h4_title"
            >
              Selecione um usuário para abrir a conversa
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}