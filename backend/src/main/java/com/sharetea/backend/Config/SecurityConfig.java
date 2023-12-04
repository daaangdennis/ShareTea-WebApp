package com.sharetea.backend.Config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import static org.springframework.security.config.Customizer.withDefaults;


@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(withDefaults())
                .authorizeHttpRequests((authorize) -> authorize
                    .requestMatchers(new AntPathRequestMatcher("/users/*")).hasAnyAuthority("admin")

                    .requestMatchers(new AntPathRequestMatcher("/menu/*")).hasAnyAuthority("admin", "manager")

                    .requestMatchers(new AntPathRequestMatcher("/product/get**")).permitAll()
                    .requestMatchers(new AntPathRequestMatcher("/product/*")).hasAnyAuthority("manager", "admin")

                    .requestMatchers(new AntPathRequestMatcher("/orders/add**")).permitAll()
                    .requestMatchers(new AntPathRequestMatcher("/orders/next")).permitAll()
                    .requestMatchers(new AntPathRequestMatcher("/orders**")).hasAnyAuthority("cashier","manager", "admin")

                    .requestMatchers(new AntPathRequestMatcher("/**")).permitAll()
                    .anyRequest().authenticated()
                    //.requestMatchers("/api/private-scoped").hasAuthority("SCOPE_read:messages")
                )
                .oauth2ResourceServer(oauth2 -> oauth2
                    .jwt(jwt -> jwt.jwtAuthenticationConverter(makePermissionsConverter()))
                    
                )
                
                .build();
    }
    
    private JwtAuthenticationConverter makePermissionsConverter() {
        final var jwtAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        jwtAuthoritiesConverter.setAuthoritiesClaimName("permissions");
        jwtAuthoritiesConverter.setAuthorityPrefix("");

        final var jwtAuthConverter = new JwtAuthenticationConverter();
        jwtAuthConverter.setJwtGrantedAuthoritiesConverter(jwtAuthoritiesConverter);

        return jwtAuthConverter;
    }
}