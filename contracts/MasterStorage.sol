pragma solidity ^0.4.15;

import './utils/SafeMath.sol';

contract MasterStorage {

 	using SafeMath for uint;
 	using SafeMath for uint256;

  struct Project {
    bool exists;
    bool isPublic;
    string hash;
    uint current;
    mapping(uint => string) history;

  }

  modifier isPublic(string _projectName, address projectOwner) {
    require (allProjects[projectOwner][_projectName].isPublic);
    _;
  }



  // NOT PRIVATE FOR TESTING PURPOSES
 	mapping(address => mapping(string => Project)) allProjects;

  function commit(string _projectName, string _projectHash) public {
    Project storage proj = allProjects[msg.sender][_projectName];
    proj.current += 1;
    proj.history[proj.current] = _projectHash;
    proj.hash = _projectHash;
  }

  function ownerPull(string _projectName) public returns(string) {
    return allProjects[msg.sender][_projectName].hash;
  }

  function guestPull(string _projectName, address _projectOwner) isPublic(_projectName, _projectOwner) public returns(string) {
    return allProjects[_projectOwner][_projectName].hash;
  }

  function init(string _projectName, bool _isPublic) public {
    if (allProjects[projectOwner][_projectName].exists) {
      throw;
    }
    allProjects[msg.sender][_projectName].exists = true;
    allProjects[msg.sender][_projectName].current = 0;
    allProjects[msg.sender][_projectName].isPublic = _isPublic;
  }

  function remove(string _projectName) {
    delete allProjects[projectOwner][_projectName];
  }

  function() payable {
    revert();
  }

// TESTING FUNCTIONS
  function getCurr(string _projectName) public returns(uint) {
    return allProjects[msg.sender][_projectName].current;
  }

  function getHist(string _projectName, uint _pastcommit) public returns(string) {
    return allProjects[msg.sender][_projectName].history[_pastcommit];
  }

  function getHash(string _projectName, uint _pastcommit) public returns(string) {
    return allProjects[msg.sender][_projectName].hash;
  }



}

