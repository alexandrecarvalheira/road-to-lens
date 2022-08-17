import { ethers } from "ethers";
import { useState, useEffect, Children } from "react";
import ConnectWallet from "../components/ConnectWallet.js";
import Header from "../components/Header.js";
import { verifyRequest } from "../src/VerifyAuth.js";
import { RefreshRequest } from "../src/RefreshAuth.js";
import { login } from "../src/Authentication.js";

export default function VerifyConnection({ children }) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLensConnected, setIsLensConnected] = useState(false);

  useEffect(() => {
    CheckConnection();
    CheckLens();
  }, []);
  // Check if there is a wallet connected
  const CheckConnection = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Metamask not detected");
        return;
      }
      ethereum.on("accountsChanged", async () => {
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
    } catch (error) {
      console.log(error);
    }
  };

  const CheckLens = async () => {
    if (localStorage.getItem("auth_token")) {
      const verify = await verifyRequest();
      if (!verify.verify) {
        setIsLensConnected(false);
      } else {
        setIsLensConnected(true);
      }
    } else {
      setIsLensConnected(false);
    }
  };
  const connectLens = async () => {
    if (localStorage.getItem("auth_token")) {
      const verify = await verifyRequest();
      if (!verify.verify) {
        setIsLensConnected(false);
        const refresh = await RefreshRequest(currentAccount);
      } else {
        setIsLensConnected(true);
      }
    } else {
      console.log("aqui");
      const newlogin = await login(currentAccount);
      setIsLensConnected(true);
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
        <>
          <Header
            account={currentAccount}
            connectLens={connectLens}
            isLensConnected={isLensConnected}
          />
          <main>{children}</main>
        </>
      )}
    </div>
  );
}
