"use client";
import Icon from "@/components/Icon";
import { useThemeLoginContext } from "@/hooks/useThemeLogin";
import { Alert, Box, IconButton, InputAdornment, Typography } from "@mui/material";
import { SetStateAction, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function Code() {
    const { BlueTextField, BlueButton, colorByMode } = useThemeLoginContext();
    const [inputError, setInputError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    const [password, setPassword] = useState("");    
    const [passwordConfirmation, setPasswordConfirmation] = useState("");    
    
    return (
        <Box className="w-full lg:w-3/4 flex flex-col items-center">
          <Typography variant="lg_text_bold" color={colorByMode} className={`w-full !mb-` + (inputError ? "4" : "8")}>Digite sua nova senha</Typography>
          {inputError ?
            <Alert severity="error" className="!flex !flex-row w-full !mb-8" >
                Senhas diferentes
            </Alert>
          :
            <Alert severity="info" className="!flex !flex-row w-full !mb-8" >
                Digite a nova senha para acessar a sua conta
            </Alert>
          }
          <BlueTextField 
                label="Nova senha" 
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
          <BlueTextField 
                label="Confirmação da senha" 
                type={showPasswordConfirmation ? 'text' : 'password'}  
                variant="outlined" 
                className="w-full !mb-8 sm:!mb-14"
                onChange= {(e: { target: { value: SetStateAction<string>; }; }) => setPasswordConfirmation(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                    <IconButton
                    aria-label={showPasswordConfirmation ? 'hide the password' : 'display the password'}
                    onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                    edge="end"
                    >
                    <Icon color={colorByMode}  IconPassed={showPasswordConfirmation ? FaRegEyeSlash : FaRegEye} />
                    </IconButton>
                    </InputAdornment>
                  )                        
                }}
            />
          
          <BlueButton variant="contained" className="!mb-12 !mt-4 !w-64" onClick={() => {setInputError(password !== passwordConfirmation);console.log(password);console.log(passwordConfirmation);}}>Verificar código</BlueButton>               
      </Box>
    );
}