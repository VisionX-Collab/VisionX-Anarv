// Connect to blockchain via Web3.js
const contractAddress = "PASTE_YOUR_DEPLOYED_SMART_CONTRACT_ADDRESS_HERE"; 
const contractABI = PASTE_YOUR_ABI_JSON_HERE; 
let web3;
let contract;

async function loadWeb3() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        contract = new web3.eth.Contract(contractABI, contractAddress);
        console.log("Connected to MetaMask!");
    } else {
        alert("Please install MetaMask to use this feature.");
    }
}

async function rewardTokens() {
    const walletAddress = document.getElementById("walletAddress").value;
    const contributionCount = document.getElementById("contributionCount").value;

    if (!walletAddress || contributionCount <= 0) {
        alert("Enter a valid wallet address and contribution count.");
        return;
    }

    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.rewardContributor(walletAddress, contributionCount).send({ from: accounts[0] });
        alert("Tokens successfully claimed!");
        updateBalance(walletAddress);
    } catch (error) {
        console.error(error);
        alert("Error claiming tokens. Check console for details.");
    }
}

async function updateBalance(walletAddress) {
    const balance = await contract.methods.balanceOf(walletAddress).call();
    document.getElementById("tokenBalance").innerText = balance;
}

// Load Web3.js when page loads
window.onload = loadWeb3;