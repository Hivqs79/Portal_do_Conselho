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

import { useThemeContext } from "@/hooks/useTheme";
import NotificationType from "@/interfaces/Notification";
import OpacityHex from "@/utils/OpacityHex";
import { Box, Typography } from "@mui/material";
import Icon from "./Icon";
import { IoClose } from "react-icons/io5";

interface NotificationProps {
    variant: "toast" | "menu";
    notification: NotificationType;
    onClick?: (notification: NotificationType) => void;
    onClose?: () => void;
}

export default function Notification({
    variant,
    notification,
    onClick,
    onClose
}: NotificationProps) {
    const { primaryColor, terciaryColor, textDarkColor } = useThemeContext();
    return (
        <Box
            style={{ backgroundColor: terciaryColor }}
            className={"flex flex-row items-center max-h-24 max-w-[350px] rounded-lg " + (variant === "toast" ? "mt-24 sm:mt-[75px] -m-3 overflow-hidden" : " ")}
            sx={{
                boxShadow: `2px 2px 8px 0px ${OpacityHex(primaryColor, 0.3)}`,
            }}
        >
            <div
                style={{ backgroundColor: primaryColor }}
                className="h-24 w-1 rounded-l-lg"
            />
            <Box onClick={() => onClick && onClick(notification)} className="cursor-pointer flex flex-col p-4 gap-2">
                <Box className="flex flex-row items-center justify-between">
                    <Typography color={textDarkColor} variant="lg_text_bold" className="line-clamp-1 text-ellipsis">
                        {notification?.title}
                    </Typography>
                    {variant === "toast" &&
                        <Icon
                            IconPassed={IoClose}
                            isButton={true}
                            colorButton="transparent"
                            classNameButton="!p-0 !w-fit"
                            onClick={() => onClose && onClose()}
                        />
                    }
                </Box>
                <Typography color={textDarkColor} variant="sm_text_regular" className="line-clamp-1 text-ellipsis">
                    {notification?.message}
                </Typography>
            </Box>
        </Box>
    );
}