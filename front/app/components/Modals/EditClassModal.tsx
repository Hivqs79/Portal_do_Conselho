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
import {
  Box,
  Button,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Icon from "../Icon";
import { IoClose } from "react-icons/io5";
import { SetStateAction, useState } from "react";
import ConfirmChanges from "./ConfirmChanges";
import LoadingModal from "./LoadingModal";
import { useRoleContext } from "@/hooks/useRole";

interface EditClassModalProps {
  onClose: () => void;
  content: any;
  handleFetchClass: () => void;
}

export default function EditClassModal({
  onClose,
  content,
  handleFetchClass,
}: EditClassModalProps) {
  const [nameClass, setNameClass] = useState(content.name);
  const [couseName, setCourseName] = useState(content.course);
  const [areaName, setAreaName] = useState(content.area);
  const [confirmEditOpen, setConfirmEditOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useRoleContext();
  const {
    backgroundColor,
    redDanger,
    colorByModeSecondary,
    constrastColor,
    textBlackColor,
    whiteColor,
  } = useThemeContext();

  const bodyContent: any = {
    name: nameClass,
    area: areaName,
    course: couseName,
  };

  enum ClassAreaENUM {
    TI = "TI",
    MECANICA = "MECANICA",
    ELETROMECANICA = "ELETROMECANICA",
    MANUTENCAO = "MANUTENCAO",
    QUIMICA = "QUIMICA",
  }

  const putClass = async () => {
    setIsLoading(true);
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/class/${content.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bodyContent),
        }
      ).then((res) => {
        if (res.ok) {
          handleFetchClass();
          setIsLoading(false);
          onClose();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      open
      onClose={onClose}
      sx={{
        display: "flex",
        p: 1,
        zIndex: 1000,
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        outline: "none",
      }}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: backgroundColor }}
        className="p-2 rounded-lg w-full max-w-[800px] m-5 z-[101]"
      >
        <Box className="p-3 h-full max-h-[800px] overflow-y-scroll">
          <Box className="flex justify-between items-center">
            <Typography variant="lg_text_bold" color={colorByModeSecondary}>
              Editar:{" "}
              <span style={{ color: constrastColor }}>{content.name}</span>
            </Typography>
            <Box onClick={onClose}>
              <Icon
                IconPassed={IoClose}
                color={redDanger}
                className="cursor-pointer text-[2rem]"
              />
            </Box>
          </Box>
          <Box className="flex w-full gap-20 justify-between items-center mt-10">
            <Box className="flex flex-col gap-4 w-full">
              <Typography variant="lg_text_bold" color={colorByModeSecondary}>
                Nome da turma
              </Typography>
              <TextField
                value={nameClass}
                placeholder={content.name}
                type={"text"}
                variant="outlined"
                className="w-full"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setNameClass(e.target.value)
                }
              />
            </Box>
            <Box className="flex flex-col gap-4 w-full">
              <Typography variant="lg_text_bold" color={colorByModeSecondary}>
                Nome do curso
              </Typography>
              <TextField
                value={couseName}
                placeholder={content.course}
                type={"text"}
                variant="outlined"
                className="w-full"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setCourseName(e.target.value)
                }
              />
            </Box>
          </Box>
          <Box className="flex flex-col gap-4 w-full mt-10">
            <Typography variant="lg_text_bold" color={colorByModeSecondary}>
              Selecione a área do curso
            </Typography>
            <Select
              value={areaName}
              size="small"
              onChange={(e) => setAreaName(e.target.value)}
              sx={{
                minWidth: "200px",
                "& .MuiOutlinedInput-input": {
                  paddingTop: "8.5px",
                  paddingBottom: "8.5px",
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    borderRadius: "4px",
                    marginTop: "4px",
                    maxHeight: 300,
                  },
                },
                MenuListProps: {
                  sx: {
                    padding: "4px",
                    "& .MuiMenuItem-root": {
                      width: "100%",
                      justifyContent: "flex-center",
                      paddingLeft: "8.5px",
                      paddingRight: "8.5px",
                    },
                    "& .MuiMenuItem-root:first-child": {
                      paddingTop: "4px",
                    },
                    "& .MuiMenuItem-root:last-child": {
                      paddingBottom: "4px",
                    },
                    "& .MuiMenuItem-root:not(:last-child)": {
                      borderBottom: "1px solid var(--secondary-color)",                      
                    }
                  },
                },
              }}
            >
              {Object.values(ClassAreaENUM).map((area) => (
                <MenuItem key={area} value={area}>
                  {area.charAt(0) + area.slice(1).toLowerCase()}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box className="flex justify-center items-center gap-20 mt-10">
            <Button
              fullWidth
              variant="contained"
              color="terciary"
              onClick={onClose}
            >
              <Typography variant="lg_text_bold" color={textBlackColor}>
                Cancelar
              </Typography>
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => setConfirmEditOpen(true)}
            >
              <Typography variant="lg_text_bold" color={whiteColor}>
                Salvar
              </Typography>
            </Button>
          </Box>
        </Box>
        {confirmEditOpen && (
          <ConfirmChanges
            onClose={() => setConfirmEditOpen(false)}
            firstConfirmButton={() => putClass()}
            confirmButtonText="Salvar"
            title="Você tem certeza que deseja editar esta turma?"
            description="Ao fazer isso você irá alterar os dados da turma"
            type="default"
          />
        )}
        {isLoading && <LoadingModal />}
      </Box>
    </Modal>
  );
}
