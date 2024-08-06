export type AddressBookEntry = {
  id: number
  name: string
  abi: string
  network: string
  address: string
}

export const blockcmdAddressBook: AddressBookEntry[] = [
  {
    id: 1,
    name: "Wrapped KLAY",
    abi: "wklay",
    network: "kaia-kairos",
    address: "0x043c471bEe060e00A56CcD02c0Ca286808a5A436"
  },
  {
    id: 2,
    name: "Wrapped KLAY",
    abi: "wklay",
    network: "kaia",
    address: "0x19Aac5f612f524B754CA7e7c41cbFa2E981A4432"
  },
]