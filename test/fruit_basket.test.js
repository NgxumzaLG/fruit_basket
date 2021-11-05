let assert = require('assert');
const fruitBasketFactory = require('../fruitBasket-factory');
const {Pool} = require('pg');

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/fruit_basket_test';

const pool = new Pool({
	connectionString,
	ssl : {
		rejectUnauthorized:false
	}
});

describe('Fruit basket' , function(){
	beforeEach(async function(){
		// clean the tables before each test run
		await pool.query('DELETE FROM fruit_basket;');
	});

	it('Should create a new fruit basket for a given fruit type, qty & fruit price', async function(){
		let fruitBasket = fruitBasketFactory(pool);

		await fruitBasket.addFruit({fruitname: 'Apple', quantity: 12, price: 2.50});
		await fruitBasket.addFruit({fruitname: 'Apple', quantity: 5, price: 2.00});

		assert.deepEqual([{fruit_type: 'Apple', quantity: 12, price: 2.50}], await fruitBasket.getFruitBaskets());
	});

	it('Should find the fruit basket for a given fruit type', async function(){
		let fruitBasket = fruitBasketFactory(pool);

		await fruitBasket.addFruit({fruitname: 'Apple', quantity: 12, price: 2.50});
		await fruitBasket.addFruit({fruitname: 'Banana', quantity: 15, price: 1.50});
		await fruitBasket.addFruit({fruitname: 'Orange', quantity: 10, price: 3.50});

		assert.deepEqual({fruit_type: 'Orange', quantity: 10, price: 3.50}, await fruitBasket.findFruitBasket('Orange'));
	});

	it('Should update the number of fruits in a given basket', async function(){
		let fruitBasket = fruitBasketFactory(pool);

		await fruitBasket.addFruit({fruitname: 'Apple', quantity: 12, price: 2.50});
		await fruitBasket.addFruit({fruitname: 'Banana', quantity: 8, price: 1.50});

		await fruitBasket.updateFruitBasket({fruitname: 'Banana', quantity: 15});

		assert.deepEqual({fruit_type: 'Banana', quantity: 15, price: 1.50}, await fruitBasket.findFruitBasket('Banana'));
	});

	it('Should show the total price for a given fruit basket', async function(){
		let fruitBasket = fruitBasketFactory(pool);

		await fruitBasket.addFruit({fruitname: 'Apple', quantity: 12, price: 2.50});
		await fruitBasket.addFruit({fruitname: 'Banana', quantity: 15, price: 1.50});
		await fruitBasket.addFruit({fruitname: 'Orange', quantity: 10, price: 3.50});

		assert.deepEqual({fruit_type: 'Orange', total_price: 35.00}, await fruitBasket.getTotalPrice('Orange'));
	});

	it('Should show the sum of the total of the fruit baskets for a given fruit type', async function(){
		let fruitBasket = fruitBasketFactory(pool);

		await fruitBasket.addFruit({fruitname: 'Apple', quantity: 12, price: 2.50});
		await fruitBasket.addFruit({fruitname: 'Banana', quantity: 15, price: 1.50});
		await fruitBasket.addFruit({fruitname: 'Orange', quantity: 10, price: 3.50});

		assert.deepEqual(12, await fruitBasket.getFruitQty('Apple'));
	});

	after(function(){
		pool.end();
	});
});