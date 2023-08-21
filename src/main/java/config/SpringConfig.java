package config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan({"entity", "serve", "dao", "controller"})
public class SpringConfig {
}
