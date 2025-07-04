// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.27;

import { ERC1155 } from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract RandomApp is ERC1155, Ownable {
    uint256 public constant PRICE = 0.00009 ether;

    constructor(address initialOwner) ERC1155("ipfs://bafybeiahp3ruxnsdab6sbgl6fzzxlmhwtp2mcd2hjkdgdpmmsgja57sgge/{id}.json") Ownable(initialOwner) {}

    function mint(uint256 id, address builder) public payable {
        require(msg.value >= PRICE, "Not enough ETH...");

        uint256 half = msg.value / 2;
        payable(builder).transfer(half);
        payable(owner()).transfer(half);

        _mint(msg.sender, id, 1, "");
    }

    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
