import { useThemeContext } from "@/hooks/useTheme";
import { Badge, Box, Typography } from "@mui/material";
import LogoIcon from "./LogoIcon";
import Icon from "./Icon";
import { IoClose, IoMenu, IoSettingsOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { VscBell } from "react-icons/vsc";
import { useEffect, useRef, useState } from "react";
import Menu from "./Menu";
import Photo from "./profile/Photo";
import Link from "next/link";
import { useWindowWidth } from "@react-hook/window-size";

interface HeaderProps {
  variant?: string;
}

export default function Header({ variant }: HeaderProps) {
  const { primaryColor, whiteColor } = useThemeContext();
  const [openMenu, setOpenMenu] = useState(false);
  const boxRef = useRef<HTMLElement>(null);
  const windowWidth = useWindowWidth();
  const [notifications, setNotifications] = useState(0);    

  useEffect(() => {
    const userId = localStorage.getItem("idUser");

    if (userId) {
      const fetchNotifications = async () => {
        const response = await fetch(
          "http://localhost:8081/notification/user/" + userId
        );
        const data = await response.json();
        console.log(data);
        setNotifications(data.totalElements);
      };

      const subscribe = async () => {
        const eventSource = new EventSource("http://localhost:3090/events/notifications/" + userId);

        eventSource.onmessage = (event) => {
          console.log("Nova mensagem:", JSON.parse(event.data));
          fetchNotifications();
        };
      };

      fetchNotifications();
      subscribe();
    }
  }, []);

  return (
    <Box
      style={{ backgroundColor: primaryColor }}
      className="fixed w-screen py-5 px-6 flex flex-row items-center justify-between z-[200]"
      ref={boxRef}
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
            <div onClick={() => setOpenMenu(!openMenu)}>
              <Icon
                IconPassed={openMenu ? IoClose : IoMenu}
                color={whiteColor}
                className="w-10 h-10"
              />
            </div>
            <Menu
              variant={variant}
              anchorEl={boxRef.current}
              open={openMenu}
              onClose={() => setOpenMenu(false)}
            />
          </>
        )}
        <div
          style={{ backgroundColor: whiteColor }}
          className="hidden sm:block w-[1px] h-[30px] mx-4"
        />
        <Link href="/" className="flex flex-row justify-center items-center">
          <LogoIcon color={whiteColor} className="hidden sm:block w-8 h-8" />
          <Typography
            variant="xl_text_bold"
            style={{ color: whiteColor }}
            className="hidden sm:block !ml-2"
          >
            Portal do Conselho
          </Typography>
        </Link>
      </Box>
      <Box className="flex flex-row items-center">
        {/* //TODO: substitute for a component of UserImage */}
        <div className="w-12 h-12 flex justify-center items-center rounded-full">
          <Link href={"/profile"}>
            <Photo idUser={1} rounded={true} classname="w-full h-full" />
            {/* //PENDÊNCIA: REMOVER ESTE TESTE DEPOIS, E CAPTURAR O ID CORRETO COM BASE NO USUARIO LOGADO */}
          </Link>
        </div>
        <Box className="flex flex-col justify-center items-start ml-2">
          <Typography
            variant={windowWidth < 640 ? "md_text_regular" : "xl_text_regular"}
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
              variant={
                windowWidth < 640 ? "xs_text_regular" : "sm_text_regular"
              }
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
          className="w-[1px] h-[30px] mx-4"
        />
        <span className=" sm:block">
          <Badge badgeContent={notifications} color="secondary">
            <Icon
              IconPassed={VscBell}
              color={whiteColor}
              className=" sm:block w-8 h-8"
            />
          </Badge>
        </span>
      </Box>
    </Box>
  );
}
