import likeIcon from "../assets/like.png";
import { useState } from "react";

import styles from "../styles/Block.module.css";
import ordersStyles from "../styles/PreviousOrders.module.css";

const OrdersList = ({ orders, handleClick, currentlyLikingOrderId }) => {
  return (
    <div className={ordersStyles.ordersList}>
      {orders.map(({ pizzaType, like, id }, index) => (
        <div key={index} className={ordersStyles.orderItem}>
          {pizzaType}
          {like ? (
            <img src={likeIcon} alt="Like" width="20px" />
          ) : (
            <button type="button" onClick={() => handleClick(id)}>
              {currentlyLikingOrderId === id ? "Loading.." : "Like"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

const PreviousOrders = ({ orders, contract, account, fetchOrders }) => {
  const [currentlyLikingOrderId, setCurrentlyLikingOrderId] = useState(null);

  const fetchLikePizza = async (id) => {
    const tx = await contract.likePizza(id);
    await tx.wait();
    return tx;
  };

  const handleClick = async (id) => {
    if (!contract || !account) {
      console.error("No ethereum object");
      return;
    }

    try {
      setCurrentlyLikingOrderId(id);
      const tx = await fetchLikePizza(id);
      console.log(`Transaction hash: ${tx.hash}`);
      fetchOrders();
    } catch (error) {
      console.error(`Error in transaction: ${error.message}`);
    } finally {
      setCurrentlyLikingOrderId(null);
    }
  };

  return (
    <div className={styles.block}>
      <h3>Previous orders:</h3>
      <OrdersList
        orders={orders}
        handleClick={handleClick}
        currentlyLikingOrderId={currentlyLikingOrderId}
      />
    </div>
  );
};

export default PreviousOrders;
