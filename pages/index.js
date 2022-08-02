import HomePage from "../components/HomePage.js";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import ConnectWallet from "../components/ConnectWallet.js";

export default function Home() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");

  useEffect(() => {
    CheckConnection();
  }, []);

  const CheckConnection = async () => {
    window.ethereum.on("accountsChanged", async () => {
      CheckConnection();
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    if (accounts.length) {
      setIsUserLoggedIn(true);
      setCurrentAccount(accounts[0]);
      console.log("Found account:", accounts[0]);
    } else {
      setIsUserLoggedIn(false);
      setCurrentAccount("accounts[0]");
    }
  };

  // Calls Metamaks to connect wallet on clicking Connect Wallet Button
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Metamask not detected");
        return;
      }
      let chainId = await ethereum.networkVersion;
      console.log("connected to chain:", chainId);

      const polygonChainId = "137";
      if (chainId !== polygonChainId) {
        try {
          await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x89" }],
          });
        } catch (switchError) {
          // This error code indicates that the chain has not been added to MetaMask.
          if (switchError.code === 4902) {
            try {
              await ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0x89",
                    chainName: "Matic Network",
                    rpcUrls: ["https://rpc-mainnet.matic.network"] /* ... */,
                  },
                ],
              });
            } catch (addError) {
              console.log(addError);
            }
          }
          console.log(switchError);
        }
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Found account:", accounts[0]);

      setIsUserLoggedIn(true);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {!isUserLoggedIn ? (
        <ConnectWallet connectWallet={connectWallet} />
      ) : (
        <HomePage />
      )}
    </div>
  );
}
