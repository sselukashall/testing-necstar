import { switchThemeDuration } from "@/constants";
import NetworkList from "@/components/NetworkList";

export default function Home() {
  return (
    <div className="max-w-lg m-auto h-screen">
      <div className="flex flex-col justify-start gap-10">
        <div></div>
        <NetworkList />
      </div>
    </div>
  );
}