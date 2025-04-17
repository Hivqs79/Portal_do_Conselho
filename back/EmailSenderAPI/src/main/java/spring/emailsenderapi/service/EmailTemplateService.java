package spring.emailsenderapi.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.Map;

@Service
public class EmailTemplateService {

    private static final Logger logger = LoggerFactory.getLogger(EmailTemplateService.class);

    public String processTemplate(String templateName, Map<String, String> variables) {
        String templateContent = loadTemplate(templateName);
        return replaceVariables(templateContent, variables);
    }

    private String loadTemplate(String templateName) {
        try {
            Resource resource = new ClassPathResource("templates/email/" + templateName + ".html");
            InputStream inputStream = resource.getInputStream();
            return new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);
        } catch (IOException e) {
            logger.error("Failed to load email template: {}", templateName, e);
            throw new RuntimeException("Failed to load email template: " + templateName, e);
        }
    }

    private String replaceVariables(String content, Map<String, String> variables) {
        String result = content;
        for (Map.Entry<String, String> entry : variables.entrySet()) {
            String replacement = entry.getValue() != null ? entry.getValue() : "";
            // Substitui ambos os formatos ${var} e {{var}}
            result = result.replace("${" + entry.getKey() + "}", replacement)
                    .replace("{{" + entry.getKey() + "}}", replacement);
        }
        return result;
    }
}