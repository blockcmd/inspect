"use client";

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
import { getAddress } from "viem";
import { ArrowRight } from "lucide-react";
import BlockcmdAddressBookTable from "@/components/blockcmd-address-book-table";
import { blockcmdAddressBook, AddressBookEntry } from "@/components/blockcmd-address-book";

export default function Page() {
  const [contractAddress, setContractAddress] = useState("");

  function filterAddressBookForKaia(blockcmdAddressBook: AddressBookEntry[]) {
    return blockcmdAddressBook.filter((entry) => entry.network === "kaia-kairos");
  }

  function handleInputContractAddressChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setContractAddress(e.target.value);
  }

  return (
    <div className="flex flex-col gap-12">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Kaia Kairos
      </h1>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Kaia Kairos</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col gap-4">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
          Enter contract address
        </h2>
        <Input
          className="border-2 border-primary rounded-none mt-4"
          placeholder="0x..."
          value={contractAddress}
          onChange={handleInputContractAddressChange}
        />
        <Button asChild className="w-fit">
          <Link
            href={`/kaia-kairos/address/${
              contractAddress ? getAddress(contractAddress) : ""
            }`}
          >
            Go <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </div>
      <p>or</p>
      <div className="flex flex-col gap-4">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
          Select from your contract book
        </h2>
        <Button variant="secondary" asChild className="w-fit hover:outline hover:outline-offset-1 hover:outline-2">
          <Link
            href="/my-contract-book"
          >
            Manage my contract book <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </div>
      <p>or</p>
      <div className="flex flex-col gap-4">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
          Select from BlockCMD address book
        </h2>
        <Button variant="secondary" asChild className="w-fit hover:outline hover:outline-offset-1 hover:outline-2">
          <Link
            href="/blockcmd-address-book"
          >
            See full BlockCMD address book <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
        <BlockcmdAddressBookTable blockcmdAddressBook={filterAddressBookForKaia(blockcmdAddressBook)} />
      </div>
    </div>
  );
}
