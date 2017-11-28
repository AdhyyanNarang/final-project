pragma solidity ^0.4.15;

import './utils/SafeMath.sol';

 contract MasterStorage {

 	using SafeMath for uint;
 	using SafeMath for uint256;

  struct Project {
    bool isPublic;
    string hash;
    int current;
    mapping(int => string) history;

  }

  modifier isPublic(string _projectName, address projectOwner) {
    require allProjects[projectOwner][_projectName].isPublic;
    _;
  }

 	mapping(address => mapping(string => Project)) allProjects;
  mapping(address => string) projectNames;

  function commit(string _projectName, string _projectHash) public {
    Project proj = allProjects[msg.sender][_projectName];
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
    Project proj = Project({isPublic:_isPublic, current:0});
    allProjects[msg.sender][_projectName] = proj;
  }

  function() {
    revert;
  }

