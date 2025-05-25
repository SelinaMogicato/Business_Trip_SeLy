package ch.clip.trips;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class SpringWebConfig implements WebMvcConfigurer {
	/**
	 * CORS - Policy - from known Servers
	 */
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		// Configure CORS for all API endpoints
		registry.addMapping("/api/**")
				.allowedOrigins("http://localhost:5173", "http://localhost:3000", "http://localhost:8080")
				.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
				.allowedHeaders("*")
				.allowCredentials(false)
				.maxAge(3600);

		// Keep existing configurations for backward compatibility
		registry.addMapping("/trips/*")
				.allowedOrigins("http://localhost:5173", "http://localhost:3000", "http://localhost:8080")
				.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
				.allowedHeaders("*")
				.allowCredentials(false);

		registry.addMapping("/meeting/*")
				.allowedOrigins("http://localhost:5173", "http://localhost:3000", "http://localhost:8080")
				.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
				.allowedHeaders("*")
				.allowCredentials(false);

		registry.addMapping("/meeting/items/")
				.allowedOrigins("http://localhost:5173", "http://localhost:3000", "http://localhost:8080")
				.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
				.allowedHeaders("*")
				.allowCredentials(false);
	}
}
