### Task 3 Solution 

# LEFT JOIN ON ACCOUNTS AND ACCOUNTS ITEM TABLE  

``` 

create table combine_table as 
select accounts.username , accounts_items.quality ,accounts_items.item_id 
FROM accounts 
LEFT JOIN accounts_items ON accounts.id = accounts_items.account_id ;
select * from combine_table ;

```

# output 
| username | quality | item_id |
| -------- | ------- | ------- |
| cmnuns1  | epic    | 10      |
| cmnuns1  | rare    | 2       |
| cmnuns1  | rare    | 2       |
| cmnuns1  | rare    | 7       |
| cmnuns1  | common  | 1       |
| cmnuns1  | common  | 2       |
| cmnuns1  | common  | 3       |
| cmnuns1  | common  | 5       |
| cmnuns1  | common  | 8       |
| cmnuns1  | rare    | 11      |
| yworcs0  | epic    | 8       |
| yworcs0  | rare    | 5       |
| yworcs0  | common  | 3       |
| yworcs0  | common  | 6       |

# LEFT JOIN ON NEW TABLE AND ITEMS TABLE 
``` 

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
# output 
| username | type   | name                | quality | ClassIntegerID | rank_column |
| -------- | ------ | ------------------- | ------- | -------------- | ----------- |
| cmnuns1  | armor  | Armor of Myrtaceae  | rare    | 2              | 1           |
| cmnuns1  | armor  | Armour abcd         | rare    | 2              | 1           |
| cmnuns1  | shield | Shield of Rosaceae  | epic    | 3              | 1           |
| cmnuns1  | shield | Shield of Rosaceae  | rare    | 2              | 2           |
| cmnuns1  | shield | Shield of Rosaceae  | rare    | 2              | 2           |
| cmnuns1  | shield | Shield of Rosaceae  | common  | 1              | 4           |
| cmnuns1  | shield | Shield of Fagaceae  | common  | 1              | 4           |
| cmnuns1  | shield | Shield of Lauraceae | common  | 1              | 4           |
| cmnuns1  | shield | Shield of Rosaceae  | common  | 1              | 4           |
| cmnuns1  | sword  | Sword of Solanaceae | common  | 1              | 1           |
| yworcs0  | shield | Shield of Rosaceae  | epic    | 3              | 1           |
| yworcs0  | shield | Shield of Lauraceae | rare    | 2              | 2           |
| yworcs0  | shield | Shield of Fagaceae  | common  | 1              | 3           |
| yworcs0  | sword  | Sword of Loasaceae  | common  | 1              | 1           |



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

```

# FINAL OUTPUT 

| username | type   | name                             | quality |
| -------- | ------ | -------------------------------- | ------- |
| cmnuns1  | armor  | Armor of Myrtaceae , Armour abcd | rare    |
| cmnuns1  | shield | Shield of Rosaceae               | epic    |
| cmnuns1  | sword  | Sword of Solanaceae              | common  |
| yworcs0  | shield | Shield of Rosaceae               | epic    |
| yworcs0  | sword  | Sword of Loasaceae               | common  |

