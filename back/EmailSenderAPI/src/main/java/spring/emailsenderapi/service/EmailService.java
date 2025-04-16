package spring.emailsenderapi.service;

import lombok.AllArgsConstructor;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import spring.emailsenderapi.model.EmailModel;
import spring.emailsenderapi.repository.EmailRepository;

@Service
@AllArgsConstructor
/**
 * @author Vinícius Eduardo dos Santos
 */
public class EmailService {

    private JavaMailSender sender;
    private EmailRepository repository;

    public EmailModel sendEmail(EmailModel email){
        try {
            SimpleMailMessage message = new SimpleMailMessage();

            message.setFrom(email.getSender());
            message.setTo(email.getReciver());
            message.setSubject(email.getTitle());
            message.setText(email.getContent());

            sender.send(message);
            return repository.save(email);
        }catch (MailException e){
            System.out.println("logDoBackend" + "O envio do Email não funcionou!");
        }
        return null;
    }
}
