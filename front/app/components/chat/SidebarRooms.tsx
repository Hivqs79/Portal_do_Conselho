"use client";
import { useThemeContext } from "@/hooks/useTheme";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Search from "../table/Search";

interface SidebarRoomsProps {
  userRoleId: number;
  roomsData: Room[];
}

export default function SidebarRooms({
  roomsData,
  userRoleId,
}: SidebarRoomsProps) {
  const [username, setUsername] = useState("");
  const { terciaryColor, colorByModeSecondary } = useThemeContext();

  useEffect(() => {}, [roomsData]);

  async function fetchUserInRoom(userID: number) {
    try {
      if (userRoleId === userID) return;

      const response = await fetch("http://localhost:8081/user/" + userID, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      const data = await response.json();
      console.log("User data: ", data);
      setUsername(data.name);
    } catch (error) {
      console.log("Error fetching rooms:", error);
    }
  }

  //TODO: FAZER A LÓGICA PARA MOSTRAR OS NOMES DAS PESSOAS ATRELADAS A SALA DELE

  return (
    <Box
      style={{
        backgroundColor: terciaryColor,
        borderColor: colorByModeSecondary,
      }}
      className="rounded-normal max-w-96 border-2 h-full p-2"
    >
      <Search type="chat" />
      <Box className="mt-6"></Box>
      {roomsData?.length > 0 ? (
        roomsData.map((room) =>
          room.usersid?.map((userId) => (
            <Typography
              variant="md_text_bold"
            >
              {username}
            </Typography>
          ))
        )
      ) : (
        <Typography variant="md_text_bold">
          Você ainda não tem nenhuma conversa
        </Typography>
      )}
    </Box>
  );
}
