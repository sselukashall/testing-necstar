import { switchThemeDuration } from "@/constants";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h1
        className={`font-extrabold text-8xl text-slate-900 dark:text-slate-50 ${switchThemeDuration}`}
      >
        DARK MODE
        </h1>
    </div>
  );
}