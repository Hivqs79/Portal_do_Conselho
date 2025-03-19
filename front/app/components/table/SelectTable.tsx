import { useThemeContext } from "@/hooks/useTheme";
import { Box } from "@mui/material";

export default function SelectTable() {
    const {primaryColor} = useThemeContext();
    return (
        <>
            <Box style={{ borderColor: primaryColor }} className="border-[2px] rounded-big overflow-hidden">
                <Box style={{backgroundColor: primaryColor}} className="p-4">
                    <h1>Teste</h1>
                </Box>
            </Box>
        </>
    );
}