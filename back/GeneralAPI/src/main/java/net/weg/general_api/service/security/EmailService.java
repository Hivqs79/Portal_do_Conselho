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
            System.out.println("Iniciando envio assíncrono de e-mail para: " + email);
            emailApiClient.sendPasswordEmail(email, name, password);
            System.out.println("E-mail enviado com sucesso para: " + email);
        } catch (Exception e) {
            System.err.println("Falha ao enviar e-mail para " + email);
            e.printStackTrace();
        }
    }

    @Async("taskExecutor")
    public void sendCodeEmailAsync(String email, String name, String code) {
        try {
            System.out.println("Iniciando envio assíncrono de e-mail para: " + email);
            emailApiClient.sendCodeEmail(email, name, code);
            System.out.println("E-mail enviado com sucesso para: " + email);
        } catch (Exception e) {
            System.err.println("Falha ao enviar e-mail para " + email);
            e.printStackTrace();
        }
    }

}
