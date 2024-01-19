// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract PizzaOrder is Ownable {
    struct Order {
        uint id;
        string pizzaType;
        uint orderTime;
        bool like;
    }

    event OrderCreated(string indexed pizzaType, uint orderTime);
    event PizzaLiked(address customer, uint orderIndex);

    uint public pizzaPrice = 0.002 ether;

    mapping(address => Order[]) public orders;

    constructor(address initialOwner) Ownable(initialOwner) {}

    function createOrder(string memory _pizzaType) external payable {
        require(msg.value == pizzaPrice, "Amount should be equal to pizza price");

        Order memory newOrder = Order({
            id: orders[msg.sender].length,
            pizzaType: _pizzaType,
            orderTime: block.timestamp,
            like: false
        });

        orders[msg.sender].push(newOrder);

        emit OrderCreated(_pizzaType, block.timestamp);
    }

    function likePizza(uint _id) external {
        require(_id < orders[msg.sender].length, "Order doesn't exist");

        Order storage order = orders[msg.sender][_id];
        order.like = true;

        emit PizzaLiked(msg.sender, _id);
    }

    function getCustomerOrders() external view returns (Order[] memory) {
        return orders[msg.sender];
    }

    function changePizzaPrice(uint newPrice) external onlyOwner {
        pizzaPrice = newPrice;
    }
}