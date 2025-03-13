"use client";
import Title from "@/components/Title";
import Photo from "@/components/profile/Photo";
import OpacityHex from "@/hooks/OpacityHex";
import { useThemeContext } from "@/hooks/useTheme";
import { Box, TextField, Typography, styled } from "@mui/material";

// MuiOutlinedInput: {
//     styleOverrides: {
//       root: {
//         "&:hover:not(.Mui-focused) .MuiOutlinedInput-notchedOutline": {
//           borderColor: colorByMode,
//           borderWidth: "2px",
//           color: this.getContrastThemeColor(),
//         },
//         "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//           borderColor: colorByMode,
//           borderWidth: "2px",
//           boxShadow: "2px 2px 4px 1px" + colorByMode + "77",
//         },
//         color: this.getContrastThemeColor(),
//       },
//       notchedOutline: {
//         borderColor: colorByMode,
//         borderWidth: "2px",
//       },
//     },
//   },

export default function Profile() {
  const { primaryColor, whiteColor, colorByModeSecondary, constrastColor } =
    useThemeContext();

  return (
    <Box>
      <Title textHighlight="Perfil" />
      <Box
        style={{ backgroundColor: primaryColor }}
        className="flex h-ful flex-col items-center justify-between rounded-big gap-5 p-5"
      >
        <span className="flex flex-col justify-center items-center gap-5">
          <Photo rounded={true} classname="h-40 w-40" />
          <Typography
            className="text-center"
            variant="lg_text_regular"
            color={whiteColor}
          >
            Pedro Henrique Panstein
          </Typography>
          <Typography
            className="text-center"
            variant="lg_text_regular"
            color={whiteColor}
          >
            Aluno
          </Typography>
        </span>
        <Typography
          className="text-center"
          variant="lg_text_regular"
          color={whiteColor}
        >
          Adicionado em: 12/03/2025
        </Typography>
      </Box>
      <Box className="mt-10">
        <span className="w-full flex flex-col justify-center items-start gap-4">
          <Typography color={colorByModeSecondary} variant="lg_text_bold">
            Nome Completo
          </Typography>

          <TextField
            id="outlined-search"
            aria-readonly
            disabled
            sx={{ width: "100%" }}
            value={"Pedro Henrique Panstein"}
            type="text"
            color="primary"
          />
          <input
            style={{
              color: OpacityHex(constrastColor, 0.6),
              borderColor: OpacityHex(constrastColor, 0.6),
            }}
            disabled
            value={"Pedro Henrique Panstein"}
            className="outline-none border-2 rounded-normal p-2"
          />
        </span>
      </Box>
    </Box>
  );
}
