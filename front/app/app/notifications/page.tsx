"use client";
import { useEffect, useLayoutEffect, useState, useCallback } from "react";
import AccordionComponent from "@/components/AccordionComponent";
import Title from "@/components/Title";
import { useThemeContext } from "@/hooks/useTheme";
import { Box, Button, Checkbox, Typography } from "@mui/material";
import PaginationTable from "@/components/table/Pagination";
import { TableContent } from "@/interfaces/table/TableContent";
import TableNotificationRow from "@/interfaces/table/row/TableNotificationRow";
import { useRoleContext } from "@/hooks/useRole";

export default function Notifications() {
  const {
    colorByMode,
    colorByModeSecondary,
    backgroundColor,
    textDarkColor,
    whiteColor,
    constrastColor
  } = useThemeContext();

  const [selectedNotifications, setSelectedNotifications] = useState<number[]>(
    []
  );
  const [notificationsSelectedMessage, setNotificationsSelectedMessage] =
    useState(false);
  const [notifications, setNotifications] = useState<TableContent | null>(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { userId } = useRoleContext();
  const isAllSelected =
    notifications !== null &&
    selectedNotifications.length === notifications.content.length;

  const clickedNotification = localStorage.getItem("notificationClickedId");

  useLayoutEffect(() => {
    setTimeout(() => {
      localStorage.removeItem("notificationClickedId");
    }, 5000);
  }, []);

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedNotifications([]);
    } else {
      if (notifications === null) return;
      setSelectedNotifications(notifications.content.map((_, index) => index));
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
      setNotificationsSelectedMessage(false);
    } else {
      setNotificationsSelectedMessage(true);
    }
  }, [selectedNotifications]);

  const fetchNotifications = useCallback(async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/notification/user/${userId}?page=${page - 1}
      &size=${rowsPerPage}&sort=id,desc`
    );
    console.log(process.env.URL_GENERAL_API);
    const data = await response.json();
    console.log(data);
    setNotifications(data);
  }, [userId, page, rowsPerPage]);

  useEffect(() => {
    fetchNotifications();
  }, [userId, page, rowsPerPage, fetchNotifications]);

  const setViewedNotification = async (id: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/notification/${id}/is-viewed?isViewed=true`,
      {
        method: "PATCH",
      }
    );
    console.log(response);
    fetchNotifications();
  };

  const handleDeleteNotification = async (id: number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_GENERAL_API}/notification/${id}`, {
      method: "DELETE",
    });
    console.log(response);
    fetchNotifications();
  };

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
              <Typography style={{ color: colorByMode }} variant="md_text_bold">
                Selecionar todos
              </Typography>
              {notificationsSelectedMessage && (
                <Box
                  style={{ backgroundColor: colorByMode }}
                  className="h-[30px] w-[.125rem] ml-2"
                ></Box>
              )}
            </Box>
            {notificationsSelectedMessage && (
              <Typography color={colorByMode} variant="md_text_bold">
                {selectedNotifications.length}
                {selectedNotifications.length === 1
                  ? " mensagem selecionada"
                  : " mensagens selecionadas"}
              </Typography>
            )}
          </Box>
          <Box className="flex flex-wrap gap-5">
            <Button
              onClick={() => {
                if (selectedNotifications.length === 0) return;
                selectedNotifications.forEach((index) => {
                  setViewedNotification(
                    (notifications?.content[index] as TableNotificationRow).id
                  );
                });
                setSelectedNotifications([]);
              }}
              variant="contained"
            >
              <Typography variant="sm_text_bold" color={whiteColor}>
                Marcar como lida
              </Typography>
            </Button>
            <Button
              onClick={() => {
                if (selectedNotifications.length === 0) return;
                selectedNotifications.forEach((index) => {
                  handleDeleteNotification(
                    (notifications?.content[index] as TableNotificationRow).id
                  );
                });
                setSelectedNotifications([]);
              }}
              variant="contained"
              color="terciary"
            >
              <Typography variant="sm_text_bold" color={textDarkColor}>
                Deletar
              </Typography>
            </Button>
          </Box>
        </Box>

        <Box className="flex flex-col gap-2">
          {notifications ? (
            notifications?.content.map((notification, index) => {
              notification = notification as TableNotificationRow;
              return <Box key={index}>
                <AccordionComponent
                  type="notification"
                  name={notification.title}
                  outlined
                  viewed={notification.viewed}
                  onChangeCheckbox={() => handleSelectNotification(index)}
                  checked={selectedNotifications.includes(index)}
                  onClick={() => !notification.viewed && setViewedNotification(notification.id)}
                  open={clickedNotification !== null && (() => {
                    if (parseInt(clickedNotification) === notification.id && !notification.viewed) {
                      setViewedNotification(notification.id)
                      notification.viewed = true;
                      return true;
                    }
                    return false;
                  })()}
                >
                  <Typography variant="sm_text_regular" color={constrastColor}>
                    {notification.message}
                  </Typography>
                </AccordionComponent>
              </Box>
            })
          ) : (
            <Typography color={colorByMode} variant="lg_text_bold">
              Não existem notificações
            </Typography>
          )}
        </Box>
      </Box>
      <PaginationTable
        count={notifications ? notifications.totalPages : 0}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={(rowsPerPage: number) => {
          setRowsPerPage(rowsPerPage);
          setPage(1);
        }}
      />
    </Box>
  );
}
