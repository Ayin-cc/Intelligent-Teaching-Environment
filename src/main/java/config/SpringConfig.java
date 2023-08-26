package config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan({"entity", "service", "dao", "controller"})
public class SpringConfig {
}
