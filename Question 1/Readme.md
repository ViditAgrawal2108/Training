## Question 1

## Problem
We have been asked to sample the given table data into two different tables with negative and positive samples for our machine learning model.

## Intuition --> 

- Step 1 -- Order the data into ASC and DESC.
- Step 2 -- Assign row numbers to each row of the new sorted data and then sample them through taking alternatively third row.
- Step 3 -- we will set the limit/or take the top 10000 rows from the data that we get from the above steps.
- 
## Code --> 
``` 

CREATE TABLE neg_samples AS
Select image_id , score
From 
( Select * , row_number() over( order by score asc ) as row_num
From unlabeled_image_predictions
) AS ranked
Where row_num % 3 = 0 
limit 10000; 

CREATE TABLE pos_samples AS
Select image_id , score
From 
( Select * , row_number() over( order by score desc ) as row_num
From unlabeled_image_predictions
) AS ranked
Where row_num % 3 = 0 
limit 10000; 

