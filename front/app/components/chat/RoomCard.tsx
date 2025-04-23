import { Box, Typography } from "@mui/material";
import Photo from "../profile/Photo";
import { useThemeContext } from "@/hooks/useTheme";
import OpacityHex from "@/utils/OpacityHex";
import { useEffect, useState } from "react";

interface RoomCardProps {
  name: string;
  userId: number;
  roomId: number;
  handleSetUserDetails: (userId: number, name: string, roomId: number) => void;
  lastMessage: string;
}

export default function RoomCard({
  name,
  userId,
  roomId,
  handleSetUserDetails,
  lastMessage,
}: RoomCardProps) {
  const { colorByModeSecondary, blackColor } = useThemeContext();
  const [newLastMessage, setNewLastMessage] = useState("");

  useEffect(() => {
    try {
      const fetchLastMessage = async () => {
        await fetch(
          `http://localhost:8082/message/last-message/${roomId}`
        )
          .then((res) => res.json())
          .then((data) => {
            console.log("aaaa: ", data);
            setNewLastMessage(data.content);
          });
      };
      fetchLastMessage();
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    setNewLastMessage(lastMessage);
  }, [lastMessage]);

  return (
    <Box
      style={{ borderColor: colorByModeSecondary }}
      sx={{
        "&:hover": {
          backgroundColor: OpacityHex(colorByModeSecondary, 0.3),
          color: blackColor,
        },
      }}
      className="flex cursor-pointer transition-all duration-300 items-center gap-4 border-b-2 p-3"
      onClick={() => handleSetUserDetails(userId, name, roomId)}
    >
      <Box className="flex-shrink-0">
        <Photo idUser={userId} rounded classname="w-[60px] h-[60px]" />
      </Box>
      <Box className="min-w-0 flex-1">
        <Typography
          className="truncate"
          variant="md_text_bold"
          sx={{
            display: "block",
            width: "100%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </Typography>
        <Typography
          className="truncate"
          variant="sm_text_regular"
          sx={{
            display: "block",
            width: "100%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {newLastMessage}
        </Typography>
      </Box>
    </Box>
  );
}
