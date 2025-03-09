"use client";
import { useThemeLoginContext } from "@/hooks/useThemeLogin";
import { Alert, Box, Typography } from "@mui/material";
import { SetStateAction, useState } from "react";


export default function PasswordRecuperation() {
    const { BlueTextField, BlueButton, colorByMode } = useThemeLoginContext();
    const [inputError, setInputError] = useState(false);
    const [email, setEmail] = useState("");

    return (        
      <Box className="w-full lg:w-3/4 flex flex-col items-center">
          <Typography variant="lg_text_bold" color={colorByMode} className={`w-full !mb-` + (inputError ? "4" : "8")}>Recuperação de senha</Typography>
          {inputError ?
            <Alert severity="error" className="!flex !flex-row w-full !mb-8" >
                Email não cadastrado
            </Alert>
          :
            <Alert severity="info" className="!flex !flex-row w-full !mb-8" >
                Digite o email para o envio de um código de confirmação de recuperação de senha
            </Alert>
          }
          <BlueTextField 
            label="Email de verificação" 
            placeholder="example@estudante.sesisenai.org.br"  
            variant="outlined" 
            className="w-full !mb-8 sm:!mb-14"
            onChange= {(e: { target: { value: SetStateAction<string>; }; }) => setEmail(e.target.value)}
          />
          
          <BlueButton variant="contained" className="!mb-12 !w-64" onClick={() => setInputError(!inputError)}>Enviar email</BlueButton>               
      </Box>
    );
}