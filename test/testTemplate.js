'use strict';

/* Add the dependencies you're testing */
const MasterStorage = artifacts.require("./MasterStorage.sol");

contract('Decentralized Github Test', function(accounts) {

	var masterstorage

	beforeEach(async function() {
		masterstorage = await MasterStorage.new();
		await masterstorage.init("Private Hello", false, {from: accounts[0]});
		await masterstorage.init("Public Hello", true, {from: accounts[0]});
		await masterstorage.commit("Public Hello", '1');
		await masterstorage.commit('Public Hello', '2');
	});


	describe('Test Commit function', function() {

		it('Number of commits is correct', async function() {
			let end = await masterstorage.getCurr.call("Public Hello", {from: accounts[0]});
			assert.equal(end.valueOf(), 2);

		});

		it('Project has the most recent commit at head', async function() {
			let currHash = await masterstorage.getHash.call("Public Hello", {from: accounts[0]});
			assert.equal(currHash.valueOf(), "2")

		});

		it('Previous commits are still there', async function() {
			let past = await masterstorage.getHist.call("Public Hello", 1, {from: accounts[0]})
			assert.equal(past.valueOf(), "1")
		});

		it('Project does not show up for a random person', async function() {
			let exist = await masterstorage.exists.call("Public Hello", {from: accounts[1]})
			assert.equal(exist.valueOf(), false)
		});		

	});

	describe('Test Remove function', function() {

		it('Only owner can delete the project', async function() {
			// make sure project exists
			let exist = await masterstorage.exists.call("Public Hello")
			assert.equal(exist.valueOf(), true);

			// make sure a random person cannot delete the project
			await masterstorage.remove("Public Hello", {from: accounts[1]});
			let exist2 = await masterstorage.exists.call("Public Hello", {from: accounts[0]});
			assert.equal(exist2.valueOf(), true);

			// make sure owner can delete the project
			await masterstorage.remove("Public Hello", {from: accounts[0]});
			let exist3 = await masterstorage.exists.call("Public Hello", {from: accounts[0]});
			assert.equal(exist3.valueOf(), false);
		});

		it('Project is actually deleted', async function() {
			await masterstorage.remove("Public Hello", {from: accounts[0]});
			let curr = await masterstorage.getCurr.call("Public Hello", {from: accounts[0]});
			assert.equal(curr.valueOf(), 0);

		});
	});

});

