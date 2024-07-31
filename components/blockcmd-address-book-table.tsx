"use client"
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react";
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type AddressBookEntry = {
  id: number
  name: string
  symbol: string
  network: string
  address: string
}
 
const columns: ColumnDef<AddressBookEntry>[] = [
  {
    accessorKey: "id",
    header: "Name",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "symbol",
    header: "Symbol",
  },
  {
    accessorKey: "network",
    header: "Network",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const entry = row.original

      return (
        <Button asChild>
          <Link href={`/${row.getValue("network")}/address/${row.getValue("address")}`}>Go <ArrowRight className="ml-2 w-4 h-4" /></Link>
        </Button>
      )
    }
  },
]

export default function BlockcmdAddressBookTable( { blockcmdAddressBook }: { blockcmdAddressBook: AddressBookEntry[] }) {
  return (
    <DataTable columns={columns} data={blockcmdAddressBook} />
  );
}