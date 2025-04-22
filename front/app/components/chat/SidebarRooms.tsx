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
import AddUserModal from "../modals/AddUserModal";
import LoadingModal from "../modals/LoadingModal";

interface SidebarRoomsProps {
  userRoleId: number;
  roomsData: Room[];
  userRole: string;
  onUserSelect: (user: {
    userId: number;
    name: string;
    roomId: number;
  }) => void;
  lastMessages: Record<number, string>;
}

export default function SidebarRooms({
  roomsData,
  userRoleId,
  userRole,
  onUserSelect,
  lastMessages,
}: SidebarRoomsProps) {
  const { token, role } = useRoleContext();
  const [users, setUsers] = useState<Record<number, string>>({});
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openAddUserModal, setOpenAddUserModal] = useState(false)
  const { terciaryColor, colorByModeSecondary, blackColor, backgroundColor } =
    useThemeContext();

  // Configura SSE para atualizações em tempo real
  useEffect(() => {
    if (userRoleId) {
      const eventSource = new EventSource(
        `http://localhost:3090/events/rooms/${userRoleId}`
      );

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "room_created") {
            // Atualiza os usuários da nova sala
            data.room.usersId?.forEach((userID: number) => {
              if (userID !== userRoleId) {
                fetchUserInRoom(userID);
              }
            });
          }
        } catch (error) {
          console.error("Error parsing room update:", error);
        }
      };

      eventSource.onerror = (error) => {
        console.error("EventSource failed:", error);
        eventSource.close();
      };

      return () => {
        eventSource.close();
      };
    }
  }, [userRoleId]);

  // Configura responsividade
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
      if (window.innerWidth > 1024) setSidebarOpen(true);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Busca informações do usuário
  async function fetchUserInRoom(userID: number) {
    try {
      if (userRoleId === userID) return;

      // Verifica se já temos o usuário no estado
      if (users[userID]) return;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/user/${userID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setUsers((prev) => ({ ...prev, [userID]: data.name }));
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  // Busca usuários quando roomsData muda
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
    onUserSelect({ userId, name, roomId });
  };

  const addPedagogicUser = async () => {
    setOpenAddUserModal(true);
  }

  const addUser = async () => {
    setOpenAddUserModal(true);
  }

  return (
    <>
      {isMobile && (
        <IconButton
          onClick={() => setSidebarOpen(!sidebarOpen)}
          sx={{
            position: "fixed",
            left: 10,
            top: 100,
            zIndex: 10,
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
                <Button fullWidth onClick={role !== "pedagogic" ? addPedagogicUser : addUser} variant="contained">
                  Iniciar uma conversa
                </Button>
              )}
              {roomsData.map((room) =>
                room.usersId?.map(
                  (userId) =>
                    userId !== userRoleId && (
                      <RoomCard
                        key={`${room.id}-${userId}`}
                        name={users[userId] || "Carregando..."}
                        userId={userId}
                        roomId={room.id}
                        handleSetUserDetails={handleSetUserDetails}
                        lastMessage={lastMessages[room.id] || ""}
                      />
                    )
                )
              )}
            </>
          ) : (
            <Box className="flex flex-col justify-center items-center gap-5 mt-2">
              <Button fullWidth onClick={role !== "pedagogic" ? addPedagogicUser : addUser} variant="contained">
                Iniciar uma conversa
              </Button>
              <Typography variant="md_text_bold">
                Você ainda não tem nenhuma conversa
              </Typography>
            </Box>
          )}
        </Box>
        {openAddUserModal && (
          <AddUserModal type={role !== "pedagogic" ? "user" : "pedagogic"} onClose={() => setOpenAddUserModal(false)}/>
        )}
      </Box>
    </>
  );
}
