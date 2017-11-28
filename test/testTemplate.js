'use strict';

/* Add the dependencies you're testing */
const MasterStorage = artifacts.require("./MasterStorage.sol");

contract('Decentralized Github Test', function(accounts) {

	var masterstorage

	// beforeEach(async function() {
	// 	return MasterStorage.new().then(_masterstorage => {
	// 		masterstorage = _masterstorage;
	// 		return masterstorage.init("Private Hello", false, {from: accounts[0]}).then(_ => {
	// 			return masterstorage.init(12345, true, {from: accounts[0]}).then(_ => {
	// 				pubProject = masterstorage.allProjects[accounts[0]][12345];
	// 				privProject = masterstorage.allProjects[accounts[0]]["Private Hello"];
	// 			})
	// 		})
	// 	})
	// });

	beforeEach(async function() {
		masterstorage = await MasterStorage.new();
		await masterstorage.init("Private Hello", false, {from: accounts[0]});
		await masterstorage.init("Public Hello", true, {from: accounts[0]});
		// pubProject = await masterstorage.allProjects(accounts[0])[12345];
		// privProject = await masterstorage.allProjects(accounts[0])["Private Hello"];
	});


	describe('Test Commit function', function() {
		it('Number of commits is correct', async function() {
			let start = await masterstorage.getCurr.call("Public Hello", {from: accounts[0]})
			assert.equal(start.valueOf(), 0);
			await masterstorage.commit("Public Hello", '1');
			await masterstorage.commit('Public Hello', '2');

			let end = await masterstorage.getCurr.call("Public Hello", {from: accounts[0]});
			assert.equal(end.valueOf(), 2);

		});

		it('Project has the most recent commit at head', async function() {
			await masterstorage.commit("Public Hello", '1');
			await masterstorage.commit('Public Hello', '2');
			let currHash = await masterstorage.getHash.call("Public Hello", {from: accounts[0]});
			assert.equal(currHash.valueOf(), "2")

		});

		it('Previous commits are still there', async function() {
			return masterstorage.commit('Public Hello', '1').then(_ => {
				return masterstorage.commit('Public Hello', '2').then(_ => {
					assert.equal(pubProject.history[1], '1')
				})
			})
		});

	});

});

