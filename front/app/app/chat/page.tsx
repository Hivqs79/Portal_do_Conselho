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
  const { userId } = useRoleContext();
  const [roomsData, setRoomsData] = useState<Room[]>();
  const [selectedUser, setSelectedUser] = useState<{
    userId: number;
    name: string;
    roomId: number;
  } | null>(null);
  const { primaryColor, colorByModeSecondary } = useThemeContext();

  useEffect(() => {
    async function fetchRooms() {
      try {
        if (userId) {
          if (userId <= 0) return;
          console.log("Fetching rooms for user ID:", userId);
          const response = await fetch(
            `http://localhost:9999/room/findAllRoomsOfAUser/${userId}`,
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
    }

    fetchRooms();
  }, [userId]);

  console.log("Selected user: ", selectedUser);

  return (
    <Box className="flex gap-4 h-full">
      <SidebarRooms
        userRoleId={userId ? userId : 0}
        roomsData={roomsData ? roomsData : []}
        onUserSelect={setSelectedUser}
      />
      <Box className="w-full">
        {selectedUser ? (
          <Box className="h-full max-h-[calc(100vh-64px)] flex flex-col">
            <HeaderMessagesRoom selectedUser={selectedUser ? selectedUser : { userId: 0, name: "" }}/>
            <MessagesRoom userId={userId ? userId : 0} roomId={selectedUser ? selectedUser.roomId : 0}/>
          </Box>
        ) : (
          <Box className="flex flex-col justify-center items-center h-full gap-10">
            <LogoIcon className="max-w-60 max-h-60" color={primaryColor} />
            <Typography color={colorByModeSecondary} className="text-center" variant="h4_title">
              Selecione um usuário para iniciar uma conversa
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
