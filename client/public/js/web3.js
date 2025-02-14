async function rewardTokens() {
    const contributorAddress = document.getElementById("walletAddress").value;
    const contributionCount = parseInt(document.getElementById("contributionCount").value);

    if (!contributorAddress || isNaN(contributionCount) || contributionCount <= 0) {
        alert("Enter a valid wallet address and contribution count!");
        return;
    }

    try {
        const response = await fetch('/api/github/reward-tokens', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contributorAddress, contributionCount }),
        });

        const data = await response.json();
        if (data.success) {
            alert(`Tokens transferred! TX Hash: ${data.txHash}`);
        } else {
            alert(`Error: ${data.error}`);
        }
    } catch (error) {
        alert("Transaction failed: " + error.message);
    }
}