import { Box, Typography } from "@mui/material";
import Photo from "../profile/Photo";
import { useThemeContext } from "@/hooks/useTheme";
import OpacityHex from "@/utils/OpacityHex";

interface RoomCardProps {
  name: string;
  userId: number;
  handleSetUserDetails: (userId: number, name: string) => void;
}

export default function RoomCard({ name, userId, handleSetUserDetails }: RoomCardProps) {
  const { colorByModeSecondary, textBlackolor } = useThemeContext();

  return (
    <Box
      style={{ borderColor: colorByModeSecondary }}
      sx={{
        "&:hover": {
          backgroundColor: OpacityHex(colorByModeSecondary, 0.3),
          color: textBlackolor,
        },
      }}
      className="flex cursor-pointer transition-all duration-300 justify-start items-center gap-6 border-b-2 p-3"
      onClick={() => handleSetUserDetails(userId, name)}
    >
      <Photo idUser={userId} rounded classname="w-[60px] h-[60px]" />
      <Typography variant="md_text_bold">{name}</Typography>
    </Box>
  );
}
