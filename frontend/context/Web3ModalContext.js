"use client";
import React, { useState, useEffect, createContext, useContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import contractJSON from "./Insurance.json";

const contractDetails = {
  address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  abi: contractJSON.abi,
};

export const Web3ModalContext = createContext();

export const Web3ModalProvider = ({ children }) => {
  const DAPP_NAME = "Insurance";
  const [currentAccount, setCurrentAccount] = useState("");
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  const getProvider = async () => {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.BrowserProvider(window.ethereum);
  };

  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return "Install Metamask";
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        return "No account";
      }
    } catch (err) {
      return "Not connected";
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return "Install Metamask";

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const addNetwork = async (networkId) => {
    const networks = {
      3: {
        chainId: "0x3",
        chainName: "Ropsten Testnet",
        nativeCurrency: {
          name: "Ropsten Ether",
          symbol: "rETH",
          decimals: 18,
        },
        rpcUrls: ["https://ropsten.infura.io/v3/YOUR_INFURA_PROJECT_ID"],
        blockExplorerUrls: ["https://ropsten.etherscan.io"],
      },
      84532: {
        chainId: "0x14a34",
        chainName: "Base Sepolia Testnet",
        nativeCurrency: {
          name: "Sepolia",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://sepolia.base.org"],
        blockExplorerUrls: ["https://sepolia-explorer.base.org"],
      },

      2442: {
        chainId: "0x98a",
        chainName: "Polygon zkEVM Cardona Testnet",
        nativeCurrency: {
          name: "Cardano",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.cardona.zkevm-rpc.com"],
        blockExplorerUrls: ["https://cardona-zkevm.polygonscan.com/"],
      },
    };

    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [networks[networkId]],
      });
    } catch (error) {
      console.error("Failed to add network:", error);
    }
  };

  const switchNetwork = async (networkId) => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${networkId}` }],
      });
    } catch (err) {
      if (err.code === 4902) {
        await addNetwork(networkId);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <Web3ModalContext.Provider
      value={{
        connectWallet,
        checkIfWalletConnected,
        switchNetwork,
        DAPP_NAME,
        currentAccount,
        getProvider,
      }}
    >
      {children}
    </Web3ModalContext.Provider>
  );
};

export const useWeb3Provider = () => useContext(Web3ModalContext);