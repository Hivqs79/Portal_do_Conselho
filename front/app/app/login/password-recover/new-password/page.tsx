/*
 * Copyright 2025 Pedro Henrique Panstein, Pedro Augusto Wilhelm, Mateus Henrique Bosquetti, Kaua Eggert, Vinícius Eduardo dos Santos.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use client";
import Icon from "@/components/Icon";
import { useRoleContext } from "@/hooks/useRole";
import { useThemeLoginContext } from "@/hooks/useThemeLogin";
import { Alert, Box, IconButton, InputAdornment, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { SetStateAction, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function Code() {
    const { BlueTextField, BlueButton, colorByMode } = useThemeLoginContext();
    const [inputError, setInputError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    const [password, setPassword] = useState("");    
    const [passwordConfirmation, setPasswordConfirmation] = useState("");    
    const { code, email, setEmail, setCode } = useRoleContext();
    const router = useRouter();

    const verifyCode = async () => {
      if (password !== passwordConfirmation) {
        setInputError(true);
        setTimeout(() => {
          setInputError(false);
        }, 3000);
      } else {
        if (password === "" || passwordConfirmation === "") {
          setInputError(true);
          setTimeout(() => {
            setInputError(false);
          }, 3000);
        } else {
          try {
            if (email !== "" && code !== "" && password !== "" && passwordConfirmation !== "") {
              await fetchPasswordRecoverNewPassword(email, password);
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    };

    /**
     * localhost:{porta}/auth/recovery/reset-password
body
{
    "email": "mateushb123@gmail.com",
    "code": "828896",
    "newPassword": "senha nova X"
}

     */

    const fetchPasswordRecoverNewPassword = async (email: string, password: string) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/auth/recovery/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            code: code,
            newPassword: password,
          }),
        }
      ).then((data) => {
        if (data.status === 404 || data.status === 400) {
          setInputError(true);
          setTimeout(() => {
            setInputError(false);
          }, 3000);
          return;
        }
        setEmail("");
        setCode("");
        router.push("/login");
      })
    };

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
          
          <BlueButton variant="contained" className="!mb-12 !mt-4 !w-64" onClick={() => verifyCode()}>Salvar Nova Senha</BlueButton>               
      </Box>
    );
}