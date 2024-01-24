import { TokenInterface } from "@/interface"
import { useState } from "react";

interface TransferBoxProps {
  transferredToken: TokenInterface;
  onClose: () => void;
}

const TransferBox = ({ transferredToken, onClose }: TransferBoxProps) => {
  const [ closed, setClosed ] = useState(false);
  const [ allButtonClicked, setAllButtonClicked ] = useState(false);
  const [ fundingValue, setFundingValue ] = useState("");
  const handleClose = () => {
    setClosed(true);
    setTimeout(() =>{
      onClose()
    }, 800);
  };

  const fixDecimalsToSix: (value: string) => string = (value) => {

    //If user input is more than 6 decimal, cutting it to 6 decimal places
    if (value.indexOf('.') !== -1) {

      const parts = value.split('.');
      if(parts[1].length > 6) {
        value = Number(value).toFixed(6).toString();
      }
    }
    return value;
  }

  const handleFundingValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {    

    if(Number(e.target.value) > 50000.123456) {
      // setting to the max when the user input is bigger than that
      setFundingValue("50000.123456");
    } else if (Number(e.target.value) < 0) {
      // when a user inputs a balance below zero, setting to zero
      setFundingValue("0");
    } else {
      setFundingValue(fixDecimalsToSix(e.target.value));
    }
  }

  return (
    <div 
      className={`w-full overflow-hidden ${closed ? " transition-opacity duration-800 ease-in-out" : " animate-grow-right-to-left"}`}
      style={{ opacity: closed ? '0' : '1' }}
    >
      <div className=" m-4 flex flex-col gap-4 justify-around">
        <div className="flex flex-row justify-between">
          <span>{transferredToken.name}</span>
          <button onClick={() => handleClose()}>close</button>
        </div>
        <div>
          <div className="funding-outside w-full h-32">
            <div className="funding-inside flex flex-col gap-5 justify-center px-5">
              <div>Funding Wallet</div>
              <div className="flex flex-row justify-between">
                <img
                  src={transferredToken.logo || "/src/images/defaultLogo.svg"}
                  width={24}
                  height={24}
                  alt="token-logo"
                />
                <div>{`${transferredToken.balance} ${transferredToken.symbol}`}</div>
              </div>
            </div>
          </div>
          <div className="trading-outside w-full h-32">
            <div className="trading-inside flex flex-col gap-5 justify-center px-5">
              <div>Trading Wallet</div>
              <div className="flex flex-row justify-between">
                <div>avatar</div>
                <div>12.31234USDT</div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-row gap-1">
          <div className="relative flex items-center">
            <input 
              type="text" 
              className="form-input w-[350px] h-10 pr-10 border-orange-500 ring-1 ring-orange-500 rounded-md text-base outline-orange-500 dark:bg-[#1D1D1D] dark:ring-0" 
              placeholder="Amount" 
              value={fundingValue}
              onChange={(e) => handleFundingValueChange(e)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-gray-500">USD</span>
            </div>
          </div>
          <button 
            className={`border rounded-md border-solid border-orange-500 grow dark:bg-[#171717] dark:border-none ${allButtonClicked && " bg-[#FF4D04]"}`}
            onClick={() => setAllButtonClicked(true)}
          >
            All
          </button>
        </div>
        <button 
          className="w-full h-10 rounded-md bg-orange-500 text-white"
        >
          Transfer
        </button>
      </div>
    </div>
  )
}

export default TransferBox