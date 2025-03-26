"use client";
import AccordionComponent from "@/components/AccordionComponent";
import ConfirmChanges from "@/components/Modals/ConfirmChanges";
import ConfirmMessagesModal from "@/components/Modals/ConfirmMessagesModal";
import Title from "@/components/Title";
import { useRoleContext } from "@/hooks/useRole";
import { useThemeContext } from "@/hooks/useTheme";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Reports() {
  const { colorByModeSecondary, whiteColor } = useThemeContext();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isConfirmSendMessage, setIsConfirmSendMessage] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { role } = useRoleContext();

  const openConfirmModal = () => {
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
      <Box className="flex flex-col gap-5">
        <Typography variant="xl_text_bold" color={colorByModeSecondary}>
          Nos envie sua mensagem
        </Typography>

        <Typography variant="md_text_regular">
          Caso você tenha alguma reclamação ou dúvida, entre em contato conosco,
          você será atendido assim que possível!!
        </Typography>
        <TextField
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          id="outlined-basic"
          label="Assunto"
          variant="outlined"
          fullWidth
          multiline
          rows={7}
        />
        <Button
          onClick={openConfirmModal}
          variant="contained"
          color="primary"
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
                (question.role === "student" || question.role === "leader")) ||
              (role !== "leader" && role === question.role)
            ) {
              return (
                <Box key={index}>
                  <AccordionComponent
                    name={question.question}
                    description={question.answer}
                    type="default"
                    // outlined
                  />
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
    </Box>
  );
}

const frequentlyQuestions = [
  // Student
  {
    role: "student",
    question: "Como funciona o pré-conselho e para que ele serve?",
    answer:
      "O pré-conselho é um espaço onde discutimos dificuldades acadêmicas e comportamentais antes de um possível encaminhamento ao conselho escolar.",
  },
  {
    role: "student",
    question: "O que acontece se eu for chamado para um conselho disciplinar?",
    answer:
      "No conselho disciplinar, será discutida sua situação e definidas possíveis ações corretivas ou de suporte.",
  },
  {
    role: "student",
    question: "Como posso recorrer a uma decisão tomada pelo conselho escolar?",
    answer:
      "Você pode solicitar revisão através da secretaria da escola ou com um responsável legal.",
  },
  {
    role: "student",
    question:
      "Se eu estiver com dificuldades em uma matéria, o pré-conselho pode me ajudar?",
    answer:
      "Sim, podemos sugerir reforço escolar, ajustes pedagógicos e um plano de estudo personalizado.",
  },
  {
    role: "student",
    question: "O conselho escolar decide sobre eventos e atividades na escola?",
    answer:
      "Sim, o conselho pode avaliar propostas de eventos e sugerir melhorias para a escola.",
  },

  // Leader
  {
    role: "leader",
    question:
      "Como posso levar as demandas da minha turma para o conselho escolar?",
    answer:
      "Você pode apresentar as sugestões ou problemas da turma nas reuniões do conselho e buscar soluções junto à equipe pedagógica.",
  },
  {
    role: "leader",
    question:
      "O representante de turma pode participar das decisões do conselho escolar?",
    answer:
      "Sim, dependendo da pauta, sua participação pode ser fundamental para representar os alunos.",
  },
  {
    role: "leader",
    question:
      "Como posso ajudar um colega que foi chamado para um conselho disciplinar?",
    answer:
      "Você pode orientá-lo a comparecer e, se necessário, pedir apoio para que ele seja bem representado.",
  },
  {
    role: "leader",
    question:
      "Os representantes de turma podem sugerir mudanças nas regras da escola?",
    answer:
      "Sim, sugestões bem fundamentadas podem ser levadas ao conselho para avaliação.",
  },
  {
    role: "leader",
    question:
      "O que fazer se minha turma tiver uma reclamação sobre um professor?",
    answer:
      "Tente conversar diretamente com o professor primeiro. Se o problema persistir, pode ser levado ao conselho pedagógico.",
  },

  // Teacher
  {
    role: "teacher",
    question: "Quando devo encaminhar um aluno para o pré-conselho?",
    answer:
      "Quando identificar dificuldades acadêmicas, emocionais ou comportamentais que possam impactar o desenvolvimento do aluno.",
  },
  {
    role: "teacher",
    question: "Os professores participam das reuniões do conselho escolar?",
    answer:
      "Sim, principalmente em pautas pedagógicas, disciplinares ou para melhorias no ensino.",
  },
  {
    role: "teacher",
    question: "Quais critérios são considerados para reprovar um aluno?",
    answer:
      "São avaliados frequência, notas, participação e envolvimento do aluno no processo de ensino-aprendizagem.",
  },
  {
    role: "teacher",
    question:
      "Posso sugerir mudanças no currículo escolar pelo conselho pedagógico?",
    answer:
      "Sim, sugestões de melhoria na abordagem pedagógica podem ser levadas ao conselho para avaliação.",
  },
  {
    role: "teacher",
    question: "Como posso contribuir para decisões disciplinares no conselho?",
    answer:
      "Relatando de forma objetiva o comportamento do aluno em sala e sugerindo soluções baseadas na experiência docente.",
  },

  // Pedagogic
  {
    role: "pedagogic",
    question: "Quais são os principais objetivos do conselho pedagógico?",
    answer:
      "Analisar e propor melhorias nos métodos de ensino, currículo e estratégias pedagógicas.",
  },
  {
    role: "pedagogic",
    question:
      "Como o conselho pode ajudar na inclusão de alunos com necessidades especiais?",
    answer:
      "Discutindo adaptações no ensino e sugerindo recursos para garantir a inclusão e o aprendizado de todos.",
  },
  {
    role: "pedagogic",
    question: "O conselho pode propor novas metodologias de ensino?",
    answer:
      "Sim, o conselho pedagógico pode sugerir e testar novas abordagens educacionais.",
  },
  {
    role: "pedagogic",
    question:
      "Como os pais podem participar das decisões pedagógicas da escola?",
    answer:
      "Através de reuniões com a equipe pedagógica e participação no conselho escolar.",
  },
  {
    role: "pedagogic",
    question:
      "Como lidar com alunos com dificuldades emocionais no ambiente escolar?",
    answer:
      "Encaminhando ao pré-conselho para apoio, conversando com os responsáveis e sugerindo acompanhamento especializado.",
  },

  // Supervisor
  {
    role: "supervisor",
    question: "Quais são as principais funções do conselho escolar?",
    answer:
      "Gerenciar recursos, definir diretrizes pedagógicas e disciplinares e tomar decisões estratégicas para a escola.",
  },
  {
    role: "supervisor",
    question:
      "Como posso monitorar a efetividade das decisões tomadas nos conselhos?",
    answer:
      "Acompanhando indicadores como desempenho acadêmico, taxa de evasão e feedback da comunidade escolar.",
  },
  {
    role: "supervisor",
    question:
      "O conselho pode intervir em problemas disciplinares recorrentes?",
    answer:
      "Sim, pode estabelecer medidas corretivas e propor estratégias para melhorar a convivência escolar.",
  },
  {
    role: "supervisor",
    question:
      "Como garantir que as decisões dos conselhos sejam implementadas corretamente?",
    answer:
      "Acompanhando o cumprimento das ações e garantindo que todos os envolvidos estejam cientes das decisões.",
  },
  {
    role: "supervisor",
    question: "O conselho pode solicitar recursos adicionais para a escola?",
    answer:
      "Sim, pode solicitar verbas e apoio do governo ou de parceiros para melhorar a infraestrutura e ensino.",
  },
];
