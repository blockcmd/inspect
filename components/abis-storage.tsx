"use client";

import { useState, useEffect, use } from "react";
import { del, get, set } from "idb-keyval";
import Link from "next/link";

export default function AbiStorage({ address }: { address: string }) {
  const [abi, setAbi] = useState("");
  const [abiName, setAbiName] = useState("");
  const [savedABIs, setSavedABIs] = useState<string[]>([]);
  useEffect(() => {
    {
      get("saved_abis_list").then((savedABIs: string[]) => {
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
    get("saved_abis_list").then((savedABIs: string[]) => {
      var savedABIsList = savedABIs || [];
      savedABIsList.push(abiName);
      set("saved_abis_list", savedABIsList);
      set(abiName, abi);
    });
  }

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Saved ABIs</h3>
        <div className="flex flex-wrap gap-4">
          {savedABIs.map((abiName, index) => (
            <Link scroll={false} key={index} href={`${address}/${abiName}`}>
              <div className="flex flex-col border-2 border-primary hover:bg-primary hover:text-secondary px-4 py-2 w-fit">
                {abiName}
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* <div className="flex flex-col gap-4">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">New ABI</h3>
        <Textarea
          placeholder="paste in a contract ABI"
          value={abi}
          onChange={handleInputABIChange}
          className="h-96 w-full"
        />
        <Input
          placeholder="set abi name"
          value={abiName}
          onChange={handleInputABINameChange}
        />
        <Button className="w-fit" onClick={saveABI}>
          Save ABI
        </Button>
      </div> */}
    </div>
  );
}
