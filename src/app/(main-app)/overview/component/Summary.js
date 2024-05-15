"use client";
import React, { useEffect, useState ,useRef} from "react";
import {
  getSummary
  } from "@/utils/api";

export default function Summary({FloorId}) {
    const [externalList, setExteranlList] = useState([]);
    useEffect(() => {
        if (FloorId != 0) {
            GetExternalList(FloorId);
        }
      }, [FloorId]);
    
    const GetExternalList = async (floorId) => {
        console.log(floorId)
        const result = await getSummary(floorId);
        console.log(result.data)
        setExteranlList(result.data);
      };
  return (
    <div className="flex flex-row gap-5 mt-5 ">
    {externalList.map((item) => { 
    return (
    <div key={item.id} className="rounded-xl bg-white p-2 shadow-lg dark:border-slate-800 dark:bg-dark-box dark:text-slate-200 ">
      <div className="px-8 py-8 flex items-center gap-3"> 
      <span className="text-lg">{item.name} :</span>
      <span className="font-bold text-3xl">{item.value}</span>
      <span className="font-normal text-3xl">{item.unit}</span>
      
    </div>
    </div>
     )
    })}
    </div>
  )
}
