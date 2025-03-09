import { useThemeContext } from "@/hooks/useTheme";
import { Box, Typography } from "@mui/material";
import LogoIcon from "./LogoIcon";
import Icon from "./Icon";
import { IoMenu, IoSettingsOutline } from "react-icons/io5";
import { PiUserBold } from "react-icons/pi";
import { LuLogOut } from "react-icons/lu";
import { VscBell } from "react-icons/vsc";
import { useEffect, useRef, useState } from "react";
import Menu from "./Menu";

interface HeaderProps {
  variant?: string;
}

export default function Header({ variant }: HeaderProps) {
  const { primaryColor, whiteColor } = useThemeContext();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const boxRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Garantir que o código de acesso ao window só rode no cliente
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth < 640);
      };

      // Inicializa com o tamanho da tela atual
      handleResize();

      // Adiciona o listener para redimensionamento da janela
      window.addEventListener("resize", handleResize);

      // Limpeza do listener ao desmontar o componente
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []); // Só executa uma vez quando o componente for montado

  const handleMenuOpen = () => {
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
  };

  return (
    <Box
      style={{ backgroundColor: primaryColor }}
      className="py-5 px-6 flex flex-row items-center justify-between"
    >
      <Box className="flex flex-row items-center">
        {variant === "admin" ? (
          <>
            <Icon
              IconPassed={IoSettingsOutline}
              color={whiteColor}
              className="w-8 h-8"
            />
          </>
        ) : (
          <>
            <div onClick={handleMenuOpen}>
              <Icon
                IconPassed={IoMenu}
                color={whiteColor}
                className="w-10 h-10"
              />
            </div>
            <Menu
              variant={variant}
              anchorEl={boxRef.current}
              open={openMenu}
              onClose={handleMenuClose}
            />
          </>
        )}
        <div
          style={{ backgroundColor: whiteColor }}
          className="hidden sm:block w-[1px] h-[30px] mx-4"
        />
        <LogoIcon color={whiteColor} className="hidden sm:block w-8 h-8" />
        <Typography
          variant="xl_text_bold"
          style={{ color: whiteColor }}
          className="hidden sm:block !ml-2"
        >
          Portal do Conselho
        </Typography>
      </Box>
      <Box className="flex flex-row-reverse sm:flex-row items-center">
        {/* TODO: substitute for a component of UserImage */}
        <div
          style={{ backgroundColor: whiteColor }}
          className="w-12 h-12 flex justify-center items-center rounded-full"
        >
          <Icon
            IconPassed={PiUserBold}
            color={primaryColor}
            className="w-10 h-10"
          />
        </div>
        <Box className="flex flex-col justify-center items-end sm:items-start mr-2 sm:mr-0 sm:ml-2">
          <Typography
            variant={isSmallScreen ? "md_text_regular" : "xl_text_regular"}
            style={{ color: whiteColor }}
          >
            Usuário
          </Typography>
          <Box className="flex flex-row items-center cursor-pointer">
            <Icon
              IconPassed={LuLogOut}
              color={whiteColor}
              className="w-4 h-4 mr-1"
            />
            <Typography
              variant={isSmallScreen ? "xs_text_regular" : "sm_text_regular"}
              style={{
                color: whiteColor,
                lineHeight: "0px",
                textDecoration: "underline",
              }}
            >
              Sair
            </Typography>
          </Box>
        </Box>
        <div
          style={{ backgroundColor: whiteColor }}
          className="hidden sm:block w-[1px] h-[30px] mx-4"
        />
        <Icon
          IconPassed={VscBell}
          color={whiteColor}
          className="hidden sm:block w-8 h-8"
        />
      </Box>
    </Box>
  );
}
