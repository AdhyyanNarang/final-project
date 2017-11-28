'use strict';

/* Add the dependencies you're testing */
const MasterStorage = artifacts.require("./MasterStorage.sol");


contract('Decentralized Github Test', function(accounts) {

	var pubProject
	var privProject

	beforeEach(async function() {
		return MasterStorage.init("Private Hello", false, {from: accounts[0]}).then(_ => {
			return MasterStorage.init("Public Hello", true, {from: accounts[0]}).then(_ => {
				pubProject = MasterStorage.allProjects[accounts[0]]["Public Hello"];
				privProject = MasterStorage.allProjects[accounts[0]]["Private Hello"];
			})
		})
	});

	describe('Test Commit function', function() {
		it('Number of commits is correct', async function() {
			return MasterStorage.commit('Public Hello', '1').then(_ => {
				return MasterStorage.commit('Public Hello', '2').then(_ => {
					assert.equal(pubProject.current, 2)
				})
			})
		});

		it('Project has the most recent commit at head', async function() {
			return MasterStorage.commit('Public Hello', '1').then(_ => {
				return MasterStorage.commit('Public Hello', '2').then(_ => {
					assert.equal(pubProject.hash, "2")
				})
			})
		});

		it('Previous commits are still there', async function() {
			return MasterStorage.commit('Public Hello', '1').then(_ => {
				return MasterStorage.commit('Public Hello', '2').then(_ => {
					assert.equal(pubProject.history[1], '1')
				})
			})
		});

	});

});

