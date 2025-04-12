"use client";
import { useEffect, useState } from "react";
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

  const fetchNotifications = async () => {
    const response = await fetch(
      `http://localhost:8081/notification/user/${userId}?page=${
        page - 1
      }&size=${rowsPerPage}`
    );
    const data = await response.json();
    console.log(data);
    setNotifications(data);
  };

  useEffect(() => {
    fetchNotifications();
  }, [userId, page, rowsPerPage]);

  const setViewedNotification = async (id: number) => {
    const response = await fetch(
      `http://localhost:8081/notification/${id}/is-viewed?isViewed=true`,
      {
        method: "PATCH",
      }
    );
    console.log(response);
    fetchNotifications();
  };

  const handleDeleteNotification = async (id: number) => {
    const response = await fetch(`http://localhost:8081/notification/${id}`, {
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
              <Typography style={{ color: colorByMode }} variant="lg_text_bold">
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
              <Typography color={colorByMode} variant="lg_text_bold">
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
              <Typography variant="md_text_bold" color={whiteColor}>
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
              <Typography variant="md_text_bold" color={textDarkColor}>
                Deletar
              </Typography>
            </Button>
          </Box>
        </Box>

        <Box className="flex flex-col gap-2">
          {notifications ? (
            notifications.content.map((notification, index) => (
              <Box key={index}>
                <AccordionComponent
                  type="notification"
                  name={(notification as TableNotificationRow).title}
                  outlined
                  viewed={(notification as TableNotificationRow).viewed}
                  onChangeCheckbox={() => handleSelectNotification(index)}
                  onClick={() =>
                    setViewedNotification(
                      (notification as TableNotificationRow).id
                    )
                  }
                  checked={selectedNotifications.includes(index)}
                >
                  {(notification as TableNotificationRow).message}
                </AccordionComponent>
              </Box>
            ))
          ) : (
            <Typography color={colorByMode} variant="lg_text_bold">
              Não existem notificações
            </Typography>
          )}
        </Box>
      </Box>
      <PaginationTable
        count={notifications ? notifications.totalPages : 0}
        page={notifications ? notifications.pageable.pageNumber + 1 : 1}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={(rowsPerPage: number) => setRowsPerPage(rowsPerPage)}
      />
    </Box>
  );
}
