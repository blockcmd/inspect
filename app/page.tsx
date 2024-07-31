import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Chains } from "./data";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 w-[768px] items-center self-center">
      <div className="flex flex-row gap-4 items-center">
        <Image
          src="/blockcmd-logo.svg"
          alt="BlockCMD Logo"
          width={1200}
          height={250}
          className="w-[300px] h-[62.5px]"
        />
        <h1 className="font-bold text-5xl">/ Inspect</h1>
      </div>
      <p className="text-xl">Interact with any contracts on any chains</p>
      <div className="flex flex-col gap-12 w-[400px]">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
          My setup
        </h2>
        <div className="flex flex-col gap-4">
          <Button
            variant="secondary"
            asChild
            className="w-full hover:outline hover:outline-offset-1 hover:outline-2"
          >
            <Link
              href="/my-address-book"
              className="flex flex-row items-center justify-between"
            >
              My address book <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button
            variant="secondary"
            asChild
            className="w-full hover:outline hover:outline-offset-1 hover:outline-2"
          >
            <Link
              href="/my-address-book"
              className="flex flex-row items-center justify-between"
            >
              My saved ABIs <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
          Utilities
        </h2>
        <div className="flex flex-col gap-4">
          <Button
            variant="secondary"
            asChild
            className="w-full hover:outline hover:outline-offset-1 hover:outline-2"
          >
            <Link
              href="/blockcmd-address-book"
              className="flex flex-row items-center justify-between"
            >
              BlockCMD address book <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button
            variant="secondary"
            asChild
            className="w-full hover:outline hover:outline-offset-1 hover:outline-2"
          >
            <Link
              href="/blockcmd-address-book"
              className="flex flex-row items-center justify-between"
            >
              Transformer <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
          Inspect chain
        </h2>
        <div className="flex flex-col gap-4">
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
    </div>
  );
}
