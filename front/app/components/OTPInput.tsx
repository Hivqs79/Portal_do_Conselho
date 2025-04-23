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