import { useState } from "react";

import { toast } from "react-toastify";

import heartRegular from "../assets/heart-regular.svg";
import heartSolid from "../assets/heart-solid.svg";

const renderHeartIcon = (like, id, currentlyLikingOrderId, handleClick) => {
  if (like) {
    return <img src={heartSolid} alt="heart" width="16px" />;
  }

  if (currentlyLikingOrderId === id) {
    return <progress className="circle small"></progress>;
  }

  return (
    <a onClick={() => handleClick(id)}>
      <img src={heartRegular} alt="heart" width="16px" />
    </a>
  );
};

const OrdersList = ({ orders, handleClick, currentlyLikingOrderId }) => {
  if (!orders.length) {
    return <p>The order list is empty</p>;
  }

  return orders.map(({ pizzaType, like, id }, index) => {
    const heartIcon = renderHeartIcon(
      like,
      id,
      currentlyLikingOrderId,
      handleClick,
    );

    return (
      <div key={index}>
        <div className="row">
          <div className="max">{pizzaType}</div>
          {heartIcon}
        </div>
        {orders.length - 1 !== index && <div className="small-divider"></div>}
      </div>
    );
  });
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
      toast.info("No ethereum object");
      console.error("No ethereum object");
      return;
    }

    try {
      setCurrentlyLikingOrderId(id);
      const tx = await fetchLikePizza(id);
      console.log(`Transaction hash: ${tx.hash}`);
      fetchOrders();
    } catch (error) {
      toast.info("Error in transaction");
      console.error(`Error in transaction: ${error}`);
    } finally {
      setCurrentlyLikingOrderId(null);
    }
  };

  return (
    <div className="grid">
      <div
        className="s4 padding"
        style={{
          background: "var(--surface-container-low",
          borderRadius: "12px",
          boxShadow: "var(--elevate1)",
        }}
      >
        <h3>Previous orders:</h3>
        <OrdersList
          orders={orders}
          handleClick={handleClick}
          currentlyLikingOrderId={currentlyLikingOrderId}
        />
      </div>
    </div>
  );
};

export default PreviousOrders;
