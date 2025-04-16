package net.weg.general_api.configuration;

import lombok.AllArgsConstructor;
import net.weg.general_api.service.security.AuthorizationService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@AllArgsConstructor
public class SecurityConfig {

    private final AuthorizationService authorizationService;
    private final JWTFilter jwtFilter;

    private static final String[] SWAGGER_WHITELIST = {
            "/v2/api-docs",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui.html",
            "/webjars/**",
            "/v3/api-docs/**",
            "/swagger-ui/**",
            "/swagger-ui.html"
    };

    private static final String[] AUTHENTICATION_WHITELIST = {
            "/auth/recovery/verify-code",
            "/auth/recovery/reset-password",
            "/auth/recovery/forgot-password",
            "/auth/login"
    };

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(SWAGGER_WHITELIST).permitAll()
                        .requestMatchers(AUTHENTICATION_WHITELIST).permitAll()
                        .requestMatchers(HttpMethod.POST, "auth/change-password").authenticated()

                        // Configurações específicas para TeacherController
                        .requestMatchers(HttpMethod.GET, "/teacher/{id}").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/teacher/{id}").hasAnyRole("SUBPEDAGOGIC")
                        .requestMatchers(HttpMethod.DELETE, "/teacher/{id}").hasRole("SUBPEDAGOGIC")
                        .requestMatchers(HttpMethod.GET, "/teacher").hasAnyRole("SUBPEDAGOGIC")
                        .requestMatchers(HttpMethod.POST, "/teacher").hasRole("SUBPEDAGOGIC")
                        .requestMatchers(HttpMethod.PATCH, "/teacher/remove-class/{id}").hasRole("SUBPEDAGOGIC")
                        .requestMatchers(HttpMethod.PATCH, "/teacher/add-class/{id}").hasRole("SUBPEDAGOGIC")
                        .requestMatchers(HttpMethod.GET, "/teacher/classes/{id}").authenticated()

                        // Configurações para SupervisorController
                        .requestMatchers(HttpMethod.GET, "/supervisor/{id}").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/supervisor/{id}").hasAnyRole("SUBPEDAGOGIC")
                        .requestMatchers(HttpMethod.DELETE, "/supervisor/{id}").hasRole("SUBPEDAGOGIC")
                        .requestMatchers(HttpMethod.GET, "/supervisor").hasAnyRole("SUBPEDAGOGIC")
                        .requestMatchers(HttpMethod.POST, "/supervisor").hasRole("SUBPEDAGOGIC")

                        // Configurações para SubPedagogicController
                        .requestMatchers(HttpMethod.GET, "/subPedagogic/{id}").hasRole("SUBPEDAGOGIC")
                        .requestMatchers(HttpMethod.PUT, "/subPedagogic/{id}").hasRole("PEDAGOGIC")
                        .requestMatchers(HttpMethod.DELETE, "/subPedagogic/{id}").hasRole("PEDAGOGIC")
                        .requestMatchers(HttpMethod.GET, "/subPedagogic").hasAnyRole("SUBPEDAGOGIC")
                        .requestMatchers(HttpMethod.POST, "/subPedagogic").hasRole("PEDAGOGIC")

                        // Configurações para StudentController
                        .requestMatchers(HttpMethod.GET, "/student/{id}").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/student/{id}").hasAnyRole("SUBPEDAGOGIC")
                        .requestMatchers(HttpMethod.DELETE, "/student/{id}").hasRole("SUBPEDAGOGIC")
                        .requestMatchers(HttpMethod.GET, "/student").hasAnyRole("SUBPEDAGOGIC")
                        .requestMatchers(HttpMethod.POST, "/student").hasRole("SUBPEDAGOGIC")
                        .requestMatchers(HttpMethod.PATCH, "/student/remove-class/{id}").hasAnyRole("SUBPEDAGOGIC")
                        .requestMatchers(HttpMethod.PATCH, "/student/add-class/{id}").hasAnyRole("SUBPEDAGOGIC")

                        // Configurações para PedagogicController
                        .requestMatchers(HttpMethod.GET, "/pedagogic/{id}").hasRole("SUBPEDAGOGIC")
                        .requestMatchers(HttpMethod.PUT, "/pedagogic/{id}").hasRole("PEDAGOGIC")
                        .requestMatchers(HttpMethod.DELETE, "/pedagogic/{id}").hasRole("PEDAGOGIC")
                        .requestMatchers(HttpMethod.GET, "/pedagogic").hasAnyRole("SUBPEDAGOGIC")
                        .requestMatchers(HttpMethod.POST, "/pedagogic").hasRole("ADMIN")

                        // Configurações para FeedbackUserController
                        .requestMatchers(HttpMethod.GET, "/feedbacks/user/{id}").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/feedbacks/user/{id}").hasAnyRole("SUBPEDAGOGIC")
                        .requestMatchers(HttpMethod.DELETE, "/feedbacks/user/{id}").hasRole("SUBPEDAGOGIC")
                        .requestMatchers(HttpMethod.GET, "/feedbacks/user").hasAnyRole("SUBPEDAGOGIC")
                        .requestMatchers(HttpMethod.POST, "/feedbacks/user").hasAnyRole("SUBPEDAGOGIC")
                        .requestMatchers(HttpMethod.PATCH, "/feedbacks/user/return/{id}").hasRole("SUBPEDAGOGIC")
                        .requestMatchers(HttpMethod.GET, "/feedbacks/user/find/{id}").authenticated()

                        // Configurações para FeedbackStudentController
                        .requestMatchers(HttpMethod.GET, "/feedbacks/student/{id}").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/feedbacks/student/{id}").hasAnyRole("SUBPEDAGOGIC")
                        .requestMatchers(HttpMethod.DELETE, "/feedbacks/student/{id}").hasRole("SUBPEDAGOGIC")
                        .requestMatchers(HttpMethod.GET, "/feedbacks/student").hasAnyRole("SUBPEDAGOGIC")
                        .requestMatchers(HttpMethod.POST, "/feedbacks/student").hasAnyRole("SUBPEDAGOGIC")
                        .requestMatchers(HttpMethod.PATCH, "/feedbacks/student/return/{id}").hasRole("SUBPEDAGOGIC")
                        .requestMatchers(HttpMethod.GET, "/feedbacks/student/find/{id}").authenticated()

                        // Configurações para FeedbackClassController
                        .requestMatchers(HttpMethod.GET, "/feedbacks/class/{id}").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/feedbacks/class/{id}").hasAnyRole("SUBPEDAGOGIC")
                        .requestMatchers(HttpMethod.DELETE, "/feedbacks/class/{id}").hasRole("SUBPEDAGOGIC")
                        .requestMatchers(HttpMethod.GET, "/feedbacks/class").hasAnyRole("SUBPEDAGOGIC")
                        .requestMatchers(HttpMethod.POST, "/feedbacks/class").hasAnyRole("SUBPEDAGOGIC")
                        .requestMatchers(HttpMethod.PATCH, "/feedbacks/class/return/{id}").hasRole("SUBPEDAGOGIC")
                        .requestMatchers(HttpMethod.GET, "/feedbacks/class/find/{id}").authenticated()

                        .requestMatchers(HttpMethod.PUT, "/customization/{user_id}").authenticated()
                        .requestMatchers(HttpMethod.GET, "/customization/{id}").authenticated()

                        .anyRequest().authenticated()
                )
                .userDetailsService(authorizationService)
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    /*
        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

            http
                    .csrf(AbstractHttpConfigurer::disable)
                    .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                    .authorizeHttpRequests(authorizeRequests -> {
                        authorizeRequests.anyRequest().permitAll();
                    })
                    .userDetailsService(authorizationService)
                    .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
            ;

            return http.build();
        }
    */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
