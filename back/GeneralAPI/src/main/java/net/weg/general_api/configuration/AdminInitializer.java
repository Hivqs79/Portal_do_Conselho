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

package net.weg.general_api.configuration;

import lombok.AllArgsConstructor;
import net.weg.general_api.model.entity.users.Admin;
import net.weg.general_api.model.enums.RoleENUM;
import net.weg.general_api.repository.UserRepository;
import net.weg.general_api.service.users.UserAuthenticationService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class AdminInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final UserAuthenticationService userAuthenticationService;

    @Override
    public void run(String... args) {
        if (!userRepository.existsByUserAuthentication_Username("admin")) {
            Admin admin = new Admin();
            admin.setName("admin");
            admin.setUserAuthentication(
                    userAuthenticationService.saveUserAuthentication("admin", "@portalconselho1234!", RoleENUM.ADMIN)
            );
            userRepository.save(admin);
            System.out.println("Usuário ADMIN padrão criado com sucesso!");
        }
    }
}