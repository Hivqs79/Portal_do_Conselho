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
/**
 * @author Mateus Henrique Bosquetti
 */
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