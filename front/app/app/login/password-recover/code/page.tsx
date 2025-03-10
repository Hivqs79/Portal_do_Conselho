"use client";
import OTPInput from "@/components/OTPInput";
import { useThemeLoginContext } from "@/hooks/useThemeLogin";
import { Alert, Box, Typography } from "@mui/material";
import { useState } from "react";

export default function Code() {
    const { BlueButton, colorByMode } = useThemeLoginContext();
    const [inputError, setInputError] = useState(false);
    const [otp, setOtp] = useState<number | string>(0);
    
    return (
        <Box className="w-full lg:w-3/4 flex flex-col items-center">
          <Typography variant="lg_text_bold" color={colorByMode} className={`w-full !mb-` + (inputError ? "4" : "8")}>Digite o código de recuperação</Typography>
          {inputError ?
            <Alert severity="error" className="!flex !flex-row w-full !mb-8" >
                Código inválido
            </Alert>
          :
            <Alert severity="info" className="!flex !flex-row w-full !mb-8" >
                Digite o código de recuperação enviado por email
            </Alert>
          }
          <OTPInput otp={otp || ''} setOtp={setOtp}/>
          
          <BlueButton variant="contained" className="!mb-12 !mt-16 !w-64" onClick={() => setInputError(!inputError)}>Verificar código</BlueButton>               
      </Box>
    );
}