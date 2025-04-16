package net.weg.general_api.service.security;

import net.weg.general_api.model.entity.security.EmailModel;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;

@Service
public class EmailApiClient {

    private static final String EMAIL_API_URL = "http://localhost:8074/email/send";

    public void sendPasswordEmail(String studentEmail, String studentName, String generatedPassword) {
        RestTemplate restTemplate = new RestTemplate();

        EmailModel emailModel = new EmailModel();
        emailModel.setOwner(studentName);
        emailModel.setSender("portal.do.conselho.email@gmail.com");
        emailModel.setReciver(studentEmail);
        emailModel.setTitle("Cadastro Realizado");
        emailModel.setPassword(generatedPassword);
        emailModel.setDate(LocalDateTime.now());

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
        emailModel.setTitle("Código de Recuperação da Senha");
        emailModel.setToken(code);
        emailModel.setDate(LocalDateTime.now());

        ResponseEntity<EmailModel> response = restTemplate.postForEntity(
                EMAIL_API_URL,
                emailModel,
                EmailModel.class
        );

        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("Falha ao enviar e-mail com as credenciais");
        }
    }
}