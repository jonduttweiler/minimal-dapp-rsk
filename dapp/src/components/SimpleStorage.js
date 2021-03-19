import Web3 from "web3";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/Button";
import { CircularProgress } from "@material-ui/core";

import SimpleStorageArtifact from "../artifacts/SimpleStorage.json";
import { Flex } from "./styled";

const contractAbi = SimpleStorageArtifact.abi;

function SimpleStorage() {
  const contractRef = useRef();
  const accountsRef = useRef();

  const [address, setAddress] = useState(
    "0x107737cE1cdA492BE0398A82645C153c1B9c7Dc3"
  );
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);
  const [txStatus, setTxStatus] = useState();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    async function initSmartContract() {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        accountsRef.current = await web3.eth.getAccounts();

        const contract = new web3.eth.Contract(contractAbi, address);
        contractRef.current = contract;
        const value = await contract.methods.get().call();
        setValue(value);
      } catch (err) {
        console.log(err);
      }
    }

    initSmartContract();
  }, [address]);

  async function setNewValue() {
    try {
      const account = accountsRef.current[0];
      const contract = contractRef.current;
      const value = parseInt(inputValue);
      setLoading(true);
      const promiEvent = contract.methods.set(value).send({ from: account });
      promiEvent
        .once("sending", (payload) => {
          setTxStatus("sending");
        })
        .once("sent", (payload) => {
          setTxStatus("sent");
        })
        .once("transactionHash", (hash) => {
          setTxStatus("transactionHash");
        })
        .once("receipt", (receipt) => {
          setTxStatus("receipt");
        })
        .on("confirmation", (confNumber, receipt, latestBlockHash) => {
          setTxStatus("confirmed");
        })
        .on("error", (error) => {
          setTxStatus("error");
        });

      await promiEvent;
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }

  return (
    <Flex column>
      <div>
        <div>Contract address:</div>
        <div>{address}</div>
      </div>

      <Flex column center style={{ border: "2px solid tomato" }}>
        <div style={{textAlign:"center"}}>value:</div>
        <div style={{textAlign:"center"}}>{value}</div>
      </Flex>
      
      <Flex row>
        <input
          style={{ textAlign: "right" }}
          type="text"
          pattern="[0-9]*"
          value={inputValue}
          onChange={(e) => {
            const re = /^[0-9\b]+$/;
            if (e.target.value === "" || re.test(e.target.value)) {
              setInputValue(e.target.value);
            }
          }}
        />
        <Button onClick={setNewValue}>Set value</Button>
        <Flex m={"0px 15px"}>
          {loading && (
            <CircularProgress size={25} color="secondary"></CircularProgress>
          )}
          {txStatus}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SimpleStorage;
