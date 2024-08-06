"use client";

import { useState, useEffect } from "react";
import { del, get, set } from "idb-keyval";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { createId } from "@paralleldrive/cuid2";

type ContractEntry = {
  id: string;
  name: string;
  abi: string;
  address: string;
};

export default function ContractManagement() {
  const searchParams = useSearchParams();
  const [abi, setAbi] = useState("");
  const [abiName, setAbiName] = useState("");
  const [address, setAddress] = useState("");
  const [savedContracts, setSavedContracts] = useState<ContractEntry[]>([]);

  useEffect(() => {
    {
      get("saved_contracts").then((savedContracts: ContractEntry[]) => {
        setSavedContracts(savedContracts || []);
      });
    }
  }, [savedContracts]);

  function handleInputABIChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setAbi(e.target.value);
  }

  function handleInputABINameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAbiName(e.target.value);
  }

  function handleInputAddressChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAddress(e.target.value);
  }

  function saveContract() {
    get("saved_contracts").then((savedContracts: ContractEntry[]) => {
      let newSavedABIsList = savedContracts || [];
      let contractEntry: ContractEntry = {
        id: createId(),
        name: abiName,
        abi: abi,
        address: address,
      };
      newSavedABIsList.push(contractEntry);
      set("saved_contracts", newSavedABIsList);
    });
  }

  function prettifyAndSaveABI() {
    get("saved_contracts").then((savedContracts: ContractEntry[]) => {
      let newSavedABIsList = savedContracts || [];
      if (
        newSavedABIsList &&
        newSavedABIsList.length > 0 &&
        searchParams.get("contractId")
      ) {
        let currentAbiEntryindex: number = newSavedABIsList.findIndex(
          (contractEntry: ContractEntry) =>
            contractEntry.id === searchParams.get("contractId")
        );
        newSavedABIsList[currentAbiEntryindex].abi = JSON.stringify(
          JSON.parse(
            savedContracts.find(
              (contractEntry: ContractEntry) =>
                contractEntry.id === searchParams.get("contractId")
            )?.abi || ""
          ),
          null,
          2
        );
        set("saved_contracts", newSavedABIsList);
      }
    });
  }

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Saved contracts
        </h3>
        <div className="flex flex-row gap-4">
          {savedContracts && savedContracts.length > 0 ? (
            <div className="flex flex-col gap-4">
              {savedContracts.map((savedContract) => (
                <Link
                  href={`?contractId=${savedContract.id}&contractName=${savedContract.name}`}
                  key={savedContract.id}
                >
                  <div className="flex flex-row items-center justify-between gap-4 border-2 border-primary px-4 py-2 w-[400px]">
                    {savedContract.name}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div>
              <div className="flex flex-row items-center justify-between gap-4 border-2 border-primary px-4 py-2 w-[400px]">
                No saved ABIs
              </div>
            </div>
          )}
          <div className="flex flex-col gap-4 w-full">
            <Button
              variant="secondary"
              className="w-fit"
              onClick={prettifyAndSaveABI}
            >
              Prettify & Save
            </Button>
            <Textarea
              placeholder="paste in a contract ABI"
              value={
                savedContracts.find(
                  (abiEntry: ContractEntry) =>
                    abiEntry.id === searchParams.get("contractId")
                )?.abi || ""
              }
              className="h-96 w-full"
              readOnly
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          New contract
        </h3>
        <Input
          placeholder="set abi name"
          value={abiName}
          onChange={handleInputABINameChange}
        />
        <Input
          placeholder="set contract address"
          value={address}
          onChange={handleInputAddressChange}
        />
        <Textarea
          placeholder="paste in a contract ABI"
          value={abi}
          onChange={handleInputABIChange}
          className="h-96 w-full"
        />
        <Button className="w-fit" onClick={saveContract}>
          Save contract
        </Button>
      </div>
    </div>
  );
}
