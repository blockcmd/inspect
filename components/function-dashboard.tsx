"use client"

import FunctionAction from "./function-action"
import FunctionList from "./function-list"
import { ContractEntry } from "@/components/contract-management";


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