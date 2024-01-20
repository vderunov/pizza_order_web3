import { useState } from "react";

import { ethers } from "ethers";

import styles from "../styles/Common.module.css";

const { ethereum } = window;

function CreateOrder({
  account,
  contract,
  fetchOrders,
  pizzaPrice,
  isPriceLoading,
}) {
  const [pizzaType, setPizzaType] = useState("margherita");
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrderPizza = async (orderType, totalPrice) => {
    const tx = await contract.createOrder(orderType, { value: totalPrice });
    await tx.wait();
    return tx;
  };

  const handleClick = async () => {
    if (!ethereum || !contract || !account || !pizzaPrice) {
      console.error("No ethereum object");
      return;
    }

    try {
      setIsLoading(true);
      const amountToSend = ethers.parseEther(pizzaPrice);
      const tx = await fetchOrderPizza(pizzaType, amountToSend);
      console.log(`Transaction hash: ${tx.hash}`);
      fetchOrders();
    } catch (error) {
      console.error(`Error in transaction: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.block}>
      <label>
        Choose Pizza Type:
        <select
          value={pizzaType}
          onChange={(e) => setPizzaType(e.target.value)}
        >
          <option value="pepperoni">Pepperoni</option>
          <option value="margherita">Margherita</option>
          <option value="cheese">Cheese</option>
        </select>
      </label>
      <br />
      <button type="button" disabled={isLoading} onClick={handleClick}>
        {isLoading || isPriceLoading ? "Loading.." : "Buy"}
      </button>
    </div>
  );
}

export default CreateOrder;
