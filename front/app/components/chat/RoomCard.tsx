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
          `${process.env.NEXT_PUBLIC_URL_CHAT_API}/message/last-message/${roomId}`
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
