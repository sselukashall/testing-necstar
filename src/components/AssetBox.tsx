"use client";

import { useEffect, useState, useMemo } from "react";
import { Chain, useAccount, useNetwork } from "wagmi";
import { Alchemy } from "alchemy-sdk";

import { Chains } from "@/app/web3-providers";
import TransferBox from "./TransferBox";
import { TokenInterface } from "@/interface";

const AssetBox = () => {
  const { isConnected, address } = useAccount();
  const [tokens, setTokens] = useState<TokenInterface[]>(); //state variable set to include ERC20 token assets
  const { chain } = useNetwork();
  const [isLoading, setIsLoading] = useState(false); // state variable to monitor if token assets are read completely
  const [seletecToken, setSelectedToken] = useState<TokenInterface | null>(null);

  // variable setting up alchemy as client dynamically according to chain and connectsion status
  const alchemy = useMemo(() => {
    if (isConnected && chain !== null) {
      const config = {
        apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
        network: Chains[(chain as Chain).name],
      };
      const alchemy = new Alchemy(config);
      return alchemy;
    }
  }, [chain, isConnected]);

  //to fetch ERC20 token assets asynchronously
  const fetchTokens = async (walletAddress: string) => {
    try {
      if (alchemy) {

        // getting ERC20 token assets asynchronously
        setIsLoading(true);

        // promise that resolves all token assets for user wallet address
        const balances = await alchemy.core.getTokenBalances(walletAddress);
        const tokenDetails: TokenInterface[] = await Promise.all(
          balances.tokenBalances
            .filter((token) => token.tokenBalance !== "0") // removing tokens whose balance is below than zero
            .map(async (token) => {

              // getting token details using alchemy.core.getTokenMetadata()
              const metadata = await alchemy.core.getTokenMetadata(
                token.contractAddress
              );

              return {
                name: metadata.name ?? "Unknown Name",
                symbol: metadata.symbol ?? "Unknown Symbol",
                balance:
                  metadata.decimals !== null
                    ? (
                      Number(token.tokenBalance) /
                      Math.pow(10, metadata.decimals)
                    ).toFixed(6)
                    : "0.000000",
                address: token.contractAddress,
                logo: metadata.logo,
              };
            })
        );

        setIsLoading(false);
        setTokens(tokenDetails);
      }
    } catch (error) {
      console.error("Error fetching Tokens Balances:", error);
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      fetchTokens(address);
    }
  }, [address, chain, isConnected]);

  useEffect(() => {
    setSelectedToken(null);
  }, [chain])

  const handleTokenSelect = (token: TokenInterface) => {
    setSelectedToken(token)
  }

  const handleTransferBoxClose = () => {
    setSelectedToken(null);
  }

  return (
    <div className="flex flex-col">
      <div className=" text-lg/5 mb-4">Asset</div >
      <div className="w-full h-[460px] border border-solid border-gray-500">
      {
        seletecToken ? (
          <div className="h-full flex flex-row">
            <div className="w-20 h-full dark:bg-zinc-800 flex flex-col p-2">
              {tokens?.map((token) => (
                <div 
                  key={token.address} 
                  className={`"w-full h-10 flex flex-row justify-center items-center hover:cursor-pointer "${token.address === seletecToken.address && " bg-orange-500 dark:bg-[#212122]"}`}
                  onClick={() => handleTokenSelect(token)}
                >
                  <img
                    src={token.logo || "/src/images/defaultLogo.svg"}
                    width={24}
                    height={24}
                    alt="token-logo"
                  />
                </div>
              ))}
            </div>
            <TransferBox transferredToken={seletecToken} onClose={handleTransferBoxClose} />
          </div>
        ) : (
          <div className="p-2 flex flex-col dark:border-none dark:bg-zinc-900">
            {isLoading && "token list is fetching..."}
            {!isLoading &&
              tokens?.map((token) => (
                <button
                  key={token.address}
                  className="w-full px-3 py-1 hover:bg-orange-500 flex flex-row items-center justify-between dark:hover:bg-zinc-800"
                  onClick={() => handleTokenSelect(token)}
                >
                  <div className="flex flex-row gap-2 items-center">
                    <img
                      src={token.logo || "/src/images/defaultLogo.svg"}
                      width={24}
                      height={24}
                      alt="token-logo"
                    />
                    {token.name}
                  </div>
                  <div className="flex flex-row gap-2 items-center">
                    <div>{token.balance}</div>
                    <div>{token.symbol}</div>
                  </div>
                </button>
              ))}
          </div>
        )
      }
      </div>
    </div>
  );
};

export default AssetBox;
