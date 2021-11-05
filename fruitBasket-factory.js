module.exports = function(data) {
    const pool = data;

    async function addFruit(basket) {
        let theBasket = [
            basket.fruitname,
            basket.quantity,
            basket.price
        ];

        const duplicates = await pool.query('SELECT fruit_type FROM fruit_basket WHERE fruit_type = $1', [basket.fruitname]);

        if (duplicates.rowCount == 0) {
            await pool.query('INSERT INTO fruit_basket (fruit_type, quantity, price) VALUES ($1,$2, $3)', theBasket);
        }
    }

    async function getFruitBaskets() {
        const myBasket = await pool.query('SELECT fruit_type, quantity, price FROM fruit_basket');

        return myBasket.rows;
    }

    async function findFruitBasket(fruit) {
        const findIt = await pool.query('SELECT fruit_type, quantity, price FROM fruit_basket WHERE fruit_type = $1', [fruit]);

        return findIt.rows[0];
    }

    async function updateFruitBasket(update) {
        let updateQty =[update.fruitname, update.quantity]

        await pool.query('UPDATE fruit_basket SET quantity = $2 WHERE fruit_type = $1', updateQty);
    }

    async function getTotalPrice(theFruit) {
        const thePrice = await pool.query('SELECT fruit_type, (quantity * price) AS total_price FROM fruit_basket WHERE fruit_type = $1', [theFruit]);

        return thePrice.rows[0];
    }

    async function getFruitQty(type) {
        const theSum = await pool.query('SELECT quantity FROM fruit_basket WHERE fruit_type = $1', [type]);

        return theSum.rows[0].quantity;
    }
     
    return {
        addFruit,
        getFruitBaskets,
        findFruitBasket,
        updateFruitBasket,
        getTotalPrice,
        getFruitQty

    }
};