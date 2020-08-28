/* SELECT * FROM departments;
CREATE FUNCTION inc(val integer) RETURNS integer AS $$
BEGIN
RETURN val + 1;
END; $$
LANGUAGE PLPGSQL;


SELECT inc(20);



CREATE FUNCTION inc(i integer, j integer) RETURNS integer AS $$
BEGIN
RETURN i + j
END; $$
LANGUAGE PLPGSQL;

SELECT inc(20,10); 


CREATE OR REPLACE FUNCTION hi_lo(
    a NUMERIC,
    b NUMERIC,
    c NUMERIC,
    OUT hi NUMERIC,
    OUT lo NUMERIC)
AS $$
BEGIN
    hi := GREATEST(a,b,c);
    lo := LEAST(a,b,c);
END; $$

LANGUAGE plpgsql;


SELECT * FROM hi_lo(10,20,30); 

CREATE OR REPLACE FUNCTION square(
    INOUT a NUMERIC
)
AS $$
BEGIN
    a := a * a;
END; $$
LANGUAGE plpgsql;

SELECT square(4);


CREATE OR REPLACE FUNCTION sum_avg(
    VARIADIC list NUMERIC[],
    OUT total NUMERIC,
    OUT average NUMERIC
)
AS $$
BEGIN
    SELECT INTO total SUM(list[i])
    FROM generate_subscripts(list, 1) g(i);

    SELECT INTO average AVG(list[i])
    FROM generate_subscripts(list, 1) g(i);
END; $$
LANGUAGE plpgsql;


SELECT * FROM sum_avg(10,20,30);

CREATE OR REPLACE FUNCTION get_rental_duration(p_customer_id integer)
    RETURNS INTEGER AS $$

DECLARE
    rental_duration INTEGER;
BEGIN

    -- get the rate bases on film_id
    SELECT INTO rental_duration SUM( EXTRACT(DAY FROM return_date - rental_date))
    FROM rental
        WHERE customer_id=p_customer_id;

        RETURN rental_duration;
END; $$
LANGUAGE plpgsql;

SELECT get_rental_duration(232);*/


/*CREATE OR REPLACE FUNCTION get_lecturer(p_pattern VARCHAR)
    RETURNS TABLE (
        lecturer_name VARCHAR,
        lecturer_age INT
    )
AS $$
BEGIN
    RETURN QUERY SELECT
        name,
        cast (age as integer)
    FROM
        lecturer
    WHERE
        name ILIKE p_pattern;
END; $$

LANGUAGE 'plpgsql';


SELECT * FROM get_lecturer('%test%');
SELECT get_lecturer('%test%');*/

/*CREATE OR REPLACE FUNCTION get_lecturer(p_pattern VARCHAR)
    RETURNS TABLE (
        lecturer_name VARCHAR,
        lecturer_age INT
    )
AS $$
DECLARE
    var_r record;
BEGIN
    FOR var_r IN (SELECT
        name,
        cast (age as integer)
    FROM
        lecturer
    WHERE
        name ILIKE p_pattern)
    LOOP
        lecturer_name := upper(var_r.name);
        lecturer_age := var_r.age;
        RETURN NEXT;
    END LOOP;
END; $$

LANGUAGE 'plpgsql';


SELECT * FROM get_lecturer('%test%');
SELECT get_lecturer('%test%');*/

/*DO $$
DECLARE
    a integer := 10;
    b integer := 20;
BEGIN
    IF a > b THEN
        RAISE NOTICE 'a is greater than b';
    END IF;

    IF a < b THEN
        RAISE NOTICE 'a is less than b';
    END IF;

    IF a = b THEN
        RAISE NOTICE 'a is equal to b';
    END IF;
END $$;*/


/*DO $$
DECLARE
    a integer := 20;
    b integer := 10;
BEGIN
    IF a > b THEN
        RAISE NOTICE 'a is greater than b';
    ELSE
        RAISE NOTICE 'a is not greater than b';
    END IF;
END $$;*/

/*O $$
DECLARE
    a integer := 20;
    b integer := 20;
BEGIN
    IF a < b THEN
        RAISE NOTICE 'a is greater than b';
    ELSIF a < b THEN
        RAISE NOTICE 'a is less than b';
    ELSE
        RAISE NOTICE 'a is equal to b';
    END IF;
END $$;*/

-- CREATE OR REPLACE FUNCTION get_age_segment(p_pattern VARCHAR)
--     RETURNS VARCHAR AS $$
-- DECLARE
--     lecturer_name VARCHAR;
--     lecturer_age_segment VARCHAR;
-- BEGIN
--     SELECT INTO lecturer_name name, age
--     FROM lecturer
--     WHERE name ILIKE p_pattern;

--     CASE age
--         WHEN age > 30 THEN
--             lecturer_age_segment = 'OLD';
--         WHEN age < 20 THEN
--             lecturer_age_segment = 'YOUNG';
--         ELSE
--             lecturer_age_segment = 'AVERAGE';

--         END CASE;

--     RETURN lecturer_age_segment;
-- END; $$
-- LANGUAGE plpqsql;



-- SELECT * FROM get_age_segment('%test%');


/*CREATE OR REPLACE FUNCTION fibonacci(n INTEGER)
    RETURNS INTEGER AS $$
DECLARE 
    counter INTEGER := 0;
    i INTEGER := 0;
    j INTEGER := 1;
BEGIN
    IF (n<1) THEN
        RETURN 0;
    END IF;

    LOOP
        EXIT WHEN counter = n;
        counter := counter + 1;
        SELECT j, i+j INTO i, j;
    END LOOP;

    RETURN 1;
END;
$$ LANGUAGE plpgsql;

SELECT FROM fibonacci(2);*/




CREATE OR REPLACE FUNCTION fibonacci(n INTEGER) 
	RETURNS INTEGER AS $$
DECLARE
   counter INTEGER := 0; 
   i INTEGER := 0; 
   j INTEGER := 1;
BEGIN

	IF (n < 1) THEN
		RETURN 0;
	END IF; 
	
	WHILE counter <= n LOOP
		counter := counter + 1; 
		SELECT j, i + j INTO i,	j;
	END LOOP; 
	
	RETURN i;
END;
$$ LANGUAGE plpgsql;


SELECT fibonacci(3);

