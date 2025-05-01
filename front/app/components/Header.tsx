import { useThemeContext } from "@/hooks/useTheme";
import { Badge, Box, Slide, Snackbar, Typography, SlideProps } from "@mui/material";
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
import { useRoleContext } from "@/hooks/useRole";
import NotificationMenu from "./NotificationMenu";
import NotificationType from "@/interfaces/Notification";
import Notification from "./Notification";
import { ResponseApiPageable } from "@/interfaces/ResponseApiPageable";
import { useRouter } from "next/navigation";

const SlideLeft = (props: SlideProps) => {
  return <Slide {...props} direction="left" />;
};

interface HeaderProps {
  variant?: string;
}

export default function Header({ variant }: HeaderProps) {
  const { primaryColor, whiteColor } = useThemeContext();
  const { setName, setUserId, setRole, setToken, name, userId, token } = useRoleContext();
  const [openMenu, setOpenMenu] = useState(false);
  const boxRef = useRef<HTMLElement>(null);
  const windowWidth = useWindowWidth();
  const [notifications, setNotifications] = useState<ResponseApiPageable<NotificationType> | null>();
  const [openNotificationMenu, setOpenNotificationMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationToastOpen, setNotificationToastOpen] = useState(false);
  const [incomingNotification, setIncomingNotification] = useState<NotificationType | null>(null);
  const router = useRouter();
  const isSmall = windowWidth < 640;

  useEffect(() => {
    if (userId !== -1) {
      const fetchNotifications = async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/notification/user/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
            },
          }
        );
        let data: ResponseApiPageable<NotificationType> = await response.json();
        console.log(data);
        data = {
          ...data,
          content: data.content.filter((notification) => !notification.viewed)
        }
        console.log(data);
        setNotifications(data);        
      };

      const subscribe = async () => {
        const eventSource = new EventSource(
          `${process.env.NEXT_PUBLIC_URL_KAFKA_WORKSERVICE_API}/events/notifications/` + userId
        );

        eventSource.onmessage = (event) => {
          const notification = JSON.parse(event.data);
          console.log("Nova mensagem:", notification);
          fetchNotifications();
          setIncomingNotification(notification);
        };
      };

      fetchNotifications();
      subscribe();
    }
  }, [userId]);

  useEffect(() => {
    if (incomingNotification !== null) {
      console.log(incomingNotification);
      setNotificationToastOpen(true);
    }
  }, [incomingNotification]);

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
    <Box
      style={{ backgroundColor: primaryColor }}
      className="fixed w-screen py-5 px-6 flex flex-row items-center justify-between z-[200]"
      ref={boxRef}
    >
      <Box className="flex flex-row items-center">
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
        <div className="w-12 h-12 flex justify-center items-center rounded-full">
         {variant !== "admin" && (
           <Link href={"/profile"}>
           <Photo idUser={userId ? userId : -1} rounded={true} classname="w-full h-full" />
         </Link>
         )}
         {variant === "admin" && (
           <Photo idUser={userId ? userId : -1} rounded={true} classname="w-full h-full" />
         )}
        </div>
        <Box className="flex flex-col justify-center items-start ml-2">
          <Typography
            variant={isSmall ? "md_text_regular" : "xl_text_regular"}
            style={{ color: whiteColor }}
          >
            {name ? name.split(" ")[0] : ""}
          </Typography>
          <Box onClick={() => logout()} className="flex flex-row items-center cursor-pointer">
            <Icon
              IconPassed={LuLogOut}
              color={whiteColor}
              className="w-4 h-4 mr-1"
            />
            <Typography
              variant={
                isSmall ? "xs_text_regular" : "sm_text_regular"
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
        <span
          className=" sm:block"
          onClick={(e) => {
            setOpenNotificationMenu(!openNotificationMenu);
            setAnchorEl(e.currentTarget);
          }}
        >
          <Badge badgeContent={notifications ? notifications.content.length : 0} color="secondary">
            <Icon
              IconPassed={VscBell}
              color={whiteColor}
              className=" sm:block w-8 h-8"
            />
          </Badge>
        </span>
        <NotificationMenu
          open={openNotificationMenu}
          close={() => setOpenNotificationMenu(false)}
          anchorEl={anchorEl}
          notifications={notifications ? notifications.content : []}
        />
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={notificationToastOpen}
          autoHideDuration={5000}
          onClose={() => setNotificationToastOpen(false)}
          TransitionComponent={SlideLeft}
        >
          <div>
            {incomingNotification &&
              <Notification
                variant="toast"
                notification={incomingNotification}
                onClose={() => {
                  setNotificationToastOpen(false);
                }}
                onClick={(notification) => {
                  localStorage.setItem("notificationClickedId", notification.id.toString());
                  router.push("/notifications");
                  setNotificationToastOpen(false);
                }}
              />
            }
          </div>
        </Snackbar>
      </Box>
    </Box>
  );
}
