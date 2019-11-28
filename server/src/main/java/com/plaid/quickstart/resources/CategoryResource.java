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
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Path("/categories")
@Produces(MediaType.APPLICATION_JSON)
public class CategoryResource {

    private PlaidClient plaidClient;

    public CategoryResource(PlaidClient plaidClient)
    {
        this.plaidClient = plaidClient;
    }

    @GET
    public Set<String> getCategoryResponse() throws IOException{
        Response<CategoriesGetResponse> categoriesGetResponseResponse = plaidClient.service()
                .categoriesGet(new CategoriesGetRequest())
                .execute();
       List<CategoriesGetResponse.Category> categories =  categoriesGetResponseResponse.body().getCategories();
        Set<String> categorySet = new HashSet<>();
       for(CategoriesGetResponse.Category category: categories){


               categorySet.add(category.getHierarchy().get(0));

       }
        return categorySet;
    }
}
