package com.example.springbootecommerce;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.info.Info;

@SpringBootApplication
@OpenAPIDefinition(
		info = @Info(
				title = "Jenny's Shop App",
				version = "1.0.0",
				description = "Spring Boot 3.0.2 project",
				termsOfService = "happy coding",
				contact = @Contact(
						name = "Jenny Li",
						email = "chunhua.li.chen@gmail.com"),
				license = @License(
					name = "license",
					url = "happyCoding")
				
				) )

public class SpringBootEcommerceApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootEcommerceApplication.class, args);
	}

}
