import { useState } from "react";

import { ethers } from "ethers";
import { toast } from "react-toastify";

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
      toast.info("No ethereum object");
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
      toast.info("Error in transaction");
      console.error(`Error in transaction: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article>
      <div className="row">
        <div className="max">
          <h5>
            Change pizza price (<em>Only the owner</em>)
          </h5>
          <div className="field border">
            <input
              type="number"
              placeholder="Amount (ETH)"
              step="0.001"
              value={pizzaPriceInputValue}
              onChange={(e) => setPizzaPriceInputValue(e.target.value)}
            />
          </div>
        </div>
      </div>
      <nav>
        {isLoading ? (
          <progress className="circle small"></progress>
        ) : (
          <button onClick={handleClick} disabled={!pizzaPriceInputValue}>
            Change Price
          </button>
        )}
      </nav>
    </article>
  );
}

export default ChangePizzaPrice;
