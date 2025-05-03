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

import { useThemeContext } from "@/hooks/useTheme";
import { Box, Typography } from "@mui/material";

interface MessageProps {
  type: "sender" | "receiver";
  content: string;
  time: string;
}

export default function Message({ type, content, time }: MessageProps) {
  const { secondaryColor, blackColor, terciaryColor } = useThemeContext();

  const isSender = type === "sender";
  const bubbleColor = isSender ? secondaryColor : terciaryColor;

  const formatTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: bubbleColor,
        display: "inline-flex",
        flexDirection: "column",
        padding: "8px 12px",
        borderRadius: "12px",
        maxWidth: "60%",
        margin: "4px 8px",
        alignSelf: isSender ? "flex-end" : "flex-start",
        textAlign: "left",
        "&::after": {
          content: '""',
          position: "absolute",
          top: "2px",
          width: 0,
          height: 0,
          border: "10px solid transparent",
          borderTopColor: "transparent",
          borderBottomColor: "transparent",
          [isSender ? "right" : "left"]: "-14.1px",
          borderLeftColor: isSender ? bubbleColor : "transparent",
          borderRightColor: isSender ? "transparent" : bubbleColor,
        },
      }}
    >
      <Typography
        sx={{ wordBreak: "break-word" }}
        color={blackColor}
        variant="md_text_regular"
      >
        {content}
      </Typography>
      
      <Typography
        variant="caption"
        sx={{
          color: blackColor,
          opacity: 0.7,
          userSelect: "none",
          fontSize: "0.7rem",
          alignSelf: isSender ? "flex-end" : "flex-start",
          marginTop: "4px",
          lineHeight: 1
        }}
      >
        {formatTime(time)}
      </Typography>
    </Box>
  );
}