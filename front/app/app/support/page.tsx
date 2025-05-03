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
import AccordionComponent from "@/components/AccordionComponent";
import ConfirmChanges from "@/components/modals/ConfirmChanges";
import ConfirmMessagesModal from "@/components/modals/ConfirmMessagesModal";
import Title from "@/components/Title";
import { useRoleContext } from "@/hooks/useRole";
import { useThemeContext } from "@/hooks/useTheme";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Reports() {
  const { colorByModeSecondary, whiteColor } = useThemeContext();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isConfirmSendMessage, setIsConfirmSendMessage] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { role } = useRoleContext();

  const openConfirmModal = () => {
    if (inputValue.trim() === "" || inputValue.trim().length < 10) {
      setIsErrorMessage(true);
      setTimeout(() => {
        setIsErrorMessage(false);
      }, 3000);
      return;
    }
    setIsConfirmOpen(true);
  };

  function sendUserMessage(value: string) {
    setIsConfirmSendMessage(true);
    setInputValue("");
    console.log(value);
    setTimeout(() => {
      setIsConfirmOpen(false);
      setIsConfirmSendMessage(false);
    }, 3000);
  }

  return (
    <Box>
      <Title textHighlight="Suporte" />
      <Box
        style={{ borderColor: colorByModeSecondary }}
        className="border-2 p-5 outline-component rounded-big"
      >
        <Box className="flex flex-col gap-5">
          <Typography variant="xl_text_bold" color={colorByModeSecondary}>
            Nos envie sua mensagem
          </Typography>

          <Typography variant="md_text_regular">
            Caso você tenha alguma reclamação ou dúvida, entre em contato
            conosco, você será atendido assim que possível!!
          </Typography>
          <TextField
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            id="outlined-basic"
            label="Assunto"
            variant="outlined"
            fullWidth
            multiline
            minRows={5}
            maxRows={15}
          />
          <Button
            onClick={openConfirmModal}
            variant="contained"
            color="primary"
            sx={{ height: 50 }}
            fullWidth
          >
            <Typography variant="lg_text_bold" color={whiteColor}>
              Enviar
            </Typography>
          </Button>
        </Box>
        <Box className="flex flex-col gap-10 mt-20">
          <Typography variant="xl_text_bold" color={colorByModeSecondary}>
            Perguntas Frequentes
          </Typography>
          <Box className="flex flex-col gap-2">
            {frequentlyQuestions.map((question, index) => {
              if (
                (role === "leader" &&
                  (question.role === "student" ||
                    question.role === "leader" ||
                    question.role === "global")) ||
                (role !== "leader" && role === question.role) ||
                question.role === "global"
              ) {
                return (
                  <Box key={index}>
                    <AccordionComponent
                      name={question.question}
                      type="support"
                    >
                      <Typography variant="md_text_regular">{question.answer}</Typography>
                    </AccordionComponent>
                  </Box>
                );
              }
              return null;
            })}
          </Box>
        </Box>
        {isConfirmOpen && (
          <>
            <ConfirmChanges
              type="default"
              title="Você concorda em enviar esta mensagem?"
              description="Você tem certeza da sua mensagem ao envia-lá para nós?"
              confirmButtonText="Enviar"
              onClose={() => setIsConfirmOpen(false)}
              firstConfirmButton={() => sendUserMessage(inputValue)}
            />
            {isConfirmSendMessage && (
              <ConfirmMessagesModal
                title="Mensagem enviada com sucesso!"
                description="Obrigado por entrar em contato conosco, responderemos em breve!"
                error={false}
              />
            )}
          </>
        )}
        {isErrorMessage && (
          <ConfirmMessagesModal
            title="Erro ao enviar a mensagem"
            description="Você deve preencher o formulário com no mínimo 10 caracteres!"
            error={true}
          />
        )}
      </Box>
    </Box>
  );
}

const frequentlyQuestions = [
  // Student
  {
    role: "student",
    question: "Como funciona o pré-conselho e para que ele serve?",
    answer:
      "O pré-conselho é um espaço onde a turma em geral responde algumas perguntas sobre professores, infraestrutura e algumas informações do tipo.",
  },
  {
    role: "student",
    question: "Como eu vejo se meu conselho já foi liberado?",
    answer:
      "Para visualizar o seu conselho, basta ir à página principal, onde você verá todo o histórico de feedbacks. Se o novo feedback ainda não estiver lá, aguarde, pois ele ainda não foi liberado.",
  },
  {
    role: "student",
    question:
      "Como entrar em contato para solicitar uma revisão ou tirar alguma dúvida?",
    answer:
      "Você pode mandar uma mensagem diretamente para o pedagógico na página de chat ou verificar se sua dúvida já não foi respondida aqui na página de suporte.",
  },
  {
    role: "student",
    question:
      "Quero conversar com algum professor ou aluno, mas não estou conseguindo. O que posso fazer?",
    answer:
      "Este sistema foi desenvolvido para ser um gerenciamento dos conselhos e pré-conselhos e não um bate-papo. Sendo assim, a única pessoa liberada para os estudantes conversarem é o pedagógico.",
  },

  // Leader
  {
    role: "leader",
    question: "Como eu sei se um pré-conselho já foi liberado para responder?",
    answer:
      "Basta ir à página de pré-conselho e verificar se existe algum formulário de perguntas para ser respondido. Caso não haja nada, o seu pré-conselho ainda não foi liberado.",
  },
  {
    role: "leader",
    question:
      "O representante tem algum poder sobre os outros alunos da turma?",
    answer:
      "Não. O representante somente irá falar pela turma, porém, ele continua sendo um aluno como todos os outros.",
  },

  // Teacher
  {
    role: "teacher",
    question:
      "Quando e qual o limite de tempo que posso fazer anotações para algum aluno no conselho?",
    answer:
      "O campo de anotações para o aluno e turma em um conselho específico fica liberado desde o momento da criação do conselho até a data e hora em que ele foi iniciado. Caso ele seja iniciado, não é mais possível fazer anotações sobre algum aluno ou turma nele.",
  },
  {
    role: "teacher",
    question:
      "Como faço para acessar os feedbacks do pré-conselho relacionados a mim?",
    answer:
      "Para visualizar o seu feedback, basta ir à página principal, onde você verá todo o histórico de feedbacks relacionados a você. Se o novo feedback ainda não estiver lá, aguarde, pois ele ainda não foi liberado.",
  },
  {
    role: "teacher",
    question:
      "Como funciona o sistema de ranks nas anotações para definir os alunos e turmas?",
    answer:
      "O sistema de ranks nas anotações serve para o pedagógico ter uma noção de como está a situação daquele aluno ou turma com base na sua opinião. Isso ajudará na hora de decidir o feedback final do aluno.",
  },

  // Pedagogic
  {
    role: "pedagogic",
    question: "Como posso iniciar o andamento de um conselho?",
    answer:
      "Para iniciar o andamento de um conselho, basta ir à página de Conselho e clicar no botão de 'Realizar conselho'. Lá haverá uma lista de todos os conselhos criados que ainda não foram iniciados.",
  },
  {
    role: "pedagogic",
    question:
      "Iniciei um conselho, porém, não consigo voltar para a página de realizar conselho. O que posso fazer?",
    answer:
      "Quando você inicia um conselho, ele se torna sua prioridade principal, e um conselho não pode acontecer ao mesmo tempo que outro. Sendo assim, essa página não fica acessível enquanto há algum conselho sendo realizado. Caso queira voltar para aquela página, será necessário finalizar ou cancelar o conselho que está sendo realizado.",
  },
  {
    role: "pedagogic",
    question: "Para que servem os ranks nas anotações e no conselho?",
    answer:
      "Os ranks servem para definir a situação do aluno ou da turma, conforme a avaliação dos professores. Porém, somente você tem acesso a essa informação, e o rank oficial é aquele definido no feedback final do conselho.",
  },
  {
    role: "pedagogic",
    question: "Os alunos conseguem ver os ranks deles?",
    answer:
      "Não. O rank do aluno é uma informação exclusiva da parte pedagógica, utilizada para visualizar a situação em que o aluno se encontra, facilitando a filtragem e a tomada de decisões.",
  },

  // Supervisor
  {
    role: "supervisor",
    question: "O supervisor pode editar algo nos feedbacks?",
    answer:
      "Não. O supervisor somente pode visualizar o que foi definido pelo pedagógico em relação às turmas e alunos. Ele também pode visualizar os feedbacks que recebeu, porém, nunca editar nenhuma informação.",
  },

  //Global
  //{
  //  role: "global",
  //  question: "Como eu posso rever o tutorial do sistema?",
  //  answer:
  //    "Para visualizar o tutorial novamente, basta acessar as Configurações e clicar na opção 'Tutorial'.",
  //},
];
