"use client";
import { useThemeContext } from "@/hooks/useTheme";
import OpacityHex from "@/utils/OpacityHex";
import { Box } from "@mui/material";
import { useEffect } from "react";
import Search from "../table/Search";

interface SidebarRoomsProps {
  roomsData: Room[];
}

export default function SidebarRooms({ roomsData }: SidebarRoomsProps) {
  const { terciaryColor, colorByModeSecondary } = useThemeContext();

  useEffect(() => {}, [roomsData]);

  async function fetchUserInRoom() {
    try {
        // const response = await fetch()
        //TODO: FAZER A CONTROLLER DE USUARIO GERAL NA GENERAL API PARA PODER USAR UM GETUSER BY ID
    } catch (error) {
      console.log("Error fetching rooms:", error);
    }
  }

  return (
    <Box
      style={{
        backgroundColor: terciaryColor,
        borderColor: colorByModeSecondary,
      }}
      className="rounded-normal max-w-96 border-2 h-full p-2"
    >
     <Search type="chat" />
     <Box className="mt-6">
        
     </Box>
    </Box>
  );
}
