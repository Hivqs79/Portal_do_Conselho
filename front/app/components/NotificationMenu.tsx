/*
 * Copyright 2025 Pedro Henrique Panstein, Pedro Augusto Wilhelm, Mateus Henrique Bosquetti, Kaua Eggert, Vinícius Eduardo dos Santos.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import NotificationType from "@/interfaces/Notification";
import Popover from "@mui/material/Popover";
import Notification from "./Notification";
import { Box, Button, Typography } from "@mui/material";
import { useThemeContext } from "@/hooks/useTheme";
import Icon from "./Icon";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";

interface NotificationMenuProps {
  open: boolean,
  close: () => void,
  anchorEl: null | HTMLElement,
  notifications: NotificationType[]
}
export default function NotificationMenu({
  open,
  close,
  anchorEl,
  notifications
}: NotificationMenuProps) {
  const { backgroundColor, constrastColor } = useThemeContext();
  const router = useRouter();

  return (
    <Popover
      id="notification-popover"
      anchorEl={anchorEl}
      open={open}
      onClose={() => close()}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Box style={{ backgroundColor: backgroundColor }} className="flex flex-col p-2">
        <Box className="flex flex-col">
          <Box style={{ backgroundColor: backgroundColor }} className="flex p-2 pr-0 flex-row items-center justify-between">
            <Typography variant="md_text_bold">Notificações</Typography>
            <Icon
              IconPassed={IoClose}
              isButton={true}
              color={constrastColor}
              colorButton="transparent"
              classNameButton="!p-0 !w-fit"
              onClick={close}
            />
          </Box>
          <Box className="flex flex-col gap-2 px-2 max-h-[250px] overflow-y-auto">
            {notifications.length !== 0 ? (
              <>
                {notifications.map((notification, index) => {
                  if (index > 4) return;
                  return <Notification
                    variant="menu"
                    key={notification.id}
                    notification={notification}
                    onClick={() => {
                      localStorage.setItem("notificationClickedId", notification.id.toString());
                      router.push("/notifications");
                      close();
                    }}
                  />
                })}
              </>
            ) : (
              <Typography variant="sm_text_regular">Nenhuma notificação</Typography>
            )}
            <Button
              variant="outlined"
              onClick={() => {
                close();
                router.push("/notifications");
              }}
            >
              <Typography variant="sm_text_regular">
                {notifications.length > 5 ? "Ver todas" : "Ir para notificações"}
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Popover >
  );
}
