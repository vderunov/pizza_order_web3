const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const pizzaOrder = await hre.ethers.deployContract("PizzaOrder", [
    deployer.address,
  ]);

  await pizzaOrder.waitForDeployment();

  console.log(
    `PizzaOrder deployed to ${pizzaOrder.target} and owner: ${deployer.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
