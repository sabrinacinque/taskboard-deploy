package com.sabrina.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        // 1) Elenca qui TUTTE le origini (front-end) che dovranno chiamare il back-end:
        config.setAllowedOrigins(Arrays.asList(
            "http://localhost:3000",                        // React in locale
            "http://192.168.1.200:3000",                     // React via IP:porta
            "http://192.168.1.200:5173",                     // Vite in locale, se usi 5173
            "https://taskboard-frontend-4trt.onrender.com"   // URL esatto del front in produzione
        ));

        // 2) Metodi HTTP permessi:
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // 3) Se vuoi permettere gli header “Content-Type”, “Authorization” ecc:
        config.setAllowedHeaders(Arrays.asList("Content-Type", "Authorization"));

        // 4) Permetti l’invio di cookie/credentials:
        config.setAllowCredentials(true);

        // 5) Esplicita quali header devono essere esposti al client
        config.setExposedHeaders(Arrays.asList("Authorization", "Set-Cookie"));

        // 6) Applica questa configurazione a tutti i path che iniziano con /api/:
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", config);

        return source;
    }
}
