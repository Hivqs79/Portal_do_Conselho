"use client";
import Title from "@/components/Title";
import OpacityHex from "@/utils/OpacityHex";
import { useThemeContext } from "@/hooks/useTheme";
import {
  Box,
  Button,
  MenuItem,
  Popover,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import WhiteModeImage from "@/assets/white-mode-image.png";
import DarkModeImage from "@/assets/dark-mode-image.png";
import Image from "next/image";
import { colors } from "@/theme/BrandColors";
import { useState } from "react";
import Link from "next/link";
import { useRoleContext } from "@/hooks/useRole";
import { useRouter } from "next/navigation";
// import { PossibleColors } from "@/hooks/useTheme";

export default function Config() {
  const {
    constrastColor,
    whiteColor,
    backgroundColor,
    primaryColor,
    getThemeMode,
    changeThemeMode,
    changePallete,
    getThemePallete,
    changeFontSize,
    getFontSize,
    colorByMode,
    changeFontFamilyText,
    getFontFamilyText,
    getFontFamilyTitle,
    changeFontFamilyTitle,
  } = useThemeContext();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [popoverMessage, setPopoverMessage] = useState("");
  const [fontMultiplier, setFontMultiplier] = useState(getFontSize());
  const [fontFamilyText, setFontFamilyText] = useState(getFontFamilyText());
  const [fontFamilyTitle, setFontFamilyTitle] = useState(getFontFamilyTitle());
  const { setName, setUserId, setRole, setToken } = useRoleContext();
  const router = useRouter();
  const themeMode = getThemeMode();
  const open = Boolean(anchorEl);

  // useEffect(() => {
  //     function getThemePallete() {
  //         const color = localStorage.getItem("theme");
  //         return color ? color : "blue";
  //     }

  //     if (!localStorage.getItem("palleteInitialConfig")) {
  //         localStorage.setItem("palleteInitialConfig", getThemePallete());
  //     }
  //     if (!localStorage.getItem("modeInitialConfig")) {
  //         localStorage.setItem("modeInitialConfig", themeMode);
  //     }
  //     if (!localStorage.getItem("fontFamilyTextInitialConfig")) {
  //         localStorage.setItem("fontFamilyTextInitialConfig", fontFamilyText);
  //     }
  //     if (!localStorage.getItem("fontFamilyTitleInitialConfig")) {
  //         localStorage.setItem("fontFamilyTitleInitialConfig", fontFamilyTitle);
  //     }
  //     if (!localStorage.getItem("fontMultiplierInitialConfig")) {
  //         localStorage.setItem("fontMultiplierInitialConfig", fontMultiplier.toString());
  //     }
  // }, [fontFamilyText, fontFamilyTitle, fontMultiplier, themeMode]);

  // function returnInitialValues() {
  //     const palleteInitialConfig = localStorage.getItem("palleteInitialConfig");
  //     const modeInitialConfig = localStorage.getItem("modeInitialConfig");
  //     const fontFamilyTextInitialConfig = localStorage.getItem("fontFamilyTextInitialConfig");
  //     const fontFamilyTitleInitialConfig = localStorage.getItem("fontFamilyTitleInitialConfig");
  //     const fontMultiplierInitialConfig = localStorage.getItem("fontMultiplierInitialConfig");
  //     changePallete(palleteInitialConfig as PossibleColors);
  //     if (modeInitialConfig !== themeMode) {
  //         changeThemeMode();
  //     }
  //     changeFontFamilyText(fontFamilyTextInitialConfig as string);
  //     changeFontFamilyTitle(fontFamilyTitleInitialConfig as string);
  //     changeFontSize(parseInt(fontMultiplierInitialConfig as string));
  //     console.log("teste 123")
  // }

  // function saveValues() {
  //     localStorage.setItem("palleteInitialConfig", getThemePallete());
  //     localStorage.setItem("modeInitialConfig", themeMode);
  //     localStorage.setItem("fontFamilyTextInitialConfig", fontFamilyText);
  //     localStorage.setItem("fontFamilyTitleInitialConfig", fontFamilyTitle);
  //     localStorage.setItem("fontMultiplierInitialConfig", fontMultiplier.toString());
  // }

  const logout = () => {
    document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    setName("");
    setUserId(-1);
    setRole("");
    setToken("");
    router.push("/login");
  }

  return (
    <Box>
      <Box className="flex flex-col md:flex-row md:justify-between md:items-end">
        <Title textHighlight="Configurações" className=" !mb-0" />
      </Box>
      <div
        style={{ backgroundColor: OpacityHex(constrastColor, 0.6) }}
        className="w-full h-[1px] !my-8"
      />
      <Box className="flex flex-col xl:flex-row justify-between h-full xl:items-start ">
        <Box className="flex flex-col mb-8 w-fit xl:mb-0">
          <Typography variant="xl_text_bold">Editar perfil</Typography>
          <Typography variant="xl_text_regular">
            Visualize suas informações e altere a sua foto de perfil
          </Typography>
        </Box>
        <Box className="flex flex-col small:flex-row gap-2 w-full xl:w-fit justify-center">
          <Link href={"/profile"}>
            <Button
              variant="contained"
              className="w-full small:w-fit"
              color="primary"
            >
              <Typography variant="md_text_bold" style={{ color: whiteColor }}>
                Editar perfil
              </Typography>
            </Button>
          </Link>
          <Button
            onClick={() => logout()}
            variant="contained"
            className="w-full small:w-fit"
            style={{ backgroundColor: OpacityHex(constrastColor, 0.5) }}
          >
            <Typography
              variant="md_text_bold"
              style={{ color: backgroundColor }}
            >
              Log-out
            </Typography>
          </Button>
        </Box>
      </Box>
      <div
        style={{ backgroundColor: OpacityHex(constrastColor, 0.6) }}
        className="w-full h-[1px] !my-8"
      />
      <Box className="flex flex-col xl:flex-row justify-between xl:items-start ">
        <Box className="flex flex-col mb-8 w-full xl:mb-0">
          <Typography variant="xl_text_bold">Tema da interface</Typography>
          <Typography variant="xl_text_regular">
            Selecione o tema da sua interface.
          </Typography>
        </Box>
        <Box className="flex flex-col md:flex-row w-full items-center justify-evenly xl:justify-end gap-4">
          <Box className="flex flex-col w-full md:w-[45%]  items-center">
            <Image
              src={WhiteModeImage}
              alt="White Mode"
              width={250}
              height={300}
              style={{
                borderColor:
                  themeMode === "light" ? primaryColor : constrastColor,
                boxShadow:
                  themeMode === "light"
                    ? "1px 1px 8px " + OpacityHex(primaryColor, 1)
                    : " ",
              }}
              className="rounded-lg border-4 w-full"
              onClick={() => themeMode === "dark" && changeThemeMode()}
            />
            <Typography variant="lg_text_regular" className="text-center">
              Modo Claro
            </Typography>
          </Box>
          <Box className="flex flex-col w-full md:w-[45%] items-center">
            <Image
              src={DarkModeImage}
              alt="Dark Mode"
              width={250}
              height={300}
              style={{
                borderColor:
                  themeMode === "dark" ? primaryColor : constrastColor,
                boxShadow:
                  themeMode === "dark"
                    ? "1px 1px 8px " + OpacityHex(primaryColor, 1)
                    : " ",
              }}
              className="rounded-lg border-4 w-full"
              onClick={() => themeMode === "light" && changeThemeMode()}
            />
            <Typography variant="lg_text_regular" className="text-center">
              Modo Escuro
            </Typography>
          </Box>
        </Box>
      </Box>
      <div
        style={{ backgroundColor: OpacityHex(constrastColor, 0.6) }}
        className="w-full h-[1px] !my-8"
      />
      <Box className="flex flex-col xl:flex-row justify-between xl:items-start ">
        <Box className="flex flex-col mb-8 mr-0 xl:mr-8 xl:mb-0">
          <Typography variant="xl_text_bold">Paleta de cores</Typography>
          <Typography variant="xl_text_regular">
            Selecione a cor que mais te agrada para a interface.
          </Typography>
        </Box>
        <Box className="flex flex-col md:flex-row justify-evenly">
          <Box className="mb-8 md:mb-0 md:mr-8">
            <Box className="flex flex-row flex-wrap gap-2">
              {Object.entries(colors.pallete).map(([key, color], index) => (
                <div
                  key={index}
                  title={key}
                  className="w-12 h-12 rounded-lg"
                  style={{
                    backgroundColor: color.secondary,
                    outline:
                      key === getThemePallete()
                        ? "2px solid " + constrastColor
                        : "none",
                  }}
                  onClick={() =>
                    changePallete(key as keyof typeof colors.pallete)
                  }
                  onMouseEnter={(e) => {
                    setPopoverMessage(key);
                    setAnchorEl(e.currentTarget);
                  }}
                  onMouseLeave={() => setAnchorEl(null)}
                />
              ))}
              <Popover
                id="mouse-over-popover"
                sx={{ pointerEvents: "none" }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                onClose={() => setAnchorEl(null)}
                disableRestoreFocus
              >
                <Typography className="!p-1">{popoverMessage}</Typography>
              </Popover>
            </Box>
          </Box>
          <Box>
            <Typography
              variant="xl_text_regular"
              style={{ color: colorByMode }}
              className="!mb-4"
            >
              Exemplos
            </Typography>
            <Box className="flex flex-row justify-between">
              <Button
                variant="contained"
                size="small"
                className="h-fit !font-bold"
                color="primary"
              >
                Primary
              </Button>
              <Button
                variant="contained"
                size="small"
                className="h-fit !font-bold"
                color="secondary"
              >
                Secondary
              </Button>
              <Button
                variant="contained"
                size="small"
                className="h-fit !font-bold"
                color="terciary"
              >
                Terciary
              </Button>
            </Box>
            <TextField
              variant="outlined"
              size="small"
              className="w-full !mt-4"
              label="Teste"
              placeholder="Teste"
            />
          </Box>
        </Box>
      </Box>
      <div
        style={{ backgroundColor: OpacityHex(constrastColor, 0.6) }}
        className="w-full h-[1px] !my-8"
      />
      <Box className="flex flex-col  justify-between">
        <Box className="flex flex-col xl:flex-row justify-between xl:items-start">
          <Box className="flex flex-col mb-8 mr-0 xl:mr-8 xl:mb-0">
            <Typography variant="xl_text_bold">Fonte</Typography>
            <Typography variant="xl_text_regular">
              Selecione a fonte que mais te agrada para sua interface.
            </Typography>
          </Box>
          <Box className="grid grid-cols-2 grid-rows-3 gap-y-2  justify-between">
            <Typography
              variant="xl_text_bold"
              style={{ color: colorByMode }}
              className="!mr-4"
            >
              Tamanho
            </Typography>
            <Select
              className="small:!min-w-44"
              value={fontMultiplier}
              size="small"
              onChange={(e) => {
                changeFontSize(e.target.value as number);
                setFontMultiplier(e.target.value as number);
              }}
            >
              <MenuItem value={0.5}>0.5x</MenuItem>
              <MenuItem value={0.75}>0.75x</MenuItem>
              <MenuItem value={1.0}>1x</MenuItem>
              <MenuItem value={1.25}>1.25x</MenuItem>
              <MenuItem value={1.5}>1.5x</MenuItem>
            </Select>

            <Typography
              variant="xl_text_bold"
              style={{ color: colorByMode }}
              className="!mr-4"
            >
              Texto
            </Typography>
            <Select
              className="small:!min-w-44"
              value={fontFamilyText}
              size="small"
              onChange={(e) => {
                changeFontFamilyText(e.target.value as string);
                setFontFamilyText(e.target.value as string);
              }}
            >
              <MenuItem value="Poppins">Poppins</MenuItem>
              <MenuItem value="Inter">Inter</MenuItem>
              <MenuItem value="Merriweather">Merriweather</MenuItem>
              <MenuItem value="Montserrat">Montserrat</MenuItem>
            </Select>

            <Typography
              variant="xl_text_bold"
              style={{ color: colorByMode }}
              className="!mr-4"
            >
              Títulos
            </Typography>
            <Select
              className="small:!min-w-44"
              value={fontFamilyTitle}
              size="small"
              onChange={(e) => {
                changeFontFamilyTitle(e.target.value as string);
                setFontFamilyTitle(e.target.value as string);
              }}
            >
              <MenuItem value="Lora">Lora</MenuItem>
              <MenuItem value="Libre Baskerville">Libre Baskerville</MenuItem>
            </Select>
          </Box>
        </Box>
        <Box className="mt-8">
          <Typography variant="xl_text_regular" style={{ color: colorByMode }}>
            Exemplos
          </Typography>
          <Box className="flex flex-col rounded-2xl p-4 border mt-4 border-gray-400 gap-4 justify-between">
            <Typography variant="h4_title">
              The quick brown fox jumps over the lazy dog
            </Typography>
            <Typography variant="xl_text_regular">
              Lorem ipsum dolor sit amet consectur adiscipling elit. The quick
              brown fox jumps over the lazy dog. Lorem ipsum dolor sit amet
              consectur adiscipling elit. The quick brown fox jumps over the
              lazy dog.
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* <div style={{backgroundColor: OpacityHex(constrastColor, 0.6)}} className="w-full h-[1px] !my-8" />
            <Box>
                <Box className="flex flex-row gap-2 justify-end">
                    <Button variant="contained" onClick={() => saveValues()} className="h-fit" color="primary">
                        <Typography variant="md_text_bold" style={{color: whiteColor}}>Salvar</Typography>
                    </Button>
                    <Button variant="contained" onClick={() => returnInitialValues()} className="h-fit" style={{backgroundColor: OpacityHex(constrastColor, 0.5)}}>
                        <Typography variant="md_text_bold"  style={{color: backgroundColor}}>Cancelar</Typography>
                    </Button>                
                </Box>
            </Box> */}
    </Box>
  );
}
