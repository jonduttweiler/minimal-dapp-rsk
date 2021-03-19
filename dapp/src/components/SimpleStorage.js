import Web3 from "web3";
import React, { useState, useEffect, useRef } from "react";

import {
  CircularProgress,
  Grid,
  Container,
  Button,
  withStyles,
} from "@material-ui/core";

import { TransactionStatus } from "./styled";
import SimpleStorageArtifact from "../artifacts/SimpleStorage.json";

const CustomButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: "#0063cc",
    borderColor: "#0063cc",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      backgroundColor: "#0069d9",
      borderColor: "#0062cc",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  },
})(Button);

const contractAbi = SimpleStorageArtifact.abi;

function SimpleStorage() {
  const contractRef = useRef();
  const accountsRef = useRef();

  const [address, setAddress] = useState(
    "0x107737cE1cdA492BE0398A82645C153c1B9c7Dc3"
  );
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);
  const [txStatus, setTxStatus] = useState({status:"",metadata:""});
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
          setTxStatus({status:"sending"});
        })
        .once("sent", (payload) => {
          setTxStatus({status:"sent"});
        })
        .once("transactionHash", (hash) => {
          setTxStatus({status:"transactionHash", metadata:`HASH: ${hash}`});
        })
        .once("receipt", (receipt) => {
          setTxStatus({status:"receipt", metadata: JSON.stringify(receipt,null,3)});
          
        })
        .on("confirmation", (confNumber, receipt, latestBlockHash) => {
          setTxStatus({status:"confirmed", metadata:`confNumber: ${confNumber},receipt:${ JSON.stringify(receipt,null,3)}, latestBlockHash:${latestBlockHash}`});
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
        <Grid item>Simple dapp</Grid>
        <Grid item>
          <div>Contract address:</div>
          <div>{address}</div>
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
            <CustomButton
              disabled={loading}
              variant="contained"
              color="primary"
              onClick={setNewValue}
            >
              Set value
            </CustomButton>
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
              <Grid item style={{
                maxWidth:"100%", 
                overflow:"auto",
                backgroundColor:"rgba(200,200,200,0.8)",
                

                }}>
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
