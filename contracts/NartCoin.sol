// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "./libraries/SafeMath.sol";
import "./types/ERC20Permit.sol";
import "./utils/Ownable.sol";

contract NartCoin is ERC20Permit, Ownable {
    using SafeMath for uint256;

    string constant coinName = "NartCoin";
    string constant coinSymbol = "NC"; 
    // uint8 constant coinDecimal = 7;
    uint8 constant coinDecimal = 9;
    
    // uint256 initialSupply = 100_000_000_000 * (10 ** coinDecimal);
    uint256 initialSupply = 1000*1e9;

    uint256 public maxTransactionAmount;
    uint256 public maxWallet;

    constructor() ERC20(coinName, coinSymbol, coinDecimal) ERC20Permit(coinName) {
        // maxTransactionAmount = initialSupply * 2 / 100; // 2%
        // maxWallet = initialSupply * 3  / 100; // 3%
        maxTransactionAmount = initialSupply * 5 / 1000; // 0.5% maxTransactionAmountTxn
        maxWallet = initialSupply * 10 / 1000; // 1% maxWallet

        _mint(owner(), initialSupply);
    }

    receive() external payable {}

    function updateMaxTransactionAmount(uint256 newNum) external onlyOwner {
        require(newNum >= (totalSupply() * 1 / 1000)/1e9, "Cannot set maxTransactionAmount lower than 0.1%");
        maxTransactionAmount = newNum * (10**9);
    }

    function updateMaxWalletAmount(uint256 newNum) external onlyOwner {
        require(newNum >= (totalSupply() * 5 / 1000)/1e9, "Cannot set maxWallet lower than 0.5%");
        maxWallet = newNum * (10**9);
    }

    function _transfer(
        address from,
        address to,
        uint amount
    ) internal override {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");

        if(amount == 0) {
            super._transfer(from, to, 0);
            return;
        }
        super._transfer(from, to, amount);
    }

    function withdrawEthPool() external onlyOwner() {
        bool success;
        (success,) = address(msg.sender).call{value: address(this).balance}("");
    }
}