interface TransferBoxProps {
  transferredToken: string
}

const TransferBox = ({ transferredToken }: TransferBoxProps) => {
  return (
    <div className="w-full overflow-hidden animate-grow-right-to-left">
      <div className=" m-4 flex flex-col gap-4 justify-around">
        <div className="flex flex-row justify-between">
          <span>{transferredToken}</span>
          <button>close</button>
        </div>
        <div>
          <div className="funding-outside w-full h-32">
            <div className="funding-inside flex flex-col gap-5 justify-center px-5">
              <div>Funding Wallet</div>
              <div className="flex flex-row justify-between">
                <div>avatar</div>
                <div>12.31234USDT</div>
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
            <input type="text" className="form-input w-[350px] h-10 pr-10 border-orange-500 ring-1 ring-orange-500 rounded-md text-base outline-orange-500 dark:bg-[#1D1D1D] dark:ring-0" placeholder="Amount" />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-gray-500">USD</span>
            </div>
          </div>
          <button className="border rounded-md border-solid border-orange-500 grow dark:bg-[#171717] dark:border-none">All</button>
        </div>
        <button className="w-full h-10 rounded-md bg-orange-500 text-white">Transfer</button>
      </div>
    </div>
  )
}

export default TransferBox