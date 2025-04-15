package net.weg.general_api.service.security;

import net.weg.general_api.model.entity.security.EmailModel;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class EmailApiClient {

    private static final String EMAIL_API_URL = "http://localhost:8074/email/send";

    public void sendPasswordEmail(String studentEmail, String studentName, String generatedPassword) {
        RestTemplate restTemplate = new RestTemplate();

        EmailModel emailModel = new EmailModel();
        emailModel.setOwner(studentName);
        emailModel.setSender("portal.do.conselho.email@gmail.com");
        emailModel.setReciver(studentEmail);
        emailModel.setTitle("Cadastro Realizado - Credenciais de Acesso");
        emailModel.setContent(createEmailContentCreateUser(studentName, studentEmail, generatedPassword));

        ResponseEntity<EmailModel> response = restTemplate.postForEntity(
                EMAIL_API_URL,
                emailModel,
                EmailModel.class
        );

        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("Falha ao enviar e-mail com as credenciais");
        }
    }

    public void sendCodeEmail(String studentEmail, String studentName, String code) {
        RestTemplate restTemplate = new RestTemplate();

        EmailModel emailModel = new EmailModel();
        emailModel.setOwner(studentName);
        emailModel.setSender("portal.do.conselho.email@gmail.com");
        emailModel.setReciver(studentEmail);
        emailModel.setTitle("Código de Recuperação - Credenciais de Acesso");
        emailModel.setContent(createEmailContentRecoverPassword(studentName, code));

        ResponseEntity<EmailModel> response = restTemplate.postForEntity(
                EMAIL_API_URL,
                emailModel,
                EmailModel.class
        );

        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("Falha ao enviar e-mail com as credenciais");
        }
    }

    private String createEmailContentCreateUser(String studentName, String studentEmail, String password) {
        return String.format(
                "Assunto: Criação de Conta - Portal do Conselho\n\n" +
                        "Prezado(a) %s,\n\n" +
                        "Seu cadastro no sistema foi realizado com sucesso! \n" +
                        "Abaixo estão suas credenciais de acesso:\n\n" +
                        "E-mail: %s\n" +
                        "Senha: %s\n\n" +
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
                        "Caso necessite de ajuda, entre em contato através do nosso site oficial.",
                studentName, studentEmail, password
        );
    }

    private String createEmailContentRecoverPassword(String studentName, String code) {
        return String.format(
                "Assunto: Código de Recuperação de Senha - Portal do Conselho\n\n" +
                        "Prezado(a) %s,\n\n" +
                        "Recebemos uma solicitação para redefinição da senha da sua conta. \n" +
                        "Segue abaixo o seu código de verificação exclusivo:\n\n" +
                        "%6s\n" +
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
                        "Caso necessite de ajuda, entre em contato através do nosso site oficial.",
                studentName, code
        );
    }
}