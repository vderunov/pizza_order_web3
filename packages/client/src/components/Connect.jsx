import { useCallback, useEffect } from "react";

import { Contract, ethers } from "ethers";
import { toast } from "react-toastify";

import { contractABI, contractAddress } from "../utils";

const getEthereumContract = async () => {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new Contract(contractAddress, contractABI, signer);
    return contract;
  } catch (error) {
    toast.info("Failed to get Ethereum contract");
    console.error("Failed to get Ethereum contract:", error);
  }
};

function Connect({ account, setAccount, setContract }) {
  const chainIdSepolia = "0xaa36a7";

  const switchToSepolia = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainIdSepolia }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        console.error("switch error: 4902");
      } else {
        console.error("Failed to switch to Sepolia network", switchError);
      }
    }
  };

  const ethereumRequest = useCallback(
    async (method) => {
      if (typeof window.ethereum === "undefined") {
        toast.info("MetaMask is not installed");
        return;
      }

      const chainId = await window.ethereum.request({ method: "eth_chainId" });

      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });

      if (chainId !== chainIdSepolia) {
        await switchToSepolia();
      }

      const accounts = await window.ethereum.request({ method });

      if (accounts.length) {
        const contract = await getEthereumContract();
        setAccount(accounts[0]);
        setContract(contract);
      } else {
        toast.info("No accounts found", { toastId: "no-accounts-found" });
        console.log("No accounts found");
      }
    },
    [setAccount, setContract],
  );

  useEffect(() => {
    // Check if Wallet is connected
    ethereumRequest("eth_accounts");
  }, [ethereumRequest]);

  return account ? null : (
    <button
      type="button"
      onClick={() => ethereumRequest("eth_requestAccounts")} // connect Wallet
    >
      Connect Wallet
    </button>
  );
}

export default Connect;
