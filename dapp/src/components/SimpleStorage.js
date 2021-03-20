import Web3 from "web3";
import React, { useState, useEffect, useRef } from "react";

import {
  CircularProgress,
  Grid,
  Container,
} from "@material-ui/core";

import { Title, NetworkIndicator, TransactionStatus, CustomButton as Button } from "./styled";
import SimpleStorageArtifact from "../artifacts/SimpleStorage.json";

const contractAbi = SimpleStorageArtifact.abi;

const networks={
  1: "Ethereum Mainnet",
  3: "Ropsten Test Network",
  4: "Rinkeby Test Network",
  5: "Goerli Test Network",
  30: "RSK Mainnet",
  31: "RSK Testnet",
  42: "Kovan Test Network",
}


function SimpleStorage() {
  const web3Ref = useRef();
  const contractRef = useRef();
  const accountsRef = useRef();
  const [networkId, setNetworkId] = useState();

  const [address, setAddress] = useState(
    "0x107737cE1cdA492BE0398A82645C153c1B9c7Dc3"
  );
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);
  
  const [txStatus, setTxStatus] = useState({ status: "", metadata: "" });
  const [inputValue, setInputValue] = useState("");

  async function connect(){
      const web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      web3Ref.current = web3;
      const networkId = await web3.eth.net.getId();
      setNetworkId(networkId)
      return web3;
  }

  async function getAccounts(){
    const web3 = web3Ref.current;
    const accounts = await web3.eth.getAccounts();
     accountsRef.current = accounts;
     return accounts;
  }


  useEffect(() => {
    async function initContract() {
      try {
        const web3 = await connect();
        window.web3x = web3;
        getAccounts();
        
        const contract = new web3.eth.Contract(contractAbi, address);
        contractRef.current = contract;
        const value = await contract.methods.get().call();
        setValue(value);
      } catch (err) {
        console.log(err);
      }
    }

    initContract();
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
          setTxStatus({ status: "sending" });
        })
        .once("sent", (payload) => {
          setTxStatus({ status: "sent" });
        })
        .once("transactionHash", (hash) => {
          setTxStatus({ status: "transactionHash", metadata: `HASH: ${hash}` });
        })
        .once("receipt", (receipt) => {
          setTxStatus({
            status: "receipt",
            metadata: JSON.stringify(receipt, null, 3),
          });
        })
        .on("confirmation", (confNumber, receipt, latestBlockHash) => {
          setTxStatus({
            status: "confirmed",
            metadata: `confNumber: ${confNumber},receipt:${JSON.stringify(
              receipt,
              null,
              3
            )}, latestBlockHash:${latestBlockHash}`,
          });
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
    <Container maxWidth="sm">
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="center"
        spacing={3}
      >
        <Grid item><Title>Simple dapp</Title></Grid>
        <Grid item>
          <div>Contract address:</div>
          <div>{address}</div>
          <Grid item>
            <NetworkIndicator>Target network: RSK Testnet </NetworkIndicator> 
            <NetworkIndicator>Current network: {networks[networkId] || networkId}</NetworkIndicator>

            
          </Grid>
        </Grid>
        <Grid item>
          <div>Value:</div>
          <div>{value}</div>
        </Grid>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
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
          </Grid>
          <Grid item>
            <Button
              disabled={loading}
              variant="contained"
              color="primary"
              onClick={setNewValue}
            >
              Set value
            </Button>
          </Grid>
          <Grid item>
            <Grid container direction="row" justify="center">
              {loading && (
                <CircularProgress
                  size={25}
                  color="secondary"
                ></CircularProgress>
              )}
              <TransactionStatus>{txStatus?.status}</TransactionStatus>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="column">
              <Grid
                item
                style={{
                  maxWidth: "100%",
                  overflow: "auto",
                  backgroundColor: "rgba(200,200,200,0.8)",
                }}
              >
                {txStatus?.metadata}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SimpleStorage;
