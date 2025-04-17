"use client";
import { useThemeContext } from "@/hooks/useTheme";
import { Box, Typography, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import Search from "../table/Search";
import RoomCard from "./RoomCard";
import Icon from "../Icon";
import { IoClose, IoMenu } from "react-icons/io5";
import OpacityHex from "@/utils/OpacityHex";

interface SidebarRoomsProps {
  userRoleId: number;
  roomsData: Room[];
  onUserSelect: (user: { userId: number; name: string; roomId: number }) => void;
}

export default function SidebarRooms({
  roomsData,
  userRoleId,
  onUserSelect,
}: SidebarRoomsProps) {
  const [users, setUsers] = useState<Record<number, string>>({});
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { terciaryColor, colorByModeSecondary, textBlackolor, backgroundColor } =
    useThemeContext();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
      if (window.innerWidth > 1024) setSidebarOpen(true);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  async function fetchUserInRoom(userID: number) {
    try {
      if (userRoleId === userID) return;
      const response = await fetch(`http://localhost:8081/user/${userID}`);
      const data = await response.json();
      setUsers((prev) => ({ ...prev, [userID]: data.name }));
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  useEffect(() => {
    if (roomsData) {
      roomsData.forEach((room) => {
        room.usersId?.forEach((userID) => {
          fetchUserInRoom(userID);
        });
      });
    }
  }, [roomsData]);

  const handleSetUserDetails = (userId: number, name: string, roomId: number) => {
    console.log("User ID:", userId, "Name:", name, "Room ID:", roomId);
    onUserSelect({ userId, name, roomId });
  };

  return (
    <>
      {isMobile && (
        <IconButton
          onClick={() => setSidebarOpen(!sidebarOpen)}
          sx={{
            position: "fixed",
            left: 10,
            top: 100,
            zIndex: 1200,
            ":hover": {
              backgroundColor: OpacityHex(terciaryColor, 0.8),
            },
            backgroundColor: terciaryColor,
            border: `2px solid ${colorByModeSecondary}`,
          }}
        >
          {sidebarOpen ? (
            <Icon IconPassed={IoClose} color={textBlackolor} />
          ) : (
            <Icon IconPassed={IoMenu} color={textBlackolor} />
          )}
        </IconButton>
      )}

      <Box
        style={{
          backgroundColor: backgroundColor,
          borderColor: colorByModeSecondary,
        }}
        className={`rounded-normal border-2 h-full p-2 ${
          isMobile
            ? `fixed top-40 left-0 z-[1100] h-auto w-64 transform ${
                sidebarOpen ? "translate-x-0 left-2" : "-translate-x-full"
              } transition-transform duration-300 ease-in-out`
            : "w-full max-w-96"
        }`}
        sx={{
          overflowY: "auto",
          ...(isMobile && {
            boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
          }),
        }}
      >
        <Search type="chat" />
        <Box className="mt-2 flex flex-col">
          {roomsData?.length > 0 ? (
            roomsData.map((room) =>
              room.usersId?.map(
                (userId) =>
                  userId !== userRoleId && (
                    <RoomCard
                      key={userId}
                      name={users[userId]}
                      userId={userId}
                      roomId={room.id}
                      handleSetUserDetails={handleSetUserDetails}
                    />
                  )
              )
            )
          ) : (
            <Typography variant="md_text_bold">
              Você ainda não tem nenhuma conversa
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
}
