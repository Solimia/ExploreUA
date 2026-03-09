// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract TourAccess {
    address public owner;
    uint256 public constant ACCESS_PRICE = 0.005 ether; // Фіксована ціна за доступ

    // Подія, яку бекенд зможе легко відстежити
    event AccessPurchased(address indexed user, uint256 amount);

    constructor() {
        owner = msg.sender; // Ти стаєш власником контракту
    }

    // Функція оплати (замість join)
    function buyAccess() public payable {
        require(msg.value == ACCESS_PRICE, "Please pay exactly 0.005 ETH!");
        
        // Гроші просто залишаються на балансі контракту
        emit AccessPurchased(msg.sender, msg.value);
    }

    // Перевірка балансу контракту
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    // Тільки ти (власник) можеш забрати гроші з контракту
    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw funds!");
        
        uint256 amount = address(this).balance;
        (bool success, ) = owner.call{value: amount}("");
        require(success, "Transfer failed.");
    }

    // Дозволяє змінити ціну в майбутньому, якщо захочеш
    // (опціонально, але корисно)
}