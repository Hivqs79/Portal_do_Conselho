"use client";
import { Box, Button, ButtonProps, darken, IconButton, InputAdornment, styled, TextField, TextFieldProps, Typography } from "@mui/material";
import Image from "next/image";
import loginImage from "@/assets/image_login.png";
import { colors } from "@/theme/BrandColors";
import LogoIcon from "@/components/LogoIcon";
import { useState } from "react";
import Icon from "@/components/Icon";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const mode = localStorage.getItem("mode") || "light";

const BlueTextField = styled(TextField)<TextFieldProps>(({ }) => ({
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: (mode == "light" ? colors.pallete.blue.primary : colors.pallete.blue.terciary),
      },
      "&:hover fieldset": {
        borderColor: (mode == "light" ? colors.pallete.blue.primary : colors.pallete.blue.terciary),
      },
      "&.Mui-focused fieldset": {
        borderColor: (mode == "light" ? colors.pallete.blue.primary : colors.pallete.blue.terciary),
        boxShadow: '2px 2px 4px 1px' + (mode == "light" ? colors.pallete.blue.primary : colors.pallete.blue.terciary) + '77',
      },
    },
    "& .MuiInputLabel-root": {
      "&.Mui-focused": {
        color: (mode == "light" ? colors.pallete.blue.primary : colors.pallete.blue.terciary),
      },
    },
}));

const BlueButton = styled(Button)<ButtonProps>(({ theme }) => ({
    backgroundColor: colors.pallete.blue.primary,
    color: theme.palette.getContrastText(colors.pallete.blue.primary),
    "&:hover": {
      backgroundColor: darken(colors.pallete.blue.primary, 0.2),
    },
  }));

export default function Login() {    
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Box className="flex flex-row justify-center">
            <Box className="hidden lg:block w-1/2 h-screen relative">
                <Image src={loginImage} alt="Happy students looking forward to camera" fill objectFit="cover" className="w-[50%]" />
                <div style={{ backgroundColor: colors.pallete.blue.primary + '8C' }} className="absolute top-0 left-0 w-full h-screen"/>
            </Box>
            <Box className="relative lg:w-1/2 my-36 top-0 right-0 flex flex-col justify-center items-center">
                <Box className="flex flex-row items-center mb-24">
                    <LogoIcon color={colors.pallete.blue.primary} className="w-44 h-44"/>
                    <Typography variant="xl_text_bold" color={colors.pallete.blue.primary} className="!ml-9 !text-5xl">Portal do <br/>Conselho</Typography>
                </Box>
                <Box className="w-3/4 flex flex-col items-center">
                    {/* <Typography variant="lg_text_bold" color={colors.pallete.blue.primary} className="!mb-4">Faça seu login</Typography> */}
                    <BlueTextField label="E-mail" variant="outlined" className="w-full !mb-14"/>
                    <BlueTextField 
                        label="Senha" 
                        type={showPassword ? 'text' : 'password'}  
                        variant="outlined" 
                        className="w-full !mb-14"
                        style={{borderColor : (mode == "light" ? colors.pallete.blue.primary : colors.pallete.blue.terciary) }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                            <IconButton
                            aria-label={showPassword ? 'hide the password' : 'display the password'}
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            >
                            <Icon color={(mode == "light" ? colors.pallete.blue.primary : colors.pallete.blue.terciary)}  IconPassed={showPassword ? FaRegEyeSlash : FaRegEye} />
                            </IconButton>
                            </InputAdornment>
                          )                        
                        }}
                    />
                    <BlueButton variant="contained" className="!mb-12 !px-24">Entrar</BlueButton>
                    <Typography variant="md_text_regular" className="!mb-4">
                        Esqueceu a senha? Clique em 
                        <span style={{color: (mode == "light" ? colors.pallete.blue.primary : colors.pallete.blue.secondary)}} className="cursor-pointer"> recuperar</span>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}