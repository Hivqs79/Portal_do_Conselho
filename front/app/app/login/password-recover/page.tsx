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
import { useRoleContext } from "@/hooks/useRole";
import { useThemeLoginContext } from "@/hooks/useThemeLogin";
import { Alert, Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { SetStateAction, useState } from "react";

export default function PasswordRecuperation() {
  const { BlueTextField, BlueButton, colorByMode } = useThemeLoginContext();
  const [inputError, setInputError] = useState(false);
  const [email, setEmail] = useState("");
  const { setEmail: setEmailRole } = useRoleContext();
  const router = useRouter();

  const passwordRecover = async () => {
    if (email === "" || email.indexOf("@") === -1) {
      setInputError(true);
      setTimeout(() => {
        setInputError(false);
      }, 3000);
    } else {
      try {
        await fetchPasswordRecover(email);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchPasswordRecover = async (email: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/auth/recovery/forgot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      }
    ).then((data) => {
      if (data.status) {
        if (data.status === 404 || data.status === 400) {
          setInputError(true);
          setTimeout(() => {
            setInputError(false);
          }, 3000);
        }
      }
      setEmailRole(email);
      router.push("/login/password-recover/code");
    });
  };

  return (
    <Box className="w-full lg:w-3/4 flex flex-col items-center">
      <Typography
        variant="lg_text_bold"
        color={colorByMode}
        className={`w-full !mb-` + (inputError ? "4" : "8")}
      >
        Recuperação de senha
      </Typography>
      {inputError ? (
        <Alert severity="error" className="!flex !flex-row w-full !mb-8">
          Email não cadastrado
        </Alert>
      ) : (
        <Alert severity="info" className="!flex !flex-row w-full !mb-8">
          Digite o email para o envio de um código de confirmação de recuperação
          de senha
        </Alert>
      )}
      <BlueTextField
        label="Email de verificação"
        placeholder="example@estudante.sesisenai.org.br"
        variant="outlined"
        className="w-full !mb-8 sm:!mb-14"
        onChange={(e: { target: { value: SetStateAction<string> } }) =>
          setEmail(e.target.value)
        }
      />

      <BlueButton
        variant="contained"
        className="!mb-12 !w-64"
        onClick={() => passwordRecover()}
      >
        Enviar email
      </BlueButton>
    </Box>
  );
}
