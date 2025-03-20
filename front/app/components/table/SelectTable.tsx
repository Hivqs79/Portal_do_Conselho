import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Box, Checkbox, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { useThemeContext } from "@/hooks/useTheme";
import OpacityHex from "@/hooks/OpacityHex";
import { Teacher } from "@/interfaces/Teacher";
import Class from "@/interfaces/Class";
import Search from "@/components/table/Search";
import { useWindowWidth } from "@react-hook/window-size";

interface SelectTableProps {
    selectType: "multiple" | "single";
    name: string;
    rows: Teacher[] | Class[] | undefined;
    value: { [key: string]: boolean } | number | null;
    setSelectedItems?: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
    setRadioSelectedItem?: Dispatch<SetStateAction<number | null>>;
}

export default function SelectTable({ selectType, name, rows, value, setSelectedItems, setRadioSelectedItem }: SelectTableProps) {
    const { primaryColor, backgroundColor, whiteColor, terciaryColor } = useThemeContext();
    const windowWidth = useWindowWidth();

    const handleCheckboxChange = (id: string) => {
        if (setSelectedItems === undefined) return;
        setSelectedItems((prevSelectedItems) => ({
            ...prevSelectedItems,
            [id]: !prevSelectedItems[id],
        }));
    };

    const handleSelectAll = () => {
        if (setSelectedItems === undefined) return;
        setSelectedItems((prevSelectedItems) => ({
            ...prevSelectedItems,
            ...rows?.reduce((acc, row) => ({ ...acc, [row.id]: true }), {}),
        }));
    };

    const handleDisableAll = () => {
        if (setSelectedItems === undefined) return;
        setSelectedItems((prevSelectedItems) => ({
            ...prevSelectedItems,
            ...rows?.reduce((acc, row) => ({ ...acc, [row.id]: false }), {}),
        }));
    };

    const isAllSelected = (Array.isArray(rows) && value) && rows.every((row) => (value as { [key: string]: boolean })[row.id.toString()]);    
    
    return (
        <Box style={{ borderColor: primaryColor, backgroundColor: primaryColor }} className="border-[2px] rounded-big overflow-hidden">
            <Box className="flex justify-between items-center w-full p-6">
                <Box className="flex items-center">
                    {selectType === "multiple" && 
                        <Checkbox 
                            onClick={() => isAllSelected ? handleDisableAll() : handleSelectAll()}
                            checked={!!isAllSelected}
                            className="!mr-2"
                            sx={{
                                "& .MuiSvgIcon-root": {          
                                    fill: terciaryColor,
                                },            
                            }}                      
                        /> 
                    }
                    <Typography variant={windowWidth < 640 ? "md_text_regular" : "xl_text_regular"} color={whiteColor}>{name}</Typography>
                </Box>
                <Box>
                    <Search />
                </Box>
            </Box>
            <Box 
                style={{ backgroundColor: backgroundColor }}
                className="px-2"
            >
                <RadioGroup  
                    className="flex !flex-col !flex-nowrap h-80 max-h-80 px-2 overflow-y-auto"            
                >

                    {Array.isArray(rows) && rows.map((row, i) => (
                        <Box 
                            style={{ borderColor: OpacityHex(primaryColor, 0.2) }} 
                            className={`flex items-centerw-full px-6 py-5 ` + (i !== rows.length - 1 ? "border-b-[1px]" : "")} key={row.id}
                        >
                            {selectType === "multiple" ? (
                                <Checkbox
                                checked={!!(value as { [key: string]: boolean })[row.id]}
                                onChange={() => handleCheckboxChange(row.id.toString())}
                                className="!mr-2"
                                />
                                ) : (
                                    <FormControlLabel 
                                    value={row.id} 
                                    control={
                                        <Radio 
                                        className="!ml-2" 
                                        checked={value === row.id} 
                                        onChange={() => setRadioSelectedItem && setRadioSelectedItem(row.id)}
                                        />
                                    }
                                    className="!mr-2"
                                    label={null} 
                                    />                            
                                    )}
                            <Typography variant={windowWidth < 640 ? "sm_text_regular" : "lg_text_regular"}>{row.name}</Typography>
                        </Box>
                    ))}
                </RadioGroup>
            </Box>
        </Box>
    );
}