"use client";

import { Chain } from "@rainbow-me/rainbowkit";
import { useEffect, useMemo, useState } from "react";
import { useNetwork, useSwitchNetwork, useAccount } from "wagmi";

const NetworkList = () => {
  const { isConnected } = useAccount();
  const { chains, switchNetwork } = useSwitchNetwork();
  const { chain } = useNetwork();

  return (
    <div>
      <select
        value={chain?.id}
        onChange={(e) => {
          switchNetwork?.(Number(e.target.value));
        }}
        className="w-48 text-xs/[14] p-2 rounded-md focus:outline-none tracking-wide border border-solid border-orange-500 dark:border-none dark:bg-zinc-900"
      >
        {isConnected ? (
          <>
            {chains.map((chain) => (
              <option value={chain.id} key={chain.id}>
                {chain.name}
              </option>
            ))}
          </>
        ) : (
          <option value="">Select Network</option>
        )}
      </select>
    </div>
  );
};

export default NetworkList;
