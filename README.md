# Decentailized Github!

Currently, all the open source code on GitHub is stored on their servers and managed by them. At any point in time, they could possibly alter the code, remove commits, make the code private, etc.

A decentralized version of GitHub would ensure that the data is not managed by GitHub, but rather decentralized on the blockchain. IPFS would be used to store the code. The Ethereum network would be used to update the code/make state changes.

pip install web3[tester]
pip install ipfsapi

Usage:
Make sure projects are inside a directory named projects. This folder should be in the same diretory as ipfs.py.
Run ipfs.py.
DISCLAIMER: Every time the python script is run, a new blockchain is created with 0 projects stored. (for testing)
dgit init <project> - initializes the project
dgit add <project> - stages the project for commits
dgit commit <project> - commits the project
dgit pull <project> <Optional: commit number> - downloads the project from ipfs
dgit remove <project> - removes the project

solidity smart contract and truffle tests are provided, but not used in the python script
