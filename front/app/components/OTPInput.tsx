import * as React from 'react';
import InputBase, { InputBaseProps } from '@mui/material/InputBase';
import { Box, styled } from '@mui/system';
import ThemeSettings from '@/theme/ThemeSettings';
import { BrandColors } from '@/theme/BrandColors';
import { Dispatch, SetStateAction } from 'react';

const primary_color = BrandColors.primary_color;
const colorByMode = ThemeSettings.getColorByMode();
const mode = ThemeSettings.getThemeMode();
const contrastThemeColor = ThemeSettings.getContrastThemeColor();
const backgroundThemeColor = ThemeSettings.getBackgroundThemeColor();
const lightGrayColor = ThemeSettings.lightGrayColor();
const darkGrayColor = ThemeSettings.darkGrayColor();

const StyledOTPInput = styled(InputBase)<InputBaseProps>(() => ({
  "&.MuiInputBase-root": {
    width: "40px",
    height: "40px",
    color: contrastThemeColor,
    backgroundColor: backgroundThemeColor,
    border: '1px solid ' + (mode === 'dark' ? lightGrayColor : darkGrayColor),
    borderRadius: '8px',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: 1.5,
    boxShadow: '0 2px 4px ' + (mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'),
    '&:hover': {
      borderColor: primary_color,
    },
    '&:focus': {
      borderColor: primary_color,
      boxShadow: '0 0 0 3px ' + colorByMode,
    },
    '&:focus-visible': {
      outline: 0,
    },
  },
  input: {
    padding: '8px 0',
    textAlign: "center",
  },
}));


function OTP({
  separator,
  length,
  value,
  onChange,
}: {
  separator: React.ReactNode;
  length: number;
  value: number | string;
  onChange: React.Dispatch<React.SetStateAction<number | string>>;
}) {
  const inputRefs = React.useRef<HTMLInputElement[]>(new Array(length).fill(null));

  const focusInput = (targetIndex: number) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.focus();
  };

  const selectInput = (targetIndex: number) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.select();
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    currentIndex: number,
  ) => {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case ' ':
        event.preventDefault();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (currentIndex < length - 1) {
          focusInput(currentIndex + 1);
          selectInput(currentIndex + 1);
        }
        break;
      case 'Delete':
        event.preventDefault();
        onChange((prevOtp) => {
          const otp =
            prevOtp.toString().slice(0, currentIndex) + prevOtp.toString().slice(currentIndex + 1);
          return parseInt(otp);
        });

        break;
      case 'Backspace':
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }

        onChange((prevOtp) => {
          const otp =
            prevOtp.toString().slice(0, currentIndex) + prevOtp.toString().slice(currentIndex + 1);
          return parseInt(otp);
        });
        break;

      default:
        break;
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    currentIndex: number,
  ) => {
    const currentValue = event.target.value;
    let indexToEnter = 0;

    while (indexToEnter <= currentIndex) {
      if (inputRefs.current[indexToEnter].value && indexToEnter < currentIndex) {
        indexToEnter += 1;
      } else {
        break;
      }
    }
    onChange((prev) => {
      const otpArray = prev.toString().split('');
      const lastValue = currentValue[currentValue.length - 1];
      otpArray[indexToEnter] = lastValue;
      return parseInt(otpArray.join(''));
    });
    if (currentValue !== '') {
      if (currentIndex < length - 1) {
        focusInput(currentIndex + 1);
      }
    }
  };

  const handleClick = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>,
    currentIndex: number,
  ) => {
    selectInput(currentIndex);
  };

  const handlePaste = (
    event: React.ClipboardEvent<HTMLInputElement>,
    currentIndex: number,
  ) => {
    event.preventDefault();
    const clipboardData = event.clipboardData;

    // Check if there is text data in the clipboard
    if (clipboardData.types.includes('text/plain')) {
      let pastedText = clipboardData.getData('text/plain');
      pastedText = pastedText.substring(0, length).trim();
      let indexToEnter = 0;

      while (indexToEnter <= currentIndex) {
        if (inputRefs.current[indexToEnter].value && indexToEnter < currentIndex) {
          indexToEnter += 1;
        } else {
          break;
        }
      }

      const otpArray = value.toString().split('');

      for (let i = indexToEnter; i < length; i += 1) {
        const lastValue = pastedText[i - indexToEnter] ?? ' ';
        otpArray[i] = lastValue;
      }

      onChange(parseInt(otpArray.join('')));
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      {new Array(length).fill(null).map((_, index) => (
        <React.Fragment key={index}>
          <StyledOTPInput
            aria-label={`Digit ${index + 1} of OTP`}
            inputRef={(ele: any) => {
                return inputRefs.current[index] = ele!;
            }}
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(event, index)}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(event, index)}
            onClick={(event: React.MouseEvent<HTMLInputElement, MouseEvent>) => handleClick(event, index)}
            onPaste={(event: React.ClipboardEvent<HTMLInputElement>) => handlePaste(event, index)}
            value={value.toString()[index] ?? ''}
            type='number'
          />
          {index === length - 1 ? null : separator}
        </React.Fragment>
      ))}
    </Box>
  );
}

interface OTPInputProps {
  otp: number | string;
  setOtp: Dispatch<SetStateAction<number | string>>;
}

export default function OTPInput({otp, setOtp}: OTPInputProps) {

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <OTP separator={<span>-</span>} value={otp} onChange={setOtp} length={6} />
    </Box>
  );
}

