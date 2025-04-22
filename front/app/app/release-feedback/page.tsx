"use client";
import AnnotationsModal from "@/components/modals/AnnotationsModal";
import SwapButton from "@/components/SwapButton";
import PaginationTable from "@/components/table/Pagination";
import Table from "@/components/table/Table";
import Title from "@/components/Title";
import FeedbackClass from "@/interfaces/feedback/FeedbackClass";
import FeedbackStudent from "@/interfaces/feedback/FeedbackStudent";
import { TableHeaderButtons } from "@/interfaces/table/header/TableHeaderButtons";
import { TableHeaderContent } from "@/interfaces/table/header/TableHeaderContent";
import TableFeedbackRow from "@/interfaces/table/row/TableFeedbackRow";
import { TableRowButtons } from "@/interfaces/table/row/TableRowButtons";
import { TableRowPossibleTypes } from "@/interfaces/table/row/TableRowPossibleTypes";
import { TableContent } from "@/interfaces/table/TableContent";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import PreCouncilModal from "@/components/pre-council/PreCouncilModal";
import TablePreCouncilRow from "@/interfaces/table/row/TablePreCouncilRow";
import FeedbackUser from "@/interfaces/feedback/FeedbackUser";
import AutoSaveIndicator from "@/components/AutoSaveIndicator";
import OpacityHex from "@/utils/OpacityHex";
import { useThemeContext } from "@/hooks/useTheme";
import { release } from "os";

export default function ReleaseFeedback() {
  const {backgroundColor} = useThemeContext();
  const [feedbacks, setFeedbacks] = useState<TableContent | null>(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [feedbackSearch, setFeedbackSearch] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [studentTerm, setStudentTerm] = useState<string>("");
  const [studentContent, setStudentContent] = useState<TableRowPossibleTypes[]>();
  const [councilId, setCouncilId] = useState<number>(0);
  const [classContent, setClassContent] = useState<FeedbackClass>();
  const [releaseCouncilPage, setReleaseCouncilPage] = useState<boolean>(true);
  const [preCouncils, setPreCouncils] = useState<TableContent | null>(null);
  const [preCouncilId, setPreCouncilId] = useState<number>(0);
  const [preCouncilFeedbacks, setPreCouncilFeedbacks] = useState<FeedbackUser[]>([]);
  const [idFeedbackChanged, setIdFeedbackChanged] = useState<number | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [sentRequests, setSentRequests] = useState(false);
  const [editedRows, setEditedRows] = useState<Record<number, FeedbackUser>>({});
  const [isSaved, setSaved] = useState(true);
  const [showSaved, setShowSaved] = useState(false);
  const [releasePreCouncilFeedback, setReleasePreCouncilFeedback] = useState<boolean>(false);

  useEffect(() => {
    try {
      const fetchFeedbacks = async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/feedbacks/class?isReturned=false&page=${page - 1}&size=${rowsPerPage}&className=${feedbackSearch}`
        );
        console.log("Response:", feedbackSearch);
        const data = await response.json();
        console.log("THIS data", data)
        setFeedbacks(data);
      };
      fetchFeedbacks();
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }, [page, rowsPerPage, feedbackSearch]);

  useEffect(() => {
    try {
      const fetchPreCouncils = async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/pre-council?answered=true&page=${page - 1}&size=${rowsPerPage}&className=${feedbackSearch}`
        );
        const data = await response.json();
        setPreCouncils(data);
      };
      fetchPreCouncils();
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }, [page, rowsPerPage]);

  useEffect(() => {
    const fetchReleasePreCouncil = async () => {
      const responses = await Promise.all (
        preCouncilFeedbacks.map((preCouncilFeedback) => {          
          return fetch(
            `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/feedbacks/user/return/${preCouncilFeedback.id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        })
      );
      console.log(responses);
    }
    if (releasePreCouncilFeedback && preCouncilFeedbacks.length > 0) {
      fetchReleasePreCouncil();
      setReleasePreCouncilFeedback(false);
    }
  }, [releasePreCouncilFeedback, preCouncilFeedbacks])

  const rowButtonsCouncil: TableRowButtons = {
    rankVisualizer: true,
    releaseButton: true,
    visualizeIconButton: true,
    onClickVisualize: async (row: TableRowPossibleTypes) => {
      setIsOpen(true);
      console.log("Row clicked:", row);
      setClassContent(row as FeedbackClass);
      const councilId = (row as TableFeedbackRow).council.id;
      setCouncilId(councilId);
      console.log("councilId", councilId);
    },
    onClickRelease: async () => {
    },
  };

  const rowButtonsPreCouncil: TableRowButtons = {
    releaseButton: true,
    visualizeIconButton: true,
    onClickVisualize: async (row: TableRowPossibleTypes) => {
      setIsOpen(true);
      console.log("Row clicked:", row);
      const preCouncilId = (row as TablePreCouncilRow).id;
      setPreCouncilId(preCouncilId);
      console.log("preCouncilId", preCouncilId);
    },
    onClickRelease: async (row: TableRowPossibleTypes) => {
      setPreCouncilId((row as TablePreCouncilRow).id);
      setReleasePreCouncilFeedback(true);
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/feedbacks/student?isReturned=false&councilId=${councilId}&studentName=${studentTerm}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("alunos: ", data.content);
        if (data.content.length > 0) {
          const frequency = "frequency" in data.content[0] ? data.content[0].frequency : null;
          console.log("frequency", frequency);
        }
        setStudentContent(data.content as FeedbackStudent[]);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, [councilId, studentTerm]);

  useEffect(() => {
    const fetchFeedbackUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/feedbacks/user?isReturned=false&preCouncilId=${preCouncilId}`
        );
        const data = await response.json();
        console.log("data", data);
        setPreCouncilFeedbacks(data.content as FeedbackUser[]);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    }
    fetchFeedbackUsers();
  }, [preCouncilId]);

  const headerButtonsClass: TableHeaderButtons = {
    rank: "EXCELLENT",
    rankVisualizer: true,
    rankText: "Classificação da Turma",
  };

  const headersClass: TableHeaderContent[] = [{ name: `Turma: ${classContent?.council.aclass.name}` }];

  const headerButtonsStudent: TableHeaderButtons = {
    searchInput: true,
    setSearch: (term: string) => {
      setStudentTerm(term);
      setPage(1);
    },
  };

  const headerStudent: TableHeaderContent[] = [
    { name: "Aluno" },
    { name: "Frequência" },
  ];

  const rowButtonsStudent: TableRowButtons = {
    rankVisualizer: true,
    visualizeButton: true,
  };

  const headerButtons: TableHeaderButtons = {
    searchInput: true,
    setSearch: (term: string) => setFeedbackSearch(term),
    orderButton: true,
    filterButton: true,
  };

  const headersCouncil: TableHeaderContent[] = [
    { name: "Turma" },
    { name: "Data" },
    { name: "Horário" },
  ];

  const headersPreCouncil: TableHeaderContent[] = [
    { name: "Turma" },
    { name: "Data" },
    { name: "Data final" },
  ];

  useEffect(() => {
    setPage(1);
    setRowsPerPage(5);
    setFeedbackSearch("");
    setIsOpen(false);
  }, [releaseCouncilPage]);

  const setContentSection = (content: string, idFeedback: number, type: "strengths" | "toImprove") => {
    if (!preCouncilFeedbacks || !(preCouncilFeedbacks?.length > 0)) return;
    setIdFeedbackChanged(idFeedback);
    setPreCouncilFeedbacks(
      preCouncilFeedbacks.map((row) => {
        if (row.id === idFeedback) {
          return {
            ...row,
            [type]: content,
          };
        }
        return row;
      })
    );
  };

  const rowButtonsFeedbacks: TableRowButtons = {
    setPositiveContent: (content: string, idFeedback: number) => {
      setContentSection(content, idFeedback, "strengths");
    },
    setNegativeContent: (content: string, idFeedback: number) => {
      setContentSection(content, idFeedback, "toImprove");
    }
  };

  useEffect(() => {
    if (!idFeedbackChanged) return;
    debouncedUpdateSection();
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      setSentRequests(false);
    };
  }, [preCouncilFeedbacks]);

  const debouncedUpdateSection = () => {
    if (!preCouncilFeedbacks) return;

    const row = preCouncilFeedbacks.find(row => row.id === idFeedbackChanged);
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
            return fetch(`${process.env.NEXT_PUBLIC_URL_GENERAL_API}/feedbacks/user/${id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                pre_council_id: row.preCouncil.id,
                strengths: row.strengths,
                toImprove: row.toImprove,
                user_id: row.user.id,
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
      <Title textHighlight="Liberação" text="de feedbacks" />
      <SwapButton
        button1Text="Conselhos"
        button2Text="Pré-conselhos"
        onClickButton1={() => setReleaseCouncilPage(true)}
        onClickButton2={() => setReleaseCouncilPage(false)}
      />
      <Table
        tableContent={releaseCouncilPage ? feedbacks : preCouncils}
        headers={releaseCouncilPage ? headersCouncil : headersPreCouncil}
        headerButtons={headerButtons}
        rowButtons={releaseCouncilPage ? rowButtonsCouncil : rowButtonsPreCouncil}
      />
      <PaginationTable
        count={releaseCouncilPage ? (feedbacks ? feedbacks.totalPages : 0) : (preCouncils ? preCouncils.totalPages : 0)}
        page={releaseCouncilPage ? (feedbacks ? feedbacks.pageable.pageNumber + 1 : 1) : (preCouncils ? preCouncils.pageable.pageNumber + 1 : 1)}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={(rowsPerPage: number) => {
          setRowsPerPage(rowsPerPage);
          setPage(1);
        }}
      />
      <AnnotationsModal
        open={isOpen && releaseCouncilPage}
        close={() => setIsOpen(false)}
        classNegativeContent={classContent?.toImprove ?? ""}
        classPositiveContent={classContent?.strengths ?? ""}
        contentStudent={studentContent ? studentContent : null}
        headerButtonsClass={headerButtonsClass}
        headerButtonsStudent={headerButtonsStudent}
        headersClass={headersClass}
        headersStudent={headerStudent}
        rowButtonsStudent={rowButtonsStudent}
        variant="feedback"
        readOnly={true}
      />
      <PreCouncilModal
        open={isOpen && !releaseCouncilPage}
        close={() => setIsOpen(false)}
        preCouncilSections={preCouncilFeedbacks}
        message="Estes são os feedbacks que os alunos escreveram, caso queria ajustar algo de forma a não prejudicar o intuito inicial, apenas de modo a refinar a mensagem ou a evitar posíveis má interpretações."
        rowButtons={rowButtonsFeedbacks}
      />
      <Box style={{ backgroundColor: OpacityHex(backgroundColor, 0.4) }} className={"fixed bottom-3 duration-200 p-2 rounded-lg left-8 z-[1000] " + (showSaved ? "opacity-100" : "opacity-0")}>
        <AutoSaveIndicator
          saved={isSaved}
          text={isSaved ? "Salvo" : "Salvando..."}
        />
      </Box>
    </Box>
  );
}
