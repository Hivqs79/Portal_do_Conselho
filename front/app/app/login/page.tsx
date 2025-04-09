"use client";
import { Alert, Box, IconButton, InputAdornment, Typography } from "@mui/material";
import { SetStateAction, useState } from "react";
import Icon from "@/components/Icon";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { useThemeLoginContext } from "@/hooks/useThemeLogin";


export default function Login() {
    const { BlueTextField, BlueButton, colorByMode, colorByModeSecondary } = useThemeLoginContext();  
    const [showPassword, setShowPassword] = useState(false);
    const [inputError, setInputError] = useState(false);
    const [email, setEmail] = useState("");    
    const [password, setPassword] = useState("");    

    return (                            
        <Box className="w-full lg:w-3/4 flex flex-col items-center">
            <Typography variant="lg_text_bold" color={colorByMode} className={`w-full !mb-` + (inputError ? "4" : "8")}>Faça seu login</Typography>
            <Alert severity="error" className={`!flex-row w-full !mb-8 ` + (inputError ? "!flex" : "!hidden")} >
                Email ou senha inválidos
            </Alert>
            <BlueTextField 
              label="Email" 
              variant="outlined" 
              className="w-full !mb-8 sm:!mb-14" 
              onChange= {(e: { target: { value: SetStateAction<string>; }; }) => setEmail(e.target.value)}
            />
            <BlueTextField 
                label="Senha" 
                type={showPassword ? 'text' : 'password'}  
                variant="outlined" 
                className="w-full !mb-8 sm:!mb-14"
                onChange= {(e: { target: { value: SetStateAction<string>; }; }) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? 'hide the password' : 'display the password'}
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        <Icon color={colorByMode}  IconPassed={showPassword ? FaRegEyeSlash : FaRegEye} />
                      </IconButton>
                    </InputAdornment>
                  )                        
                }}
            />
            <BlueButton variant="contained" className="!mb-12 !w-64" onClick={() => setInputError(!inputError)}>Entrar</BlueButton>
            <Typography variant="md_text_regular" className="!mb-4">
                Esqueceu a senha? Clique em
                <Link href={"/login/password-recover"} style={{color: colorByModeSecondary}} className="cursor-pointer"> recuperar</Link> 
            </Typography>
        </Box>
    );
}