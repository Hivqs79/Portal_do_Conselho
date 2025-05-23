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

package net.weg.general_api.service.security;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.weg.general_api.exception.exceptions.EmailSendingException;
import net.weg.general_api.exception.exceptions.EmailServiceUnavailableException;
import net.weg.general_api.model.entity.security.EmailModel;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
@Slf4j
public class EmailApiClient {

    private static final String EMAIL_API_URL = "http://email-api-service:8083/email/send";
    private static final String DEFAULT_SENDER = "portal.do.conselho.email@gmail.com";

    private final RestTemplate restTemplate;

    public void sendPasswordEmail(String recipient, String ownerName, String generatedPassword) {
        sendEmail(buildEmailModel(recipient, ownerName, "Cadastro Realizado")
                .password(generatedPassword)
                .build());
    }

    public void sendCodeEmail(String recipient, String ownerName, String code) {
        sendEmail(buildEmailModel(recipient, ownerName, "Recuperacao Senha")
                .token(code)
                .build());
    }

    public void sendCouncilInfoEmail(String recipient, String ownerName, String aClass, LocalDateTime startDateTime) {
        sendEmail(buildEmailModel(recipient, ownerName, "Conselho Marcado")
                .turma(aClass)
                .date(startDateTime)
                .build());
    }

    private EmailModel.EmailModelBuilder buildEmailModel(String recipient, String ownerName, String title) {
        return EmailModel.builder()
                .owner(ownerName)
                .sender(DEFAULT_SENDER)
                .reciver(recipient)
                .title(title)
                .date(LocalDateTime.now());
    }

    private void sendEmail(EmailModel emailModel) {
        try {
            log.debug("Enviando e-mail para: {}", emailModel.getReciver());
            ResponseEntity<EmailModel> response = restTemplate.postForEntity(
                    EMAIL_API_URL,
                    emailModel,
                    EmailModel.class
            );

            if (!response.getStatusCode().is2xxSuccessful()) {
                throw new EmailSendingException("Falha ao enviar e-mail. Status: " + response.getStatusCode());
            }
            log.info("E-mail enviado com sucesso para: {}", emailModel.getReciver());
        } catch (RestClientException e) {
            log.error("Erro ao comunicar com serviço de e-mail", e);
            throw new EmailServiceUnavailableException("Serviço de e-mail indisponível", e);
        }
    }
}