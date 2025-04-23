"use client";
import EditUserManagement from "@/components/modals/EditUserManagement";
import PaginationTable from "@/components/table/Pagination";
import Table from "@/components/table/Table";
import Title from "@/components/Title";
import { useRoleContext } from "@/hooks/useRole";
import { useThemeContext } from "@/hooks/useTheme";
import { TableHeaderButtons } from "@/interfaces/table/header/TableHeaderButtons";
import { TableHeaderContent } from "@/interfaces/table/header/TableHeaderContent";
import { TableRowButtons } from "@/interfaces/table/row/TableRowButtons";
import { TableRowPossibleTypes } from "@/interfaces/table/row/TableRowPossibleTypes";
import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function UserManagement() {
  const { token } = useRoleContext();
  const [userSelected, setUserSelected] = useState("Aluno");
  const { whiteColor } = useThemeContext();
  const [userData, setUserData] = useState<any>({
    content: [],
    pageable: { pageNumber: 0 },
    totalPages: 0,
  });
  const [userTerm, setUserTerm] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isOpen, setIsOpen] = useState(false);
  const [row, setRow] = useState<any>({});

  const headers: TableHeaderContent[] = [{ name: "Nome" }, { name: "Função" }];

  const headerButtons: TableHeaderButtons = {
    searchInput: true,
    setSearch: (term: string) => {
      setUserTerm(term);
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
    },
  };

  const userRoute = (userSelectedProps: string) => {
    switch (userSelectedProps) {
      case "Aluno":
        return "student";
      case "Professor":
        return "teacher";
      case "Supervisor":
        return "supervisor";
      case "Pedagógico":
        return "pedagogic";
      case "SubPedagógico":
        return "subPedagogic";
      default:
        return userSelectedProps;
    }
  };

  const fetchUsers = async (userSelectedProps: string) => {
    try {
      userSelectedProps = userRoute(userSelectedProps);
      await fetch(
        `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/${userSelectedProps}?page=${
          page - 1
        }&size=${rowsPerPage}&name=${userTerm}`,
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
          setUserData(
            data || { content: [], pageable: { pageNumber: 0 }, totalPages: 0 }
          );
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers(userSelected);
  }, [userTerm, page, rowsPerPage, userSelected]);

  return (
    <Box>
      <Title textHighlight="Gerenciamento" text="de usuários" />
      <Box className="flex justify-between flex-wrap gap-y-5">
        <Select
          value={userSelected}
          size="small"
          onChange={(e) => setUserSelected(e.target.value)}
          sx={{
            minWidth: "200px",
            "& .MuiOutlinedInput-input": {
              paddingTop: "8.5px",
              paddingBottom: "8.5px",
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                borderRadius: "4px",
                marginTop: "4px",
              },
            },
            MenuListProps: {
              sx: {
                padding: "4px",
                "& .MuiMenuItem-root": {
                  justifyContent: "center",
                  paddingLeft: "8.5px",
                  paddingRight: "8.5px",
                },
              },
            },
          }}
        >
          <MenuItem value={"Aluno"}>Aluno</MenuItem>
          <MenuItem value={"Professor"}>Professor</MenuItem>
          <MenuItem value={"Supervisor"}>Supervisor</MenuItem>
          <MenuItem value={"Pedagógico"}>Pedagógico</MenuItem>
          <MenuItem value={"SubPedagógico"}>SubPedagógico</MenuItem>
        </Select>
        <Button
          className="flex flex-row items-center gap-5"
          variant="contained"
        >
          <Typography variant="md_text_regular" color={whiteColor}>
            Adicionar novo {userSelected}
          </Typography>
        </Button>
      </Box>
      <Box className="mt-14">
        <Table
          tableContent={userData ? userData : null}
          headers={headers}
          headerButtons={headerButtons}
          rowButtons={rowButtons}
        />
        <PaginationTable
          count={userData ? userData.totalPages : 0}
          page={userData ? userData.pageable.pageNumber + 1 : 1}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={(rowsPerPage: number) => {
            setRowsPerPage(rowsPerPage);
            setPage(1);
          }}
        />
      </Box>
      {isOpen && (
        <EditUserManagement
          urlUserRole={userRoute(userSelected)}
          content={row}
          onClose={() => setIsOpen(false)}
        />
      )}
    </Box>
  );
}
