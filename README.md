# Decentailized Github!

Currently, all the open source code on GitHub is stored on their servers and managed by them. At any point in time, they could possibly alter the code, remove commits, make the code private, etc.

A decentralized version of GitHub would ensure that the data is not managed by GitHub, but rather decentralized on the blockchain. IPFS would be used to store the code. The Ethereum network would be used to update the code/make state changes.


## Requirements
Install ipfs from https://ipfs.io/docs/install/

```
pip install web3[tester]
pip install ipfsapi
```


## Usage:
Make sure projects are inside a directory named projects. This folder should be in the same diretory as ipfs.py.
Run ipfs.py: 
```
python ipfs.py
```
DISCLAIMER: Every time the python script is run, a new blockchain is created with 0 projects stored. (for testing)

### Commands:
```
dgit init <project> // initializes the project
dgit add <project> // stages the project for commits
dgit commit <project> // commits the project
dgit pull <project> <Optional: commit number> // downloads the project from ipfs
dgit remove <project> // removes the project
```

solidity smart contract and truffle tests are provided, but not used in the python script

## Project Structure
* When a user initializes a project, that project is initilized as a struct in Ethereum and stored under the user's Ethereum address
* When a user commits a project, the project is first stored in ipfs. The hash of the location is stored under the project struct
* When a user pulls a project, the project hash is retrieved from the Ethereum network and used to download the file from the ipfs network
* When a user removes a project, the project is cleared from their Ethereum address
