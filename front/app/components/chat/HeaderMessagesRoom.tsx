import { useThemeContext } from "@/hooks/useTheme";
import { Box, Typography } from "@mui/material";
import Photo from "../profile/Photo";

interface HeaderMessagesRoomProps {
  selectedUser: { userId: number; name: string };
}

export default function HeaderMessagesRoom({
  selectedUser,
}: HeaderMessagesRoomProps) {
  const { primaryColor, whiteColor, colorByModeSecondary } = useThemeContext();

  return (
    <Box
      style={{ backgroundColor: primaryColor, color: whiteColor, boxShadow: `inset 0px 0px 0px 2px ${colorByModeSecondary}`}}
      className="flex justify-start items-center gap-4 w-full rounded-t-normal p-4"
    >
      <Photo idUser={selectedUser.userId} rounded classname="w-[50px] h-[50px]" />
      <Typography color={whiteColor} variant="lg_text_bold">
        {selectedUser.name ? selectedUser.name : ""}
      </Typography>
    </Box>
  );
}
