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
  Checkbox,
  IconButton,
  ListItemText,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import Icon from "../Icon";
import { IoClose } from "react-icons/io5";
import TableUserManagementRow from "@/interfaces/table/row/TableUserManagementRow";
import { SetStateAction, useEffect, useState } from "react";
import { useRoleContext } from "@/hooks/useRole";
import Class from "@/interfaces/Class";
import LoadingModal from "./LoadingModal";
import ConfirmChanges from "./ConfirmChanges";

interface EditUserManagementProps {
  content: TableUserManagementRow;
  onClose: () => void;
  urlUserRole: string;
  handleFetchUsers: () => void;
}

export default function EditUserManagement({
  content,
  urlUserRole,
  onClose,
  handleFetchUsers,
}: EditUserManagementProps) {
  const [nameUser, setNameUser] = useState(content.name);
  const [emailUser, setEmailUser] = useState(
    content.userAuthentication.username
  );
  const [isRepresentant, setIsRepresentant] = useState(content.isRepresentant);
  const [role, setRole] = useState(content.userAuthentication.role);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmEditOpen, setConfirmEditOpen] = useState(false);
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedClassNames, setSelectedClassNames] = useState<string[]>([]);
  const [selectedClassIds, setSelectedClassIds] = useState<number[]>([]);
  const { token, role: roleUser } = useRoleContext();
  const {
    backgroundColor,
    redDanger,
    colorByModeSecondary,
    constrastColor,
    textBlackColor,
    whiteColor,
    terciaryColor,
  } = useThemeContext();

  // Inicializa as turmas selecionadas com as que o usuário já está vinculado
  useEffect(() => {
    if (content.aclass && content.aclass.length > 0) {
      const initialClassNames = content.aclass.map((cls) => cls.name);
      const initialClassIds = content.aclass.map((cls) => cls.id);
      setSelectedClassNames(initialClassNames);
      setSelectedClassIds(initialClassIds);
    }
  }, [content.aclass]);

  const fetchClasses = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/class?size=9999999`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setClasses(data.content);
      }
    } catch (error) {
      console.error("Erro ao buscar classes:", error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const getClassIds = (aclassArray: Class[]) => {
    return aclassArray.map((aclassItem) => aclassItem.id);
  };

  const bodyContent: any = {
    name: nameUser,
    email: emailUser,
    classes_id: selectedClassIds,
  };

  const putUser = async () => {
    setIsLoading(true);

    if (urlUserRole === "student") {
      bodyContent.isRepresentant = isRepresentant;
    }

    await fetch(
      `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/${urlUserRole}/${content.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyContent),
      }
    ).then((response) => {
      if (response.ok) {
        setIsLoading(false);
        setConfirmEditOpen(false);
        onClose();
        handleFetchUsers();
      }
    });
  };

  const translateRole = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "Administrador";
      case "pedagogic":
        return "Pedagógico";
      case "subpedagogic":
        return "SubPedagógico";
      case "supervisor":
        return "Supervisor";
      case "supervisior":
        return "Supervisor";
      case "teacher":
        return "Professor";
      case "leader":
        return "Representante";
      case "student":
        return "Aluno";
      default:
        return role;
    }
  };

  const handleClassChange = (
    event: SelectChangeEvent<typeof selectedClassNames>
  ) => {
    const {
      target: { value },
    } = event;

    const selectedNames = typeof value === "string" ? value.split(",") : value;
    setSelectedClassNames(selectedNames);

    const selectedIds = classes
      .filter((cls) => selectedNames.includes(cls.name))
      .map((cls) => cls.id);
    setSelectedClassIds(selectedIds);
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
              Editar {translateRole(urlUserRole)}:{" "}
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
                Nome
              </Typography>
              <TextField
                value={nameUser}
                placeholder={content.name}
                type={"text"}
                variant="outlined"
                className="w-full"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setNameUser(e.target.value)
                }
              />
            </Box>
            <Box className="flex flex-col gap-4 w-full">
              <Typography variant="lg_text_bold" color={colorByModeSecondary}>
                Email
              </Typography>
              <TextField
                value={emailUser}
                placeholder={content.userAuthentication.username}
                type={"text"}
                variant="outlined"
                className="w-full"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setEmailUser(e.target.value)
                }
              />
            </Box>
          </Box>

          {/* Seção para representante (apenas alunos) */}
          {(urlUserRole === "student" || urlUserRole === "teacher") && (
            <Box className="flex w-full gap-20 justify-between items-center mt-10">
              {urlUserRole === "student" && (
                <Box className="flex flex-col gap-4 w-full">
                  <Typography
                    variant="lg_text_bold"
                    color={colorByModeSecondary}
                  >
                    Representante
                  </Typography>
                  <Select
                    value={isRepresentant?.toString()}
                    size="small"
                    onChange={(e) =>
                      setIsRepresentant(e.target.value === "true")
                    }
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
                          },
                        },
                      },
                    }}
                  >
                    <MenuItem value="true">Sim</MenuItem>
                    <MenuItem value="false">Não</MenuItem>
                  </Select>
                </Box>
              )}
              <Box className="flex flex-col gap-4 w-full">
                <Typography variant="lg_text_bold" color={colorByModeSecondary}>
                  Turmas
                </Typography>
                <Select
                  multiple
                  value={selectedClassNames}
                  onChange={handleClassChange}
                  renderValue={(selected) => selected.join(", ")}
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
                        },
                      },
                    },
                  }}
                >
                  {classes.map((cls) => (
                    <MenuItem
                      sx={{
                        overflowY: "scroll",
                        maxHeight: "400px",
                      }}
                      key={cls.id}
                      value={cls.name}
                    >
                      <Checkbox
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fill: terciaryColor,
                          },
                        }}
                        checked={selectedClassNames.includes(cls.name)}
                        className="!mr-2"
                      />
                      <ListItemText primary={`${cls.name} - ${cls.course}`} />
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Box>
          )}

          {/* Seção para mudança de função (apenas para admin) */}
          {(roleUser === "admin" || roleUser === "pedagogic") && (
            <Box className="flex w-full gap-20 justify-between items-center mt-10">
              <Box className="flex flex-col gap-4 w-full">
                <Typography variant="lg_text_bold" color={colorByModeSecondary}>
                  Função
                </Typography>
                <Select
                  value={role.toLowerCase()}
                  size="small"
                  onChange={(e) => setRole(e.target.value)}
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
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value={"student"}>
                    {translateRole("student")}
                  </MenuItem>
                  <MenuItem value={"teacher"}>
                    {translateRole("teacher")}
                  </MenuItem>
                  <MenuItem value={"supervisor"}>
                    {translateRole("supervisor")}
                  </MenuItem>
                  {roleUser === "admin" && (
                    <MenuItem value={"pedagogic"}>
                      {translateRole("pedagogic")}
                    </MenuItem>
                  )}
                  {(roleUser === "admin" || roleUser === "pedagogic") && (
                    <MenuItem value={"subpedagogic"}>
                      {translateRole("subpedagogic")}
                    </MenuItem>
                  )}
                </Select>
              </Box>
            </Box>
          )}

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
            firstConfirmButton={() => putUser()}
            confirmButtonText="Salvar"
            title="Você tem certeza que deseja editar este usuario?"
            description="Ao fazer isso você irá alterar os dados do usuario"
            type="default"
          />
        )}
        {isLoading && <LoadingModal />}
      </Box>
    </Modal>
  );
}
