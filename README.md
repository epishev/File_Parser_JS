# File_Parser_JS
Script for parsing log.file



1. Analyze log file (‘test_task_2_logs.7z’ in attachment).
2. Group similar transactions (urls) by replacing dynamic parameters with some
static placeholder.
a. For example:
GET /epay/standard/success/?txnid=117549544&orderid=105601&amount=44980
To:
GET /epay/standard/success/?xxxxxxx
3. Create script in Python to process log file and
a. calculate max TPM (transactions per minute) for all transactions;
b. calculate total % distribution among the transactions and max TPM for
each transaction.
Sample of output:
max_tpm_all_transactions = 3500
total_hits = 194737, percentage = 54.29%, max_tpm=1977 GET /cloudlibrary/meta/xxx total_hits = 87927, percentage = 24.51%, max_tpm=837 GET /cloudlibrary/data/xxx transactions by minute
P.S. You can provide results for top 25-30 most popular transactions by hits
