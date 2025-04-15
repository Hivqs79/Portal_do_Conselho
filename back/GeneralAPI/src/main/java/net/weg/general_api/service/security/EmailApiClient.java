package net.weg.general_api.service.security;

import net.weg.general_api.model.entity.users.EmailModel;
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
        emailModel.setContent(createEmailContent(studentName, studentEmail, generatedPassword));

        ResponseEntity<EmailModel> response = restTemplate.postForEntity(
                EMAIL_API_URL,
                emailModel,
                EmailModel.class
        );

        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("Falha ao enviar e-mail com as credenciais");
        }
    }

    private String createEmailContent(String studentName, String studentEmail, String password) {
        return "Prezado(a) usuário(a) " + studentName + ",\n\n" +
                "Seu cadastro no sistema foi realizado com sucesso!\n\n" +
                "Abaixo estão suas credenciais de acesso:\n" +
                "E-mail: " + studentEmail + "\n" +
                "Senha: " + password + "\n\n" +
                "Recomendamos que altere sua senha após o primeiro login.\n\n" +
                "Atenciosamente,\n" +
                "Equipe do Portal do Conselho";
    }
}