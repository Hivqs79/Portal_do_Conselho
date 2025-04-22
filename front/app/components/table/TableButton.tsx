import { Button, Tooltip, Typography } from "@mui/material";
import { IconType } from "react-icons";
import Icon from "../Icon";
import { useThemeContext } from "@/hooks/useTheme";

interface TableButtonProps {
  onlyTextInBigSize?: boolean;
  onlyIcon?: boolean;
  icon?: IconType;
  text?: string;
  onClick?: () => void;
  disabled?: boolean;
  tooltip?: string;
  classNameButton?: string;
}

export default function TableButton({
  onlyIcon = false,
  onlyTextInBigSize = false,
  icon,
  text,
  onClick,
  disabled = false,
  tooltip,
  classNameButton = ""
}: TableButtonProps) {
  const { primaryColor, whiteColor } = useThemeContext();

  const buttonContent = (
    <>
      {!onlyIcon && (
        <Button
          variant="contained"
          color={"primary"}
          className={`!hidden sm:!flex w-fit ${classNameButton}`}
          onClick={onClick}
          disabled={disabled}
        >
          <Typography variant="sm_text_bold" color="white">
            {text}
          </Typography>
          {!onlyTextInBigSize && icon && (
            <Icon
              IconPassed={icon}
              color={whiteColor}
              className="!ml-2 !w-6 !h-6"
            />
          )}
        </Button>
      )}
      {icon && (
        <Icon
          IconPassed={icon}
          color={whiteColor}
          isButton={true}
          colorButton={primaryColor}
          classNameButton={!onlyIcon ? "!block sm:!hidden" : ""}
          onClick={onClick}
          disabled={disabled}
        />
      )}
    </>
  );

  return tooltip ? (
    <Tooltip
      title={tooltip}
      arrow
      sx={{
        backgroundColor: primaryColor,
        color: whiteColor,
      }}
    >
      <span>{buttonContent}</span>
    </Tooltip>
  ) : (
    buttonContent
  );
}
