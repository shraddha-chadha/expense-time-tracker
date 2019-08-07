package com.plaid.quickstart.resources;

import java.io.IOException;

import com.plaid.client.PlaidClient;
import com.plaid.client.request.AccountsGetRequest;
import com.plaid.client.response.AccountsGetResponse;
import com.plaid.quickstart.QuickstartApplication;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import retrofit2.Response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Path("/accounts")
@Produces(MediaType.APPLICATION_JSON)
public class AccountsResource {
  private static final Logger LOG = LoggerFactory.getLogger(AccessTokenResource.class);
  private PlaidClient plaidClient;

  public AccountsResource(PlaidClient plaidClient) {
    this.plaidClient = plaidClient;
  }

  @GET
  public AccountsGetResponse getAccounts() throws IOException {
    Response<AccountsGetResponse> accountsResponse = plaidClient.service()
      .accountsGet(new AccountsGetRequest(QuickstartApplication.accessToken))
      .execute();
    LOG.info(accountsResponse.body().toString());
    return accountsResponse.body();
  }
}
