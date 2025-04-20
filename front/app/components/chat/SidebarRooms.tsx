"use client";
import { useThemeContext } from "@/hooks/useTheme";
import { Box, Typography, IconButton, Button } from "@mui/material";
import { useEffect, useState } from "react";
import Search from "../table/Search";
import RoomCard from "./RoomCard";
import Icon from "../Icon";
import { IoClose, IoMenu } from "react-icons/io5";
import OpacityHex from "@/utils/OpacityHex";
import { useRoleContext } from "@/hooks/useRole";

interface SidebarRoomsProps {
  userRoleId: number;
  roomsData: Room[];
  userRole: string;
  onUserSelect: (user: {
    userId: number;
    name: string;
    roomId: number;
  }) => void;
}

export default function SidebarRooms({
  roomsData,
  userRoleId,
  userRole,
  onUserSelect,
}: SidebarRoomsProps) {
  const { token } = useRoleContext();
  const [users, setUsers] = useState<Record<number, string>>({});
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    terciaryColor,
    colorByModeSecondary,
    blackColor,
    backgroundColor,
  } = useThemeContext();

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
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_GENERAL_API}/user/${userID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      });
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

  const handleSetUserDetails = (
    userId: number,
    name: string,
    roomId: number
  ) => {
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
            <Icon IconPassed={IoClose} color={blackColor} />
          ) : (
            <Icon IconPassed={IoMenu} color={blackColor} />
          )}
        </IconButton>
      )}

      <Box
        style={{
          backgroundColor: backgroundColor,
          borderColor: colorByModeSecondary,
        }}
        className={`rounded-normal border-2 p-2 ${
          isMobile
            ? `fixed top-40 left-0 z-[1100] h-auto w-64 transform ${
                sidebarOpen ? "translate-x-0 left-2" : "-translate-x-full"
              } transition-transform duration-300 ease-in-out`
            : "w-full max-w-96 "
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
            <>
              {userRole === "pedagogic" && (
                <Button fullWidth variant="contained">
                  Iniciar uma conversa
                </Button>
              )}
              {roomsData.map((room) =>
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
              )}
            </>
          ) : (
            <Box className="flex flex-col justify-center items-center gap-5 mt-2">
              <Button fullWidth variant="contained">
                Iniciar uma conversa {/* //TODO: FAZER UM MODAL PARA CRIAR SALAS */}
              </Button>
              <Typography variant="md_text_bold">
                Você ainda não tem nenhuma conversa
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
