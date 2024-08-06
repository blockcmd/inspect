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

export default function AbiManagement() {
  const searchParams = useSearchParams();
  const [savedAbi, setSavedAbi] = useState("");
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

  useEffect(() => {
    {
      if (searchParams.get("abiID")) {
        get(searchParams.get("abiID") || "").then((val) => setSavedAbi(val));
      }
    }
  }, [searchParams]);

  function handleInputABIChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setAbi(e.target.value);
  }

  function handleInputABINameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setAbiName(e.target.value);
  }

  function saveABI() {
    get("saved_abis").then((savedABIs: AbiEntry[]) => {
      let savedABIsList = savedABIs || [];
      let abiEntry: AbiEntry = {
        id: createId(),
        name: abiName,
        abi: abi
      };
      savedABIsList.push(abiEntry);
      set("saved_abis", savedABIsList);
    });
  }

  function prettifyABI() {
    setSavedAbi(JSON.stringify(JSON.parse(savedAbi), null, 2));
  }

  function prettifyAndSaveABI() {
    set(searchParams.get("abi") || "", JSON.stringify(JSON.parse(savedAbi), null, 2));
    setSavedAbi(JSON.stringify(JSON.parse(savedAbi), null, 2));
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
            <div className="flex flex-row gap-2">
              <Button className="w-fit" onClick={prettifyABI}>Prettify</Button>
              <Button className="w-fit" onClick={prettifyAndSaveABI}>Prettify & Save</Button>
            </div>
            <Textarea
              placeholder="paste in a contract ABI"
              value={savedAbi}
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
