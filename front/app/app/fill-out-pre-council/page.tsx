"use client";
import PreCouncilSection from "@/components/pre-council/PreCouncilSection";
import AccordionTable from "@/components/table/AccordionTable";
import Title from "@/components/Title";
import { useThemeContext } from "@/hooks/useTheme";
import { TableHeaderButtons } from "@/interfaces/table/header/TableHeaderButtons";
import { TableHeaderContent } from "@/interfaces/table/header/TableHeaderContent";
import { TableRowButtons } from "@/interfaces/table/row/TableRowButtons";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function FillOutPreCouncil() {
    const { backgroundColor, colorByModeSecondary } = useThemeContext();

    const headersTeachers: TableHeaderContent[] = [
        { name: "Professor(a)" },
    ];

    const rowButtonsTeachers: TableRowButtons = {
        setPositiveContent: (content: string, idTeacher: number) => {
            if (!selectedStudents) return;
            setIdStudentChanged(idTeacher);
            setSelectedStudents(
                selectedStudents.map((row) => {
                    if (row.student.id === idTeacher) {
                        return {
                            ...row,
                            strengths: content,
                        };
                    }
                    return row;
                })
            );
        },
        setNegativeContent: (content: string, idTeacher: number) => {
            if (!selectedStudents) return;
            setIdStudentChanged(idTeacher);
            setSelectedStudents(
                selectedStudents.map((row) => {
                    if (row.student.id === idTeacher) {
                        return {
                            ...row,
                            toImprove: content,
                        };
                    }
                    return row;
                })
            );
        },
    };

    useEffect(() => {
        const fetchSections = async () => {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/annotations/student?councilId=${councilId}&teacherId=${teacherId}&studentName=${studentSearch}`
            );
            const data = await response.json();
            setSelectedStudents(data.content);
        };
        if (!selectedAnnotation) return;
        fetchStudentAnnotations(
            selectedAnnotation.council.id,
            selectedAnnotation.teacher.id
        );
    }, [selectedAnnotation?.id, studentSearch]);

    return (
        <Box>
            <Title textHighlight="Pré-conselho" />
            <Box style={{ backgroundColor: backgroundColor }} className="outline-component flex flex-col gap-12 p-4">
                <Box className="flex flex-col gap-2">
                    <Typography variant="lg_text_bold" color={colorByModeSecondary}>
                        Prezados Estudantes,
                    </Typography>
                    <Typography variant="lg_text_regular" className="!text-justify indent-4">
                        O pré-conselho tem por finalidade identificar os fatores que impactam no processo de ensino e de
                        aprendizagem buscando a melhoria do mesmo. Considera-se a participação dos estudantes
                        importante porque de forma coletiva farão suas considerações sobre os itens elencados,
                        prevalecendo as considerações apontadas pela maioria.
                    </Typography>
                    <Typography variant="lg_text_regular" className="!text-justify indent-4">
                        O pré-conselho está no momento de ser preenchido, então se reuna com sua turma e discutam os tópicos abaixo.
                    </Typography>
                </Box>
                <PreCouncilSection
                    title="Tópico 1"
                    description="Disseminação de Informações, disponibilidade para atendimento,tratamento das solicitações, planejamento e acompanhamento do processo de ensino e aprendizagem."
                />
                <PreCouncilSection
                    title="Tópico 2"
                    description="Planejamento e acompanhamento do processo de ensino e aprendizagem."
                />
                <PreCouncilSection
                    title="Tópico 3"
                    description="Planejamento e acompanhamento do processo de ensino e aprendizagem."
                />
                <Box className="flex flex-col gap-2">
                    <Typography variant="lg_text_bold" color={colorByModeSecondary}>
                        Professores
                    </Typography>
                    <Typography variant="md_text_regular" className="!text-justify indent-4">
                        Docentes Conteúdo da Unidade Curricular, teoria x prática. Organização e Planejamento das
                        aulas. Domínio do docente em desenvolver as capacidades relacionadas aos conteúdos.
                        Relacionamento Professor X Aluno. Apresenta descrição da aula e organização do conteúdo no
                        ambiente virtual, critérios de avaliação claros, as atividades e conteúdos propostos são
                        coerentes ao tempo de aula.
                    </Typography>
                </Box>
                <AccordionTable
                    variant="pre-council"
                    headers={headersTeachers}
                    headerButtons={[] as TableHeaderButtons}
                    rowButtons={rowButtonsTeachers}
                    content={null}
                />
            </Box>
        </Box>
    )
}