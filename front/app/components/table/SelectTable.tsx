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

import { Dispatch, SetStateAction } from "react";
import { Box, Checkbox, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { useThemeContext } from "@/hooks/useTheme";
import OpacityHex from "@/utils/OpacityHex";
import { Teacher } from "@/interfaces/users/Teacher";
import Class from "@/interfaces/Class";
import Search from "@/components/table/Search";
import { useWindowWidth } from "@react-hook/window-size";

interface SelectTableProps {
  selectType: "multiple" | "single";
  name: string;
  rows: Teacher[] | Class[] | undefined;
  value: { [key: string]: boolean } | number | null;
  setSelectedItems?: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
  setRadioSelectedItem?: Dispatch<SetStateAction<number | null>>;
  setSearch?: Dispatch<SetStateAction<string>>;
}

export default function SelectTable({
  selectType,
  name,
  rows,
  value,
  setSelectedItems,
  setRadioSelectedItem,
  setSearch
}: SelectTableProps) {
  const { primaryColor, backgroundColor, colorByModeSecondary, whiteColor, terciaryColor } = useThemeContext();
  const windowWidth = useWindowWidth();

  const handleCheckboxChange = (id: string) => {
    if (setSelectedItems === undefined) return;
    setSelectedItems((prevSelectedItems) => {
      const rest = { ...prevSelectedItems };
      delete rest[id];
      return prevSelectedItems[id] ? rest : { ...prevSelectedItems, [id]: true };
    });
  };

  const handleSelectAll = () => {
    if (setSelectedItems === undefined) return;
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      ...rows?.reduce((acc, row) => ({ ...acc, [row.id]: true }), {}),
    }));
  };

  const handleDisableAll = () => {
    if (setSelectedItems === undefined) return;
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      ...rows?.reduce((acc, row) => ({ ...acc, [row.id]: false }), {}),
    }));
  };

  const isAllSelected = (Array.isArray(rows) && value) && rows.every((row) => (value as { [key: string]: boolean })[row.id.toString()]);

  return (
    <Box style={{ borderColor: colorByModeSecondary, backgroundColor: primaryColor }} className="border-[2px] rounded-big overflow-hidden">
      <Box style={{ backgroundColor: primaryColor, boxShadow: `inset 0px -2px 0px 0px ${colorByModeSecondary}` }} className="flex justify-between items-center w-full p-6">
        <Box className="flex items-center mr-4">
          {selectType === "multiple" &&
            <Checkbox
              onClick={() => isAllSelected ? handleDisableAll() : handleSelectAll()}
              checked={!!isAllSelected}
              className="!mr-2"
              sx={{
                "& .MuiSvgIcon-root": {
                  fill: terciaryColor,
                },
              }}
            />
          }
          <Typography variant={windowWidth < 640 ? "md_text_regular" : "xl_text_regular"} color={whiteColor}>
            {name}
          </Typography>
        </Box>
        <Box>
          <Search setSearch={setSearch} />
        </Box>
      </Box>
      <Box
        style={{ backgroundColor: backgroundColor }}
        className="px-2"
      >
        <RadioGroup
          className="flex !flex-col !flex-nowrap max-h-80 px-2 overflow-y-auto"
        >

          {Array.isArray(rows) && rows.length > 0 ? rows.map((row, i) => (
            <Box
              style={{ borderColor: OpacityHex(colorByModeSecondary, 0.2) }}
              className={`flex items-centerw-full px-2 py-5 ` + (i !== rows.length - 1 ? "border-b-[1px]" : "")} key={row.id}
              onClick={() => selectType === "single" ? (setRadioSelectedItem && setRadioSelectedItem(row.id)) : handleCheckboxChange(row.id.toString())}
            >
              {selectType === "multiple" ? (
                <Checkbox
                  checked={!!(value as { [key: string]: boolean })[row.id]}
                  className="!mr-2"
                />
              ) : (
                <FormControlLabel
                  value={row.id}
                  control={
                    <Radio
                      className="!ml-2"
                      checked={value === row.id}
                    />
                  }
                  className="!mr-2"
                  label={null}
                />
              )}
              <Typography
                variant={windowWidth < 640 ? "sm_text_regular" : "lg_text_regular"}
              >
                {row.name}
              </Typography>
            </Box>
          )) : (
            <Box className="flex w-full h-full place-content-center p-5 ">
              <Typography variant={windowWidth < 640 ? "sm_text_regular" : "lg_text_regular"} color={terciaryColor}>
                Nenhum item encontrado
              </Typography>
            </Box>
          )}
        </RadioGroup>
      </Box>
    </Box>
  );
}