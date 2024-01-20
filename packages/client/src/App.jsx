import { useCallback, useEffect, useState } from "react";
import "./App.css";

import {
  Connect,
  ChangePizzaPrice,
  CreateOrder,
  PreviousOrders,
} from "./components";
import { shortenAddress, sortOrders } from "./utils";
import { ethers } from "ethers";

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [isOrdersLoading, setOrdersIsLoading] = useState(true);
  const [pizzaPrice, setPizzaPrice] = useState(null);
  const [isPriceLoading, setPriceIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const fetchOrders = useCallback(async () => {
    if (!account || !contract) return;

    const tempOrders = await contract.getCustomerOrders();

    setOrders(sortOrders(tempOrders));
    setOrdersIsLoading(false);
  }, [account, contract]);

  const fetchPizzaPrice = useCallback(async () => {
    if (!account || !contract) return;

    setPriceIsLoading(true);

    const pizzaPrice = await contract.pizzaPrice();

    setPizzaPrice(ethers.formatEther(pizzaPrice));
    setPriceIsLoading(false);
  }, [account, contract]);

  useEffect(() => {
    fetchPizzaPrice();
    fetchOrders();
  }, [fetchOrders, fetchPizzaPrice]);

  window.ethereum.on("accountsChanged", ([newAddress]) => {
    if (newAddress === undefined) return;
    window.location.reload();
  });

  const accountDisplay = account ? shortenAddress(account) : null;

  return (
    <div>
      <em>Crypto Pet Project: Web3 Application</em>
      <h1>Pizza Order</h1>
      <h2>Your current account: {accountDisplay}</h2>
      {isPriceLoading ? (
        <span>Loading..</span>
      ) : (
        <h3>The price of the pizza: {pizzaPrice} ETH</h3>
      )}
      <Connect
        account={account}
        setAccount={setAccount}
        setContract={setContract}
      />
      <CreateOrder
        account={account}
        contract={contract}
        fetchOrders={fetchOrders}
        pizzaPrice={pizzaPrice}
        isPriceLoading={isPriceLoading}
      />
      <PreviousOrders
        account={account}
        contract={contract}
        fetchOrders={fetchOrders}
        orders={orders}
        isOrdersLoading={isOrdersLoading}
      />
      <ChangePizzaPrice
        account={account}
        contract={contract}
        fetchPizzaPrice={fetchPizzaPrice}
      />
    </div>
  );
}

export default App;
