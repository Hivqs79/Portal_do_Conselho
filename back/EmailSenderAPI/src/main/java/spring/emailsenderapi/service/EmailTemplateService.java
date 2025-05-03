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
/**
 * @author Mateus Henrique Bosquetti
 */
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
            result = result.replace("${" + entry.getKey() + "}", replacement);
        }
        return result;
    }
}