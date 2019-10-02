# expense-time-tracker
Expense and Time tracker with Voice Personal Assistant

# Instructions to run the project
mvn clean package
## Fill in your Plaid API keys (client ID, secret, public_key) to test!
PLAID_CLIENT_ID='5d34c578dc87a60014247747' <br>
PLAID_SECRET='625b4630199b5418cb7eb17e41746b' <br>
PLAID_PUBLIC_KEY='408076128548bef334534e21b01171' <br>
java -jar target/quickstart-1.0-SNAPSHOT.jar server config.yml <br>
## Go to http://localhost:8080
