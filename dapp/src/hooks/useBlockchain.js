import Web3 from "web3";
import { useRef, useState, useEffect } from "react";

export default function useBlockchain() {
  const web3Ref = useRef();

  const [connected, setConnected] = useState(false);

  const [web3, setWeb3] = useState();
  const [chainId, setChainId] = useState();
  const [accounts, setAccounts] = useState([]);
  const [balance, setBalance] = useState();

  const [errors, setErrors] = useState([]);
  const addError = (error) => setErrors((errors) => [...errors, error]);
  const clearErrors = () => setErrors([]);


  async function connect() {
    let web3;
    if (window.ethereum) {
      try {
        const ethereum = window.ethereum;
        web3 = new Web3(ethereum);
        setWeb3(web3);
        //https://eips.ethereum.org/EIPS/eip-1102
        //https://eips.ethereum.org/EIPS/eip-1193
        const response = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const accounts = response || [];
        setAccounts(accounts);
        console.log("access granted");
        web3Ref.current = web3;
        setConnected(true);

        const balance = await web3.eth.getBalance(accounts[0]);
        setBalance(balance);

        ethereum.on("connect", () => {
          setConnected(true);
        });
        ethereum.on("disconnect", () => {
          setConnected(false);
        });

        ethereum.on("chainChanged", (chainIdHex) => {
          setChainId(parseInt(chainIdHex, 16));
          updateBalance();
        });

        ethereum.on("accountsChanged", (accounts) => {
          setAccounts(accounts);
        });
      } catch (err) {
        console.log(err);
        setConnected(false);
        addError(err);
      }
    } else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider);
    } else {
      const error = new Error("Provider Error");
      error.message = "No provider was found";
      addError(error);
    }

    //determine chain id
    if (window.ethereum) {
      //https://eips.ethereum.org/EIPS/eip-695
      const ethereum = window.ethereum;
      const chainId = await ethereum.request({
        method: "eth_chainId",
      });
      setChainId(parseInt(chainId, 16));
    } else if (web3) {
      //deprecated
      const networkId = await web3.eth.net.getId();
      setChainId(networkId);
    }

    if (web3) {
      web3Ref.current = web3;
      return web3;
    } //TODO: aggregar mensaje de error
  }

  async function updateBalance() {
    const web3 = web3Ref.current;
    if (web3 && accounts[0]) {
      const balance = await web3.eth.getBalance(accounts[0]);
      setBalance(balance);
    }
  }

  useEffect(() => {
    updateBalance();
  }, [accounts]);

  return {
    connect,
    connected,
    chainId,
    accounts,
    balance,
    web3,
    errors,
    clearErrors,
  };
}
