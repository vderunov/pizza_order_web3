import { useCallback, useEffect, useState } from "react";

import { ethers } from "ethers";
import { ToastContainer } from "react-toastify";

import ethereumImg from "./assets/ethereum.png";
import {
  Connect,
  ChangePizzaPrice,
  CreateOrder,
  PreviousOrders,
} from "./components";
import { shortenAddress, sortOrders } from "./utils";

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
    <>
      <header>
        <nav>
          <h5 className="max center-align">
            Ethereum Pet Project: Web3 Application
          </h5>
          <Connect
            account={account}
            setAccount={setAccount}
            setContract={setContract}
          />
        </nav>
      </header>

      <main className="responsive">
        <h1 className="center-align">Pizza Order</h1>
        <div className="row">
          <article>
            <div className="row">
              <img className="circle large" src={ethereumImg} alt="ethereum" />
              <div className="max">
                <h5>Ethereum</h5>
                <p>Your current account: {accountDisplay}</p>
              </div>
            </div>
          </article>
          <article>
            <h5>The price of the pizza</h5>
            {isPriceLoading ? (
              <progress className="circle small"></progress>
            ) : (
              <p>{pizzaPrice} ETH</p>
            )}
          </article>
        </div>
        <div className="large-divider"></div>
        <div className="row">
          <CreateOrder
            account={account}
            contract={contract}
            fetchOrders={fetchOrders}
            pizzaPrice={pizzaPrice}
            isPriceLoading={isPriceLoading}
          />
          <ChangePizzaPrice
            account={account}
            contract={contract}
            fetchPizzaPrice={fetchPizzaPrice}
          />
        </div>
        <div className="large-divider"></div>
        <PreviousOrders
          account={account}
          contract={contract}
          fetchOrders={fetchOrders}
          orders={orders}
          isOrdersLoading={isOrdersLoading}
        />
      </main>
      <ToastContainer progressStyle={{ background: "var(--primary)" }} />
    </>
  );
}

export default App;
