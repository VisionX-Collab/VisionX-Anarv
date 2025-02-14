const Web3 = require('web3');
require('dotenv').config();

const web3 = new Web3(process.env.POLYGON_RPC_URL);

const contractABI = require('../smart-contracts/VisionXTokenABI.json'); // Make sure ABI is here
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(contractABI, contractAddress);

const ownerPrivateKey = process.env.OWNER_PRIVATE_KEY;
const ownerAddress = process.env.OWNER_ADDRESS;

module.exports = { web3, contract, ownerPrivateKey, ownerAddress };