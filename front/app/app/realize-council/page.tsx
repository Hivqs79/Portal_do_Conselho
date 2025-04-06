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
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  useEffect(() => {
    const councilDataInicialize = localStorage.getItem("councilDataInicialize");
    const usersClass = localStorage.getItem("studentsData");

    const loadData = async () => {
      // 1. Primeiro verifica se já temos dados no localStorage
      if (usersClass) {
        console.log("DADOS PUXADOS DIRETO DO LOCALSTORAGE");
        const decryptedData = Decryptor(usersClass);
        if (decryptedData) {
          const studentNames = Object.keys(decryptedData);

          // Se temos alunos no localStorage, usa esses dados
          if (studentNames.length > 0) {
            // Recria o array de users baseado no localStorage com valores padrão para propriedades faltantes
            const usersFromStorage = studentNames.map((name) => {
              const userData = decryptedData[name];
              return {
                id: userData?.id_user || 0,
                name: name,
                email: userData?.email || "",
                isRepresentant: userData?.isRepresentant || false,
                lastRank: userData?.lastRank || null,
                createDate: userData?.createDate || new Date().toISOString(),
                updateDate: userData?.updateDate || new Date().toISOString(),
              } as User;
            });

            setUsers(usersFromStorage);
            console.log(
              "Usuários carregados do localStorage:",
              usersFromStorage
            );

            // Se temos os dados básicos da turma no localStorage, seta eles também
            const className = localStorage.getItem("className");
            if (className && !data) {
              setData({
                id: 0, // valor padrão
                startDateTime: new Date().toISOString(),
                teachers: [],
                createDate: new Date().toISOString(),
                updateDate: new Date().toISOString(),
                aclass: {
                  id: 0,
                  name: className,
                  area: "",
                  course: "",
                  lastRank: null,
                  createDate: new Date().toISOString(),
                  updateDate: new Date().toISOString(),
                },
                className: className,
              });
            }
            return;
          }
        }
      }

      if (councilDataInicialize) {
        console.log("DADOS PUXADOS DIRETO DA API");
        try {
          const parsedData = JSON.parse(councilDataInicialize);
          if (parsedData && parsedData.aclass && parsedData.teachers) {
            localStorage.setItem("className", parsedData.aclass.name);

            const users = await fetchUsersInClass(parsedData.aclass.id);
            console.log("Usuarios recebidos da API: ", users);

            const initialData: Record<string, any> = {};
            users.forEach((user: User) => {
              initialData[user.name] = {
                id: user.id,
                id_user: user.id,
                email: user.email,
                isRepresentant: user.isRepresentant,
                lastRank: user.lastRank,
                createDate: user.createDate,
                updateDate: user.updateDate,
                frequencia: null,
                comments: "",
                negativeContent: "",
                positiveContent: "",
                rank: "none",
              };
            });

            localStorage.setItem("studentsData", Encryptor(initialData));

            setUsers(users);
            setData(parsedData);
            console.log("Dados carregados da API:", parsedData);
          } else {
            console.error("Estrutura de dados inválida");
          }
        } catch (error) {
          console.error("Erro ao parsear dados:", error);
        }
      } else {
        console.log("Nenhum dado encontrado no localStorage ou API");
      }
    };

    loadData();
  }, []);

  // Efeito para lidar com mudanças no índice do aluno atual
  useEffect(() => {
    if (
      users.length > 0 &&
      currentStudentIndex >= 0 &&
      currentStudentIndex < users.length
    ) {
      const currentUser = users[currentStudentIndex];
      console.log("Usuário atual:", currentUser);

      // Aqui você pode carregar os dados específicos do aluno se necessário
      const usersClass = localStorage.getItem("studentsData");
      if (usersClass) {
        const decryptedData = Decryptor(usersClass);
        if (decryptedData && decryptedData[currentUser.name]) {
          console.log(
            "Dados do usuário no localStorage:",
            decryptedData[currentUser.name]
          );
        }
      }
    }
  }, [currentStudentIndex, users]);

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
    }, 2000);
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
    if (users.length > 0) {
      setCurrentStudentIndex((prevIndex) => (prevIndex + 1) % users.length);
      console.log("oi: ", users.length);
    }
  };

  const handlePreviousStudent = () => {
    if (users.length > 0) {
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
          studentsData[userName].frequencia === null ||
          studentsData[userName].frequencia === undefined ||
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
        id_user: studentsData[studentName].id_user,
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

  const CancelCouncil = async () => {
    setIsLoadingOpen(true);
    localStorage.removeItem("className");
    localStorage.removeItem("rank");
    localStorage.removeItem("studentsData");
    localStorage.removeItem("positiveContent");
    localStorage.removeItem("negativeContent");
    const councilChanged = await changeCouncilState();
    if (!councilChanged) {
      return;
    }
    setTimeout(() => {
      setIsLoadingOpen(false);
      router.push("/council");
    }, 2000);
    setIsCancelCouncilOpen(false);    
  }

  async function changeCouncilState(): Promise<boolean> {
    try {
      const res = await fetch("http://localhost:8081/council?isHappening=true", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!res.ok) {
        console.error("Erro ao buscar conselhos:", res.status);
        return false;
      }
  
      const data = await res.json();
      const hasActiveCouncil = Array.isArray(data.content) && data.content.length > 0;
  
      if (hasActiveCouncil) {
        const id = data.content[0].id;
  
        const modifyRes = await fetch(`http://localhost:8081/council/modify/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          }
        });
  
        if (!modifyRes.ok) {
          console.error(`Erro ao modificar conselho com id ${id}:`, modifyRes.status);
          return false;
        }
  
        return true;
      }
  
      return false;
    } catch (err) {
      console.error("Erro inesperado:", err);
      return false;
    }
  }
  

  const closeCancleCouncilModal = () => {
    setIsCancelCouncilOpen(false);
  };

  function verifyFrequency() {
    const savedData = localStorage.getItem("studentsData");
    if (savedData) {
      const decryptedData = Decryptor(savedData);
      if (decryptedData) {
        for (let i = 0; i < users.length; i++) {
          const userName = users[i].name;
          if (
            decryptedData[userName].frequencia === 0 ||
            decryptedData[userName].frequencia === "" ||
            decryptedData[userName].frequencia === undefined
          ) {
            return 0;
          } else {
            return decryptedData[userName].frequencia;
          }
        }
      }
      return 0;
    }
  }

  return (
    <Box>
      <Title
        textHighlight="Conselho"
        text={`da turma: ${data ? data.aclass.name : localStorage.getItem("className")}`}
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
                users={users || []}
                student={
                  users && users.length > 0
                    ? users[currentStudentIndex]?.name
                    : ""
                }
                id_user={users && users.length > 0 ? users[currentStudentIndex]?.id : undefined}
                frequencia={verifyFrequency()}
                comments=""
                negativeContent={negativeContent || ""}
                positiveContent={positiveContent || ""}
                rank={actualRank || "none"}
                onNext={handleNextStudent}
                onPrevious={handlePreviousStudent}
                openCommentsModal={openStudentModal}
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
