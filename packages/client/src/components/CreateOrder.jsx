import { useState } from "react";

import { ethers } from "ethers";
import { toast } from "react-toastify";

import pizzaOrderImg from "../assets/pizza-order.jpg";

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
      toast.info("Error in transaction");
      console.error(`Error in transaction: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article>
      <div className="row">
        <img className="circle large" src={pizzaOrderImg} alt="pizza" />
        <div className="max">
          <h5>Choose Pizza Type</h5>
          <div className="field suffix border small">
            <select
              value={pizzaType}
              onChange={(e) => setPizzaType(e.target.value)}
            >
              <option value="pepperoni">Pepperoni</option>
              <option value="margherita">Margherita</option>
              <option value="cheese">Cheese</option>
            </select>
            <i>arrow_drop_down</i>
          </div>
        </div>
      </div>
      <nav>
        {isLoading || isPriceLoading ? (
          <progress className="circle small"></progress>
        ) : (
          <button onClick={handleClick}>Order Pizza</button>
        )}
      </nav>
    </article>
  );
}

export default CreateOrder;
