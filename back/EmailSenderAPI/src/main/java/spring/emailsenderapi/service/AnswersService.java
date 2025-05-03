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

package spring.emailsenderapi.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import spring.emailsenderapi.model.EmailModel;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Service
@AllArgsConstructor
/**
 * @author Vinícius Eduardo dos Santos
 */
public class AnswersService {

    private final EmailTemplateService templateService;

    public String answers(EmailModel email) {
        return templateService.processTemplate(email.getTitle().toLowerCase().replace(" ", "-"),
                createVariablesMap(email));
    }

    private Map<String, String> createVariablesMap(EmailModel email) {
        System.out.println(email.toString());
        Map<String, String> variables = new HashMap<>();
        variables.put("owner", email.getOwner());
        variables.put("reciver", email.getReciver());
        variables.put("password", email.getPassword());
        variables.put("token", email.getToken());
        variables.put("turma", email.getTurma());

        LocalDateTime dateTime = email.getDate();

        if (dateTime != null) {
            System.out.println("Entrou");
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            String dateFormat = dateTime.format(dateFormatter);
            System.out.println("Date format = " + dateFormat);

            DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");
            String hourFormat = dateTime.format(timeFormatter);
            System.out.println("Hour format = " + hourFormat);

            variables.put("dateFormat", dateFormat);
            variables.put("hourFormat", hourFormat);
        }

        System.out.println("Variaveis = "+ variables);
        return variables;
    }

    /**
     * Function where a json is received with the information for sending the email, with the formatting depending on the subject
     *
     * @param email
     * @return String
     */

    /*
    public String answers(EmailModel email) {


        /**
         * date and time formatting



        switch (email.getTitle()) {

            /**
             * answers related to account creation

            case "Cadastro Realizado":
                email.setContent("Prezado(a) " + email.getOwner() + ",\n\n"
                        + "Sua conta foi criada e está pronta para ser acessada!\n" +
                        "Abaixo estão suas credenciais de acesso:\n\n" +
                        "E-mail: " + email.getReciver() + "\n" +
                        "Senha: " + email.getPassword() + "\n\n" +
                        "Importante:\n" +
                        "- Nunca compartilhe estas credenciais com terceiros\n" +
                        "- Recomendamos que altere sua senha após o primeiro login\n" +
                        "- Caso não tenha solicitado esta alteração, ignore este e-mail\n\n" +
                        "Para sua segurança, recomendamos:\n" +
                        "1. Criar uma senha forte ao redefinir\n" +
                        "2. Não repetir senhas utilizadas em outros serviços\n" +
                        "3. Atualizar periodicamente suas credenciais\n\n" +
                        "Atenciosamente,\n" +
                        "Equipe de Suporte\n" +
                        "Portal do Conselho\n\n" +
                        "----------------------------------------\n" +
                        "Esta é uma mensagem automática. Por favor, não responda este e-mail.\n" +
                        "Caso necessite de ajuda, entre em contato através do nosso site oficial.");
                break;

            /**
             * answers related password recover

            case "Código de Recuperação da Senha":
                email.setContent("Prezado(a) " + email.getOwner() + ",\n\n" +
                        "Recebemos uma solicitação para redefinição da senha da sua conta. \n" +
                        "Segue abaixo o seu código de verificação exclusivo:\n\n" +
                         email.getToken() +"\n\n" +
                        "Este código é válido por 1 hora e deve ser utilizado na página de recuperação de senha.\n\n" +
                        "Importante:\n" +
                        "- Nunca compartilhe este código com terceiros\n" +
                        "- Nossa equipe nunca solicitará sua senha ou código por telefone\n" +
                        "- Caso não tenha solicitado esta alteração, ignore este e-mail\n\n" +
                        "Para sua segurança, recomendamos:\n" +
                        "1. Criar uma senha forte ao redefinir\n" +
                        "2. Não repetir senhas utilizadas em outros serviços\n" +
                        "3. Atualizar periodicamente suas credenciais\n\n" +
                        "Atenciosamente,\n" +
                        "Equipe de Suporte\n" +
                        "Portal do Conselho\n\n" +
                        "----------------------------------------\n" +
                        "Esta é uma mensagem automática. Por favor, não responda este e-mail.\n" +
                        "Caso necessite de ajuda, entre em contato através do nosso site oficial.");
                break;

            /**
             * answers related to advice

            case "Conselho Marcado":
                email.setContent("Prezado(a) professor(a) " + email.getOwner() + ",\n\n"
                        + "Você foi convidado(a) a participar do conselho da turma " + email.getTurma() + ",\n"
                        + "agendado para às " + hourFormat + " do dia " + dateFormat + ".\n\n"
                        + "Caso deseje, já é possível acessar o site para fazer anotações sobre a turma.\n\n"
                        + "Atenciosamente,\n"
                        + "Equipe do Portal do Conselho");
                break;

            case "Conselho Remarcado":
                email.setContent("Prezado(a) professor(a) " + email.getOwner() + ",\n\n"
                        + "O conselho em que você foi convidado(a) a participar, da turma " + email.getTurma() + ",\n"
                        + "agendado para às " + hourFormat + " do dia " + dateFormat + ", foi agendado para às " + hourFormat + " do dia " + dateFormat + ".\n\n"
                        + "Caso deseje alterar alguma anotação, ainda será possível acessar o site para fazer anotações sobre a turma até o dia mostrado acima.\n\n"
                        + "Atenciosamente,\n"
                        + "Equipe do Portal do Conselho");
                break;

            case "Conselho Cancelado":
                email.setContent("Prezado(a) professor(a) " + email.getOwner() + ",\n\n"
                        + "O conselho em que você participaria, da turma " + email.getTurma() + ",\n"
                        + "agendado para às " + hourFormat + " do dia " + dateFormat + ", foi cancelado" + ".\n\n"
                        + "Caso deseje alterar alguma anotação, ainda será possível acessar o site para fazer anotações até a nova data estabelecida.\n\n"
                        + "Atenciosamente,\n"
                        + "Equipe do Portal do Conselho");
                break;

            /**
             * pre-advice related answers

            case "Pré-Conselho Disponível":
                email.setContent("Prezado(a) aluno(a) " + email.getOwner() + ",\n\n"
                        + "Informamos que o Pré-Conselho já está disponível para preenchimento.\n"
                        + "Você poderá realizá-lo até o dia " + dateFormat + " às " + hourFormat + ".\n\n"
                        + "Pedimos, por gentileza, que responda juntamente com a sua turma.\n\n"
                        + "Atenciosamente,\n"
                        + "Equipe do Portal do Conselho");
                break;

            case "Pré-Conselho Pendente":
                email.setContent("Prezado(a) aluno(a) " + email.getOwner() + ",\n\n"
                        + "Verificamos que o seu Conselho ainda está pendente de preenchimento.\n"
                        + "Pedimos que realize o preenchimento até o dia " + dateFormat + " às " + hourFormat + ".\n\n"
                        + "A participação da sua turma é muito importante e deve ser feita em conjunto.\n\n"
                        + "Atenciosamente,\n"
                        + "Equipe do Portal do Conselho");
                break;

            /**
             * message related responses

            case "Mensagem Recebida":
                email.setContent("Prezado(a) " + email.getTypeUser() + " " + email.getOwner() + ",\n\n"
                        + "Você recebeu uma nova mensagem relacionada ao " + email.getTypeContent() + ".\n"
                        + "Recomendamos que acesse o sistema para verificar o conteúdo e, se necessário, tomar as devidas providências.\n\n"
                        + "Atenciosamente,\n"
                        + "Equipe do Portal do Conselho");
                ;
                break;

            /**
             * responses related to reports

            case "Relatório Disponível":
                email.setContent("Prezado(a) pedagogo " + email.getOwner() + ",\n\n"
                        + "O relatório consolidado do conselho realizado no dia " + dateFormat + " da turma " + email.getTurma() + " já está disponível para download.\n"
                        + "Recomendamos acessar o sistema para análise e acompanhamento dos registros.\n\n"
                        + "Atenciosamente,\n"
                        + "Equipe do Portal do Conselho");
                break;

            /**
             * answers related to advice

            case "Feedback Disponível":
                email.setContent("Prezado(a) " + email.getTypeUser() + " " + email.getOwner() + ",\n\n"
                        + "Informamos que um feedback referente ao seu desempenho no Conselho Escolar foi disponibilizado no portal.\n"
                        + "Recomendamos que acesse o sistema para ler atentamente as observações e orientações registradas.\n\n"
                        + "Sua reflexão sobre esse retorno é muito importante para o seu desenvolvimento.\n\n"
                        + "Atenciosamente,\n"
                        + "Equipe do Portal do Conselho");
                break;

            /**
             * feedback related responses

            case "Visualização do Conselho Diponível":
                email.setContent("Prezado(a) supervisor(a) " + email.getOwner() + ",\n\n"
                        + "O conselho realizado no dia " + dateFormat + " da turma " + email.getTurma() + " está disponível para visualização no portal.\n"
                        + "Solicitamos sua atenção para acompanhar os registros realizados e apoiar nos encaminhamentos necessários.\n\n"
                        + "Atenciosamente,\n"
                        + "Equipe do Portal do Conselho");
                break;

            /**
             * answers related to notes

            case "Anotações Fechadas":
                email.setContent("Prezado(a) professor(a)" + email.getOwner() + ",\n\n"
                        + "Informamos que as anotações para o conselho da turma " + email.getTurma() + " foram encerradas.\n"
                        + "Caso deseje realizar alguma modificação, por gentileza, entre em contato com a equipe pedagógica.\n\n"
                        + "Atenciosamente,\n"
                        + "Equipe do Portal do Conselho");
                break;

        }
        /**
         * return content format

        return email.getContent();
    }
     */
}
