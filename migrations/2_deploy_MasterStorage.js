var Migrations = artifacts.require("./MasterStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(MasterStorage);
};
