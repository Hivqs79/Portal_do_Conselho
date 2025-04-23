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