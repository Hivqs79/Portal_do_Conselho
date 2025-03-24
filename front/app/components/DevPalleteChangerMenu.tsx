import { useThemeContext } from "@/hooks/useTheme";
import {
  Box,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Switch,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import Icon from "./Icon";
import { IoIosArrowUp } from "react-icons/io";
import { colors } from "@/theme/BrandColors";

export default function DevPalleteChangerMenu() {
    const {backgroundColor, constrastColor, primaryColor, changeThemeMode, changePallete, getThemeMode } = useThemeContext();

    const [color, setColor] = useState("blue");
    const [isDarkMode, setIsDarkMode] = useState(getThemeMode() === "dark");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedColor = localStorage.getItem("theme") || "blue";
            setColor(storedColor);
        }
    }, []);

    const handleChangeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
        const colorChosen = (event.target as HTMLInputElement).value as "purple" | "gray" | "blue" | "pink" | "yellow" | "red" | "green" | "orange";
        setColor(colorChosen);
        changePallete(colorChosen);
    };
      
    return (        
        <Paper style={{backgroundColor: backgroundColor, borderColor: constrastColor}} className="absolute bottom-0 right-0 p-4 border-2 shadow-2xl">
            {open ? 
                <>
                    <Box onClick={() => setOpen(false)} className="!flex !justify-end">
                        <Icon IconPassed={IoClose} />
                    </Box>
                    <RadioGroup value={color} onChange={handleChangeColor}>
                        {Object.entries(colors.pallete).map((color, index) => {
                            return <FormControlLabel          
                                label={<Typography variant="sm_text_regular">{color[0]}</Typography>} 
                                value={color[0]}   
                                key={index}
                                control={<Radio />}
                            />
                        })}          
                    </RadioGroup>
                    <FormControlLabel
                        control={<Switch                    
                            onChange={() => {changeThemeMode();setIsDarkMode(!isDarkMode)}}
                            checked={isDarkMode}
                        />}
                        className="!m-0 !mt-4"
                        label={<Typography variant="sm_text_regular">Dark mode</Typography>}
                        labelPlacement="top"
                    />
                </>
            : 
                <Box className="flex flex-row gap-2 justify-center items-center">
                    <Box style={{backgroundColor:primaryColor, borderColor: constrastColor}} className="!rounded-full w-5 h-5 border-2"></Box>
                    <Box onClick={() => setOpen(true)} >
                        <Icon IconPassed={IoIosArrowUp} />
                    </Box>
                </Box>
            }               
        </Paper>
    );
}
