import { Button, Typography } from "@mui/material";
import { IconType } from "react-icons";
import Icon from "../Icon";
import { useThemeContext } from "@/hooks/useTheme";

interface TableButtonProps {
    onlyTextInBigSize?: boolean;
    onlyIcon?: boolean;
    icon?: IconType;
    text?: string;
    onClick?: () => void;
}

export default function TableButton ({
    onlyIcon = false,
    onlyTextInBigSize = false,
    icon,
    text,
    onClick
}: TableButtonProps) {
    const {primaryColor, whiteColor} = useThemeContext();


    return (
        <>
            {(!onlyIcon) && (
                <Button variant="contained" color="primary" className="!hidden sm:!flex" onClick={onClick}>
                    <Typography variant="sm_text_bold" color="white">
                        {text}
                    </Typography>
                    {(!onlyTextInBigSize && icon) && <Icon IconPassed={icon} color={whiteColor} className="!ml-2 !w-6 !h-6"/>}                
                </Button>
            )}
            {icon && 
                <Icon 
                    IconPassed={icon} 
                    color={whiteColor} 
                    isButton={true} 
                    colorButton={primaryColor} 
                    classNameButton={ !onlyIcon ? "!block sm:!hidden" : ""}
                    onClick={onClick}
                />
            }
            
        </>
    );
}