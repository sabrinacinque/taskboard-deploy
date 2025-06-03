package com.sabrina.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // QUESTO BEAN DEVE ESISTERE, altrimenti Spring non riesce a iniettare passwordEncoder
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http,
            CorsConfigurationSource corsConfigurationSource
    ) throws Exception {
        http
          // 1) Disabilito CSRF per API REST stateless
          .csrf(AbstractHttpConfigurer::disable)
          // 2) Dico a Spring di usare il bean CorsConfig
          .cors(cors -> cors.configurationSource(corsConfigurationSource))
          // 3) Permetto sempre preflight OPTIONS e poi qualsiasi altra richiesta
          .authorizeHttpRequests(auth ->
            auth
              .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
              .anyRequest().permitAll()
          )
          // 4) Uso sessione stateless (JWT) se serve
          .sessionManagement(session ->
            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
          )
          // 5) Disabilito formLogin e basicAuth
          .httpBasic(AbstractHttpConfigurer::disable)
          .formLogin(AbstractHttpConfigurer::disable);

        return http.build();
    }
}
