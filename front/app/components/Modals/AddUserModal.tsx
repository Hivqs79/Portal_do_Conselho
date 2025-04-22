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

interface AddUserModalProps {
  type: "user" | "pedagogic";
  onClose: () => void;
}

export default function AddUserModal({ type, onClose }: AddUserModalProps) {
  const { role, token, userId } = useRoleContext();
  const [userTerm, setUserTerm] = useState("");
  const [descriptionMessage, setDescriptionMessage] = useState("");
  const [titleMessage, setTitleMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState<any>({
    content: [],
    pageable: { pageNumber: 0 },
    totalPages: 0,
  });
  const { backgroundColor, primaryColor, redDanger } = useThemeContext();

  const fetchUsersToAddANewRoom = async () => {
    if (role === "pedagogic") {
      await fetch(`${process.env.NEXT_PUBLIC_URL_GENERAL_API}/student`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("users data: ", data);
        });
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

  useEffect(() => {
    fetchUsersToAddANewRoom();
  }, []);

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

  const inicializeNewRoom = async (row: TableRowPossibleTypes) => {
    try {
      const response = await fetch(
        "http://localhost:8082/room/findRoomByTwoUsers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ usersId: [userId, row.id] }),
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          console.log("não encontrado teste importante");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.text();

      if (responseData === "Não foi encontrada nenhuma sala") {
        createRoom(userId ? userId : 0, row.id);
      } else {
        setDescriptionMessage("Você não pode iniciar uma nova conversa com essa pessoa pois voce ja esta em uma sala com ela");
        setTitleMessage("Você já está em uma sala com esta pessoa");
        setIsError(true);
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
    await fetch("http://localhost:8082/room", {
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
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        outline: "none",
      }}
    >
      <Box
        onClick={(e) => e.stopPropagation()}
        style={{ backgroundColor: backgroundColor }}
        className="p-5 rounded-lg w-full max-w-[800px] m-5"
      >
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
        {isOpen && (
          <ConfirmMessagesModal
            description={descriptionMessage}
            error={isError}
            title={titleMessage}
          />
        )}
      </Box>
    </Modal>
  );
}
