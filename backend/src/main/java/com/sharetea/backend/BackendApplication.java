package com.sharetea.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Component;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableScheduling
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
}

@Component
class KeepAliveScheduler {

	private static final String SERVER_URL = "http://localhost:8080/active";

	@Scheduled(cron = "0 */14 * * * *")
	public void keepAlive() {
		try {
			RestTemplate restTemplate = new RestTemplate();
			restTemplate.getForObject(SERVER_URL, String.class);
			System.out.println("Keep alive request sent.");
		} catch (Exception e) {
			System.err.println("Error occurred in keep alive: " + e.getMessage());
		}
	}
}
