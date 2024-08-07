const { ethers } = require("ethers");
//import { abi } from "./artifacts/contracts/Insurance.sol/Insurance.json";


const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_priceFeed",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "cancelPolicy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimPeriod",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_initialInvestment",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_thresholdPrice",
        type: "uint256",
      },
    ],
    name: "createPolicy",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getLatestPrice",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "payPremium",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "policies",
    outputs: [
      {
        internalType: "address",
        name: "policyHolder",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "initialInvestment",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "thresholdPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalPremiumPaid",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "premiumRate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const provider = new ethers.JsonRpcProvider("http://localhost:8545");


const signer = new ethers.Wallet(
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
  provider
);


const insuranceContractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";


const insuranceContract = new ethers.Contract(
  insuranceContractAddress,
  abi,
  signer
);

async function main() {

    const cancelPolicyTx = await insuranceContract.cancelPolicy();
    await cancelPolicyTx.wait();
    console.log("Policy canceled");

  // Create Policy transaction
  const initialInvestment = ethers.parseEther("1"); // 1 ETH    
  const thresholdPrice = ethers.parseUnits("3000", "ether"); // 3000 USD
  const createPolicyTx = await insuranceContract.createPolicy(
    initialInvestment,
    thresholdPrice,
    { value: initialInvestment }
  );
  await createPolicyTx.wait();
  console.log("Policy created");

  // Pay premium transaction
  const premiumAmount = ethers.parseEther("0.01"); // 0.01 ETH
  const payPremiumTx = await insuranceContract.payPremium({
    value: premiumAmount,
  });
  await payPremiumTx.wait();
  console.log("Premium paid");

  // Get the latest price feed
  const latestPriceFeedTx = await insuranceContract.getLatestPrice();
  await latestPriceFeedTx.wait();
  console.log("Latest price feed obtained: " + latestPriceFeedTx.toString());

  //Claim transaction
  const claimTx = await insuranceContract.claim();
  await claimTx.wait();
  console.log("Claim made");

  // Example: Cancel Policy
//   const cancelPolicyTx = await insuranceContract.cancelPolicy();
//   await cancelPolicyTx.wait();
//   console.log("Policy canceled");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
