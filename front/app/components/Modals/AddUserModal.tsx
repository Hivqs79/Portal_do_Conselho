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

import { useThemeContext } from "@/hooks/useTheme";
import { Box, Modal, Typography } from "@mui/material";
import { IoClose } from "react-icons/io5";
import Icon from "../Icon";
import { useEffect, useState } from "react";
import { useRoleContext } from "@/hooks/useRole";
import Table from "../table/Table";
import { TableHeaderContent } from "@/interfaces/table/header/TableHeaderContent";
import { TableHeaderButtons } from "@/interfaces/table/header/TableHeaderButtons";
import { TableRowButtons } from "@/interfaces/table/row/TableRowButtons";
import { TableRowPossibleTypes } from "@/interfaces/table/row/TableRowPossibleTypes";
import ConfirmMessagesModal from "./ConfirmMessagesModal";
import LoadingModal from "./LoadingModal";
import PaginationTable from "../table/Pagination";

interface AddUserModalProps {
  type: "user" | "pedagogic";
  onClose: () => void;
}

export default function AddUserModal({ type, onClose }: AddUserModalProps) {
  const { role, token, userId } = useRoleContext();
  const [userTerm, setUserTerm] = useState("");
  const [descriptionMessage, setDescriptionMessage] = useState("");
  const [titleMessage, setTitleMessage] = useState("");
  const [studentTerm, setStudentTerm] = useState("");
  const [pageStudent, setPageStudent] = useState(1);
  const [rowsPerPageStudent, setRowsPerPageStudent] = useState(5);
  const [teacherTerm, setTeacherTerm] = useState("");
  const [pageTeacher, setPageTeacher] = useState(1);
  const [rowsPerPageTeacher, setRowsPerPageTeacher] = useState(5);
  const [supervisiorTerm, setSupervisiorTerm] = useState("");
  const [pageSupervisior, setPageSupervisior] = useState(1);
  const [rowsPerPageSupervisior, setRowsPerPageSupervisior] = useState(5);
  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<any>({
    content: [],
    pageable: { pageNumber: 0 },
    totalPages: 0,
  });
  const [studentData, setStudentData] = useState<any>({
    content: [],
    pageable: { pageNumber: 0 },
    totalPages: 0,
  });
  const [teacherData, setTeacherData] = useState<any>({
    content: [],
    pageable: { pageNumber: 0 },
    totalPages: 0,
  });
  const [supervisiorData, setsupervisiorData] = useState<any>({
    content: [],
    pageable: { pageNumber: 0 },
    totalPages: 0,
  });
  const { backgroundColor, primaryColor, redDanger } = useThemeContext();

  const filterUsersWithoutRoom = async (
    users: any[],
    currentUserId: number | undefined
  ) => {
    if (!currentUserId) return [];

    const filteredUsers = await Promise.all(
      users.map(async (user: any) => {
        try {
          const roomResponse = await fetch(
            `${process.env.NEXT_PUBLIC_URL_CHAT_API}/room/findRoomByTwoUsers`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ usersId: [currentUserId, user.id] }),
            }
          );

          const roomData = await roomResponse.text();
          return roomData === "Não foi encontrada nenhuma sala" ? user : null;
        } catch (error) {
          console.error("Error checking room:", error);
          return user;
        }
      })
    );

    return filteredUsers.filter((user) => user !== null);
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/student?page=${
          pageStudent - 1
        }&size=${rowsPerPageStudent}&name=${studentTerm}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!data.content) {
        setStudentData({
          content: [],
          pageable: { pageNumber: 0 },
          totalPages: 0,
        });
        return;
      }

      const validStudents = await filterUsersWithoutRoom(
        data.content,
        userId ? userId : 0
      );

      setStudentData({
        ...data,
        content: validStudents,
        totalElements: validStudents.length,
      });
    } catch (error) {
      console.error("Error fetching students:", error);
      setStudentData({
        content: [],
        pageable: { pageNumber: 0 },
        totalPages: 0,
      });
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/teacher?page=${
          pageTeacher - 1
        }&size=${rowsPerPageTeacher}&name=${teacherTerm}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!data.content) {
        setTeacherData({
          content: [],
          pageable: { pageNumber: 0 },
          totalPages: 0,
        });
        return;
      }

      const validTeachers = await filterUsersWithoutRoom(
        data.content,
        userId ? userId : 0
      );

      setTeacherData({
        ...data,
        content: validTeachers,
        totalElements: validTeachers.length,
      });
    } catch (error) {
      console.error("Error fetching teachers:", error);
      setTeacherData({
        content: [],
        pageable: { pageNumber: 0 },
        totalPages: 0,
      });
    }
  };

  const fetchSupervisior = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/supervisor?page=${
          pageSupervisior - 1
        }&size=${rowsPerPageSupervisior}&name=${supervisiorTerm}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!data.content) {
        setsupervisiorData({
          content: [],
          pageable: { pageNumber: 0 },
          totalPages: 0,
        });
        return;
      }

      const validSupervisors = await filterUsersWithoutRoom(
        data.content,
        userId ? userId : 0
      );

      setsupervisiorData({
        ...data,
        content: validSupervisors,
        totalElements: validSupervisors.length,
      });
    } catch (error) {
      console.error("Error fetching supervisors:", error);
      setsupervisiorData({
        content: [],
        pageable: { pageNumber: 0 },
        totalPages: 0,
      });
    }
  };

  const fetchUsersToAddANewRoom = async () => {
    if (role === "pedagogic" || role === "subpedagogic") {
      await fetchStudents();
      await fetchTeachers();
      await fetchSupervisior();
    } else {
      await fetch(
        `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/pedagogic?name=${userTerm}`,
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
          console.log(data.content);
        });
    }
  };

  console.log("datastudent content: ", studentData);

  useEffect(() => {
    fetchUsersToAddANewRoom();
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [studentTerm, pageStudent, rowsPerPageStudent]);

  useEffect(() => {
    fetchTeachers();
  }, [teacherTerm, pageTeacher, rowsPerPageTeacher]);

  useEffect(() => {
    fetchSupervisior();
  }, [supervisiorTerm, pageSupervisior, rowsPerPageSupervisior]);

  useEffect(() => {
    fetchUsersToAddANewRoom();
  }, [userTerm]);

  const headerButtons: TableHeaderButtons = {
    searchInput: true,
    setSearch: (term: string) => {
      setUserTerm(term);
    },
  };
  const headers: TableHeaderContent[] = [{ name: "Nome" }];
  const rowButtons: TableRowButtons = {
    inicializeButton: true,
    onClickInicialize: async (row: TableRowPossibleTypes) => {
      console.log("row clicked: ", row);
      inicializeNewRoom(row);
    },
  };

  //Student
  const headerButtonsStudent: TableHeaderButtons = {
    searchInput: true,
    setSearch: (term: string) => {
      setStudentTerm(term);
    },
  };

  //Teacher
  const headerButtonsTeacher: TableHeaderButtons = {
    searchInput: true,
    setSearch: (term: string) => {
      setTeacherTerm(term);
    },
  };

  //Supervisior
  const headerButtonsSupervisior: TableHeaderButtons = {
    searchInput: true,
    setSearch: (term: string) => {
      setSupervisiorTerm(term);
    },
  };

  const inicializeNewRoom = async (row: TableRowPossibleTypes) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_CHAT_API}/room/findRoomByTwoUsers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ usersId: [userId, row.id] }),
        }
      );

      if (!response.ok) {
        setIsLoading(false);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.text();

      if (responseData === "Não foi encontrada nenhuma sala") {
        createRoom(userId ? userId : 0, row.id);
      } else {
        setDescriptionMessage(
          "Você não pode iniciar uma nova conversa com essa pessoa pois voce ja esta em uma sala com ela"
        );
        setTitleMessage("Você já está em uma sala com esta pessoa");
        setIsError(true);
        setIsLoading(false);
        setIsOpen(true);
        setTimeout(() => {
          setIsOpen(false);
        }, 3000);
      }
    } catch (error) {
      console.log("Erro na requisição:", error);
    }
  };

  const createRoom = async (firstUserId: number, secondUserId: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_URL_CHAT_API}/room`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usersId: [firstUserId, secondUserId] }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDescriptionMessage("Sala criada com sucesso!");
        setTitleMessage("Você já pode começar a conversar com esta pessoa!");
        setIsError(false);
        setIsLoading(false);
        setIsOpen(true);
        setTimeout(() => {
          onClose();
          setIsOpen(false);
        }, 3000);
      });
  };

  return (
    <Modal
      open
      onClose={onClose}
      sx={{
        display: "flex",
        p: 1,
        zIndex: 1000,
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        outline: "none",
      }}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: backgroundColor }}
        className="p-2 rounded-lg w-full max-w-[800px] m-5 z-[101]"
      >
        <Box  className="p-3 h-full max-h-[800px] overflow-y-scroll">
          <Box className="flex justify-between items-center">
            <Typography variant="lg_text_bold" color={primaryColor}>
              Iniciar uma nova conversa
            </Typography>
            <Box onClick={onClose}>
              <Icon
                IconPassed={IoClose}
                color={redDanger}
                className="cursor-pointer text-[2rem]"
              />
            </Box>
          </Box>
          {type === "user" && (
            <Box className="flex flex-col gap-10 mt-10">
              <Typography variant="lg_text_bold" color={primaryColor}>
                Você só pode iniciar uma conversa com alguém do pedagógico
              </Typography>
              <Table
                withoutOutline
                tableContent={userData ? userData : null}
                headers={headers}
                headerButtons={headerButtons}
                rowButtons={rowButtons}
              />
            </Box>
          )}
          {type === "pedagogic" && (
            <Box className="flex flex-col gap-5 mt-10">
              <Typography variant="lg_text_bold" color={primaryColor}>
                Alunos:
              </Typography>
              <Table
                withoutOutline
                tableContent={studentData ? studentData : null}
                headers={headers}
                headerButtons={headerButtonsStudent}
                rowButtons={rowButtons}
              />
              <PaginationTable
                count={studentData ? studentData.totalPages : 0}
                page={studentData ? studentData.pageable.pageNumber + 1 : 1}
                setPage={setPageStudent}
                rowsPerPage={rowsPerPageStudent}
                setRowsPerPage={(rowsPerPage: number) => {
                  setRowsPerPageStudent(rowsPerPage);
                  setPageStudent(1);
                }}
              />
              <Typography variant="lg_text_bold" color={primaryColor}>
                Professores:
              </Typography>
              <Table
                withoutOutline
                tableContent={teacherData ? teacherData : null}
                headers={headers}
                headerButtons={headerButtonsTeacher}
                rowButtons={rowButtons}
              />
              <PaginationTable
                count={teacherData ? teacherData.totalPages : 0}
                page={teacherData ? teacherData.pageable.pageNumber + 1 : 1}
                setPage={setPageTeacher}
                rowsPerPage={rowsPerPageTeacher}
                setRowsPerPage={(rowsPerPage: number) => {
                  setRowsPerPageTeacher(rowsPerPage);
                  setPageTeacher(1);
                }}
              />
              <Typography variant="lg_text_bold" color={primaryColor}>
                Supervisores:
              </Typography>
              <Table
                withoutOutline
                tableContent={supervisiorData ? supervisiorData : null}
                headers={headers}
                headerButtons={headerButtonsSupervisior}
                rowButtons={rowButtons}
              />
              <PaginationTable
                count={supervisiorData ? supervisiorData.totalPages : 0}
                page={
                  supervisiorData ? supervisiorData.pageable.pageNumber + 1 : 1
                }
                setPage={setPageSupervisior}
                rowsPerPage={rowsPerPageSupervisior}
                setRowsPerPage={(rowsPerPage: number) => {
                  setRowsPerPageSupervisior(rowsPerPage);
                  setPageSupervisior(1);
                }}
              />
            </Box>
          )}
          {isOpen && (
            <ConfirmMessagesModal
              description={descriptionMessage}
              error={isError}
              title={titleMessage}
            />
          )}
          {isLoading && <LoadingModal />}
        </Box>
      </Box>
    </Modal>
  );
}
