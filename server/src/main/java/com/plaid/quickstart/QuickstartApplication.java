package com.plaid.quickstart;

import com.plaid.quickstart.auth.ExpenseAndTimeAuthenticator;
import com.plaid.quickstart.core.User;
import com.plaid.quickstart.resources.*;
import io.dropwizard.Application;
import io.dropwizard.assets.AssetsBundle;
import io.dropwizard.auth.AuthDynamicFeature;
import io.dropwizard.auth.AuthValueFactoryProvider;
import io.dropwizard.auth.basic.BasicCredentialAuthFilter;
import io.dropwizard.configuration.EnvironmentVariableSubstitutor;
import io.dropwizard.configuration.SubstitutingSourceProvider;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;
import io.dropwizard.views.ViewBundle;

import com.plaid.client.PlaidClient;

public class QuickstartApplication extends Application<QuickstartConfiguration> {
  private PlaidClient plaidClient;
  public static String accessToken;

  public static void main(final String[] args) throws Exception {
    new QuickstartApplication().run(args);
  }

  @Override
  public String getName() {
    return "Quickstart";
  }

  @Override
  public void initialize(final Bootstrap<QuickstartConfiguration> bootstrap) {
    bootstrap.setConfigurationSourceProvider(
      new SubstitutingSourceProvider(bootstrap.getConfigurationSourceProvider(),
                       new EnvironmentVariableSubstitutor()
      )
    );
    bootstrap.addBundle(new AssetsBundle("/static", "/static"));
    bootstrap.addBundle(new ViewBundle<QuickstartConfiguration>());
  }

  @Override
  public void run(final QuickstartConfiguration configuration,
          final Environment environment) {
    plaidClient = PlaidClient.newBuilder()
      .clientIdAndSecret(configuration.getPlaidClientID(), configuration.getPlaidSecret())
      .publicKey(configuration.getPlaidPublicKey()) // optional. only needed to call endpoints that require a public key
      .developmentBaseUrl() // or equivalent, depending on which environment you're calling into
      .build();

    environment.jersey().register(new AuthDynamicFeature(new BasicCredentialAuthFilter.Builder<User>()
                .setAuthenticator(new ExpenseAndTimeAuthenticator()).buildAuthFilter()));
    environment.jersey().register(new AuthValueFactoryProvider.Binder<>(User.class));
    environment.jersey().register(new AccessTokenResource(plaidClient));
    environment.jersey().register(new AccountsResource(plaidClient));
    environment.jersey().register(new IndexResource("development", configuration.getPlaidPublicKey()));
    environment.jersey().register(new ItemResource(plaidClient));
    environment.jersey().register(new PublicTokenResource(plaidClient));
    environment.jersey().register(new TransactionsResource(plaidClient));
    environment.jersey().register(new CategoryResource(plaidClient));
  }
}
