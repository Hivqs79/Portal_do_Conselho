"use client";
import FeedbackModal from "@/components/modals/FeedbackModal";
import PaginationTable from "@/components/table/Pagination";
import Table from "@/components/table/Table";
import Title from "@/components/Title";
import { useRoleContext } from "@/hooks/useRole";
import FeedbackClass from "@/interfaces/feedback/FeedbackClass";
import FeedbackStudent from "@/interfaces/feedback/FeedbackStudent";
import FeedbackUser from "@/interfaces/feedback/FeedbackUser";
import { TableHeaderButtons } from "@/interfaces/table/header/TableHeaderButtons";
import { TableHeaderContent } from "@/interfaces/table/header/TableHeaderContent";
import { TableRowButtons } from "@/interfaces/table/row/TableRowButtons";
import { TableRowPossibleTypes } from "@/interfaces/table/row/TableRowPossibleTypes";
import { TableContent } from "@/interfaces/table/TableContent";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {
  const [page, setPage] = useState(1);
  const { token } = useRoleContext();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableContent, setTableContent] = useState<TableContent | null>(null);
  const { role, userId } = useRoleContext();
  const [open, setOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<
    FeedbackUser | FeedbackStudent | null
  >(null);
  const [feedbackClass, setFeedbackClass] = useState<FeedbackClass | null>(
    null
  );
  const [satisfied, setSatisfied] = useState<boolean | null>(null);
  const [councilId, setCouncilId] = useState<number>(-1);
  const [searchFeedbackClass, setSearchFeedbackClass] = useState<string>("");

  const headerButtons: TableHeaderButtons = {
    searchInput: true,
    orderButton: true,
    filterButton: true,
    setSearch(term: string) {
      setSearchFeedbackClass(term);
    },
  };

  const headers: TableHeaderContent[] = [
    {
      name: "Turma",
    },
    {
      name: "Data",
    },
    {
      name: "Horário",
    },
  ];
  const headersFeedbackClass: TableHeaderContent[] = [
    {
      name: "Feedback da turma",
    },
  ];

  const headersFeedback: TableHeaderContent[] = [
    {
      name: "Seu feedback",
    },
  ];

  useEffect(() => {
    const fetchFeedbackClass = async () => {
      if (!selectedFeedback || councilId == -1) return;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/feedbacks/class/council/${councilId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setCouncilId(-1);
      setFeedbackClass(data);
    };
    fetchFeedbackClass();
  }, [selectedFeedback, councilId]);

  const rowButtons: TableRowButtons = {
    visualizeButton: true,
    onClickVisualize(row: TableRowPossibleTypes) {
      setSelectedFeedback(row as FeedbackUser | FeedbackStudent);
      setSatisfied((row as FeedbackUser | FeedbackStudent).satisfied);
      if (role === "student" || role === "leader") {
        setCouncilId((row as FeedbackUser | FeedbackStudent).council.id);
      }
      setOpen(true);
    },
  };

  useEffect(() => {
    const fetchTableContent = async () => {
      if (!userId || role === "admin") return;
      const typeOfRequest =
        role === "student" || role === "leader" ? "student" : "user";
      const response = await fetch(
        `${
          process.env.NEXT_PUBLIC_URL_GENERAL_API
        }/feedbacks/${typeOfRequest}/${typeOfRequest}-id/${userId}?isReturned=true&page=${
          page - 1
        }&size=${rowsPerPage}&className=${searchFeedbackClass}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setTableContent(data);
    };
    fetchTableContent();
  }, [open, page, rowsPerPage, searchFeedbackClass]);

  const fetchChangeSatisfied = async (satisfied: boolean) => {
    if (!selectedFeedback) return;
    const typeOfRequest =
      role === "student" || role === "leader" ? "student" : "user";
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/feedbacks/${typeOfRequest}/${selectedFeedback.id}/satisfied/${satisfied}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response;
    console.log(data);
  };

  const isNotAdmin = role !== "admin";

  return (
    <Box>
      <Title isWelcomeMensage={true} />
      {isNotAdmin ? (
        <>
          <Box className="!mb-6">
            <Typography variant="h6_title">Últimos feedbacks</Typography>
          </Box>
          <Table
            tableContent={tableContent}
            headers={headers}
            headerButtons={headerButtons}
            rowButtons={rowButtons}
          />
          <PaginationTable
            page={page}
            setPage={setPage}
            count={tableContent ? tableContent.totalElements : 1}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={(rowsPerPage: number) => {
              setRowsPerPage(rowsPerPage);
              setPage(1);
            }}
          />
          <FeedbackModal
            open={open}
            close={() => {
              setOpen(false);
              setSelectedFeedback(null);
              setSatisfied(null);
              setFeedbackClass(null);
            }}
            feedbackClass={feedbackClass}
            headersClass={headersFeedbackClass}
            feedback={selectedFeedback}
            headers={headersFeedback}
            satisfied={satisfied}
            setSatisfied={(satisfied: boolean) => {
              setSatisfied(satisfied);
              fetchChangeSatisfied(satisfied);
            }}
          />
        </>
      ) : (
        <>
          <Typography variant="lg_text_regular">
            Como administrador, você possui privilégios exclusivos, o que exige
            atenção especial ao utilizar o sistema. Por favor, siga as
            diretrizes abaixo:
          </Typography>
          <Box className="flex ml-4 mt-4">
            <ul className="flex flex-col list-disc ml-4">
              <li>
                <Typography variant="lg_text_regular">
                  Certifique-se de que nenhuma informação pessoal seja exibida
                  no sistema.
                </Typography>
              </li>
              <li>
                <Typography variant="lg_text_regular">
                  Evite compartilhar suas credenciais de acesso com outros
                  usuários.
                </Typography>
              </li>
              <li>
                <Typography variant="lg_text_regular">
                  Garanta que todas as alterações feitas no sistema sejam
                  devidamente documentadas.
                </Typography>
              </li>
              <li>
                <Typography variant="lg_text_regular">
                  Mantenha a confidencialidade das informações sensíveis
                  acessadas por você.
                </Typography>
              </li>
              <li>
                <Typography variant="lg_text_regular">
                  Relate imediatamente qualquer comportamento suspeito ou acesso
                  não autorizado ao sistema.
                </Typography>
              </li>
            </ul>
          </Box>
        </>
      )}
    </Box>
  );
}
