import { useThemeContext } from "@/hooks/useTheme";
import {
  Button,
  styled,
  TextField,
  TextFieldProps,
  Typography,
  useTheme,
} from "@mui/material";
import { HiOutlineFilter } from "react-icons/hi";
import Icon from "../Icon";
import { IoSearch } from "react-icons/io5";
import { VscSettings } from "react-icons/vsc";

export default function TableHeader() {
  const { primaryColor, secondaryColor } = useThemeContext();
  const theme = useTheme(); // Acessa o tema do Material-UI

  // Defina suas cores personalizadas
  const colors = {
    pallete: {
      blue: {
        primary: "#1976d2", // Exemplo de cor primária
        terciary: "#90caf9", // Exemplo de cor terciária
      },
    },
  };

  // Acessa o modo (light/dark) do tema
  const mode = theme.palette.mode;

  const BlueTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor:
          mode === "light"
            ? colors.pallete.blue.primary
            : colors.pallete.blue.terciary,
      },
      "&:hover fieldset": {
        borderColor:
          mode === "light"
            ? colors.pallete.blue.primary
            : colors.pallete.blue.terciary,
      },
      "&.Mui-focused fieldset": {
        borderColor:
          mode === "light"
            ? colors.pallete.blue.primary
            : colors.pallete.blue.terciary,
        boxShadow:
          "2px 2px 4px 1px" +
          (mode === "light"
            ? colors.pallete.blue.primary
            : colors.pallete.blue.terciary) +
          "77",
      },
    },
    "& .MuiInputLabel-root": {
      "&.Mui-focused": {
        color:
          mode === "light"
            ? colors.pallete.blue.primary
            : colors.pallete.blue.terciary,
      },
    },
  }));

  return (
    <>
      <div className="w-full flex justify-center items-center">
        <div
          style={{ backgroundColor: primaryColor, borderColor: primaryColor }}
          className="w-full max-w-[1024px] p-3 flex justify-between items-center"
        >
          <Typography variant="sm_text_bold" color="white">
            Conselho
          </Typography>
          <div className="flex gap-2">
            <Button variant="contained" color="secondary">
              <Icon IconPassed={HiOutlineFilter} color="black" />
            </Button>
            <span className="hidden small:block">
              <Button variant="contained" color="secondary">
                <Icon IconPassed={VscSettings} color="black" />
              </Button>
            </span>
            <span className="md:hidden">
              <Button variant="contained" color="secondary">
                <Icon IconPassed={IoSearch} color="black" />
              </Button>
            </span>
            <span className="hidden md:block">
              <BlueTextField
                id="outlined-search"
                label="Pesquisa"
                type="search"
                color="primary"
                sx={{ width: 200 }}
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}