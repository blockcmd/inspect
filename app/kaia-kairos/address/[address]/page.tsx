"use client";

import AbiStorage from "@/components/abis-storage";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Page( { params }: { params: { address: string } }) {

  return (
    <div className="flex flex-col gap-12">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Kaia Kairos</h1>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/kaia-kairos">Kaia Kairos</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{params.address}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col gap-8">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">ABI</h2>
        <Button variant="secondary" asChild className="w-fit hover:outline hover:outline-offset-1 hover:outline-2">
          <Link
            href="/my-abi-book"
          >
            Manage my saved ABIs <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
        <AbiStorage address={params.address} />
      </div>
    </div>
  );
}
