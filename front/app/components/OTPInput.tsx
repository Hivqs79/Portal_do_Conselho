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

import * as React from "react";
import { Box, styled } from "@mui/system";
import { BrandColors } from "@/theme/BrandColors";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useThemeContext } from "@/hooks/useTheme";

const StyledMuiOtpInput = styled(MuiOtpInput)(() => {
  const { 
    colorByMode, 
    getThemeMode, 
    constrastColor, 
    backgroundColor
  } = useThemeContext();

  const primary_color = BrandColors.primary_color;
  const mode = getThemeMode();

  return {
    "& .MuiInputBase-root": {
      width: "40px",
      height: "40px",
      color: constrastColor,
      backgroundColor: backgroundColor,      
      borderRadius: "8px",
      textAlign: "center",
      fontFamily: "Poppins",
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.5,
      boxShadow: `0 2px 4px ${mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"}`,
      "&:hover": {
        borderColor: primary_color,
      },
      "&:focus": {
        borderColor: primary_color,
        boxShadow: `0 0 0 3px ${colorByMode}`,
      },
      "&:focus-visible": {
        outline: 0,
      },
    },
    "& .MuiInputBase-input": {
      padding: "8px 0",
      textAlign: "center",
    },
  };
});

interface OTPInputProps {
  otp: string;
  setOtp: React.Dispatch<React.SetStateAction<string>>;
}

export default function OTPInput({ otp, setOtp }: OTPInputProps) {
  function matchIsNumeric(text: string) {
    const isNumber = typeof text === 'number';
    const isString = typeof text === 'string';
    return (isNumber || (isString && text !== '')) && !isNaN(Number(text));
  }
  
  const validateChar = (value: string) => {
    return matchIsNumeric(value);
  }

  const handleChange = (newValue: string) => {
    console.log("new value: ", newValue);
    setOtp(newValue);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <StyledMuiOtpInput
        length={6}
        value={otp}
        onChange={handleChange}
        gap={1}
        autoFocus
        validateChar={validateChar}
      />
    </Box>
  );
}