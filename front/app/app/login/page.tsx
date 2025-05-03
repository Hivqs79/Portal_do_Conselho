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
import { Alert, Box, IconButton, InputAdornment, Typography, } from "@mui/material";
import { SetStateAction, useState } from "react";
import Icon from "@/components/Icon";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { useThemeLoginContext } from "@/hooks/useThemeLogin";
import { useRoleContext } from "@/hooks/useRole";
import { Encryptor } from "@/encryption/Encryptor";

export default function Login() {
  const { BlueTextField, BlueButton, colorByMode, colorByModeSecondary } = useThemeLoginContext();
  const { setRole, setUserId, setName, setToken } = useRoleContext()
  const [showPassword, setShowPassword] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const verifyLogin = async () => {
    //email não contem um @
    if ((email === "" || password === "" || email.indexOf("@") === -1) && email !== "admin") {
      setInputError(true);
      setTimeout(() => {
        setInputError(false);
      }, 3000);
    } else {
      try {
        const response = await fetchLogin(email, password);
        console.log(response);
      } catch (error) {
        console.log(error);
        setInputError(false);
      }
    }
  };

  const fetchLogin = async (email: string, password: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          if (data.status === 404) {
            setInputError(true);
            setTimeout(() => {
              setInputError(false);
            }, 3000);
          }
        }
        if (data.token) { 
          document.cookie = `token=${encodeURIComponent(Encryptor(data.token))}; path=/; secure`;
          const user = { role: data.role.toLowerCase(), userId: data.userId, name: data.name };
          document.cookie = `user=${encodeURIComponent(Encryptor(user))}; path=/; secure`;
          setToken(data.token);
          setRole(data.role.toLowerCase());
          setUserId(data.userId);
          setName(data.name);
          window.location.href = "/";
        }
      })
      .catch((error) => {
        setInputError(true);
        setTimeout(() => {
          setInputError(false);
        }, 3000);
      });
  };

  return (
    <Box className="w-full lg:w-3/4 flex flex-col items-center">
      <Typography
        variant="lg_text_bold"
        color={colorByMode}
        className={`w-full !mb-` + (inputError ? "4" : "8")}
      >
        Faça seu login
      </Typography>
      <Alert
        severity="error"
        className={
          `!flex-row w-full !mb-8 ` + (inputError ? "!flex" : "!hidden")
        }
      >
        Email ou senha inválidos
      </Alert>
      <BlueTextField
        label="Email"
        variant="outlined"
        className="w-full !mb-8 sm:!mb-14"
        onChange={(e: { target: { value: SetStateAction<string> } }) =>
          setEmail(e.target.value)
        }
      />
      <BlueTextField
        label="Senha"
        type={showPassword ? "text" : "password"}
        variant="outlined"
        className="w-full !mb-8 sm:!mb-14"
        onChange={(e: { target: { value: SetStateAction<string> } }) =>
          setPassword(e.target.value)
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                <Icon
                  color={colorByMode}
                  IconPassed={showPassword ? FaRegEyeSlash : FaRegEye}
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <BlueButton
        variant="contained"
        className="!mb-12 !w-64"
        onClick={() => verifyLogin()}
      >
        Entrar
      </BlueButton>
      <Typography variant="md_text_regular" className="!mb-4">
        Esqueceu a senha? Clique em
        <Link
          href={"/login/password-recover"}
          style={{ color: colorByModeSecondary }}
          className="cursor-pointer"
        >
          {" "}
          recuperar
        </Link>
      </Typography>
    </Box>
  );
}
