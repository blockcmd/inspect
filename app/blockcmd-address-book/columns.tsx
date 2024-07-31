"use client"
 
import { ColumnDef } from "@tanstack/react-table"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AddressBookEntry = {
  id: number
  name: string
  symbol: string
  network: string
  address: string
}
 
export const columns: ColumnDef<AddressBookEntry>[] = [
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
]