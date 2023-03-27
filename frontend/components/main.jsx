import React, { useEffect, useState } from "react";
import { useAccount, useSigner } from "wagmi";

/// Imports required by Biconomy
import { ChainId } from "@biconomy/core-types";
import SmartAccount from "@biconomy/smart-account";

/// Importing the components
import UnStakedNFT from "./Modal/UnStakedNFT";
import StakedNFT from "./Modal/StakedNFT";
import TokenBal from "./Modal/TokenBal";
import Mint from "../pages/mint";

const Main = () => {
    const { data: signer } = useSigner();
const { address } = useAccount();
const [smartAccount, setSmartAccount] = useState(null);
const [scwAddress, setScwAddress] = useState("");
const [scwLoading, setScwLoading] = useState(false);
const activeChainId = ChainId.POLYGON_MUMBAI;

  useEffect(() => {
  if (signer) {
  async function setupSmartAccount() {
  setScwAddress("");
  setScwLoading(true);

  const smartAccount = new SmartAccount(signer.provider, {
    activeNetworkId: activeChainId,
    supportedNetworksIds: [activeChainId],
    networkConfig: [
      {
        chainId: activeChainId,
        dappAPIKey: "59fRCMXvk.8a1652f0-b522-4ea7-b296-98628499aee3",
      },
    ],
  });
  console.log("wallet", smartAccount);

  const smartAccountss = await smartAccount.init();
  console.info("smartAccount", smartAccountss);
  setScwAddress(smartAccount.address);
  setSmartAccount(smartAccount);
  setScwLoading(false);
}
if (!!signer.provider && !!address) {
  setupSmartAccount();
}}
}, [address, signer]);

/// Passing the smartAccount to the components
return (
  <div>
    {scwLoading && <h2>Loading Smart Account...</h2>}
    {scwAddress && console.log(scwAddress)}
    <TokenBal smartAccount={smartAccount} />
    <StakedNFT smartAccount={smartAccount} />
    <UnstakedNFT smartAccount={smartAccount} />
    <Mint smartAccount={smartAccount} />
  </div>
);

};
export default Main;
