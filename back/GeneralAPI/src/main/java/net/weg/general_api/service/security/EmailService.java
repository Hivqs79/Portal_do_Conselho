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
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

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

    @Async("taskExecutor")
    public void sendCouncilInfoEmailAsync(String email, String name, String aClass, LocalDateTime startDateTime) {
        try {
            log.info("Enviando e-mail com código para: {}", email);
            emailApiClient.sendCouncilInfoEmail(email, name, aClass, startDateTime);
        } catch (Exception e) {
            log.error("Falha ao enviar e-mail de código para {}", email, e);
            //TODO: Mesma estratégia de tratamento de erro da sendPasswordEmailAsync
        }
    }

}