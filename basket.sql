CREATE TABLE fruit_basket (
    id SERIAL NOT NULL PRIMARY KEY, 
    fruit_type TEXT NOT NULL,
    quantity INT,
    price FLOAT(2) NOT NULL
);

-- INSERT INTO fruit_basket (fruit_type, quantity, price) VALUES ('Apple', 12, 2.50);
-- INSERT INTO fruit_basket (fruit_type, quantity, price) VALUES ('Banana', 15, 1.50);
-- INSERT INTO fruit_basket (fruit_type, quantity, price) VALUES ('Orange', 10, 3.50);
-- INSERT INTO fruit_basket (fruit_type, quantity, price) VALUES ('Pear', 8, 2.00);