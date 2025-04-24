package net.weg.general_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class GeneralApiApplication {

	public static void main(String[] args) {
		System.out.println("logDoBackend" + "Rodando a minha versão do código v7. Ass: PW");
		SpringApplication.run(GeneralApiApplication.class, args);
	}

}
