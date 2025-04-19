import { Box, Typography } from "@mui/material";
import TableHeader from "./TableHeader";
import AccordionComponent from "../AccordionComponent";
import AvaliationInputs from "../council/AvaliationInputs";
import { useThemeContext } from "@/hooks/useTheme";
import { TableRowPossibleTypes } from "@/interfaces/table/row/TableRowPossibleTypes";
import { TableHeaderContent } from "@/interfaces/table/header/TableHeaderContent";
import { TableHeaderButtons } from "@/interfaces/table/header/TableHeaderButtons";
import { TableRowButtons } from "@/interfaces/table/row/TableRowButtons";
import { Rank as RankType } from "@/interfaces/RankType";
import TableAnnotationRow from "@/interfaces/table/row/TableAnnotationRow";
import { useEffect, useRef } from "react";

interface AccordionTableProps {
  variant: "feedback" | "annotation" | "pre-council";
  headers: TableHeaderContent[];
  headerButtons: TableHeaderButtons;
  rowButtons: TableRowButtons;
  content: TableRowPossibleTypes[] | null;
  handleAccordionClick?: () => void;
}

export default function AccordionTable({
  variant,
  headers,
  headerButtons,
  rowButtons,
  content,
  handleAccordionClick
}: AccordionTableProps) {
  const { colorByModeSecondary } = useThemeContext();

  const tableRef = useRef<HTMLElement | null>(null);
  
    const updateTableSize = () => {
      const element = tableRef.current;
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
      updateTableSize();
    }, [content]);
  
    const accordionClick = () => {
      handleAccordionClick?.();
      setTimeout(() => {
        updateTableSize();
      }, 250);
    };

  return (
    <Box>
      <table className="w-full rounded-t-2xl overflow-hidden">
        <TableHeader
          variant="annotation"
          headers={headers}
          headerButtons={headerButtons}
        />
      </table>

      <Box
        style={{ borderColor: colorByModeSecondary }}
        className="flex flex-col border-[2px] pr-2 border-t-0 rounded-b-big"
        ref={tableRef}
      >
        <Box className="flex flex-col pr-2 max-h-[420px] overflow-y-auto">
          {content && content.length > 0 ? (
            content.map(
              (row: TableRowPossibleTypes, index: number) => {
                return (
                  <Box onClick={accordionClick} key={index}>
                    <AccordionComponent
                      name={"student" in row ? row.student.name : 
                        "topic" in row ? row.topic : ""
                      }
                      frequency={variant === "feedback" ? ("frequency" in row) ? (row.frequency as number | boolean | undefined) : false : false}
                      type="table"
                      outlined={true}
                      key={index}
                      rank={"rank" in row ? row.rank : undefined}
                      onChangeRank={(rank: RankType) => rowButtons.setRank && rowButtons.setRank(rank, (row as TableAnnotationRow).student.id)}
                    >
                      <AvaliationInputs
                        readOnly={variant == "feedback"}
                        Positivecontent={"strengths" in row ? row.strengths : null}
                        Negativecontent={"toImprove" in row ? row.toImprove : null}
                        onPositiveChange={(content: string) => rowButtons.setPositiveContent && 
                          rowButtons.setPositiveContent(content, (row as TableAnnotationRow).student.id)
                        }
                        onNegativeChange={(content: string) => rowButtons.setNegativeContent && 
                          rowButtons.setNegativeContent(content, (row as TableAnnotationRow).student.id)
                        }
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
                Sem conteúdo
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}