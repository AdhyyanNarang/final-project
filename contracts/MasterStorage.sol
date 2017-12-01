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

 	mapping(address => mapping(string => Project)) allProjects;


  // commits the new hash of the project
  function commit(string _projectName, string _projectHash) public {
    Project storage proj = allProjects[msg.sender][_projectName];
    proj.current += 1;
    proj.history[proj.current] = _projectHash;
    proj.hash = _projectHash;
  }

  // pull own project
  function ownerPull(string _projectName) public returns(string) {
    return allProjects[msg.sender][_projectName].hash;
  }

  // pull anyones public project
  function guestPull(string _projectName, address _projectOwner) isPublic(_projectName, _projectOwner) public returns(string) {
    return allProjects[_projectOwner][_projectName].hash;
  }

  // initialize a project
  function init(string _projectName, bool _isPublic) public {
    // if (allProjects[msg.sender][_projectName].exists) {
    //   revert();
    // }
    allProjects[msg.sender][_projectName].exists = true;
    allProjects[msg.sender][_projectName].current = 0;
    allProjects[msg.sender][_projectName].isPublic = _isPublic;
  }

  // remove project
  function remove(string _projectName) {
    allProjects[msg.sender][_projectName].exists = false;
    delete allProjects[msg.sender][_projectName];
  }

  function() payable {
    revert();
  }

// TESTING FUNCTIONS
// REMOVE WHEN DEPLOYING

  function getCurr(string _projectName) public returns(uint) {
    return allProjects[msg.sender][_projectName].current;
  }

  function getHist(string _projectName, uint _pastcommit) public returns(string) {
    return allProjects[msg.sender][_projectName].history[_pastcommit];
  }

  function getHash(string _projectName) public returns(string) {
    return allProjects[msg.sender][_projectName].hash;
  }

  function exists(string _projectName) public returns(bool) {
    return allProjects[msg.sender][_projectName].exists;
  }



}

