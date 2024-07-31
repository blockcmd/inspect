"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { getAddress } from 'viem'

export default function Page() {
  const [contractAddress, setContractAddress] = useState("");

  function handleInputContractAddressChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setContractAddress(e.target.value);
  }

  return (
    <div className="flex flex-col gap-12">
      <ConnectButton />
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Kaia
      </h1>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Kaia</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col gap-8">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Contract address
        </h2>
        <Input
          placeholder="set contract address"
          value={contractAddress}
          onChange={handleInputContractAddressChange}
        />
        <Button asChild className="w-fit">
          <Link href={`/kaia/address/${contractAddress ? getAddress(contractAddress) : ""}`}>
            Proceed
          </Link>
        </Button>
      </div>
    </div>
  );
}
