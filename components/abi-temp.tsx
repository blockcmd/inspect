"use client";

import { useState, useEffect, use } from "react";
import { del, get, set } from "idb-keyval";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'

export default function AbiTemp({ address }: { address: string }) {
  const router = useRouter();
  const [abi, setAbi] = useState("");

  function handleInputABIChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setAbi(e.target.value);
  }

  function saveAbiAndGo() {
    set("temporary-abi", abi);
    router.push(`${address}/temporary-abi`);
  }

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">New ABI</h3>
        <Textarea
          placeholder="paste in a contract ABI"
          value={abi}
          onChange={handleInputABIChange}
          className="h-96 w-full"
        />
        <Button className="w-fit" onClick={saveAbiAndGo}>
          Save ABI and Go
        </Button>
      </div>
    </div>
  );
}
