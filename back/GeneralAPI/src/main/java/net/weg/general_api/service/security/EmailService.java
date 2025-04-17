package net.weg.general_api.service.security;

import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmailService {

    private final EmailApiClient emailApiClient;

    @Async("taskExecutor")
    public void sendPasswordEmailAsync(String email, String name, String password) {
        try {
            emailApiClient.sendPasswordEmail(email, name, password);
        } catch (Exception e) {
            //TODO não sei como tratar...
            System.err.println("Falha ao enviar e-mail para " + email);
        }
    }

    @Async("taskExecutor")
    public void sendCodeEmailAsync(String email, String name, String code) {
        try {
            emailApiClient.sendCodeEmail(email, name, code);
        } catch (Exception e) {
            //TODO não sei como tratar...
            System.err.println("Falha ao enviar e-mail para " + email);
        }
    }

}
