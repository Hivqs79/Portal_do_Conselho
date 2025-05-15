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
          zIndex: 9999,
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
          <Typography className="max-w-[450px] text-justify" variant="lg_text_regular">{description}</Typography>
          <Box className={`p-4 ${error? "bg-red-100" : "bg-green-100"} rounded-full`}>
            <Icon
              IconPassed={error ? IoClose : FaCheck}
              color={error ? "red" : "green"}
              className="text-4xl"
              cursor="cursor-default"
            />
          </Box>
        </Box>
      </Modal>
    </>
  );
}
