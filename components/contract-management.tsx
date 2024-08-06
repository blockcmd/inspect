"use client";

import { useState, useEffect, use } from "react";
import { del, get, set } from "idb-keyval";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { createId } from '@paralleldrive/cuid2';

type AbiEntry = {
  id: string;
  name: string;
  abi: string;
};

export default function ContractManagement() {
  const searchParams = useSearchParams();
  const [abi, setAbi] = useState("");
  const [abiName, setAbiName] = useState("");
  const [savedABIs, setSavedABIs] = useState<AbiEntry[]>([]);


  useEffect(() => {
    {
      get("saved_abis").then((savedABIs: AbiEntry[]) => {
        setSavedABIs(savedABIs || []);
      });
    }
  }, [savedABIs]);


  function handleInputABIChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setAbi(e.target.value);
  }

  function handleInputABINameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAbiName(e.target.value);
  }

  function saveABI() {
    get("saved_abis").then((savedABIs: AbiEntry[]) => {
      let newSavedABIsList = savedABIs || [];
      let abiEntry: AbiEntry = {
        id: createId(),
        name: abiName,
        abi: abi
      };
      newSavedABIsList.push(abiEntry);
      set("saved_abis", newSavedABIsList);
    });
  }

  function prettifyAndSaveABI() {
    get("saved_abis").then((savedABIs: AbiEntry[]) => {
      let newSavedABIsList = savedABIs || [];
      if (newSavedABIsList && newSavedABIsList.length > 0 && searchParams.get("abiID")) {
        let currentAbiEntryindex: number = newSavedABIsList.findIndex((abiEntry: AbiEntry) => abiEntry.id === searchParams.get("abiID"));
        newSavedABIsList[currentAbiEntryindex].abi = JSON.stringify(JSON.parse(savedABIs.find((abiEntry: AbiEntry) => abiEntry.id === searchParams.get("abiID"))?.abi || ""), null, 2);
        set("saved_abis", newSavedABIsList);
      }
    });
  }

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Saved ABIs
        </h3>
        <div className="flex flex-row gap-4">
          {
            savedABIs && savedABIs.length > 0 ? (
              <div className="flex flex-col gap-4">
                {savedABIs.map((savedAbi) => (
                  <Link href={`?abiID=${savedAbi.id}&abiName=${savedAbi.name}`} key={savedAbi.id}>
                    <div className="flex flex-row items-center justify-between gap-4 border-2 border-primary px-4 py-2 w-[400px]">
                      {savedAbi.name}
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
            )
          }
          <div className="flex flex-col gap-4 w-full">
            <Button variant="secondary" className="w-fit" onClick={prettifyAndSaveABI}>Prettify & Save</Button>
            <Textarea
              placeholder="paste in a contract ABI"
              value={savedABIs.find((abiEntry: AbiEntry) => abiEntry.id === searchParams.get("abiID"))?.abi || ""}
              className="h-96 w-full"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          New ABI
        </h3>
        <Input
          placeholder="set abi name"
          value={abiName}
          onChange={handleInputABINameChange}
        />
        <Textarea
          placeholder="paste in a contract ABI"
          value={abi}
          onChange={handleInputABIChange}
          className="h-96 w-full"
        />
        <Button className="w-fit" onClick={saveABI}>
          Save ABI
        </Button>
      </div>
    </div>
  );
}
