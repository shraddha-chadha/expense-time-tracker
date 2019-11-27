package com.plaid.quickstart.service;

import com.plaid.client.PlaidClient;
import com.plaid.client.request.TransactionsGetRequest;
import com.plaid.client.response.ErrorResponse;
import com.plaid.client.response.TransactionsGetResponse;
import com.plaid.quickstart.QuickstartApplication;
import com.plaid.quickstart.dto.CompareExpenseDTO;
import com.plaid.quickstart.exception.ResourceNotFoundException;
import com.plaid.quickstart.model.Transaction;
import com.plaid.quickstart.model.User;
import com.plaid.quickstart.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import retrofit2.Response;

import javax.persistence.RollbackException;
import java.io.IOException;
import java.text.DateFormatSymbols;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;
    private PlaidClient plaidClient;


    public Transaction save(Transaction transaction, User user, Integer vpaIndicator) throws RollbackException {
        try{

                    transaction.setUser(user);
                    transaction.setIsManuallyInserted(vpaIndicator);
                    setDateParams(transaction);


            return transactionRepository.save(transaction);
        }
        catch (Exception e){
            throw e;
        }

    }

    public Transaction addIncomeAndBudget(Transaction transaction, User user, Integer vpaIndicator,
                                          String incomeBudgetIndicator, String dayOrMonth, Double amount,
                                          Integer day, Integer month, Integer quarter, Integer year) throws RollbackException {
        try{

            transaction.setUser(user);
            transaction.setIsManuallyInserted(vpaIndicator);
            transaction.setAmount(amount);
            SimpleDateFormat format = new SimpleDateFormat("MM-dd-yyyy");
            transaction.setTransactionDate(format.format( new Date() ));
            if(incomeBudgetIndicator.equalsIgnoreCase("Income"))
                transaction.setTransactionCategory("Income");
            else if (incomeBudgetIndicator.equalsIgnoreCase("Budget")){
                transaction.setTransactionCategory("Budget");
            }
            else
            {
                throw new ResourceNotFoundException("IncomeBudgetIndicator","Invalid","Indicator value");
            }


            if(dayOrMonth.equalsIgnoreCase("D"))
            {
                transaction.setDay(day);
            }
            else if(dayOrMonth.equalsIgnoreCase("M"))
            {
                transaction.setMonth(month);
            }
            transaction.setQuarter(quarter);
            transaction.setYear(year);


            return transactionRepository.save(transaction);
        }
        catch (Exception e){
            throw e;
        }

    }

    public void getPlaidTransactions(User user, Integer vpaIndicator) throws IOException {
        {
            Transaction t = null;
            plaidClient = QuickstartApplication.plaidClient;
            String accessToken = QuickstartApplication.accessToken;
            Date startDate = new Date(System.currentTimeMillis() - 86400000L * 100);
            Date endDate = new Date();

            TransactionsGetRequest request =
                    new TransactionsGetRequest(accessToken, startDate, endDate)
                            .withCount(100);

            Response<TransactionsGetResponse> response = null;
            for (int i = 0; i < 5; i++) {
                response = plaidClient.service().transactionsGet(request).execute();
                System.out.println("Response plaid"+ response);
                if (response.isSuccessful()) {

                    for(TransactionsGetResponse.Transaction transaction: response.body().getTransactions())
                    {
                        t = new Transaction();
                        t.setUser(user);
                        t.setIsManuallyInserted(vpaIndicator);
                        t.setTransactionDate(transaction.getDate());
                        t.setTransactionType(transaction.getTransactionType());
                        t.setTransactionCategory(transaction.getCategory().get(0));
                        t.setName(transaction.getName());
                        t.setAmount((transaction.getAmount()));
                        t.setIsoCurrencyCode(transaction.getIsoCurrencyCode());
                        t.setUnofficialCurrencyCode(transaction.getUnofficialCurrencyCode());
                        t.setLocation(transaction.getLocation().getRegion());
                        setDateParams(t);
                        transactionRepository.save(t);
                    }

                    break;
                } else {
                    try {
                        ErrorResponse errorResponse = plaidClient.parseError(response);
                        Thread.sleep(3000);
                    } catch(InterruptedException e) {
                        // catch error
                    }
                }
            }
        }
    }

    public void setDateParams(Transaction transaction){
        if(transaction.getTransactionDate()!=null)
        {
            String[] x = null;
            if(transaction.getTransactionDate().contains("/"))
                x = transaction.getTransactionDate().split("/");
            if(transaction.getTransactionDate().contains("-"))
                x = transaction.getTransactionDate().split("-");
            if(x.length>2) {
                String month = x[1];
                String year = x[0];
                String day = x[2];
                System.out.println("day" + day);
                System.out.println("month" + month);
                System.out.println("year" + year);
                transaction.setDay(Integer.parseInt(day));
                transaction.setMonth(Integer.parseInt(month));
                transaction.setYear(Integer.parseInt(year));
                transaction.setQuarter(getQuarter(month));
            }
        }

    }

    public Integer getQuarter(String month)
    {
        Integer quarter = 0;
        if(Integer.parseInt(month)<4)
            quarter = 1;
        else if(Integer.parseInt(month)>3 && Integer.parseInt(month)<7)
            quarter = 2;
        else if(Integer.parseInt(month)>6 && Integer.parseInt(month)<10)
            quarter = 3;
        else
            quarter = 4;

        return quarter;
    }



    public Map<String,Double> getAllTotalsByFilter(Integer userId, String filterType, Integer month, Integer quarter, Integer year) throws RollbackException, ResourceNotFoundException{
        Map<String,Double> map = new HashMap<>();

        List<Transaction> transactions = getTransactionsByFilter(userId,filterType,month,quarter,year);

        if(transactions!=null){
            map = getAllTotalsByFilter(transactions);
        }
        else
        {
            throw new ResourceNotFoundException("Transactions","Year/Month/Quarter","Not found");
        }

        return map;
    }

    public Map<String,Double> getExpensesByCategory(Integer userId, String filterType, Integer month, Integer quarter, Integer year) throws RollbackException, ResourceNotFoundException{
        Map<String,Double> map = new HashMap<>();

        List<Transaction> transactions = getTransactionsByFilter(userId,filterType,month,quarter,year);

        if(transactions!=null){
            map = getExpensesByCategory(transactions);
        }
        else
        {
            throw new ResourceNotFoundException("Transactions","Year/Month/Quarter","Not found");
        }

        return map;

    }

    public List<CompareExpenseDTO> compareYearlyExpensesByMonth(Integer user_id, Integer year1, Integer year2) throws RollbackException, ResourceNotFoundException{
        List<CompareExpenseDTO> list = new ArrayList<>();
        Map<String,Double> firstMap = new HashMap<>();
        Map<String,Double> secondMap = new HashMap<>();
        List<Transaction> transactions1 = transactionRepository.findByYearAndUser_id(year1,user_id);
        firstMap = transactionMap(transactions1);
        List<Transaction> transactions2 = transactionRepository.findByYearAndUser_id(year2,user_id);
        secondMap = transactionMap(transactions2);

        for(int i =1;i<=12;i++)
        {
            CompareExpenseDTO dto = new CompareExpenseDTO();
            String month = getMonth(i);
            dto.setMonth(month);
            if(firstMap.containsKey(month))
            {
                dto.setYear1(firstMap.get(month));
            }
            if(secondMap.containsKey(month))
            {
                dto.setYear2(secondMap.get(month));
            }
            list.add(dto);
        }
        return list;
    }


    public Map<String,Double> transactionMap(List<Transaction> transactions){
        Map<String,Double> map = new HashMap<>();
        for (Transaction transaction:transactions) {
            String month = "";
            if(transaction.getMonth()!=null)
            {
                month = getMonth(transaction.getMonth());
            }

            if(map.containsKey(month)){
                map.put(month, map.get(month)+transaction.getAmount());
            }
            else
            {
                map.put(month,transaction.getAmount());
            }

        }

        return map;

    }


    public List<Transaction> getTransactionsByFilter(Integer userId, String filterType, Integer month, Integer quarter, Integer year){
        List<Transaction> transactions = null;
        switch (filterType){
            case "M":
                transactions = transactionRepository.findByMonthAndYearAndUser_id(month,year,userId);
                break;

            case "Q":
                transactions = transactionRepository.findByQuarterAndYearAndUser_id(quarter,year,userId);
                break;

            case "Y":
                transactions = transactionRepository.findByYearAndUser_id(year,userId);
                break;


        }

        return transactions;
    }
    //totalExpense, totalIncome, totalBudget, totalSavings
    public Map<String,Double> getAllTotalsByFilter(List<Transaction> transactions)
    {
        String[] arr = new String[]{"Income","Budget"};
        List<String> list = Arrays.asList(arr);

        Map<String,Double> map = new HashMap<>();
        for(Transaction transaction: transactions)
        {
        if(list.contains(transaction.getTransactionCategory()))
        {
            if(transaction.getTransactionCategory().equalsIgnoreCase("Income"))
            {
                if(map.containsKey("totalIncome")){
                    map.put("totalIncome", map.get("totalIncome")+transaction.getAmount());
                }
                else
                {
                    map.put("totalIncome",transaction.getAmount());
                }
            }
            else
            {
                if(map.containsKey("totalBudget")){
                    map.put("totalBudget", map.get("totalBudget")+transaction.getAmount());
                }
                else
                {
                    map.put("totalBudget",transaction.getAmount());
                }
            }
        }
        else
        {
            if(map.containsKey("totalExpense")){
                map.put("totalExpense", map.get("totalExpense")+transaction.getAmount());
            }
            else
            {
                map.put("totalExpense",transaction.getAmount());
            }
        }
    }
        if(map.containsKey("totalIncome") && map.containsKey("totalExpense"))
        {
            map.put("totalSavings", map.get("totalIncome")-map.get("totalExpense"));
        }
        return map;
    }


    public Map<String,Double> getExpensesByCategory(List<Transaction> transactions){
        String[] arr = new String[]{"Budget","Income"};
        List<String> list = Arrays.asList(arr);
        Map<String,Double> map = new HashMap<>();

        for (Transaction transaction:transactions) {

            String category = transaction.getTransactionCategory();
            if(!list.contains(category)) {

                if (map.containsKey(category)) {
                    map.put(category, map.get(category) + transaction.getAmount());
                } else {
                    map.put(category, transaction.getAmount());
                }
            }

        }

        return map;
    }

    public String getMonth(int month) {
        return new DateFormatSymbols().getMonths()[month-1];
    }
}
