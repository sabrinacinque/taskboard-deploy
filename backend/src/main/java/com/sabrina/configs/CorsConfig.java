package com.sabrina.configs;

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
        // Permetti solo il tuo dominio front-end
        config.setAllowedOrigins(List.of("https://taskboard-frontend-0ta1.onrender.com"));
        config.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
        // Puoi anche usare config.setAllowedHeaders(List.of("*"));
        config.setAllowedHeaders(List.of("Content-Type","Authorization"));
        config.setAllowCredentials(true);
        config.setExposedHeaders(List.of("Authorization","Set-Cookie"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
