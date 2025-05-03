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

"use client";
import AvaliationInputs from "@/components/council/AvaliationInputs";
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
import User from "@/interfaces/users/User";
import CommentariesModal from "@/components/modals/CommentariesModal";
import ConfirmChanges from "@/components/modals/ConfirmChanges";
import ConfirmMessagesModal from "@/components/modals/ConfirmMessagesModal";
import LoadingModal from "@/components/modals/LoadingModal";
import { Rank as RankType } from "@/interfaces/RankType";
import { useRoleContext } from "@/hooks/useRole";

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

type FinalJson = {
  "council-form": {
    class: {
      name: string;
      ClassRank: string;
      ClassnegativeContent: string;
      ClasspositiveContent: string;
    };
    users: {
      id_user: number;
      name: string;
      frequencia: number | null;
      rank: string;
      positiveContent: string;
      negativeContent: string;
    }[];
  };
};

export default function RealizeCouncil() {
  const { token } = useRoleContext();
  const [data, setData] = useState<CouncilData | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);    

  const [positiveClassContent, setPositiveClassContent] = useState("");
  const [negativeClassContent, setNegativeClassContent] = useState("");
  const [actualRank, setActualRank] = useState<RankType>("NONE");
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
  }>({ title: "", message: "", error: false });
  const [finalJson, setFinalJson] = useState<FinalJson>();
  const [classCommentaries, setClassCommentaries] = useState([]);
  const [studentCommentaries, setStudentCommentaries] = useState([]);
  const {
    constrastColor,
    backgroundColor,
    colorByModeSecondary,
    whiteColor,
    textBlackColor,
  } = useThemeContext();
  const router = useRouter();

  useEffect(() => {
    try {
      const councilDataInicialize = localStorage.getItem(
        "councilDataInicialize"
      );
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
        }
      };

      loadData();
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
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
        `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/class/student/${idClass}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
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

  useEffect(() => {
    const fetchCommentaries = async () => {
      const councilId = await fetchHappeningCouncil();
      if (councilId) {
        const classResponse = await fetch(
          `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/annotations/class?isHappening=true&isFinished=false`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const classComentaries = await classResponse.json();
        setClassCommentaries(classComentaries.content);
        console.log("council ID class and student: ", councilId);
        console.log("Nam: ", users[currentStudentIndex]?.name);
        const studentResponse = await fetch(
          `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/annotations/student?councilId=${councilId}&studentName=${users[currentStudentIndex]?.name}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const studentComentaries = await studentResponse.json();
        setStudentCommentaries(studentComentaries.content);

        console.log("Class API Response: ", classComentaries);
        console.log("Student API Response: ", studentComentaries);
      }
    };
    fetchCommentaries();
  }, [users, currentStudentIndex]);

  const handlePositiveChange = (content: string) => {
    setPositiveClassContent(content);
    saveEncryptedData("positiveContent", content);
  };

  const handleNegativeChange = (content: string) => {
    setNegativeClassContent(content);
    saveEncryptedData("negativeContent", content);
  };

  const handleRankChange = (rank: RankType) => {
    setActualRank(rank);
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

  async function finalizeCouncil() {
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
      const formattedJson = formatFinalCouncilJson(
        ClassRank,
        ClassnegativeContent,
        ClasspositiveContent,
        studentsData,
        councilClassName
      );
      setFinalJson(formattedJson);
      setModalMessage({
        title: "Conselho finalizado com sucesso!",
        message:
          "O conselhoi foi finalizado com sucesso, vá até a página de liberação de conselhos para visualá-lo.",
        error: false,
      });

      setIsLoadingOpen(true);

      await TransformCouncilInFeedback(formattedJson)
        .then(() => {
          setIsLoadingOpen(false);
          setIsRealizeCouncilOpen(false);
          setIsConfirmModalOpen(true);
          deleteStorage();
          setTimeout(() => {
            setIsConfirmModalOpen(false);
            redirectPage("release-feedback");
          }, 2000);
        })
        .catch((error) => {
          console.log("Erro ao transformar conselho em feedback:", error);
          setModalMessage({
            title: "Erro",
            message:
              "Ocorreu um erro ao finalizar o conselho. Tente novamente.",
            error: true,
          });
          setIsLoadingOpen(false);
        });
    }
  }

  async function TransformCouncilInFeedback(formattedJson: FinalJson) {
    const idCouncil = await fetchHappeningCouncil();
    console.log("Enviando para feedback/class:", {
      rank: formattedJson?.["council-form"].class.ClassRank,
      council_id: idCouncil,
      strengths: formattedJson?.["council-form"].class.ClasspositiveContent,
      toImprove: formattedJson?.["council-form"].class.ClassnegativeContent,
    });
    await fetch(`${process.env.NEXT_PUBLIC_URL_GENERAL_API}/feedbacks/class`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        rank: formattedJson?.["council-form"].class.ClassRank,
        council_id: idCouncil,
        strengths: formattedJson?.["council-form"].class.ClasspositiveContent,
        toImprove: formattedJson?.["council-form"].class.ClassnegativeContent,
      }),
    });

    if (formattedJson) {
      formattedJson["council-form"].users.forEach(async (user) => {
        await fetch(`${process.env.NEXT_PUBLIC_URL_GENERAL_API}/feedbacks/student`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            rank: user.rank,
            council_id: idCouncil,
            strengths: user.positiveContent,
            toImprove: user.negativeContent,
            student_id: user.id_user,
            frequency: user.frequencia,
          }),
        });
      });
      await changeCouncilState();
      await fetch(`${process.env.NEXT_PUBLIC_URL_GENERAL_API}/council/modifyFinished/${idCouncil}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
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

  const deleteStorage = async () => {
    localStorage.removeItem("className");
    localStorage.removeItem("rank");
    localStorage.removeItem("studentsData");
    localStorage.removeItem("positiveContent");
    localStorage.removeItem("negativeContent");
  };

  const redirectPage = (page: string) => {
    router.push(`/${page}`);
  };

  const CancelCouncil = async () => {
    setIsLoadingOpen(true);
    const councilChanged = await changeCouncilState();
    if (!councilChanged) {
      return;
    }
    await deleteStorage();
    setTimeout(() => {
      setIsLoadingOpen(false);
      redirectPage("council");
    }, 2000);
    setIsCancelCouncilOpen(false);
  };

  async function fetchHappeningCouncil() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/council?isHappening=true`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        console.error("Erro ao buscar conselhos:", res.status);
        return;
      }

      const data = await res.json();
      const hasActiveCouncil =
        Array.isArray(data.content) && data.content.length > 0;
      if (hasActiveCouncil) {
        const id = data.content[0].id;
        return id;
      }
      return;
    } catch (error) {
      console.log("Erro ao buscar conselhos:", error);
    }
  }

  async function changeCouncilState(): Promise<boolean> {
    try {
      const id = await fetchHappeningCouncil();
      if (id) {
        const modifyRes = await fetch(
          `${process.env.NEXT_PUBLIC_URL_GENERAL_API}/council/modify/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!modifyRes.ok) {
          console.error(
            `Erro ao modificar conselho com id ${id}:`,
            modifyRes.status
          );
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
        text={`da turma: ${
          data ? data.aclass.name : localStorage.getItem("className")
        }`}
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
                    setRank: handleRankChange,
                  }}
                  openCommentsModal={openTeacherModal}
                  rank={actualRank}
                />
              </table>
              <AvaliationInputs
                readOnly={false}
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
                id_user={
                  users && users.length > 0
                    ? users[currentStudentIndex]?.id
                    : undefined
                }
                frequencia={verifyFrequency()}
                comments=""
                negativeContent={""}
                positiveContent={""}
                rank={(actualRank as RankType) || "NONE"}
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
                color={textBlackColor}
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
          anotations={classCommentaries}
          student={false}
          name={data ? data.aclass.name : localStorage.getItem("className")}
          onClose={closeTeacherModal}
        />
      )}
      {isModalStudentOpen && (
        <CommentariesModal
          anotations={studentCommentaries}
          student={true}
          name={users && users.length > 0
            ? users[currentStudentIndex]?.name
            : ""}
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
