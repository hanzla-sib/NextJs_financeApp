-- Create or replace a function named calculate_total
-- The function takes an optional argument type_arg of type VARCHAR
-- If type_arg is not provided, it defaults to NULL
CREATE OR REPLACE FUNCTION calculate_total(type_arg VARCHAR DEFAULT NULL) 
RETURNS NUMERIC AS $$
BEGIN
    -- Return the sum of the amount column from the transactions table
    -- If type_arg is provided, sum only the amounts where the type matches type_arg
    -- If type_arg is NULL, sum all amounts regardless of type
    RETURN (
        SELECT SUM(amount)
        FROM transactions
        WHERE (type = type_arg OR type_arg IS NULL)
    );
END;
$$ LANGUAGE plpgsql;