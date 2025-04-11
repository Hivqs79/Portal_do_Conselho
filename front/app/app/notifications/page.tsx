"use client";
import { useEffect, useState } from "react";
import AccordionComponent from "@/components/AccordionComponent";
import Title from "@/components/Title";
import { useThemeContext } from "@/hooks/useTheme";
import { Box, Button, Checkbox, Typography } from "@mui/material";
import PaginationTable from "@/components/table/Pagination";

export default function Notifications() {
  const {
    colorByMode,
    colorByModeSecondary,
    backgroundColor,
    textDarkColor,
    whiteColor,
  } = useThemeContext();

  const [selectedNotifications, setSelectedNotifications] = useState<number[]>(
    []
  );
  const [notificationsMessage, setNotificationsMessage] = useState(false);
  const isAllSelected = selectedNotifications.length === notifications.length;

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(notifications.map((_, index) => index));
    }
  };

  const handleSelectNotification = (index: number) => {
    setSelectedNotifications((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((i) => i !== index);
      } else {
        return [...prevSelected, index];
      }
    });
  };

  useEffect(() => {
    if (selectedNotifications.length === 0) {
      setNotificationsMessage(false);
    } else {
      setNotificationsMessage(true);
    }
  }, [selectedNotifications]);

  return (
    <Box>
      <Title textHighlight="Notificações" />
      <Box
        style={{
          borderColor: colorByModeSecondary,
          backgroundColor: backgroundColor,
        }}
        className="border-2 outline-component p-5 flex flex-col gap-5"
      >
        <Box className="flex flex-wrap justify-between items-center gap-y-5 gap-x-20">
          <Box className="flex flex-wrap items-center gap-2 ml-4">
            <Box className="flex items-center">
              <Checkbox
                className="!mr-2"
                onChange={handleSelectAll}
                checked={isAllSelected}
              />
              <Typography style={{ color: colorByMode }} variant="lg_text_bold">
                Selecionar todos
              </Typography>
              {notificationsMessage && (
                <Box
                  style={{ backgroundColor: colorByMode }}
                  className="h-[30px] w-[.125rem] ml-2"
                ></Box>
              )}
            </Box>
            {notificationsMessage && (
              <Typography color={colorByMode} variant="lg_text_bold">
                {selectedNotifications.length}
                {selectedNotifications.length === 1
                  ? " mensagem selecionada"
                  : " mensagens selecionadas"}
              </Typography>
            )}
          </Box>
          <Box className="flex flex-wrap gap-5">
            <Button variant="contained">
              <Typography variant="lg_text_bold" color={whiteColor}>
                Marcar como lida
              </Typography>
            </Button>
            <Button variant="contained" color="terciary">
              <Typography variant="lg_text_bold" color={textDarkColor}>
                Deletar
              </Typography>
            </Button>
          </Box>
        </Box>

        <Box className="flex flex-col gap-2">
          {notifications.map((notification, index) => (
            <Box key={index}>
              <AccordionComponent
                type="notification"
                name={notification.title}
                outlined
                viwed={notification.viwed}
                onChange={() => handleSelectNotification(index)}
                checked={selectedNotifications.includes(index)}
              >
                {notification.description}
              </AccordionComponent>
            </Box>
          ))}
        </Box>
        <PaginationTable count={notifications.length} page={1} rowsPerPage={10} setPage={() => void 0} setRowsPerPage={() => void 0}/>
          {/* // TODO: implementar paginação integrada com o backend de notificações */}
      </Box>
    </Box>
  );
}

const notifications = [
  { viwed: true, title: "Notificação 1", description: "Lorem ipsum dolor sit amet." },
  { viwed: false, title: "Notificação 2", description: "Consectetur adipisicing elit." },
  { viwed: false, title: "Notificação 3", description: "Ad dolore cum expedita pariatur." },
  { viwed: true, title: "Notificação 4", description: "Aliquam unde sunt nihil ex." },
  { viwed: false, title: "Notificação 5", description: "Voluptate beatae exercitationem!" },
];
