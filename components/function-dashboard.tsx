"use client"

import FunctionAction from "./function-action"
import FunctionList from "./function-list"

type ContractEntry = {
  id: string;
  name: string;
  abi: string;
  network: string | undefined;
  address: string;
};

export default function FunctionDashboard({ contract }: { contract: ContractEntry | null }) {
  
  if (!contract) {
    return null
  }
  const functionObjects = JSON.parse(contract?.abi).filter((functionObject: any) => functionObject.type === 'function')

  return (
    <div className="flex flex-row gap-4">
      <FunctionList functionObjects={functionObjects} />
      <FunctionAction functionObjects={functionObjects} contract={contract} />
    </div>
  )
}