// 1. Get projectId at https://cloud.walletconnect.com

"use client";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";
// 1. Get projectId
const projectId = "521f6976aa043d837be4a78b3ef69244";

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

const polygonMumbai = {
  chainId: 80001,
  name: "Polygon Mumbai Testnet",
  currency: "MATIC",
  explorerUrl: "https://mumbai.polygonscan.com",
  rpcUrl: "https://rpc-mumbai.matic.today",
};

// 3. Create modal
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com",
  icons: ["https://avatars.mywebsite.com/"],
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [polygonMumbai],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});
export function Web3Modal({ children }: { children: React.ReactNode }) {
  return children;
}
