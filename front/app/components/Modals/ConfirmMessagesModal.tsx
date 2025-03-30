"use client";
import { useThemeContext } from "@/hooks/useTheme";
import { Box, Modal, Typography } from "@mui/material";
import Icon from "../Icon";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";

interface ConfirmMessagesModalProps {
  title: string;
  description: string;
  error: boolean;
}

export default function ConfirmMessagesModal({
  title,
  description,
  error,
}: ConfirmMessagesModalProps) {
  const { backgroundColor, colorByModeSecondary } = useThemeContext();

  return (
    <>
      <Modal
        open
        sx={{
          display: "flex",
          p: 1,
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          outline: "none",
        }}
      >
        <Box
          style={{ backgroundColor: backgroundColor }}
          className="flex flex-col justify-center items-center gap-10 p-6 rounded-lg w-full max-w-[600px] m-5"
        >
          <Typography style={{color: colorByModeSecondary}} variant="xl_text_bold" className="">{title}</Typography>
          <Typography className="max-w-[450px] text-center" variant="lg_text_regular">{description}</Typography>
          <div className={`p-4 ${error? "bg-red-100" : "bg-green-100"} rounded-full`}>
            <Icon
              IconPassed={error ? IoClose : FaCheck}
              color={error ? "red" : "green"}
              className="text-4xl"
              cursor="cursor-default"
            />
          </div>
        </Box>
      </Modal>
    </>
  );
}
