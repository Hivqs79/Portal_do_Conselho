import { useThemeContext } from "@/hooks/useTheme";
import { Box, Typography } from "@mui/material";

interface MessageProps {
  type: "sender" | "receiver";
  content: string;
  time: string;
}

export default function Message({ type, content, time }: MessageProps) {
  const { secondaryColor, textBlackolor, terciaryColor } = useThemeContext();

  const isSender = type === "sender";
  const bubbleColor = isSender ? secondaryColor : terciaryColor;

  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: bubbleColor,
        display: "inline-block",
        padding: "8px 12px",
        borderRadius: "12px",
        maxWidth: "60%",
        margin: "4px 8px",
        alignSelf: isSender ? "flex-end" : "flex-start",
        textAlign: isSender ? "right" : "left",
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
        sx={{ wordBreak: "break-all" }}
        color={textBlackolor}
        variant="md_text_regular"
      >
        {content}
      </Typography>
    </Box>
  );
}
