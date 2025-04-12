import { useThemeContext } from "@/hooks/useTheme";
import NotificationType from "@/interfaces/Notification";
import OpacityHex from "@/utils/OpacityHex";
import { Box, Typography } from "@mui/material";
import Icon from "./Icon";
import { IoClose } from "react-icons/io5";

interface NotificationProps {
    notification: NotificationType;
    onClick?: (notification: NotificationType) => void;
    onClose?: () => void;
}

export default function Notification({
   notification,
   onClick,
   onClose
}: NotificationProps) {
    const { primaryColor, terciaryColor } = useThemeContext();
    return (
        <Box
            style={{ backgroundColor: terciaryColor }}
            className="flex flex-row items-center max-w-[300px] rounded-lg overflow-hidden mt-24 sm:mt-[75px] -m-3"
            sx={{
                boxShadow: `2px 2px 8px 0px ${OpacityHex(primaryColor, 0.3)}`,
            }}
        >
            <Box
                style={{ backgroundColor: primaryColor }}
                className="h-24 w-1"
            />
            <Box className="flex flex-col p-4 gap-2">
                <Box>
                    <Typography variant="lg_text_regular" className="line-clamp-1 text-ellipsis">
                        {notification?.title}
                    </Typography>
                    <Icon
                        IconPassed={IoClose}
                        isButton={true}
                    />
                </Box>
                <Typography variant="sm_text_regular" className="line-clamp-1 text-ellipsis">
                    {notification?.message}
                </Typography>
            </Box>
        </Box>
    );
}