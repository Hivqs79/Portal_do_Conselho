import { useThemeContext } from "@/hooks/useTheme";
import { Box, Typography } from "@mui/material";
import LogoIcon from "./LogoIcon";
import Icon from "./Icon";
import { IoMenu } from "react-icons/io5";
import { PiUserBold } from "react-icons/pi";
import { LuLogOut } from "react-icons/lu";
import { VscBell } from "react-icons/vsc";
import { useEffect, useState } from "react";


export default function Header() {
    const {primaryColor, whiteColor} = useThemeContext();
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 640);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 640);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    
    return (
        <Box style={{ backgroundColor: primaryColor }} className="py-5 px-6 flex flex-row items-center justify-between">
            <Box className="flex flex-row items-center">                
                <Icon IconPassed={IoMenu} color={whiteColor} className="w-10 h-10" />                
                <div style={{backgroundColor: whiteColor}} className="hidden sm:block w-[1px] h-[30px] mx-4"/>
                <LogoIcon color={whiteColor} className="hidden sm:block w-8 h-8" />
                <Typography variant="xl_text_bold" style={{color: whiteColor}} className="hidden sm:block !ml-2">Portal do Conselho</Typography>
            </Box>
            <Box className="flex flex-row-reverse sm:flex-row items-center">
                {/* TODO: substitute for a component of UserImage*/}
                <div style={{backgroundColor: whiteColor}} className="w-12 h-12 flex justify-center items-center rounded-full">
                    <Icon IconPassed={PiUserBold} color={primaryColor} className="w-10 h-10" />
                </div>                
                <Box className="flex flex-col justify-center items-end sm:items-start mr-2 sm:mr-0 sm:ml-2">
                    <Typography variant={isSmallScreen ? "md_text_regular" : "xl_text_regular"} style={{color: whiteColor}}>Usuário</Typography>
                    <Box className="flex flex-row items-center cursor-pointer">
                        <Icon IconPassed={LuLogOut} color={whiteColor} className="w-4 h-4 mr-1" />
                        <Typography variant={isSmallScreen ? "xs_text_regular" : "sm_text_regular"} style={{color: whiteColor, lineHeight: "0px", textDecoration: "underline"}}>Sair</Typography>                    
                    </Box>
                </Box>
                <div style={{backgroundColor: whiteColor}} className="hidden sm:block w-[1px] h-[30px] mx-4"/>
                <Icon IconPassed={VscBell} color={whiteColor} className="hidden sm:block w-8 h-8" />
            </Box>
        </Box>
    );    
}