package spring.emailsenderapi.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import spring.emailsenderapi.model.EmailModel;
import spring.emailsenderapi.repository.EmailRepository;

import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Service
@AllArgsConstructor
public class EmailService {

    private final JavaMailSender sender;
    private final EmailRepository repository;
    private final EmailTemplateService templateService;

    public EmailModel sendEmail(EmailModel email) {
        try {
            MimeMessage message = sender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(email.getSender());
            helper.setTo(email.getReciver());
            helper.setSubject(email.getTitle());

            String htmlContent = processEmailContent(email);
            helper.setText(htmlContent, true);

            sender.send(message);
            return repository.save(email);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }

    private String processEmailContent(EmailModel email) {
        Map<String, String> variables = new HashMap<>();
        variables.put("title", email.getTitle());
        variables.put("owner", email.getOwner());
        variables.put("reciver", email.getReciver());
        variables.put("password", email.getPassword());
        variables.put("token", email.getToken());
        variables.put("turma", email.getTurma());
        variables.put("typeUser", email.getTypeUser());
        variables.put("typeContent", email.getTypeContent());

        variables.put("siteUrl", "http://74.163.208.46.nip.io/");
        variables.put("contactUrl", "http://74.163.208.46.nip.io/support");

        if (email.getDate() != null) {
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            variables.put("date", email.getDate().format(dateFormatter));

            DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");
            variables.put("time", email.getDate().format(timeFormatter));
        }

        return templateService.processTemplate(email.getTitle().toLowerCase().replace(" ", "-"), variables);
    }
}