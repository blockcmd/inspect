import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Chains } from "./data";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 w-[768px] items-center self-center">
      <div className="flex flex-col gap-4 text-center">
        <h1>BlockCMD Inspect</h1>
        <p>Interact with any contracts on any chains</p>
      </div>
      <div className="flex flex-col gap-4 w-[400px]">
        {Chains.map((chain) => (
          <Link
            key={chain.name}
            className="flex flex-row justify-between items-center border-2 border-primary hover:bg-primary hover:text-secondary p-4 w-full"
            href={chain.symbol}
          >
            <p>{chain.name}</p>
            <ArrowRight />
          </Link>
        ))}
      </div>
    </div>
  );
}
