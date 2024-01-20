const { ethers } = require("hardhat");
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

async function deployContract() {
  const PizzaOrder = await ethers.getContractFactory("PizzaOrder");
  const [owner, addr1] = await ethers.getSigners();
  const pizzaOrder = await PizzaOrder.deploy(owner.address);
  return { pizzaOrder, owner, addr1 };
}

describe("PizzaOrder Contract", function () {
  let pizzaOrder, owner, addr1;

  beforeEach(async function () {
    ({ pizzaOrder, owner, addr1 } = await loadFixture(deployContract));
  });

  it("Should set the right owner", async function () {
    expect(await pizzaOrder.owner()).to.equal(owner.address);
  });

  it("Should have correct pizza price", async function () {
    expect(await pizzaOrder.pizzaPrice()).to.equal(ethers.parseEther("0.002"));
  });

  it("Should create an order", async function () {
    await pizzaOrder
      .connect(addr1)
      .createOrder("margarita", { value: ethers.parseEther("0.002") });
    const orders = await pizzaOrder.connect(addr1).getCustomerOrders();
    expect(orders[0].pizzaType).equal("margarita");
  });

  it("Should like pizza", async function () {
    await pizzaOrder
      .connect(addr1)
      .createOrder("margarita", { value: ethers.parseEther("0.002") });
    await pizzaOrder.connect(addr1).likePizza(0);
    const orders = await pizzaOrder.connect(addr1).getCustomerOrders();
    expect(orders[0].like).to.equal(true);
  });

  it("Should change pizza price", async function () {
    const newPrice = ethers.parseEther("0.003");
    await pizzaOrder.connect(owner).changePizzaPrice(newPrice);
    expect(await pizzaOrder.pizzaPrice()).to.equal(newPrice);
  });
});
