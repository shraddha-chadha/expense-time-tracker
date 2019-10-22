package com.plaid.quickstart.resources;

import com.plaid.client.PlaidClient;
import com.plaid.client.request.CategoriesGetRequest;
import com.plaid.client.response.CategoriesGetResponse;
import retrofit2.Response;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.io.IOException;

@Path("/categories")
@Produces(MediaType.APPLICATION_JSON)
public class CategoryResource {

    private PlaidClient plaidClient;

    public CategoryResource(PlaidClient plaidClient)
    {
        this.plaidClient = plaidClient;
    }

    @GET
    public CategoriesGetResponse getCategoryResponse() throws IOException{
        Response<CategoriesGetResponse> categoriesGetResponseResponse = plaidClient.service()
                .categoriesGet(new CategoriesGetRequest())
                .execute();
        return categoriesGetResponseResponse.body();
    }
}
