"use client";

import { useState, useEffect } from "react";
import { get, set } from "idb-keyval";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Trash2, Pencil, WandSparkles, Save, Eraser } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { createId } from "@paralleldrive/cuid2";

type ContractEntry = {
  id: string;
  name: string;
  abi: string;
  network: string | undefined;
  address: string;
};

export default function ContractManagement() {
  const searchParams = useSearchParams();
  const [abi, setAbi] = useState("");
  const [abiName, setAbiName] = useState("");
  const [address, setAddress] = useState("");
  const [network, setNetwork] = useState<string | undefined>(undefined);
  const [selectKey, setSelectKey] = useState(createId());
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

  function handleInputNetworkChange(value: string) {
    setNetwork(value);
  }

  function saveContract() {
    get("saved_contracts").then((savedContracts: ContractEntry[]) => {
      let newSavedABIsList = savedContracts || [];
      let contractEntry: ContractEntry = {
        id: createId(),
        name: abiName,
        abi: abi,
        network: network || undefined,
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

  function deleteContract() {
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
        newSavedABIsList.splice(currentAbiEntryindex, 1);
        set("saved_contracts", newSavedABIsList);
      }
    });
  }

  function clearNewContractForm() {
    setAbi("");
    setAbiName("");
    setAddress("");
    setNetwork(undefined);
    setSelectKey(createId());
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
                  <div className="flex flex-col gap-4 border-2 border-primary px-4 py-2 w-[400px]">
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
            <div className="flex flex-row items-center justify-between gap-4">
              <div className="flex flex-row gap-4">
                <Button
                  variant="outline"
                  className="w-fit"
                  onClick={prettifyAndSaveABI}
                >
                  <WandSparkles className="mr-2 h-4 w-4" />
                  Prettify & Save
                </Button>
                <Button variant="secondary" disabled>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </div>
              <Button
                variant="destructive"
                className="w-fit"
                onClick={deleteContract}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
            <Label htmlFor="readOnlyNetwork">Network</Label>
            <Input
              id="readOnlyNetwork"
              type="text"
              placeholder="select contract to show network"
              value={
                savedContracts.find(
                  (abiEntry: ContractEntry) =>
                    abiEntry.id === searchParams.get("contractId")
                )?.network || ""
              }
              readOnly
            />
            <Label htmlFor="readOnlyContractAddress">Address</Label>
            <Input
              id="readOnlyContractAddress"
              type="text"
              placeholder="select contract to show network"
              value={
                savedContracts.find(
                  (abiEntry: ContractEntry) =>
                    abiEntry.id === searchParams.get("contractId")
                )?.address || ""
              }
              readOnly
            />
            <Label>ABI</Label>
            <Textarea
              placeholder="select contract to show ABI"
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
        <Label htmlFor="abiName">ABI name</Label>
        <Input
          type="text"
          id="abiName"
          placeholder="set abi name"
          value={abiName}
          onChange={handleInputABINameChange}
        />
        <Label htmlFor="contractAddress">Contract address</Label>
        <Input
          type="text"
          id="contractAddress"
          placeholder="set contract address"
          value={address}
          onChange={handleInputAddressChange}
        />
        <Label>Network</Label>
        <Select key={selectKey} value={network} onValueChange={handleInputNetworkChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a network" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Network</SelectLabel>
              <SelectItem value="kaia">Kaia</SelectItem>
              <SelectItem value="kaia-kairos">Kaia Kairos</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Label>Contract ABI</Label>
        <Textarea
          placeholder="paste in a contract ABI"
          value={abi}
          onChange={handleInputABIChange}
          className="h-96 w-full"
        />
        <div className="flex flex-row justify-between">
          <Button className="w-fit" onClick={saveContract}>
            <Save className="mr-2 h-4 w-4" />
            Save contract
          </Button>
          <Button variant="destructive" className="w-fit" onClick={clearNewContractForm}>
            <Eraser className="mr-2 h-4 w-4" />
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
}
