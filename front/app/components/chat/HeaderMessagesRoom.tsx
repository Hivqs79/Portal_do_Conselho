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
import { Box, Typography } from "@mui/material";
import Photo from "../profile/Photo";

interface HeaderMessagesRoomProps {
  selectedUser: { userId: number; name: string };
}

export default function HeaderMessagesRoom({
  selectedUser,
}: HeaderMessagesRoomProps) {
  const { primaryColor, whiteColor, colorByModeSecondary } = useThemeContext();

  return (
    <Box
      style={{ backgroundColor: primaryColor, color: whiteColor, boxShadow: `inset 0px 0px 0px 2px ${colorByModeSecondary}`}}
      className="flex justify-start items-center gap-4 w-full rounded-t-normal p-4"
    >
      <Photo idUser={selectedUser.userId} rounded classname="w-[50px] h-[50px]" />
      <Typography color={whiteColor} variant="lg_text_bold">
        {selectedUser.name ? selectedUser.name : ""}
      </Typography>
    </Box>
  );
}
