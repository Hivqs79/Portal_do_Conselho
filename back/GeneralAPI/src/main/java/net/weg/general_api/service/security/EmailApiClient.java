package net.weg.general_api.service.security;

import lombok.AllArgsConstructor;
import net.weg.general_api.model.entity.security.EmailModel;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class EmailApiClient {

    private static final String EMAIL_API_URL = "http://localhost:8074/email/send";
    private static final String DEFAULT_SENDER = "portal.do.conselho.email@gmail.com";

    private final RestTemplate restTemplate;

    public void sendPasswordEmail(String recipient, String ownerName, String generatedPassword) {
        EmailModel emailModel = EmailModel.builder()
                .owner(ownerName)
                .sender(DEFAULT_SENDER)
                .reciver(recipient)
                .title("Cadastro Realizado")
                .password(generatedPassword)
                .date(LocalDateTime.now())
                .build();

        sendEmail(emailModel);
    }

    public void sendCodeEmail(String recipient, String ownerName, String code) {
        EmailModel emailModel = EmailModel.builder()
                .owner(ownerName)
                .sender(DEFAULT_SENDER)
                .reciver(recipient)
                .title("Código de Recuperação da Senha")
                .token(code)
                .date(LocalDateTime.now())
                .build();

        sendEmail(emailModel);
    }

    private void sendEmail(EmailModel emailModel) {
        try {
            ResponseEntity<EmailModel> response = restTemplate.postForEntity(
                    EMAIL_API_URL,
                    emailModel,
                    EmailModel.class
            );

            if (!response.getStatusCode().is2xxSuccessful()) {
                throw new RuntimeException("Falha ao enviar e-mail. Status code: " + response.getStatusCode());
            }
        } catch (RestClientException e) {
            throw new RuntimeException("Erro na comunicação com o serviço de e-mail", e);
        }
    }
}