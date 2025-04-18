import { Box, TextField } from "@mui/material";
import Icon from "../Icon";
import { useThemeContext } from "@/hooks/useTheme";
import { LuSend } from "react-icons/lu";
import { RiEmojiStickerLine } from "react-icons/ri";
import { useState, useRef, useEffect } from "react";
import EmojiPicker, { Theme, EmojiClickData } from "emoji-picker-react";

interface InputMessageProps {
  sendMessage: (message: string) => void;
}

export default function InputMessage({ sendMessage }: InputMessageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const emojiButtonRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const { colorByModeSecondary, getThemeMode } = useThemeContext();

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prev) => prev + emojiData.emoji);
    setIsOpen(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiButtonRef.current &&
        !emojiButtonRef.current.contains(event.target as Node) &&
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Box sx={{ position: "relative" }}>
      <TextField
        autoComplete="off"
        inputRef={inputRef}
        value={message}
        onKeyDown={(e) => {
          if (e.key === "Enter" && message.trim()) {
            sendMessage(message);
            setMessage("");
          }
        }}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        placeholder="Digite uma mensagem..."
        InputProps={{
          style: {
            fontFamily: "'Segoe UI Emoji', 'Noto Color Emoji', sans-serif",
          },
          endAdornment: (
            <Box className="flex justify-center items-center gap-4">
              <span
                style={{
                  cursor: "pointer",
                  opacity: isOpen ? 0.6 : 1,
                  transition: "opacity 0.2s",
                }}
                ref={emojiButtonRef}
                onClick={() => setIsOpen(!isOpen)}
              >
                <Icon
                  IconPassed={RiEmojiStickerLine}
                  color={colorByModeSecondary}
                />
              </span>
              <span
                onClick={() => {
                  if (message.trim()) {
                    sendMessage(message);
                    setMessage("");
                  }
                }}
              >
                <Icon IconPassed={LuSend} color={colorByModeSecondary} />
              </span>
            </Box>
          ),
        }}
        fullWidth
      />

      {isOpen && (
        <Box
          ref={pickerRef}
          sx={{
            position: "absolute",
            bottom: "100%",
            right: 0,
            mb: 1,
            zIndex: 1,
          }}
        >
          <EmojiPicker
            previewConfig={{ showPreview: false }}
            lazyLoadEmojis
            theme={(getThemeMode() === "dark" ? "dark" : "light") as Theme}
            onEmojiClick={handleEmojiClick}
            width={300}
            height={350}
          />
        </Box>
      )}
    </Box>
  );
}
