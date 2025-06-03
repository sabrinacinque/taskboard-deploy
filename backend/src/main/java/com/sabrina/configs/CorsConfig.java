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
            "http://localhost:3000",                        // React in locale (sviluppo)
            "http://192.168.1.200:3000",                     // React via IP locale
            "http://192.168.1.200:5173",                     // Vite in locale
            "https://taskboard-frontend-0ta1.onrender.com"   // URL esatto del frontend in produzione
        ));

        // 2) Metodi HTTP permessi:
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // 3) Header consentiti (es. Content-Type, Authorization, ecc.):
        config.setAllowedHeaders(Arrays.asList("Content-Type", "Authorization"));

        // 4) Permetti l’invio di cookie/credentials:
        config.setAllowCredentials(true);

        // 5) Esplicita quali header esporre al client:
        config.setExposedHeaders(Arrays.asList("Authorization", "Set-Cookie"));

        // 6) Applica questa configurazione a TUTTI i path del server (“/**” anziché “/api/**”):
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}
