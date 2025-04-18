"use client";
import { useThemeContext } from "@/hooks/useTheme";
import { Box, Modal, Typography } from "@mui/material";
import { IoClose } from "react-icons/io5";
import Icon from "../Icon";
import AvaliationInputs from "../council/AvaliationInputs";
import TableHeader from "../table/TableHeader";
import { TableHeaderButtons } from "@/interfaces/table/header/TableHeaderButtons";
import { TableHeaderContent } from "@/interfaces/table/header/TableHeaderContent";
import AccordionComponent from "../AccordionComponent";
import TableAnnotationRow from "@/interfaces/table/row/TableAnnotationRow";
import { TableRowPossibleTypes } from "@/interfaces/table/row/TableRowPossibleTypes";
import { useEffect, useRef } from "react";
import { Rank as RankType } from "@/interfaces/RankType";
import FeedbackStudent from "@/interfaces/FeedbackStudent";
import { TableRowButtons } from "@/interfaces/table/row/TableRowButtons";

interface AnnotationsModalProps {
  open: boolean;
  close: () => void;
  variant?: string;
  classPositiveContent: string;
  setClassPositiveContent?: (content: string) => void;
  classNegativeContent: string;
  setClassNegativeContent?: (content: string) => void;
  headersClass: TableHeaderContent[];
  headerButtonsClass: TableHeaderButtons;
  contentStudent: TableRowPossibleTypes[] | null;
  headersStudent: TableHeaderContent[];
  rowButtonsStudent: TableRowButtons;
  headerButtonsStudent: TableHeaderButtons;
}
export default function AnnotationsModal({
  open,
  close,
  variant,
  classPositiveContent,
  setClassPositiveContent,
  classNegativeContent,
  setClassNegativeContent,
  headersClass,
  headerButtonsClass,
  contentStudent,
  headersStudent,
  headerButtonsStudent,
  rowButtonsStudent,
}: AnnotationsModalProps) {
  const { colorByModeSecondary, redDanger, backgroundColor } =
    useThemeContext();
  const studentsAnnotations = useRef<HTMLElement | null>(null);

  const updateStudentsAnnotationsSize = () => {
    const element = studentsAnnotations.current;
    if (element) {
      const elementInside = element.children[0] as HTMLElement;

      if (element.getBoundingClientRect().height <= 420) {
        element.style.paddingRight = "0px";
        if (elementInside) {
          elementInside.style.paddingRight = "0px";
        }
      } else {
        element.style.paddingRight = "4px";
        if (elementInside) {
          elementInside.style.paddingRight = "4px";
        }
      }
    }
  };

  useEffect(() => {
    updateStudentsAnnotationsSize();
  }, [contentStudent]);

  const handleAccordionClick = () => {
    setTimeout(() => {
      updateStudentsAnnotationsSize();
    }, 250);
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        close();
      }}
      className="flex items-center justify-center"
    >
      <Box
        className="py-2 px-4 z-50 mx-4 sm:mx-16 w-full max-w-[950px] rounded-big mt-24"
        style={{ backgroundColor: backgroundColor }}
      >
        <Box className="flex flex-col w-full max-h-[80vh] p-6 overflow-y-auto gap-10">
          <Box className="flex items-center flex-row w-full">
            <Box className="flex flex-col w-full">
              <Typography variant="xl_text_bold" color={colorByModeSecondary}>
                Anotações do conselho
              </Typography>
            </Box>
            <Box className="flex w-fit h-fit gap-1">
              <Box
                onClick={() => {
                  close();
                }}
              >
                <Icon
                  IconPassed={IoClose}
                  color={redDanger}
                  className="size-10"
                />
              </Box>
            </Box>
          </Box>
          <Box className="outline-component">
            <table className="w-full rounded-t-2xl overflow-hidden">
              <TableHeader
                variant="annotation"
                headers={headersClass}
                headerButtons={headerButtonsClass}
              />
            </table>
            <Box
              style={{ borderColor: colorByModeSecondary }}
              className="flex flex-col border-[2px] border-t-0 rounded-b-2xl"
            >
              <AvaliationInputs
                readOnly={variant !== "annotations"}
                Positivecontent={classPositiveContent}
                Negativecontent={classNegativeContent}
                onPositiveChange={setClassPositiveContent}
                onNegativeChange={setClassNegativeContent}
                copyButton={true}
                withoutBorder={true}
              />
              <Box className="p-5">
                <Box>
                  <table className="w-full rounded-t-2xl overflow-hidden">
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
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
