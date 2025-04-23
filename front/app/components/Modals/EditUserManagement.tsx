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
import TableUserManagementRow from "@/interfaces/table/row/TableUserManagementRow";
import { SetStateAction, useState } from "react";
import { useRoleContext } from "@/hooks/useRole";
import Class from "@/interfaces/Class";

interface EditUserManagementProps {
  content: TableUserManagementRow;
  onClose: () => void;
  urlUserRole: string;
}

export default function EditUserManagement({
  content,
  urlUserRole,
  onClose,
}: EditUserManagementProps) {
  const [nameUser, setNameUser] = useState(content.name);
  const [emailUser, setEmailUser] = useState(
    content.userAuthentication.username
  );
  const [isRepresentant, setIsRepresentant] = useState(content.isRepresentant);
  const [role, setRole] = useState(content.userAuthentication.role);
  const { token } = useRoleContext();
  const {
    backgroundColor,
    redDanger,
    colorByModeSecondary,
    constrastColor,
    textBlackColor,
    whiteColor,
  } = useThemeContext();

  const putUser = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_URL_GENERAL_API}/${urlUserRole}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: nameUser,
        email: emailUser,
        isRepresentant: role,
        classes_id: content.aclass ? getClassIds(content.aclass) : [],
      }),
    });
  };

  const getClassIds = (aclassArray: Class[]) => {
    return aclassArray.map((aclassItem) => aclassItem.id);
  };

  const translateRole = (role: string) => {
    console.log("rle teste: ", role);
    switch (role.toLowerCase()) {
      case "admin":
        return "Administrador";
      case "pedagogic":
        return "Pedagógico";
      case "subpedagogic":
        return "Subpedagógico";
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
              Editar aluno:{" "}
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
          <Box className="flex w-full gap-20 justify-between items-center mt-10">
            <Box className="flex flex-col gap-4 w-full">
              <Typography variant="lg_text_bold" color={colorByModeSecondary}>
                Representante
              </Typography>
              <Select
                value={isRepresentant?.toString()}
                size="small"
                onChange={(e) => setIsRepresentant(e.target.value === "true")}
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
                    },
                  },
                  MenuListProps: {
                    sx: {
                      padding: "4px",
                      "& .MuiMenuItem-root": {
                        justifyContent: "center",
                        paddingLeft: "8.5px",
                        paddingRight: "8.5px",
                      },
                    },
                  },
                }}
              >
                <MenuItem value="true">Sim</MenuItem>
                <MenuItem value="false">Não</MenuItem>
              </Select>
            </Box>
            <Box className="flex flex-col gap-4 w-full">
              <Typography variant="lg_text_bold" color={colorByModeSecondary}>
                Função
              </Typography>
              <Select
                value={translateRole(role)}
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
                    },
                  },
                  MenuListProps: {
                    sx: {
                      padding: "4px",
                      "& .MuiMenuItem-root": {
                        justifyContent: "center",
                        paddingLeft: "8.5px",
                        paddingRight: "8.5px",
                      },
                    },
                  },
                }}
              >
                <MenuItem value={"Aluno"}>Aluno</MenuItem>
                <MenuItem value={"Professor"}>Professor</MenuItem>
                <MenuItem value={"Supervisor"}>Supervisor</MenuItem>
                <MenuItem value={"SubPedagógico"}>SubPedagógico</MenuItem>
              </Select>
            </Box>
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
              onClick={() => putUser()}
            >
              <Typography variant="lg_text_bold" color={whiteColor}>
                Salvar
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
