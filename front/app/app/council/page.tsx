"use client";
import SwapButton from "@/components/SwapButton";
import Title from "@/components/Title";
import SelectTable from "@/components/table/SelectTable";
import { Box } from "@mui/material";

export default function Council() {    

    return (
        <Box>
            <Title textHighlight="Planejamento" text="de conselhos"/>
            <SwapButton 
                button1Text={"Adicionar Conselho"} 
                button2Text={"Realizar Conselho"} 
                onClickButton1={() => {}}
                onClickButton2={() => {}}
            />
            <SelectTable />
        </Box>
    )
}