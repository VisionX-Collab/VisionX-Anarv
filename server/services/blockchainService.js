const Web3 = require('web3');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Load environment variables
const RPC_URL = process.env.POLYGON_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

// Connect to Polygon Mumbai
const web3 = new Web3(new Web3.providers.HttpProvider(RPC_URL));

// Load compiled smart contract ABI
const contractABI = JSON.parse(fs.readFileSync(path.join(__dirname, '../smart-contracts/VisionXTokenABI.json'), 'utf-8'));

// Create contract instance
const contract = new web3.eth.Contract(contractABI, CONTRACT_ADDRESS);

// Get admin wallet account
const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);

/**
 * Transfer VisionX Tokens to Contributor
 * @param {string} userAddress - Contributor's Wallet Address
 * @param {number} amount - Amount of Tokens to Send
 */
async function rewardContributor(userAddress, amount) {
    try {
        const tx = contract.methods.transfer(userAddress, web3.utils.toWei(amount.toString(), 'ether'));

        const gas = await tx.estimateGas({ from: account.address });
        const gasPrice = await web3.eth.getGasPrice();

        const txData = {
            from: account.address,
            to: CONTRACT_ADDRESS,
            data: tx.encodeABI(),
            gas,
            gasPrice,
        };

        const signedTx = await web3.eth.accounts.signTransaction(txData, PRIVATE_KEY);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        console.log(`✅ Tokens sent to ${userAddress}: ${amount}`);
        return receipt;
    } catch (error) {
        console.error("❌ Error transferring tokens:", error);
        throw error;
    }
}

async function transferTokens(to, amount) {
    const tx = contract.methods.transfer(to, web3.utils.toWei(amount.toString(), 'ether'));
    const signedTx = await web3.eth.accounts.signTransaction(
        {
            to: contract.options.address,
            data: tx.encodeABI(),
            gas: 2000000
        },
        adminWallet
    );
    return web3.eth.sendSignedTransaction(signedTx.rawTransaction);
}

async function getTokenBalance(address) {
    return await contract.methods.balanceOf(address).call();
}


module.exports = { rewardContributor };