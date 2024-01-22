"use client"

import Image from "next/image";
import { useState } from "react";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="p-4 flex flex-row justify-between items-center border-solid border-b border-orange-500">
      {theme === "light" ? (
        <Image width={110} height={32} src="/images/Logo.svg" alt="logo" />
      ) : (
        <Image width={110} height={32} src="/images/Logo-Dark.svg" alt="logo" />
      )}
      <div className="flex flex-row gap-4 items-center">
        <ThemeSwitcher />
        <ConnectButton showBalance={false}/>
      </div>
    </div>
  )
}

export default Navbar;