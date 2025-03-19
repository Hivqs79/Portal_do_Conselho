"use client";
import { useThemeContext } from "@/hooks/useTheme";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

interface SwapButtonProps {
    button1Text: string;
    button2Text: string;
    onClickButton1: () => void;
    onClickButton2: () => void;
}

export default function SwapButton({ button1Text, button2Text, onClickButton1, onClickButton2 }: SwapButtonProps) {
    const {primaryColor, terciaryColor} = useThemeContext();
    const [button1Focused, setButton1Focused] = useState(true);
    return (
        <Button style={{ backgroundColor: terciaryColor }} className="relative flex flex-row items-center rounded-lg w-full z-10 h-12">
            <div 
                style={{ backgroundColor: primaryColor }} 
                className={`absolute z-20 top-0 left-0 w-[50%] h-12 rounded-lg transition-transform duration-300 ease-in-out ${button1Focused ? 'translate-x-0' : 'translate-x-full'}`} 
                onClick={() => console.log("clicou")}
            />

            <Typography 
                variant="md_text_bold" 
                color={button1Focused ? terciaryColor : primaryColor}                 
                onClick={() => {
                    setButton1Focused(true);
                    onClickButton1();
                }}
                className="flex justify-center z-30 w-1/2 text-center h-full items-center cursor-pointer ease-in duration-100"
            >
                {button1Text}
            </Typography>
            <Typography 
                variant="md_text_bold" 
                color={!button1Focused ? terciaryColor : primaryColor}                 
                onClick={() => {
                    setButton1Focused(false);
                    onClickButton2();
                }}
                className="flex justify-center z-30 w-1/2 text-center h-full items-center cursor-pointer ease-in duration-100"
            >
                {button2Text}
            </Typography>
        </Button>
        // <Box bgcolor={terciaryColor}>
        //     <Button 
        //         onClick={() => {
        //             setButton1Focused(true);
        //             onClickButton1();
        //         }}
        //         variant="contained"
        //         color={button1Focused ? "primary" : "terciary"}
        //         className="w-1/2 !shadow-none"
        //     >
        //         {button1Text}
        //     </Button>
        //     <Button 
        //         onClick={() => {
        //             setButton1Focused(false);
        //             onClickButton2();
        //         }} 
        //         variant="contained"
        //         color={!button1Focused ? "primary" : "terciary"}
        //         className="w-1/2 !shadow-none"
        //     >
        //         {button2Text}
        //     </Button>
        // </Box>
    );
}