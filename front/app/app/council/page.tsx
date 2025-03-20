"use client";
import SwapButton from "@/components/SwapButton";
import Title from "@/components/Title";
import SelectTable from "@/components/table/SelectTable";
import Class from "@/interfaces/Class";
import { Teacher } from "@/interfaces/Teacher";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";

export default function Council() {     
    const [teachers, setTeachers] = useState<Teacher[]>();
    const [classExistents, setClassExistents] = useState<Class[]>();
    const [selectedClass, setSelectedClass] = useState<number | null>(null);
    const [selectedTeachers, setSelectedTeachers] = useState<{ [key: string]: boolean }>({});


    useEffect(() => {
        const fetchTeachers = async () => {
            const response = await fetch("http://localhost:8081/class/teacher/" + selectedClass);
            const data = await response.json();
            setTeachers(data);
        };
        fetchTeachers();
    }, [selectedClass]);

    useEffect(() => {
        const fetchClass = async () => {
            const response = await fetch("http://localhost:8081/class");
            const data = await response.json();
            setSelectedClass(data.content[0].id);
            setClassExistents(data.content);
        };
        fetchClass();
    }, []);

    return (
        <Box>
            <Title textHighlight="Planejamento" text="de conselhos"/>
            <SwapButton 
                button1Text={"Adicionar Conselho"} 
                button2Text={"Realizar Conselho"} 
                onClickButton1={() => {}}
                onClickButton2={() => {}}
            />
            <SelectTable value={selectedTeachers} setSelectedItems={setSelectedTeachers} name="Lista de professores" rows={teachers} selectType="multiple" />
            <SelectTable value={selectedClass} setRadioSelectedItem={setSelectedClass} name="Lista de Turmas" rows={classExistents} selectType="single" />
            <Button onClick={() => {
                console.log(selectedTeachers);
                console.log(selectedClass);
            }}>
                Teste
            </Button>
        </Box>
    )
}