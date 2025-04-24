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
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Icon from "../Icon";
import { IoClose } from "react-icons/io5";
import { SetStateAction, useEffect, useState } from "react";
import ConfirmChanges from "./ConfirmChanges";
import { useRoleContext } from "@/hooks/useRole";

interface CreateUserModalProps {
  onClose: () => void;
  urlUserRole: string;
  handleFetchUsers: () => void;
}

export default function CreateUserModal({
  onClose,
  urlUserRole,
  handleFetchUsers,
}: CreateUserModalProps) {
  const [nameUser, setNameUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [isRepresentant, setIsRepresentant] = useState(false);
  const [confirmSaveOpen, setConfirmSaveOpen] = useState(false);
  const [snackmessage, setSnackMessage] = useState("");
  const [isOpenSnackBar, setIsOpenSnackBar] = useState(false);
  const [classes, setClasses] = useState<any[]>([]);
  const [selectedClassNames, setSelectedClassNames] = useState<string[]>([]);
  const [selectedClassIds, setSelectedClassIds] = useState<number[]>([]);
  const { token } = useRoleContext();
  const {
    backgroundColor,
    redDanger,
    colorByModeSecondary,
    primaryColor,
    textBlackColor,
    whiteColor,
    terciaryColor,
  } = useThemeContext();

  const translateRole = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "Administrador";
      case "pedagogic":
        return "Pedagógico";
      case "subPedagogic":
        return "SubPedagógico";
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

  const bodyContent: any = {
    name: nameUser,
    email: emailUser,
  };

  const saveUser = async () => {
    console.log("SAVE USER: ", nameUser, emailUser, isRepresentant);

    if (urlUserRole === "student" || urlUserRole === "teacher") {
      bodyContent.classes_id = selectedClassIds;
      if (urlUserRole === "student") {
        bodyContent.isRepresentant = isRepresentant;
      }
    }

    try {
      await fetch(`${process.env.NEXT_PUBLIC_URL_GENERAL_API}/${urlUserRole}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyContent),
      }).then((response) => {
        if (response.ok) {
          setConfirmSaveOpen(false);
          onClose();
          handleFetchUsers();
        } else if (response.status === 409) {
          setConfirmSaveOpen(false);
          setSnackMessage("E-mail já cadastrado!");
          setIsOpenSnackBar(true);
        } else {
          setConfirmSaveOpen(false);
          setSnackMessage(`Erro inesperado: ${response.status}`);
          setIsOpenSnackBar(true);
        }
      });
    } catch (error) {
      setSnackMessage("Erro inesperado ao salvar o usuário!");
      setIsOpenSnackBar(true);
    }
  };

  const verifyCreateUser = () => {
    if (!nameUser && !emailUser) {
      setSnackMessage("Preencha os campos corretamente!");
      setIsOpenSnackBar(true);
    } else if (nameUser.trim() === "" || emailUser.trim() === "") {
      setSnackMessage("Preencha os campos corretamente!");
      setIsOpenSnackBar(true);
    } else if (nameUser.trim().length < 3) {
      setSnackMessage("O nome do usuário deve ter no mínimo 3 caracteres!");
      setIsOpenSnackBar(true);
    } else if (!emailUser.includes("@") || !emailUser.includes(".")) {
      setSnackMessage("E-mail inválido!");
      setIsOpenSnackBar(true);
    } else {
      setConfirmSaveOpen(true);
    }
  };

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
      setSnackMessage("Erro ao carregar as turmas!");
      setIsOpenSnackBar(true);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const closeSnackbar = () => {
    setIsOpenSnackBar(false);
  };

  const handleChange = (
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
              Criar novo aluno
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
                Nome do {translateRole(urlUserRole)}
              </Typography>
              <TextField
                placeholder={`Digite o nome do ${translateRole(
                  urlUserRole
                )}...`}
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
                Email do {translateRole(urlUserRole)}
              </Typography>
              <TextField
                placeholder={`Digite o email do ${translateRole(
                  urlUserRole
                )}...`}
                type={"text"}
                variant="outlined"
                className="w-full"
                onChange={(e: { target: { value: SetStateAction<string> } }) =>
                  setEmailUser(e.target.value)
                }
              />
            </Box>
          </Box>
          {(urlUserRole === "student" || urlUserRole === "teacher") && (
            <Box className="flex w-full gap-20 justify-between items-center mt-10">
              {urlUserRole === "student" && (
                <Box className="flex flex-col gap-4 w-full">
                  <Typography
                    variant="lg_text_bold"
                    color={colorByModeSecondary}
                  >
                    É representante de turma?
                  </Typography>
                  <Select
                    value={isRepresentant}
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
                          }
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
                  Selecione a turma
                </Typography>
                <Select
                  multiple
                  value={selectedClassNames}
                  onChange={handleChange}
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
                        }
                      },
                    },
                  }}
                >
                  {classes.map((cls) => (
                    <MenuItem key={cls.id} value={cls.name}>
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
              onClick={() => verifyCreateUser()}
            >
              <Typography variant="lg_text_bold" color={whiteColor}>
                Criar {translateRole(urlUserRole)}
              </Typography>
            </Button>
          </Box>
        </Box>
        {confirmSaveOpen && (
          <ConfirmChanges
            onClose={() => setConfirmSaveOpen(false)}
            firstConfirmButton={() => saveUser()}
            confirmButtonText="Criar"
            title="Você tem certeza que deseja criar este usuario?"
            description="Ao fazer isso você irá adicionar este usuário ao sistema!"
            type="default"
          />
        )}
        <Snackbar
          open={isOpenSnackBar}
          autoHideDuration={3000}
          onClose={closeSnackbar}
          message={snackmessage}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          sx={{
            "& .MuiSnackbarContent-root": {
              backgroundColor: primaryColor,
              color: whiteColor,
            },
          }}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={closeSnackbar}
            >
              <Icon IconPassed={IoClose} color={whiteColor} />
            </IconButton>
          }
        />
      </Box>
    </Modal>
  );
}
