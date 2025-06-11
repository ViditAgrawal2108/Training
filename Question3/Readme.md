### Task 3 Solution 

# LEFT JOIN ON ACCOUNTS AND ACCOUNTS ITEM TABEL 
``` 

create table combine_table as 
select accounts.username , accounts_items.quality ,accounts_items.item_id 
FROM accounts 
LEFT JOIN accounts_items ON accounts.id = accounts_items.account_id ;

``` 
# LEFT JOIN ON NEW TABLE AND ITEMS TABLE 
``` 
select * from combine_table ; 

create table table_2 as 
SELECT combine_table.username , items.type, items.name , combine_table.quality 
FROM items
LEFT JOIN combine_table ON items.id = combine_table.item_id 
ORDER BY username  ASC , quality DESC ; 

``` 
# RENAMING THE CATEGORICAL VALUES TO INTEGER VALUES 

``` 

CREATE TABLE T3 AS 
SELECT * ,
    CASE 
       WHEN quality = 'common' THEN 1
       WHEN quality = 'rare' THEN 2
       WHEN quality = 'epic' THEN 3 
    END AS ClassIntegerID
FROM
    table_2;
``` 
# ORDERING THE ITEMS FOR SPECIFIC USERS AND THE ITEM CATEGORY 
```
create TABLE T4 AS 
SELECT *, 
    RANK() OVER (PARTITION BY T3.username , T3.type ORDER BY T3.ClassIntegerID DESC) AS rank_column
FROM T3
ORDER BY username ;

select * from T4 ; 

``` 
# GETTING ALL THE ITEMS THAT ARE RANKED ONE IN THIER TYPE FOR THE SPECIFIC USER 

``` 

create table T5 
SELECT 
    username, 
    type, 
    name, 
    quality
FROM 
    T4
WHERE 
    rank_column = 1
ORDER BY username , type ;

```
# FINAL TABLE 
```

SELECT 
    username,
    type,
    GROUP_CONCAT(name SEPARATOR ' , ') AS combined_name,
    quality
FROM 
    T5
GROUP BY 
    username, type, quality;