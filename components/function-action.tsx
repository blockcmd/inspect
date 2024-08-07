"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Check } from "lucide-react";

export default function FunctionAction({
  functionObjects,
  contract
}: {
  functionObjects: any;
  contract: any;
}) {
  const searchParams = useSearchParams();
  const functionName = searchParams.get("functionName");
  const functionIndex = searchParams.get("functionIndex");
  const contractAddress = contract.address;
  const contractAbi = JSON.parse(contract.abi);
  const [abi, setAbi] = useState<any>([]);
  const [result, setResult] = useState<any>("n/a");
  const [args, setArgs] = useState<any>([]);

  useEffect(() => {
    setArgs([]);
  }, [functionName]);

  // useContractRead hook to read data from the contract
  const {
    data: readData,
    isError: readError,
    isPending: readPending,
    isSuccess: readSuccess,
  } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: contractAbi,
    functionName: functionName,
    args: args,
  });

  // useContractWrite hook to write data to the contract
  const {
    data: writeData,
    isPending: writePending,
    writeContract,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: writeData,
    });

  function clearData() {
    setArgs([]);
  }

  function truncateAddress(address: string) {
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  }

  // this function allows arguments to be added to the args state
  function handleArgsChange(e: any, index: number) {
    // create a copy of the inputs state
    const argsList = [...args];
    // update the list with the new value
    argsList[index] = e.target.value;
    // update the state with the new list
    setArgs(argsList);
  }

  return (
    <div className="w-full border-2 border-primary p-4">
      {
        // show the functionObject at the functionIndex
        functionName ? (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <h3
                id={functionName}
                className="scroll-m-20 text-2xl font-semibold tracking-tight"
              >
                {functionName}
              </h3>
              <Separator />
              <h3>Inputs:</h3>
              {functionObjects[Number(functionIndex)].stateMutability ===
                "view" &&
              functionObjects[Number(functionIndex)].inputs.length == 0 ? (
                <div className="flex flex-col gap-4">
                  <p>No inputs required</p>
                </div>
              ) : functionObjects[Number(functionIndex)].stateMutability ===
                  "view" &&
                functionObjects[Number(functionIndex)].inputs.length !== 0 ? (
                <div className="flex flex-col gap-4">
                  {functionObjects[Number(functionIndex)].inputs.map(
                    (input: any, index: number) => (
                      <div
                        key={index}
                        className="flex flex-col gap-2 items-start"
                      >
                        <Label className="font-mono w-fit" htmlFor={input.name}>
                          {input.name}
                        </Label>
                        <Input
                          type="text"
                          id={input.name}
                          name={input.name}
                          placeholder={input.type}
                          className="border-2 p-2 rounded-md w-full"
                          onChange={(e: any) => handleArgsChange(e, index)}
                        />
                      </div>
                    )
                  )}
                  <Button className="w-fit font-mono">Read</Button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {functionObjects[Number(functionIndex)].inputs.map(
                    (input: any, index: number) => (
                      <div
                        key={index}
                        className="flex flex-col gap-2 items-start"
                      >
                        <Label className="font-mono" htmlFor={input.name}>
                          {input.name}
                        </Label>
                        <Input
                          type="text"
                          id={input.name}
                          name={input.name}
                          placeholder={input.type}
                          className="border-2 p-2 rounded-md w-full"
                          onChange={(e) => handleArgsChange(e, index)}
                        />
                      </div>
                    )
                  )}
                  <Button
                    disabled={writePending}
                    onClick={() =>
                      writeContract({
                        address: contractAddress as `0x${string}`,
                        abi: contractAbi,
                        functionName: functionName,
                        args: args,
                      })
                    }
                    className="w-fit font-mono"
                  >
                    Write
                  </Button>
                  <h3 className="scroll-m-20 text-lg font-semibold tracking-tight">
                    Transaction status
                  </h3>
                  {writeData ? (
                    <div className="flex flex-row gap-2">
                      Hash:
                      <a
                        target="_blank"
                        className="text-blue-500 underline"
                        href={`https://baobab.klaytnfinder.io/tx/${writeData}`}
                      >
                        {truncateAddress(writeData)}
                      </a>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-row gap-2">
                        Hash: no transaction hash until after submission
                      </div>
                      <Badge variant="outline" className="w-fit">
                        No transaction yet
                      </Badge>
                    </>
                  )}
                  {isConfirming && (
                    <Badge variant="secondary" className="w-fit">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Waiting for confirmation...
                    </Badge>
                  )}
                  {isConfirmed && (
                    <Badge className="flex flex-row items-center bg-green-500 cursor-pointer w-fit">
                      <Check className="mr-2 h-4 w-4" />
                      Transaction confirmed!
                    </Badge>
                  )}
                </div>
              )}
              <Separator />
              <h3>Outputs:</h3>
              {functionObjects[Number(functionIndex)].stateMutability ===
              "view" ? (
                readPending ? (
                  <Skeleton className="h-4 w-[100px]" />
                ) : (
                  <div className="flex flex-row gap-2 items-center">
                    <Badge className="h-fit w-fit font-mono">
                      {functionObjects[Number(functionIndex)]?.outputs?.[0]
                        ?.type ?? "n/a"}
                    </Badge>
                    <Separator orientation="vertical" />
                    <p className="border-2 p-2 rounded-md w-full">
                      {readData?.toString() ?? "n/a"}
                    </p>
                  </div>
                )
              ) : writePending ? (
                <div className="flex flex-row gap-2">
                  <Skeleton className="h-4 w-[70px]" />
                  <p>
                    Please confirm the transaction with your connected wallet
                  </p>
                </div>
              ) : (
                <div className="flex flex-row gap-2 items-center">
                  <Badge className="h-fit w-fit font-mono">hash</Badge>
                  <Separator orientation="vertical" />
                  <p className="border-2 p-2 rounded-md w-full">{result}</p>
                </div>
              )}
              <Button onClick={clearData} className="w-fit font-mono">
                Clear
              </Button>
            </div>
          </div>
        ) : (
          <h3 className="scroll-m-20 text-md font-semibold tracking-tight">
            No function selected
          </h3>
        )
      }
    </div>
  );
}
