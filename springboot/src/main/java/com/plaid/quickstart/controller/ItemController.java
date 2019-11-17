package com.plaid.quickstart.controller;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.plaid.client.PlaidClient;
import com.plaid.client.request.InstitutionsGetByIdRequest;
import com.plaid.client.request.ItemGetRequest;
import com.plaid.client.response.Institution;
import com.plaid.client.response.InstitutionsGetByIdResponse;
import com.plaid.client.response.ItemGetResponse;
import com.plaid.client.response.ItemStatus;
import com.plaid.quickstart.QuickstartApplication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import retrofit2.Response;

import java.io.IOException;

@RestController
public class ItemController {

    private PlaidClient plaidClient;

    @PostMapping("/item")
    public ItemResponse getItem() throws IOException {
        plaidClient = QuickstartApplication.plaidClient;
        Response<ItemGetResponse> itemResponse = plaidClient.service()
                .itemGet(new ItemGetRequest(QuickstartApplication.accessToken))
                .execute();

        Response<InstitutionsGetByIdResponse> institutionsResponse = plaidClient.service()
                .institutionsGetById(new InstitutionsGetByIdRequest(itemResponse.body().getItem().getInstitutionId()))
                .execute();

        return new ItemResponse(
                itemResponse.body().getItem(),
                institutionsResponse.body().getInstitution()
        );
    }

    public static class ItemResponse {
        @JsonProperty
        public ItemStatus item;

        @JsonProperty
        public Institution institution;

        public ItemResponse(ItemStatus item, Institution institution) {
            this.item = item;
            this.institution = institution;
        }
    }
}