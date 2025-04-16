"use client";
import SidebarRooms from "@/components/chat/SidebarRooms";
import { useRoleContext } from "@/hooks/useRole";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export default function Chat() {
  const { userId } = useRoleContext();
  const [roomsData, setRoomsData] = useState<Room[]>();

  useEffect(() => {
    async function fetchRooms() {
      try {
        if (userId) {
          if (userId <= 0) return;
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
    }

    fetchRooms();
  }, [userId]);

  return (
    <Box className="h-full">
      <SidebarRooms userRoleId={userId ? userId : 0} roomsData={roomsData ? roomsData : []} />
    </Box>
  );
}
