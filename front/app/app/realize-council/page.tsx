"use client";
import AvaliationInputs from "@/components/council/AvaliationInputs";
import CommentariesModal from "@/components/Modals/CommentariesModal";
import ConfirmChanges from "@/components/Modals/ConfirmChanges";
import ConfirmMessagesModal from "@/components/Modals/ConfirmMessagesModal";
import LoadingModal from "@/components/Modals/LoadingModal";
import StudentCouncilForm from "@/components/StudentCouncilForm";
import TableHeader from "@/components/table/TableHeader";
import Title from "@/components/Title";
import { Decryptor } from "@/encryption/Decryptor";
import { Encryptor } from "@/encryption/Encryptor";
import OpacityHex from "@/utils/OpacityHex";
import { useThemeContext } from "@/hooks/useTheme";
import { Box, Button, Typography } from "@mui/material";
import { useWindowWidth } from "@react-hook/window-size";
import { useState, useEffect } from "react";

type UserComment = {
  name: string;
  rank: string;
  positiveContent: string;
  negativeContent: string;
};

type User = {
  id: number;
  name: string;
  email: string;
  isRepresentant: boolean;
  lastRank: string | null;
  createDate: string;
  updateDate: string;
};

type CouncilClass = {
  name: string;
  teacherAnotations: TeacherAnnotation[];
};

type CouncilData = {
  id: number;
  startDateTime: string;
  teachers: Teacher[];
  createDate: string;
  updateDate: string;
  aclass: {
    id: number;
    name: string;
    area: string;
    course: string;
    lastRank: string | null;
    createDate: string;
    updateDate: string;
  };
  className: string;
};

type Teacher = {
  id: number;
  name: string;
  email: string;
  createDate: string;
  updateDate: string;
};

export default function RealizeCouncil() {
  const [data, setData] = useState<CouncilData | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
  const [positiveContent, setPositiveContent] = useState("");
  const [negativeContent, setNegativeContent] = useState("");

  const [positiveClassContent, setPositiveClassContent] = useState("");
  const [negativeClassContent, setNegativeClassContent] = useState("");
  const [actualRank, setActualRank] = useState<
    "none" | "average" | "excellent" | "good" | "critical"
  >("none");
  const windowSize = useWindowWidth();
  const [isModalTeacherOpen, setIsModalTeacherOpen] = useState(false);
  const [isModalStudentOpen, setIsModalStudentOpen] = useState(false);
  const [isCancelCouncilOpen, setIsCancelCouncilOpen] = useState(false);
  const [isRealizelCouncilOpen, setIsRealizeCouncilOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isLoadingOpen, setIsLoadingOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState<{
    title: string;
    message: string;
    error: boolean;
  }>({
    title: "",
    message: "",
    error: false,
  });
  const {
    constrastColor,
    backgroundColor,
    colorByModeSecondary,
    whiteColor,
    textBlackolor,
  } = useThemeContext();

  useEffect(() => {
    const councilDataInicialize = localStorage.getItem("councilDataInicialize");

    if (councilDataInicialize) {
      try {
        const parsedData = JSON.parse(councilDataInicialize);
        if (parsedData && parsedData.aclass && parsedData.teachers) {
          localStorage.setItem("className", parsedData.aclass.name);

          const fetchUsers = async () => {
            const users = await fetchUsersInClass(parsedData.aclass.id);
            console.log("Usuarios recebidos: ", users);
            setUsers(users);
          };

          fetchUsers();

          setData(parsedData);
          console.log("Dados carregados:", parsedData);
        } else {
          console.error("Estrutura de dados inválida");
        }
      } catch (error) {
        console.error("Erro ao parsear dados:", error);
      }
    } else {
      console.log("Nenhum dado encontrado no localStorage");
    }
  }, []);

  const fetchUsersInClass = async (idClass: number) => {
    try {
      const response = await fetch(
        "http://localhost:8081/class/student/" + idClass
      );
      const users = await response.json();
      return users;
    } catch (error) {
      console.log("Erro ao realizar a requisição dos alunos da turma: ", error);
    }
  };

  useEffect(() => {
    console.log("Valor atualizado de data:", data);
    console.log("Class name: ", data?.aclass.name);
    console.log("Class name: " + data?.aclass.name);
    setTimeout(() => {
      localStorage.removeItem("councilDataInicialize");
    }, 5000);
  }, [data]);

  const getDecryptedData = (key: string): string => {
    const encryptedData = localStorage.getItem(key);
    if (encryptedData) {
      const decryptedData = Decryptor(encryptedData);
      return decryptedData ? decryptedData[key] : "";
    }
    return "";
  };

  const saveEncryptedData = (key: string, value: string) => {
    const encryptedData = Encryptor({ [key]: value });
    localStorage.setItem(key, encryptedData);
  };

  useEffect(() => {
    const savedPositiveContent = getDecryptedData("positiveContent");
    const savedNegativeContent = getDecryptedData("negativeContent");

    if (savedPositiveContent) {
      setPositiveClassContent(savedPositiveContent);
    }

    if (savedNegativeContent) {
      setNegativeClassContent(savedNegativeContent);
    }
  }, []);

  const handlePositiveChange = (content: string) => {
    setPositiveClassContent(content);
    saveEncryptedData("positiveContent", content);
  };

  const handleNegativeChange = (content: string) => {
    setNegativeClassContent(content);
    saveEncryptedData("negativeContent", content);
  };

  const handleRankChange = (rank: string) => {
    setActualRank(
      rank as "none" | "average" | "excellent" | "good" | "critical"
    );
    saveEncryptedData("rank", rank);
  };

  const handleNextStudent = () => {
    if (data !== null) {
      setCurrentStudentIndex(
        (prevIndex) => (prevIndex + 1) % users.length
      );
      console.log("oi: ", users.length);
    }
  };

  const handlePreviousStudent = () => {
    if (data !== null) {
      setCurrentStudentIndex((prevIndex) =>
        prevIndex === 0 ? users.length - 1 : prevIndex - 1
      );
    }
  };

  const openTeacherModal = () => {
    setIsModalTeacherOpen(true);
  };

  const closeTeacherModal = () => {
    setIsModalTeacherOpen(false);
  };

  const openStudentModal = () => {
    setIsModalStudentOpen(true);
  };

  const closeStudentModal = () => {
    setIsModalStudentOpen(false);
  };

  function finalizeCouncil() {
    const ClassRank = getDecryptedData("rank");
    const ClassnegativeContent = getDecryptedData("negativeContent");
    const ClasspositiveContent = getDecryptedData("positiveContent");

    let studentsData: { [key: string]: any } = {};
    let councilClassName: string = "";

    const savedData = localStorage.getItem("studentsData");
    if (data) {
      councilClassName = data.aclass.name;
      if (savedData) {
        const decryptedData = Decryptor(savedData);
        if (decryptedData) {
          studentsData = decryptedData;
        } else {
          studentsData = [];
        }
      }
      console.log("Conselho finalizado com sucesso!");
      console.log("data: ", data);
      console.log(
        "Final json: ",
        formatFinalCouncilJson(
          ClassRank,
          ClassnegativeContent,
          ClasspositiveContent,
          studentsData,
          councilClassName
        )
      );
      setModalMessage({
        title: "Conselho finalizado com sucesso!",
        message:
          "O conselhoi foi finalizado com sucesso, vá até a página de liberação de conselhos para visualá-lo.",
        error: false,
      });
      setIsLoadingOpen(true);
      setTimeout(() => {
        setIsConfirmModalOpen(true);
        setIsRealizeCouncilOpen(false);
        setIsLoadingOpen(false);
        setTimeout(() => {
          setIsConfirmModalOpen(false);
        }, 2000);
      }, 2000);
    }
  }

  function verifyCouncil() {
    console.log("oi aaa");
    const ClassRank = getDecryptedData("rank");
    const ClassnegativeContent = getDecryptedData("negativeContent");
    const ClasspositiveContent = getDecryptedData("positiveContent");

    let studentsData: { [key: string]: any } = {};
    let councilClassName: string = "";

    const savedData = localStorage.getItem("studentsData");
    if (data) {
      councilClassName = data.aclass.name;
      if (savedData) {
        const decryptedData = Decryptor(savedData);
        if (decryptedData) {
          studentsData = decryptedData;
        } else {
          studentsData = [];
        }
      }
      if (
        ClassRank === "none" ||
        ClassnegativeContent === "" ||
        ClasspositiveContent === ""
      ) {
        setModalMessage({
          title: "Erro ao finalizar o Conselho",
          message: "Voce deve preencher todos os campos da turma!",
          error: true,
        });
        return false;
      }
      for (let i = 0; i < users.length; i++) {
        const userName = users[i].name;
        if (studentsData[userName] === undefined) {
          console.log("Você deve preencer o aluno: ", userName);
          return false;
        } else if (
          studentsData[userName].frequencia === 0 ||
          studentsData[userName].rank === "none" ||
          studentsData[userName].positiveContent === "" ||
          studentsData[userName].negativeContent === ""
        ) {
          setModalMessage({
            title: "Erro ao finalizar o Conselho",
            message: "Aluno incompleto: " + userName,
            error: true,
          });
          return false;
        }
      }
      return true;
    }
  }

  function cancelCouncil() {
    setIsCancelCouncilOpen(true);
  }

  function formatFinalCouncilJson(
    ClassRank: string,
    ClassnegativeContent: string,
    ClasspositiveContent: string,
    studentsData: { [key: string]: any },
    councilClassName: string
  ): any {
    const studentsArray = Object.keys(studentsData).map((studentName) => {
      return {
        name: studentName,
        frequencia: studentsData[studentName].frequencia,
        rank: studentsData[studentName].rank,
        positiveContent: studentsData[studentName].positiveContent,
        negativeContent: studentsData[studentName].negativeContent,
      };
    });

    const formattedData = {
      "council-form": {
        class: {
          name: councilClassName,
          ClassRank: ClassRank,
          ClassnegativeContent: ClassnegativeContent,
          ClasspositiveContent: ClasspositiveContent,
        },
        users: studentsArray,
      },
    };

    return formattedData;
  }

  const OpenfinalizeCouncilModal = () => {
    const result = verifyCouncil();
    if (result) {
      openRealizeCouncilModal();
    } else {
      setIsConfirmModalOpen(true);
      setTimeout(() => {
        setIsConfirmModalOpen(false);
      }, 2000);
    }
  };

  const openRealizeCouncilModal = () => {
    setIsRealizeCouncilOpen(true);
  };

  const closeRealizeCouncilModal = () => {
    setIsRealizeCouncilOpen(false);
  };

  const CancelCouncil = () => {
    setIsLoadingOpen(true);
    setTimeout(() => {
      setIsLoadingOpen(false);
    }, 2000);
    setIsCancelCouncilOpen(false);
  };

  const closeCancleCouncilModal = () => {
    setIsCancelCouncilOpen(false);
  };

  return (
    <Box>
      <Title
        textHighlight="Conselho"
        text={`da turma: ${data ? data.aclass.name : ""}`}
      />
      <Box
        className={`rounded-big m-0 flex justify-center items-center sm:outline-[16px] sm:outline`}
        style={{ outlineColor: OpacityHex(constrastColor, 0.1) }}
      >
        <Box
          borderColor={colorByModeSecondary}
          className="rounded-big sm:border-2 w-full p-5 m-0"
          bgcolor={backgroundColor}
        >
          <Box
            style={{ borderColor: colorByModeSecondary }}
            className="w-full overflow-hidden rounded-t-big flex flex-col gap-6"
          >
            <Box>
              <table className="p-0 m-0 w-full">
                <TableHeader
                  variant="council"
                  headers={[]}
                  headerButtons={{
                    onChangeRank: handleRankChange,
                  }}
                  openCommentsModal={openTeacherModal}
                  rank={actualRank}
                />
              </table>
              <AvaliationInputs
                writeOnly={false}
                Positivecontent={positiveClassContent}
                Negativecontent={negativeClassContent}
                onPositiveChange={handlePositiveChange}
                onNegativeChange={handleNegativeChange}
              />
            </Box>
            <div>
              <StudentCouncilForm
                // student={
                //   data
                //     ? data["council-form"].users[currentStudentIndex].name
                //     : ""
                // }
                frequencia={verifyFrequency()}
                comments=""
                negativeContent={negativeContent}
                positiveContent={positiveContent}
                // rank={
                rank="none" //remover
                student="" //remover
                onNext={handleNextStudent}
                onPrevious={handlePreviousStudent}
                openCommentsModal={openStudentModal}
                // imageKey={
                //   data
                //     ? data["council-form"].users[currentStudentIndex].id_user
                //     : ""
                // }
                //TODO: Continuar configurando a integração com a aws
                //TODO: Trocar o campo de imagekey no json para id_user
                //TODO: Verificar se a requisição está funcionando
              />
            </div>
          </Box>
          <Box className="flex gap-10">
            <Button
              className="w-full !mt-5 !rounded-normal"
              variant="contained"
              color="terciary"
              onClick={() => cancelCouncil()}
            >
              <Typography
                variant={windowSize < 600 ? "sm_text_bold" : "lg_text_bold"}
                color={textBlackolor}
              >
                Cancelar Conselho
              </Typography>
            </Button>
            <Button
              className="w-full !mt-5 !rounded-normal"
              variant="contained"
              color="primary"
              onClick={() => OpenfinalizeCouncilModal()}
            >
              <Typography
                variant={windowSize < 600 ? "sm_text_bold" : "lg_text_bold"}
                color={whiteColor}
              >
                Terminar Conselho
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
      {isModalTeacherOpen && (
        <CommentariesModal
          anotations={[]} //remover
          name="" //remover
          // anotations={data ? data["council-form"].class.teacherAnotations : []}
          student={false}
          // name={data ? data["council-form"].class.name : ""}
          onClose={closeTeacherModal}
        />
      )}
      {isModalStudentOpen && (
        <CommentariesModal
          anotations={[]} //remover
          name="" //remover
          // anotations={
          //   data ? data["council-form"].users[currentStudentIndex].comments : []
          // }
          student={true}
          // name={
          //   data ? data["council-form"].users[currentStudentIndex].name : ""
          // }
          onClose={closeStudentModal}
        />
      )}
      {(isCancelCouncilOpen && (
        <ConfirmChanges
          type="confirmText"
          confirmButtonText="Cancelar Conselho"
          title="Cancelar Conselho"
          confirmText="Confirmar cancelamento do conselho atual"
          secondDescription="Para você cancelar o conselho, voce precisa escrever a frase abaixo no campo de texto para confirmar o cancelamento do conselho atual"
          confirmColor="red"
          description="Você tem certeza que deseja cancelar este conselho? Ao fazer isso ele voltará para a lista de conselhos a fazer e todo o progresso será perdido."
          onClose={closeCancleCouncilModal}
          secondConfirmButton={CancelCouncil}
        />
      )) ||
        (isRealizelCouncilOpen && (
          <ConfirmChanges
            type="confirmText"
            confirmButtonText="Terminar conselho"
            title="Finalizar Conselho"
            confirmText="Confirmar término do conselho atual"
            secondDescription="Para você finalizar o conselho, voce precisa escrever a frase abaixo no campo de texto para confirmar a finalização do conselho atual"
            confirmColor="green"
            description="Você tem certeza que deseja finalizar este conselho? Verifique se a turma e todos os alunos estão com suas anotações corretas e prontas para entrega."
            onClose={closeRealizeCouncilModal}
            secondConfirmButton={finalizeCouncil}
          />
        ))}
      {isConfirmModalOpen && (
        <ConfirmMessagesModal
          title={modalMessage.title}
          description={modalMessage.message}
          error={modalMessage.error}
        />
      )}
      {isLoadingOpen && <LoadingModal />}
    </Box>
  );
}
