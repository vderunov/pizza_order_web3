import { Contract, ethers } from "ethers";
import { contractABI, contractAddress } from "../utils";
import { useCallback, useEffect } from "react";

const getEthereumContract = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new Contract(contractAddress, contractABI, signer);
  return contract;
};

const processEthereumAccountsRequest = async (
  method,
  setAccount,
  setContract,
) => {
  if (!window.ethereum) return alert("MetaMask is not installed");

  const accounts = await window.ethereum.request({ method });

  if (accounts.length) {
    const contract = await getEthereumContract();
    setAccount(accounts[0]);
    setContract(contract);
  } else {
    console.log("No accounts found");
  }
};

function Connect({ account, setAccount, setContract }) {
  const checkIfWalletIsConnected = useCallback(async () => {
    processEthereumAccountsRequest("eth_accounts", setAccount, setContract);
  }, [setAccount, setContract]);

  const connectWallet = useCallback(async () => {
    processEthereumAccountsRequest(
      "eth_requestAccounts",
      setAccount,
      setContract,
    );
  }, [setAccount, setContract]);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [checkIfWalletIsConnected]);

  return account ? null : (
    <button type="button" onClick={connectWallet}>
      Connect Wallet
    </button>
  );
}

export default Connect;
