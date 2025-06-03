package com.sabrina.configs;  // <-- stesso livello della classe principale

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        // 1) Permetti soltanto il dominio del frontend
        config.setAllowedOrigins(List.of("https://taskboard-frontend-0ta1.onrender.com"));

        // 2) Metodi HTTP permessi (incluso OPTIONS per la preflight)
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // 3) Header consentiti (puoi anche fare List.of("*") se preferisci)
        config.setAllowedHeaders(List.of("Content-Type", "Authorization"));

        // 4) Consentire le credenziali (cookie, authorization header, ecc.)
        config.setAllowCredentials(true);

        // 5) Esporre header speciali al client
        config.setExposedHeaders(List.of("Authorization", "Set-Cookie"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
