"use client";

import { Input } from "./ui/input";
import { useState, useEffect, use } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { del, get, set } from "idb-keyval";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ContractAddress() {
  const searchParams = useSearchParams();
  const abiName = searchParams.get("abiName");
  const [contractAddress, setContractAddress] = useState(
    "0x000000000000000000000000000000000000dEaD"
  );
  const [contractAddressName, setContractAddressName] = useState("");
  const [savedContractAddresses, setSavedContractAddresses] = useState<
    string[]
  >([]);
  useEffect(() => {
    {
      get("saved_contract_addresses_list").then(
        (savedContractAddresses: string[]) => {
          setSavedContractAddresses(savedContractAddresses || []);
        }
      );
    }
  }, [savedContractAddresses]);

  useEffect(() => {
    get(contractAddressName).then((val) => setContractAddress(val));
  }, [contractAddressName, searchParams]);

  function handleInputContractAddressChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setContractAddress(e.target.value);
  }

  function handleInputContractAddressNameChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setContractAddressName(e.target.value);
  }

  function saveContractAddress() {
    get("saved_contract_addresses_list").then(
      (savedContractAddresses: string[]) => {
        var savedContractAddressesList = savedContractAddresses || [];
        savedContractAddressesList.push(
          `${contractAddressName}=${contractAddress}`
        );
        set("saved_contract_addresses_list", savedContractAddressesList);
      }
    );
  }
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Saved contract addresses
        </h3>
        <div className="flex flex-wrap gap-4">
          {savedContractAddresses.map((savedContractAddress, index) => (
            <Link
              scroll={false}
              key={index}
              href={`?abiName=${abiName}&contractAddressName=${
                savedContractAddress.split("=")[0]
              }&contractAddress=${savedContractAddress.split("=")[1]}`}
            >
              <div className="flex flex-col border-2 border-primary hover:bg-primary hover:text-secondary px-4 py-2 w-fit">
                {savedContractAddress.split("=")[0]}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          New contract address
        </h3>
        <Input
          placeholder="set contract address"
          value={contractAddress}
          onChange={handleInputContractAddressChange}
        />
        <Input
          placeholder="set contract address name"
          value={contractAddressName}
          onChange={handleInputContractAddressNameChange}
        />
        <Button className="w-fit" onClick={saveContractAddress}>
          Save contract address
        </Button>
      </div>
    </div>
  );
}
