package net.weg.general_api.service.security;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j // Usando Lombok para logs
public class EmailService {

    private final EmailApiClient emailApiClient;

    @Async("taskExecutor")
    public void sendPasswordEmailAsync(String email, String name, String password) {
        try {
            log.info("Enviando e-mail com senha para: {}", email);
            emailApiClient.sendPasswordEmail(email, name, password);
        } catch (Exception e) {
            log.error("Falha ao enviar e-mail de senha para {}", email, e);
            //TODO: Podemos adicionar aqui uma tentativa de reenvio ou notificação
        }
    }

    @Async("taskExecutor")
    public void sendCodeEmailAsync(String email, String name, String code) {
        try {
            log.info("Enviando e-mail com código para: {}", email);
            emailApiClient.sendCodeEmail(email, name, code);
        } catch (Exception e) {
            log.error("Falha ao enviar e-mail de código para {}", email, e);
            //TODO: Mesma estratégia de tratamento de erro da sendPasswordEmailAsync
        }
    }
}