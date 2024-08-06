"use client";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export type ContractEntry = {
  id: string
  name: string
  network: string | undefined
  address: string
};

function truncateTextInMiddle(text: string) {
  if (text.length > 10) {
    return text.slice(0, 5) + "..." + text.slice(-5);
  }
  return text;
}

const columns: ColumnDef<ContractEntry>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return (
        <p>
          {truncateTextInMiddle(row.original.id)}
        </p>
      );
    }
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "network",
    header: "Network",
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => {
      const entry = row.original;
      return (
        <a
          className="underline underline-offset-2 text-blue-500"
          target="_blank"
          href={`https://klaytnfinder.io/address/${entry.address}`}
        >
          {entry.address}
        </a>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <Button asChild>
          <Link
            href={`/${row.getValue("network")}/address/${row.getValue(
              "address"
            )}/${row.getValue("id")}`}
          >
            Go <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      );
    },
  },
];

export default function MyContractBookTable({
  savedContracts,
}: {
  savedContracts: ContractEntry[];
}) {
  return <DataTable columns={columns} data={savedContracts} />;
}
