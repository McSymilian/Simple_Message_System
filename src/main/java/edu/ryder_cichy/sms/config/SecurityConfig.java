package edu.ryder_cichy.sms.config;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(authorizeRequests ->
                    authorizeRequests
                            .anyRequest().permitAll()
//                            .requestMatchers("/login").permitAll()
//                            .anyRequest().authenticated()
                )
//                .httpBasic(withDefaults())
//                .formLogin(form -> form.loginPage("/login").permitAll())
                .build();
    }
}
