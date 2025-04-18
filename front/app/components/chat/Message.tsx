import { useThemeContext } from "@/hooks/useTheme";
import { Box, Typography } from "@mui/material";

interface MessageProps {
  type: "sender" | "receiver";
  content: string;
  time: string; // Formato: "2025-04-16T16:54:26"
}

export default function Message({ type, content, time }: MessageProps) {
  const { secondaryColor, textBlackolor, terciaryColor } = useThemeContext();

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
        color={textBlackolor}
        variant="md_text_regular"
      >
        {content}
      </Typography>
      
      <Typography
        variant="caption"
        sx={{
          color: textBlackolor,
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