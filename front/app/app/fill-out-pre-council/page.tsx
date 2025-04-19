"use client";
import PreCouncilSection from "@/components/pre-council/PreCouncilSection";
import Title from "@/components/Title";
import { useThemeContext } from "@/hooks/useTheme";
import { Box, Typography } from "@mui/material";

export default function FillOutPreCouncil() {
    const { backgroundColor, colorByModeSecondary } = useThemeContext();
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
                    {/* <table className="w-full rounded-t-2xl overflow-hidden">
                                        <TableHeader
                                          variant="annotation"
                                          headers={headersStudent}
                                          headerButtons={headerButtonsStudent}
                                        />
                                      </table>
                    
                                      <Box
                                        style={{ borderColor: colorByModeSecondary }}
                                        className="flex flex-col border-[2px] pr-2 border-t-0 rounded-b-big"
                                        ref={studentsAnnotations}
                                      >
                                        <Box className="flex flex-col pr-2 max-h-[420px] overflow-y-auto">
                                          {contentStudent && contentStudent.length > 0 ? (
                                            contentStudent.map(
                                              (row: TableRowPossibleTypes, index: number) => {
                                                if (variant === "feedback") {
                                                  row = row as FeedbackStudent;
                                                } else {
                                                  row = row as TableAnnotationRow;
                                                }
                                                return (
                                                  <Box onClick={handleAccordionClick} key={index}>
                                                    <AccordionComponent
                                                      name={row.student.name}
                                                      frequency={variant === "feedback" ? ("frequency" in row) ? (row.frequency as number | boolean | undefined) : false : false}
                                                      type="table"
                                                      outlined={true}
                                                      key={index}
                                                      rank={row.rank}
                                                      onChangeRank={(rank: RankType) => rowButtonsStudent.setRank && rowButtonsStudent.setRank(rank, (row as TableAnnotationRow).student.id)}
                                                    >
                                                      <AvaliationInputs
                                                        readOnly={variant !== "annotations"}
                                                        Positivecontent={row.strengths}
                                                        Negativecontent={row.toImprove}
                                                        onPositiveChange={(content: string) => rowButtonsStudent.setPositiveStudentContent && rowButtonsStudent.setPositiveStudentContent(content, (row as TableAnnotationRow).student.id)}
                                                        onNegativeChange={(content: string) => rowButtonsStudent.setNegativeStudentContent && rowButtonsStudent.setNegativeStudentContent(content, (row as TableAnnotationRow).student.id)}
                                                        copyButton={true}
                                                        withoutBorder={true}
                                                      />
                                                    </AccordionComponent>
                                                  </Box>
                                                );
                                              }
                                            )
                                          ) : (
                                            <Box className="flex w-full justify-center my-4">
                                              <Typography
                                                variant="lg_text_regular"
                                                color={colorByModeSecondary}
                                              >
                                                Sem anotações
                                              </Typography>
                                            </Box>
                                          )}
                                        </Box>
                                      </Box> */}
                </Box>
            </Box>
        </Box>
    )
}