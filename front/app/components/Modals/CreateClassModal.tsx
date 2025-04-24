import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Modal,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Icon from "../Icon";
import { IoClose } from "react-icons/io5";
import { SetStateAction, useState } from "react";
import { useThemeContext } from "@/hooks/useTheme";
import ConfirmChanges from "./ConfirmChanges";
import { useRoleContext } from "@/hooks/useRole";
import LoadingModal from "./LoadingModal";

interface CreateClassModalProps {
  onClose: () => void;
  handleFetchClass: () => void;
}

export default function CreateClassModal({ onClose, handleFetchClass }: CreateClassModalProps) {
  const [nameClass, setNameClass] = useState("");
  const [courseName, setCourseName] = useState("");
  const [areaName, setAreaName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [confirmCreateOpen, setConfirmCreateOpen] = useState(false);
  const [snackmessage, setSnackMessage] = useState("");
  const [isOpenSnackBar, setIsOpenSnackBar] = useState(false);
  const { token } = useRoleContext();
  const {
    primaryColor,
    backgroundColor,
    redDanger,
    colorByModeSecondary,
    textBlackColor,
    whiteColor,
  } = useThemeContext();

  enum ClassAreaENUM {
    TI = "TI",
    MECANICA = "MECANICA",
    ELETROMECANICA = "ELETROMECANICA",
    MANUTENCAO = "MANUTENCAO",
    QUIMICA = "QUIMICA",
  }

  const closeSnackbar = () => {
    setIsOpenSnackBar(false);
  };

  const createClass = async () => {
    try {
      if (
        nameClass.trim() === "" ||
        courseName.trim() === "" ||
        areaName.trim() === ""
      ) {
        setSnackMessage("Preencha todos os campos!");
        setIsOpenSnackBar(true);
      } else if (nameClass.trim().length < 3) {
        setSnackMessage("O nome da turma deve ter mais de 3 caracteres!");
        setIsOpenSnackBar(true);
      } else if (courseName.trim().length < 5) {
        setSnackMessage("O nome do curso deve ter mais de 5 caracteres!");
        setIsOpenSnackBar(true);
      } else {
        setIsLoading(true)
        await fetch(`${process.env.NEXT_PUBLIC_URL_GENERAL_API}/class`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: nameClass,
            area: areaName,
            course: courseName,
          }),
        }).then((res) => {
          if (res.ok) {
            handleFetchClass();
            setIsLoading(false)
            onClose();
          }
        })
      }
    } catch (error) {
      console.log(error);
    }
  };

  const verifyCreateClass = () => {
    if (nameClass.trim() === "" || courseName.trim() === "" || areaName.trim() === "") {
      setSnackMessage("Preencha todos os campos!");
      setIsOpenSnackBar(true);
    } else {
      setConfirmCreateOpen(true)
    }
  }

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
              Criar nova Turma
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
                Nome da Turma
              </Typography>
              <TextField
                placeholder={`Digite o nome da Turma`}
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
                Nome do Curso
              </Typography>
              <TextField
                placeholder={`Digite o nome do Curso`}
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
              onClick={() => verifyCreateClass()}
            >
              <Typography variant="lg_text_bold" color={whiteColor}>
                Salvar
              </Typography>
            </Button>
          </Box>
          {confirmCreateOpen && (
            <ConfirmChanges
              onClose={() => setConfirmCreateOpen(false)}
              firstConfirmButton={() => createClass()}
              confirmButtonText="Salvar"
              title="Você tem certeza que deseja adicionar esta turma?"
              description="Ao fazer isso você irá adinionar uma nova turma ao sistema."
              type="default"
            />
          )}
        </Box>
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
        {isLoading && <LoadingModal/>}
      </Box>
    </Modal>
  );
}
