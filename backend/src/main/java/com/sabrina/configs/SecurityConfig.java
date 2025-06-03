package com.sabrina.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // Il bean per la codifica delle password
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Inietti il tuo bean CorsConfigurationSource (definito in CorsConfig.java)
    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http,
            CorsConfigurationSource corsConfigurationSource
    ) throws Exception {
        http
            // 1) Disabilita CSRF perché fai API REST stateless
            .csrf(AbstractHttpConfigurer::disable)

            // 2) "Dico a Spring Security di utilizzare il bean CorsConfig"
            .cors(cors -> cors.configurationSource(corsConfigurationSource))

            // 3) Autorizzazioni: 
            //    - permetto SEMPRE tutte le richieste OPTIONS (preflight)
            //    - e per tutte le altre richieste NON applico restrizioni (permitAll)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .anyRequest().permitAll()
            )

            // 4) Se usi JWT/stateless, imposta la sessione in modalità stateless
            .sessionManagement(session ->
                session.sessionCreationPolicy(
                    org.springframework.security.config.http.SessionCreationPolicy.STATELESS
                )
            )

            // 5) Disabilita Basic auth e Form login, se non servono
            .httpBasic(AbstractHttpConfigurer::disable)
            .formLogin(AbstractHttpConfigurer::disable);

        return http.build();
    }
}