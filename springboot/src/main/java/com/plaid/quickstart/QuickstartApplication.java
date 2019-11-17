package com.plaid.quickstart;

import com.plaid.client.PlaidClient;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class QuickstartApplication {
	public static PlaidClient plaidClient;
	public static String accessToken;
	public static void main(String[] args) {
		ConfigurableApplicationContext ctx = SpringApplication.run(QuickstartApplication.class, args);

		String plaidClientId = ctx.getEnvironment().getProperty("plaidClientID");
		String plaidSecret = ctx.getEnvironment().getProperty("plaidSecret");
		String plaidPublicKey = ctx.getEnvironment().getProperty("plaidPublicKey");

		plaidClient = PlaidClient.newBuilder()
				.clientIdAndSecret(plaidClientId, plaidSecret)
				.publicKey(plaidPublicKey) // optional. only needed to call endpoints that require a public key
				.developmentBaseUrl() // or equivalent, depending on which environment you're calling into
				.build();
	}

}
