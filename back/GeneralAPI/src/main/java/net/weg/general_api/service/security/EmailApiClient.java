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
        return "Prezado(a) usuário(a) " + studentName + ",\n\n" +
                "Seu cadastro no sistema foi realizado com sucesso!\n\n" +
                "Abaixo estão suas credenciais de acesso:\n" +
                "E-mail: " + studentEmail + "\n" +
                "Senha: " + password + "\n\n" +
                "Recomendamos que altere sua senha após o primeiro login.\n\n" +
                "Atenciosamente,\n" +
                "Equipe do Portal do Conselho";
    }

    private String createEmailContentRecoverPassword(String studentName, String code) {
        return "Prezado(a) usuário(a) " + studentName + ",\n\n" +
                "Seu código de recuperação de senha foi criado!\n\n" +
                "Abaixo esta seu código:\n" +
                "Senha: " + code + "\n\n" +
                "Recomendamos que não envie seu código para ninguém.\n\n" +
                "Atenciosamente,\n" +
                "Equipe do Portal do Conselho";
    }
}