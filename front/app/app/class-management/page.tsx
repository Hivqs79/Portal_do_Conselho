"use client";
import ConfirmChanges from "@/components/modals/ConfirmChanges";
import CreateClassModal from "@/components/modals/CreateClassModal";
import EditClassModal from "@/components/modals/EditClassModal";
import LoadingModal from "@/components/modals/LoadingModal";
import PaginationTable from "@/components/table/Pagination";
import Table from "@/components/table/Table";
import Title from "@/components/Title";
import { useRoleContext } from "@/hooks/useRole";
import { useThemeContext } from "@/hooks/useTheme";
import { TableHeaderButtons } from "@/interfaces/table/header/TableHeaderButtons";
import { TableHeaderContent } from "@/interfaces/table/header/TableHeaderContent";
import { TableRowButtons } from "@/interfaces/table/row/TableRowButtons";
import { TableRowPossibleTypes } from "@/interfaces/table/row/TableRowPossibleTypes";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function ClassManagement() {
  const { token } = useRoleContext();
  const [classData, setClassData] = useState<any>({
    content: [],
    pageable: { pageNumber: 0 },
    totalPages: 0,
  });
  const [classTerm, setClassTerm] = useState<string>("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [addClassOpen, setAddClassOpen] = useState(false);
  const [row, setRow] = useState<any>({});
  const { whiteColor } = useThemeContext();

  const headers: TableHeaderContent[] = [{ name: "Nome" }];

  const headerButtons: TableHeaderButtons = {
    searchInput: true,
    setSearch: (term: string) => {
      setClassTerm(term);
      setPage(1);
    },
  };

  const rowButtons: TableRowButtons = {
    editButton: true,
    deleteButton: true,
    onClickEdit: async (row: TableRowPossibleTypes) => {
      console.log("visualize: ", row);
      setRow(row);
      setIsOpen(true);
    },
    onClickDelete: async (row: TableRowPossibleTypes) => {
      console.log("delete: ", row);
      setRow(row);
      setConfirm(true);
    },
  };

  const fetchClass = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/class?page=${
        page - 1
      }&size=${rowsPerPage}&className=${classTerm}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setClassData(data);
      });
  };

  useEffect(() => {
    fetchClass();
  }, [page, rowsPerPage, classTerm]);

  const handleFetchClass = () => {
    fetchClass();
  };

  const deleteClass = async (classId: number) => {
    console.log("CLASSE DELETADA: ", classId);
    setIsLoading(true);
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/class/${classId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchClass();
      setConfirm(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("Class dadta: ", classData);

  return (
    <Box>
      <Title textHighlight="Gerenciamento" text="de turmas" />
      <Box>
        <Box className="mb-14">
          <Button onClick={() => setAddClassOpen(true)} variant="contained">
            <Typography variant="lg_text_bold" color={whiteColor}>
              Adicionar nova turma
            </Typography>
          </Button>
        </Box>
        <Table
          tableContent={classData}
          headers={headers}
          headerButtons={headerButtons}
          rowButtons={rowButtons}
        />
        <PaginationTable
          count={classData ? classData.totalPages : 0}
          page={classData ? classData.pageable.pageNumber + 1 : 1}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={(rowsPerPage: number) => {
            setRowsPerPage(rowsPerPage);
            setPage(1);
          }}
        />
        {}
      </Box>
      {isLoading && <LoadingModal />}
      {confirm && (
        <ConfirmChanges
          onClose={() => setConfirm(false)}
          confirmButtonText="Continuar"
          title="Você tem certeza que deseja apagar esta Turma?"
          description="Ao fazer isso você irá remover a turma do sistema e não poderá recupera-la."
          confirmColor="red"
          confirmText={`Remover ${row?.name}`}
          secondDescription="Para confirmar, digite o texto abaixo"
          secondConfirmButton={() => deleteClass(row.id)}
          type="confirmText"
        />
      )}
      {isOpen && (
        <EditClassModal
          onClose={() => setIsOpen(false)}
          content={row}
          handleFetchClass={handleFetchClass}
        />
      )}
      {addClassOpen && (
        <CreateClassModal
          handleFetchClass={handleFetchClass}
          onClose={() => setAddClassOpen(false)}
        />
      )}
    </Box>
  );
}
