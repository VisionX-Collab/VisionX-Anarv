// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VisionXToken is ERC20, Ownable {
    mapping(address => uint256) public contributions;

    constructor() ERC20("VisionXToken", "VXT") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10**18); // Initial Supply of 1 Million VXT
    }

    function rewardContributor(address contributor, uint256 amount) public onlyOwner {
        require(contributor != address(0), "Invalid contributor address");
        require(amount > 0, "Amount must be greater than 0");
        _mint(contributor, amount);
        contributions[contributor] += amount;
    }

    function getContribution(address contributor) public view returns (uint256) {
        return contributions[contributor];
    }
}