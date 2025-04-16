import { useThemeContext } from "@/hooks/useTheme";
import { Box } from "@mui/material";
import Message from "./Message";
import InputMessage from "./InputMessage";

export default function MessagesRoom() {
  const { primaryColor, colorByModeSecondary } = useThemeContext();
  return (
    <Box
      style={{ borderColor: colorByModeSecondary }}
      className="border-2 border-t-0 rounded-b-normal h-full p-2"
    >
      <Box className="h-full max-h-[calc(100vh-430px)] overflow-y-auto flex flex-col gap-4 p-2 mb-2">
        <Message content="teste aaaa" time="10:00" type="sender" />
        <Message content="teste aaaa" time="10:00" type="sender" />
        <Message content="teste aaaa" time="10:00" type="receiver" />
        <Message content="teste aaaa" time="10:00" type="receiver" />
        <Message content="teste aaaa" time="10:00" type="sender" />
        <Message content="teste aaaa" time="10:00" type="sender" />
        <Message content="teste aaaasdasdsdaddsadasdsadaaaaaaaaaaaasdasdsdaddsadasdsadaaaaaa 😍 aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" time="10:00" type="receiver" />
        <Message content="teste aaaa" time="10:00" type="receiver" />
        <Message content="teste aaaa" time="10:00" type="receiver" />
        <Message content="teste aaaa" time="10:00" type="sender" />
        <Message content="teste aaaa" time="10:00" type="receiver" />
        <Message content="teste aaaa" time="10:00" type="sender" />
        <Message content="teste aaaa" time="10:00" type="receiver" />
        <Message content="teste aaaa" time="10:00" type="sender" />
        <Message content="teste aaaa" time="10:00" type="receiver" />
        <Message content="teste aaaa" time="10:00" type="sender" />
        <Message content="teste aaaa" time="10:00" type="sender" />
      </Box>
      <Box className="mt-5">
        <InputMessage />
      </Box>
    </Box>
  );
}
