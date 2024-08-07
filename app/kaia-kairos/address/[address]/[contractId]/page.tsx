"use client";

import FunctionDashboard from "@/components/function-dashboard";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useParams } from "next/navigation";
import { del, get, set } from "idb-keyval";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ContractEntry } from "@/components/contract-management";


export default function Page( { params }: { params: { address: string, contractId: string } }) {
  const [selectedContract, setSelectedContract] = useState<ContractEntry | null>(null);
  useEffect(() => {
    if (params.contractId === "temporary-abi") {
      get(params.contractId).then((tempAbi) => setSelectedContract(JSON.parse(tempAbi)));
    } else {
      get("saved_contracts").then((savedContracts) => {
        let foundContract = savedContracts.find((contract: ContractEntry) => (contract.id === params.contractId));
        console.log(foundContract);
        setSelectedContract(foundContract || "");
        });
      }
  }, [params.contractId]);

  return (
    <div className="flex flex-col gap-12">
      <ConnectButton />
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Kaia Kairos</h1>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/kaia-kairos">Kaia Kairos</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/kaia-kairos/address/${params.address}`}>{params.address}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{params.contractId}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col gap-8">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Functions</h2>
        {selectedContract && <FunctionDashboard contract={selectedContract} />}
      </div>
    </div>
  );
}
