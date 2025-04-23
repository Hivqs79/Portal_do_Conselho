"use client";
import OTPInput from "@/components/OTPInput";
import { useRoleContext } from "@/hooks/useRole";
import { useThemeLoginContext } from "@/hooks/useThemeLogin";
import { Alert, Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Code() {
  const { BlueButton, colorByMode } = useThemeLoginContext();
  const [inputError, setInputError] = useState(false);
  const { email, setCode } = useRoleContext();
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const sendCode = async () => {
    if (otp === "") {
      setInputError(true);
      setTimeout(() => {
        setInputError(false);
      }, 3000);
    } else {
      try {
        console.log("asdasdad", email, otp);
        if (email) {
          if (email !== "" && otp !== "") {
            await fetchPasswordRecoverCode(email, otp);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    console.log("Email no contexto:", email);
  }, [email]);

  const fetchPasswordRecoverCode = async (email: string, code: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/auth/recovery/verify-code`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, code: code }),
      }
    ).then((data) => {
      if (data.status === 404 || data.status === 400) {
        setInputError(true);
        setTimeout(() => {
          setInputError(false);
        }, 3000);
        return;
      }
      setCode(code);
      router.push("/login/password-recover/new-password");
    });
  };

  return (
    <Box className="w-full lg:w-3/4 flex flex-col items-center">
      <Typography
        variant="lg_text_bold"
        color={colorByMode}
        className={`w-full !mb-` + (inputError ? "4" : "8")}
      >
        Digite o código de recuperação
      </Typography>
      {inputError ? (
        <Alert severity="error" className="!flex !flex-row w-full !mb-8">
          Código inválido
        </Alert>
      ) : (
        <Alert severity="info" className="!flex !flex-row w-full !mb-8">
          Digite o código de recuperação enviado por email
        </Alert>
      )}
      <OTPInput otp={otp} setOtp={setOtp} />

      <BlueButton
        variant="contained"
        className="!mb-12 !mt-16 !w-64"
        onClick={() => sendCode()}
      >
        Verificar código
      </BlueButton>
    </Box>
  );
}
