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

"use client";
import AutoSaveIndicator from "@/components/AutoSaveIndicator";
import ConfirmChanges from "@/components/modals/ConfirmChanges";
import LoadingModal from "@/components/modals/LoadingModal";
import PreCouncilSection from "@/components/pre-council/PreCouncilSection";
import AccordionTable from "@/components/table/AccordionTable";
import Title from "@/components/Title";
import { useRoleContext } from "@/hooks/useRole";
import { useThemeContext } from "@/hooks/useTheme";
import { TableHeaderButtons } from "@/interfaces/table/header/TableHeaderButtons";
import { TableHeaderContent } from "@/interfaces/table/header/TableHeaderContent";
import TablePreCouncilSectionRow from "@/interfaces/table/row/TablePreCouncilSectionRow";
import { TableRowButtons } from "@/interfaces/table/row/TableRowButtons";
import OpacityHex from "@/utils/OpacityHex";
import { Box, Button, Snackbar, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FillOutPreCouncil() {
  const { backgroundColor, colorByModeSecondary, redDanger, whiteColor } = useThemeContext();
  const { userId, token } = useRoleContext();
  const [sections, setSections] = useState<TablePreCouncilSectionRow[] | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const fixedTopics = ["Supervisores de Curso", "Orientação Pedagógica", "Recursos Pedagógicos", "Auto avaliação da Classe"];
  const [sentRequests, setSentRequests] = useState(false);
  const [idSectionChanged, setIdSectionChanged] = useState<number | null>(null);
  const [editedRows, setEditedRows] = useState<Record<number, TablePreCouncilSectionRow>>({});
  const [isSaved, setSaved] = useState(true);
  const [showSaved, setShowSaved] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);	
  const router = useRouter();

  const setContentSection = (content: string, idSection: number, type: "strengths" | "toImprove") => {
    if (!sections) return;
    setIdSectionChanged(idSection);
    setSections(
      sections.map((row) => {
        if (row.id === idSection) {
          return {
            ...row,
            [type]: content,
          };
        }
        return row;
      })
    );
  };

  const headersTeachers: TableHeaderContent[] = [
    { name: "Professor(a)" },
  ];

  const rowButtonsTeachers: TableRowButtons = {
    setPositiveContent: (content: string, idSection: number) => {
      setContentSection(content, idSection, "strengths");
    },
    setNegativeContent: (content: string, idSection: number) => {
      setContentSection(content, idSection, "toImprove");
    }
  };

  const sendPreCouncil = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_GENERAL_API}/pre-council/finalize/${sections?.[0].preCouncil.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    router.push("/");
  };

  useEffect(() => {
    const fetchSections = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/pre-council/section/leader/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data: TablePreCouncilSectionRow[] = await response.json();
      setSections(data);
    };
    setIsLoading(true);
    fetchSections().then(() => setIsLoading(false)).catch(console.error);
  }, [userId]);

  useEffect(() => {
    if (!idSectionChanged) return;
    debouncedUpdateSection();
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      setSentRequests(false);
    };
  }, [sections]);

  const debouncedUpdateSection = () => {
    if (!sections) return;

    const row = sections.find(row => row.id === idSectionChanged);
    if (!row) return;

    setEditedRows(prev => ({ ...prev, [row.id]: row }));
    setSaved(false);
    if (timeoutId) clearTimeout(timeoutId);
  };

  useEffect(() => {
    if (Object.keys(editedRows).length === 0 || sentRequests) return;

    const debounce = setTimeout(() => {
      const newTimeoutId = setTimeout(async () => {
        const responses = await Promise.all(
          Object.keys(editedRows).map(id => {
            const row = editedRows[parseInt(id)];
            return fetch(`${process.env.NEXT_PUBLIC_URL_GENERAL_API}/pre-council/section/${id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
              body: JSON.stringify({
                preCouncil_id: row.preCouncil.id,
                topic: row.topic,
                description: row.description,
                strengths: row.strengths,
                toImprove: row.toImprove,
              })
            });
          })
        );
        console.log(responses);
        setEditedRows({});
        setSaved(true);
        setSentRequests(true);
      }, 2000);
      setTimeoutId(newTimeoutId);
    }, 500);

    return () => clearTimeout(debounce);
  }, [editedRows]);

  useEffect(() => {
    setShowSaved(true);
    if (isSaved == true) {
      setTimeout(() => {
        setShowSaved(false);
      }, 3000);
    }
  }, [isSaved]);

  return (
    <Box>
      <Title textHighlight="Pré-conselho" />
      <Box style={{ backgroundColor: backgroundColor }} className="outline-component flex flex-col gap-12 p-4">
        {sections && sections.length > 0 ? (
          <>
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
            {sections.map((section, index) => {
              if (!fixedTopics.includes(section.topic)) return null;
              return (
                <PreCouncilSection
                  key={index}
                  title={section.topic}
                  description={section.description}
                  positiveContent={section.strengths}
                  negativeContent={section.toImprove}
                  setPositiveContent={(content: string) => setContentSection(content, section.id, "strengths")}
                  setNegativeContent={(content: string) => setContentSection(content, section.id, "toImprove")}
                />
              );
            })}
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
              content={sections.filter(section => !fixedTopics.includes(section.topic))}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                sections.every(sections => sections.strengths && sections.toImprove) ?
                  setOpenConfirm(true) :
                  setSnackbarMessage("Ainda há tópicos sem preenchimento.");
              }}
            >
              <Typography
                variant={"md_text_regular"}
                color={whiteColor}
              >
                Entregar pré-conselho
              </Typography>
            </Button>
          </>
        ) : (
          <Box className="flex flex-col gap-2">
            <Typography variant="lg_text_regular" className="!text-justify indent-4">
              Nenhum pré-conselho está cadastrado ou dentro do prazo de preenchimento. Volte em outro momento, quando a coordenação pedagógica disponibilizar um pré-conselho.
            </Typography>
          </Box>
        )}
      </Box>
      <Box style={{ backgroundColor: OpacityHex(backgroundColor, 0.4) }} className={"fixed bottom-3 duration-200 p-2 rounded-lg left-8 z-[1000] " + (showSaved ? "opacity-100" : "opacity-0")}>
        <AutoSaveIndicator
          saved={isSaved}
          text={isSaved ? "Salvo" : "Salvando..."}
        />
      </Box>
      <Snackbar
        open={!!snackbarMessage}
        onClose={() => setSnackbarMessage("")}
        autoHideDuration={5000}
        message={snackbarMessage}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: redDanger,
          },
        }}
      />
      {openConfirm && (
        <ConfirmChanges
          type="default"
          title={`Tem certeza que deseja finalizar esse pré-conselho?`}
          description={`Ao confirmar o envio deste pré-conselho, o mesmo será finalizado e não poderá ser mais editado.`}
          confirmButtonText={`Finalizar pré-conselho`}
          onClose={() => setOpenConfirm(false)}
          firstConfirmButton={() => {
            setIsLoading(true);
            setOpenConfirm(false);
            sendPreCouncil();            
          }}
        />
      )}
      {isLoading && <LoadingModal />}
    </Box>
  )
}