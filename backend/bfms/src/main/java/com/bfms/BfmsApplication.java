package com.bfms;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
@EnableScheduling
public class BfmsApplication {
	Logger logger = LoggerFactory.getLogger(BfmsApplication.class);

	public static void main(String[] args) {
		
		 Dotenv dotenv = Dotenv.load();

	        // Set environment variables manually
	        System.setProperty("spring.data.mongodb.uri", dotenv.get("MONGO_URI"));
	        System.setProperty("spring.mail.username", dotenv.get("EMAIL_USERNAME"));
	        System.setProperty("spring.mail.password", dotenv.get("EMAIL_PASSWORD"));


		SpringApplication.run(BfmsApplication.class, args);
	}

	@Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("*");
            }
        };
    }
}
