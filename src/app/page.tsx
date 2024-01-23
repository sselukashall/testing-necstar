import { switchThemeDuration } from "@/constants";
import NetworkList from "@/components/NetworkList";
import AssetBox from "@/components/AssetBox";

export default function Home() {
  return (
    <div className="max-w-lg m-auto h-screen">
      <div className="flex flex-col justify-start gap-10">
        <div></div>
        <NetworkList />
        <AssetBox />
      </div>
    </div>
  );
}