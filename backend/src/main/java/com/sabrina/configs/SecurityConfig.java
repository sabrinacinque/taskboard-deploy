package com.sabrina.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(
        HttpSecurity http,
        CorsConfigurationSource corsConfigurationSource
    ) throws Exception {
        http
          .csrf(AbstractHttpConfigurer::disable)
          .cors(cors -> cors.configurationSource(corsConfigurationSource))
          .authorizeHttpRequests(auth ->
            auth
              .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
              .anyRequest().permitAll()
          )
          .sessionManagement(session ->
            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
          )
          .httpBasic(AbstractHttpConfigurer::disable)
          .formLogin(AbstractHttpConfigurer::disable);
        return http.build();
    }
}