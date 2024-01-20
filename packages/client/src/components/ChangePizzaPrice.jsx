import { useState } from "react";
import { ethers } from "ethers";

import styles from "../styles/Common.module.css";

function ChangePizzaPrice({ account, contract, fetchPizzaPrice }) {
  const [pizzaPriceInputValue, setPizzaPriceInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchChangePizzaPrice = async (price) => {
    const tx = await contract.changePizzaPrice(price);
    await tx.wait();
    return tx;
  };

  const handleClick = async () => {
    if (!contract || !account) {
      console.error("No ethereum object");
      return;
    }

    try {
      setIsLoading(true);
      const amountToSend = ethers.parseEther(pizzaPriceInputValue);
      const tx = await fetchChangePizzaPrice(amountToSend);
      console.log(`Transaction hash: ${tx.hash}`);
      fetchPizzaPrice();
    } catch (error) {
      console.error(`Error in transaction: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.block}>
      <h3>
        Change pizza price (<em>Only the owner</em>)
      </h3>
      <input
        placeholder="Amount (ETH)"
        type="number"
        step="0.001"
        value={pizzaPriceInputValue}
        onChange={(e) => setPizzaPriceInputValue(e.target.value)}
        disabled={isLoading}
      />
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading || !pizzaPriceInputValue}
      >
        {isLoading ? "Loading.." : "Change Price"}
      </button>
    </div>
  );
}

export default ChangePizzaPrice;
