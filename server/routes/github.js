const express = require('express');
const axios = require('axios');
require('dotenv').config();
const User = require('../models/User');

const router = express.Router();

// GitHub OAuth URL
router.get('/login', (req, res) => {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scope=repo,user`;
    res.redirect(githubAuthUrl);
});

// GitHub OAuth Callback
router.get('/callback', async (req, res) => {
    const { code } = req.query;
    try {
        // Exchange code for access token
        const tokenResponse = await axios.post(
            'https://github.com/login/oauth/access_token',
            {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            { headers: { Accept: 'application/json' } }
        );

        const accessToken = tokenResponse.data.access_token;

        // Fetch user data from GitHub
        const userResponse = await axios.get('https://api.github.com/user', {
            headers: { Authorization: `token ${accessToken}` },
        });

        const { id, login, email } = userResponse.data;

        // Check if user exists in DB, if not, create one
        let user = await User.findOne({ githubId: id });
        if (!user) {
            user = new User({ githubId: id, username: login, email });
            await user.save();
        }

        res.json({ success: true, user, accessToken });
    } catch (error) {
        res.status(500).json({ error: 'GitHub Authentication Failed' });
    }
});


// Fetch authenticated user's repositories
router.get('/repos', async (req, res) => {
    const { accessToken } = req.query;
    try {
        const response = await axios.get('https://api.github.com/user/repos', {
            headers: { Authorization: `token ${accessToken}` },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch repositories' });
    }
});

// Fetch contributions for a project
router.get('/contributions/:owner/:repo', async (req, res) => {
    const { owner, repo } = req.params;
    const { accessToken } = req.query;

    try {
        const response = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}/contributors`,
            { headers: { Authorization: `token ${accessToken}` } }
        );

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch contributions' });
    }
});

router.post('/create-project', async (req, res) => {
    const { accessToken, projectName, visibility } = req.body;

    try {
        // Create GitHub repository
        const repoResponse = await axios.post(
            `https://api.github.com/user/repos`,
            {
                name: projectName,
                private: visibility === 'private',
            },
            { headers: { Authorization: `token ${accessToken}` } }
        );

        // Get repo details
        const { owner, name, html_url } = repoResponse.data;

        // TODO: Generate blockchain tokens (We'll do this in Step 8)
        const generatedTokens = 1000; // Placeholder value

        // Save project in DB
        const newProject = new Project({
            owner: owner.login,
            name,
            githubUrl: html_url,
            tokensAllocated: generatedTokens,
        });

        await newProject.save();

        res.json({ success: true, project: newProject });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create project' });
    }
});

router.post('/reward-tokens', async (req, res) => {
    const { contributorAddress, contributionCount } = req.body;

    if (!contributorAddress || !contributionCount) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const tokenAmount = contributionCount * 10; // Reward logic: 10 tokens per contribution

    try {
        const transferTx = contract.methods.transfer(contributorAddress, web3.utils.toWei(tokenAmount.toString(), 'ether'));
        const gas = await transferTx.estimateGas({ from: ownerAddress });
        const gasPrice = await web3.eth.getGasPrice();

        const tx = {
            from: ownerAddress,
            to: contract.options.address,
            gas,
            gasPrice,
            data: transferTx.encodeABI(),
        };

        const signedTx = await web3.eth.accounts.signTransaction(tx, ownerPrivateKey);
        const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        res.json({ success: true, txHash: txReceipt.transactionHash });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;