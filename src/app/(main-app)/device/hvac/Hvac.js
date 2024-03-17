import React from "react";

import dynamic from 'next/dynamic'
const FilterCard = dynamic(() => import('./component/FilterCard'), { ssr: false });
export default function HvacModule() {
  return (
    <div className="min-h-screen flex w-full text-enzy-dark dark:text-slate-200">
      <main className="p-4 lg:p-8 flex flex-1 flex-col bg-[#EDF2F8] dark:bg-dark-base">
      <FilterCard/>
      </main>
    </div>
  );
}
