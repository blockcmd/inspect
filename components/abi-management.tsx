"use client";

import { useState, useEffect, use } from "react";
import { del, get, set } from "idb-keyval";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trash2 } from "lucide-react";

export default function AbiManagement() {
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
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Saved ABIs
        </h3>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-4">
            {savedABIs.map((abiName, index) => (
              <div key={index}>
                <div className="flex flex-row items-center justify-between gap-4 border-2 border-primary px-4 py-2 w-[400px]">
                  {abiName}
                  <Button size="icon" variant="destructive">
                    <Trash2 />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Textarea
            placeholder="paste in a contract ABI"
            value={abi}
            className="h-96 w-full"
          />
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
