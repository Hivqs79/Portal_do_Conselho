"use client";
import Title from "@/components/Title";
import OpacityHex from "@/hooks/OpacityHex";
import { useThemeContext } from "@/hooks/useTheme";
import { Box, Button, MenuItem, Popover, Select, TextField, Typography } from "@mui/material";
import WhiteModeImage from "@/assets/white-mode-image.png";
import DarkModeImage from "@/assets/dark-mode-image.png";
import Image from "next/image";
import { colors } from "@/theme/BrandColors";
import { useState } from "react";

export default function Config() {
    const {
        constrastColor, 
        whiteColor, 
        backgroundColor, 
        primaryColor, 
        getThemeMode, 
        changeThemeMode, 
        changePallete, 
        getThemePallete, 
        changeFontSize, 
        getFontSize, 
        colorByMode,
        changeFontFamilyText,
        getFontFamilyText,
        getFontFamilyTitle,
        changeFontFamilyTitle
    } = useThemeContext();

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [popoverMessage, setPopoverMessage] = useState("");
    const [fontMultiplier, setFontMultiplier] = useState(getFontSize());
    const [fontFamilyText, setFontFamilyText] = useState(getFontFamilyText());
    const [fontFamilyTitle, setFontFamilyTitle] = useState(getFontFamilyTitle());
    const themeMode = getThemeMode();
    const open = Boolean(anchorEl);

    return (
        <Box>
            <Box className="flex flex-col md:flex-row md:justify-between md:items-end">
                <Title textHighlight="Configurações" className=" !mb-0"/>                
            </Box>
            <div style={{backgroundColor: OpacityHex(constrastColor, 0.6)}} className="w-full h-[1px] !my-8"/>
            <Box className="flex flex-col xl:flex-row justify-between xl:items-start ">
                <Box className="flex flex-col mb-8 w-full xl:mb-0">
                    <Typography variant="xl_text_bold">Tema da interface</Typography>
                    <Typography variant="xl_text_regular">Selecione o tema da sua interface.</Typography>
                </Box>
                <Box className="flex flex-col md:flex-row w-full items-center justify-evenly xl:justify-end gap-4">
                    <Box className="flex flex-col w-full md:w-[45%]  items-center">
                        <Image 
                            src={WhiteModeImage} 
                            alt="White Mode" 
                            width={250} 
                            height={300} 
                            style={{
                                borderColor: themeMode === "light" ? primaryColor : constrastColor,
                                boxShadow: themeMode === "light" ? "1px 1px 8px " + OpacityHex(primaryColor, 1) : " "
                            }} 
                            className="rounded-lg border-4 w-full"
                            onClick={() => themeMode === "dark" && changeThemeMode()}
                        />
                        <Typography variant="lg_text_regular" className="text-center">Modo Claro</Typography>
                    </Box>
                    <Box className="flex flex-col w-full md:w-[45%] items-center">
                        <Image 
                            src={DarkModeImage} 
                            alt="Dark Mode" 
                            width={250} 
                            height={300} 
                            style={{
                                borderColor: themeMode === "dark" ? primaryColor : constrastColor,
                                boxShadow: themeMode === "dark" ? "1px 1px 8px " + OpacityHex(primaryColor, 1) : " " 
                            }} 
                            className="rounded-lg border-4 w-full"
                            onClick={() => themeMode === "light" && changeThemeMode()}                            
                        />
                        <Typography variant="lg_text_regular" className="text-center">Modo Escuro</Typography>
                    </Box>
                </Box>
            </Box>
            <div style={{backgroundColor: OpacityHex(constrastColor, 0.6)}} className="w-full h-[1px] !my-8" />
            <Box className="flex flex-col xl:flex-row justify-between xl:items-start ">
                <Box className="flex flex-col mb-8 mr-0 xl:mr-8 xl:mb-0">
                    <Typography variant="xl_text_bold">Paleta de cores</Typography>
                    <Typography variant="xl_text_regular">Selecione a cor que mais te agrada para a interface.</Typography>
                </Box>
                <Box className="flex flex-col md:flex-row justify-evenly">                
                    <Box className="mb-8 md:mb-0 md:mr-8">
                        <Box className="flex flex-row flex-wrap gap-2">                        
                            {Object.entries(colors.pallete).map(([key, color], index) => (
                                <div 
                                    key={index} 
                                    title={key}
                                    className="w-12 h-12 rounded-lg" 
                                    style={{backgroundColor: color.secondary, outline: key === getThemePallete() ? "2px solid " + constrastColor : "none"}} 
                                    onClick={() => changePallete(key as keyof typeof colors.pallete)}
                                    onMouseEnter={(e) => {setPopoverMessage(key); setAnchorEl(e.currentTarget)}}
                                    onMouseLeave={() => setAnchorEl(null)}
                                />
                            ))}
                            <Popover
                                id="mouse-over-popover"
                                sx={{ pointerEvents: 'none'}}
                                open={open}
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                onClose={() => setAnchorEl(null)}
                                disableRestoreFocus                            
                            >
                                <Typography className="!p-1">{popoverMessage}</Typography>
                            </Popover>
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="xl_text_bold" style={{color: colorByMode}} className="!mb-4">Exemplos</Typography>
                        <Box className="flex flex-row justify-between">
                            <Button variant="contained" size="small" className="h-fit !font-bold" color="primary">
                                Primary
                            </Button>
                            <Button variant="contained" size="small" className="h-fit !font-bold" color="secondary">
                                Secondary
                            </Button>
                            <Button variant="contained" size="small" className="h-fit !font-bold" color="terciary">
                                Terciary
                            </Button>
                        </Box>
                        <TextField variant="outlined" size="small" className="w-full !mt-4" label="Teste" placeholder="Teste" />
                    </Box>
                </Box>
            </Box>
            <div style={{backgroundColor: OpacityHex(constrastColor, 0.6)}} className="w-full h-[1px] !my-8" />
            <Box className="flex flex-col xl:flex-row justify-between xl:items-start ">
                <Box className="flex flex-col mb-8 mr-0 xl:mr-8 xl:mb-0">
                    <Typography variant="xl_text_bold">Fonte</Typography>
                    <Typography variant="xl_text_regular">Selecione a fonte que mais te agrada para sua interface.</Typography>
                </Box>
                <Box>

                    <Select value={fontMultiplier} size="small" onChange={(e) => {changeFontSize(e.target.value as number); setFontMultiplier(e.target.value as number)} }>
                        <MenuItem value={0.5}>0.5x</MenuItem>
                        <MenuItem value={0.75}>0.75x</MenuItem>
                        <MenuItem value={1.0}>1x</MenuItem>
                        <MenuItem value={1.25}>1.25x</MenuItem>
                        <MenuItem value={1.5}>1.5x</MenuItem>
                    </Select>
                </Box>
                <Select value={fontFamilyText} size="small" onChange={(e) => {changeFontFamilyText(e.target.value as string); setFontFamilyText(e.target.value as string)} }>
                    <MenuItem value="Poppins">Poppins</MenuItem>
                    <MenuItem value="Inter">Inter</MenuItem>
                    <MenuItem value="Merriweather">Merriweather</MenuItem>
                    <MenuItem value="Montserrat">Montserrat</MenuItem>
                </Select>
                <Select value={fontFamilyTitle} size="small" onChange={(e) => {changeFontFamilyTitle(e.target.value as string); setFontFamilyTitle(e.target.value as string)} }>
                    <MenuItem value="Lora">Lora</MenuItem>
                    <MenuItem value="Libre Baskerville">Libre Baskerville</MenuItem>                    
                </Select>
            </Box>
            <div style={{backgroundColor: OpacityHex(constrastColor, 0.6)}} className="w-full h-[1px] !my-8" />
            <Box>
                <Box className="flex flex-row gap-2 justify-end">
                    <Button variant="contained" className="h-fit" color="primary">
                        <Typography variant="md_text_bold" style={{color: whiteColor}}>Salvar</Typography>
                    </Button>
                    <Button variant="contained" className="h-fit" style={{backgroundColor: OpacityHex(constrastColor, 0.5)}}>
                        <Typography variant="md_text_bold" style={{color: backgroundColor}}>Cancelar</Typography>
                    </Button>                
                </Box>
            </Box>
        </Box>
    )
}