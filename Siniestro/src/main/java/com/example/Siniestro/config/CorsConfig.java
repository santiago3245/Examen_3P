package com.example.Siniestro.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class CorsConfig {

    @Value("${FRONTEND_URL:http://localhost:3000}")
    private String frontendUrl;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        
        // Orígenes permitidos (desde frontend) - usar variable de entorno
        config.setAllowedOriginPatterns(Arrays.asList(
            frontendUrl,
            "http://localhost:*",
            "http://127.0.0.1:*"
        ));
        
        // Permitir credenciales (cookies, authorization headers)
        config.setAllowCredentials(true);
        
        // Headers permitidos
        config.addAllowedHeader("*");
        
        // Métodos HTTP permitidos
        config.addAllowedMethod("*");
        
        // Headers expuestos
        config.addExposedHeader("Authorization");
        
        // Tiempo de cache del preflight
        config.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        
        return source;
    }
}
