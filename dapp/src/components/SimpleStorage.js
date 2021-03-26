import React, { useState, useEffect, useRef } from "react";
import useBlockchain from "../hooks/useBlockchain";
import styled from "styled-components";

import { CircularProgress } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

import {
  Div,
  Title,
  Value,
  TransactionStatus,
  Button,
  Flex,
  ConnectButton,
  ClearErrorButton,
  Metadata,
} from "./styled";

import SimpleStorageArtifact from "../artifacts/SimpleStorage.json";
import StringifiedObject from "./StringifiedObject";

const contractAbi = SimpleStorageArtifact.abi;
const targetNetworkId = 31;

const networks = {
  1: "Ethereum Mainnet",
  3: "Ropsten Test Network",
  4: "Rinkeby Test Network",
  5: "Goerli Test Network",
  30: "RSK Mainnet",
  31: "RSK Testnet",
  42: "Kovan Test Network",
};

const tokens = {
  30: "R-BTC",
  31: "tR-BTC",
  1: "ETH",
  3: "ETH",
  4: "ETH",
  5: "ETH",
  42: "ETH",
};

const Root = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 25px 10px;

  @media (min-width: 768px) {
    width: 75%;
  }
  @media (min-width: 1020px) {
    width: 45%;
  }
`;

const Error = styled.div`
  border: 2px solid tomato;
  width: 100%;
  padding: 10px;
  color: tomato;
`;

function SimpleStorage() {
  const contractRef = useRef();

  const {
    connect,
    connected,
    web3,
    chainId,
    accounts,
    balance,
    error,
    clearError,
  } = useBlockchain();

  const address = "0x107737cE1cdA492BE0398A82645C153c1B9c7Dc3";

  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false); //?

  const [txStatus, setTxStatus] = useState({ status: "", metadata: "" });
  const [inputValue, setInputValue] = useState("");

  const targetNetwork = networks[targetNetworkId];
  const currentNetwork = networks[chainId] || chainId;

  async function refreshValue() {
    const contract = contractRef.current;
    const value = await contract.methods.get().call();
    setValue(value);
  }

  function clearTxStatus() {
    setTxStatus({ status: "", metadata: "" });
  }

  async function initContract() {
    console.log("init contract");
    try {
      if (web3) {
        const contract = new web3.eth.Contract(contractAbi, address);
        contractRef.current = contract;
        const value = await contract.methods.get().call();
        setValue(value);
      } else {
        console.log("web3 is undefined");
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (connected) {
      initContract();
    }
  }, [connected]);

  async function setNewValue() {
    try {
      clearTxStatus();
      const contract = contractRef.current;
      const value = parseInt(inputValue);
      setLoading(true);
      const promiEvent = contract.methods
        .set(value)
        .send({ from: accounts[0] });
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
            metadata: receipt,
          });
        })
        .on("confirmation", (confNumber, receipt, latestBlockHash) => {
          setTxStatus({
            status: "confirmed",
            metadata: {
              confNumber,
              receipt,
              latestBlockHash,
            },
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
    refreshValue();
  }

  return (
    <Root>
      <Flex column justify="center" align="center" spacing={2}>
        <Flex center>
          <Title>Simple dapp</Title>
        </Flex>
        <Flex center>
          {connected && (
            <Alert severity="success" variant="outlined">
              Connected
            </Alert>
          )}
          {!connected && (
            <ConnectButton outlined color="primary" onClick={connect}>
              connect
            </ConnectButton>
          )}
        </Flex>

        <Flex center>
          {currentNetwork && (
            <Alert severity="info">
              Current chain: <b>({chainId})</b> <i>{currentNetwork}</i>
            </Alert>
          )}

          {/* <Flex m="5px">
              Target chain: <i> &nbsp;{targetNetwork}</i>
            </Flex> */}
          {chainId && chainId !== targetNetworkId && (
            <Div mt="15px">
              <Alert severity="warning">
                <AlertTitle>Incorrect network</AlertTitle>
                <div>
                  Please, switch to <strong>{targetNetwork}</strong>
                </div>
              </Alert>
            </Div>
          )}
        </Flex>

        <Flex column>
          <Flex>Accounts:</Flex>
          <Flex>
            {accounts.map((account, idx) => (
              <div key={idx}>{account}</div>
            ))}
          </Flex>
          <Flex p="10px"></Flex>

          <Flex>Balance:</Flex>
          {balance && (
            <div>
              <strong>{web3?.utils.fromWei(balance)}</strong>
              &nbsp;
              {tokens[chainId]}
            </div>
          )}
        </Flex>

        {/* Separator para el contract __ */}
        <Flex column>
          <div>Contract address: ({targetNetwork})</div>
          <a
            href={`https://explorer.testnet.rsk.co/address/${address}`}
            target="_blank"
            rel="noreferrer"
          >
            {address}
          </a>
        </Flex>

        <Flex mt="10px">Value:</Flex>
        <Flex j="center" p="3px">
          <Value>{value}</Value>
        </Flex>

        <Flex center>
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
        </Flex>
        <Flex center>
          <Button
            disabled={loading || !connected}
            variant="contained"
            color="primary"
            onClick={setNewValue}
          >
            Set value
          </Button>
        </Flex>

        <Flex center>
          {loading && (
            <CircularProgress size={25} color="secondary"></CircularProgress>
          )}
          <TransactionStatus>{txStatus?.status}</TransactionStatus>
        </Flex>
        {txStatus?.status && (
          <Metadata>
            <StringifiedObject object={txStatus?.metadata} />
          </Metadata>
        )}

        {error && (
          <Error>
            <div>
              <div>
                <b>Type:</b>
                </div>
                <div>
                   {error.name}
                </div>
                <div>
                  <b>Message:</b>
                </div>
                <div>
                {error.message}
                </div>
            </div>
            <div>
              <Flex center m="10px">
              <Button onClick={clearError}>Clear error</Button>

              </Flex>

            </div>
          </Error>
        )}
      </Flex>
    </Root>
  );
}

export default SimpleStorage;
