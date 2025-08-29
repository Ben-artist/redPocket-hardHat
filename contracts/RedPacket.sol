// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;
contract RedPacket {
    uint256 public count;
    address public owner;
    uint256 public totalAmount;
    mapping(address => bool) public hasGrap;
    event Withdrawn(address indexed owner, uint256 amount);
    event Grapped(address indexed user, uint256 amount);

    constructor(uint256 _count) payable {
        require(msg.value > 0, "Value must be positive");
        count = _count;
        owner = msg.sender;
        totalAmount = msg.value;
    }

    function grap() public {
        require(count > 0, "No packets left");
        require(!hasGrap[msg.sender], "Already claimed");

        uint256 amount;
        if (count == 1) {
            amount = totalAmount; // 最后一人获取剩余全部
        } else {
            amount = totalAmount / count; // 整数除法（截断）
        }

        // 更新状态
        hasGrap[msg.sender] = true;
        totalAmount -= amount;
        count--;
        payable(msg.sender).transfer(amount);
        emit Grapped(msg.sender, amount);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // 提币
    function withdraw() public payable {
        require(msg.sender == owner, "Not owner");
        uint256 amount = address(this).balance;
        emit Withdrawn(msg.sender, amount);
        payable(msg.sender).transfer(amount);
    }
}
