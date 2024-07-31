import Link from "next/link"
import { ArrowRight } from 'lucide-react';

export default function Home() {

  return (
    <div className="flex flex-col gap-12 w-[768px] items-center self-center">
      <div className="flex flex-col gap-4 text-center">  
        <h1>BlockCMD Inspect</h1>
        <p>Interact with any contracts</p>
      </div>

      <Link className="flex flex-row justify-between items-center border-2 border-primary hover:bg-primary hover:text-secondary p-4 w-full" href="/kaia">
        <p>
          Kaia
        </p>
        <ArrowRight />
      </Link>
    </div>
  );
}
