"use client";
import React, { useEffect, useState, useRef } from "react";
import { getSummary } from "@/utils/api";
import GaugeChart from "react-gauge-chart";

export default function Summary({ FloorId }) {
  const [summaryList1, setSummaryList1] = useState([]);
  const [summaryList2, setSummaryList2] = useState([]);
  const [summaryList3, setSummaryList3] = useState([]);
  useEffect(() => {
    if (FloorId != 0) {
      GetExternalList(FloorId);
    }
  }, [FloorId]);

  const GetExternalList = async (floorId) => {
    console.log(floorId);
    const result = await getSummary(floorId);
    console.log(result.data[0]);
    console.log(result.data[1]);
    console.log(result.data[2]);
    setSummaryList1([result.data[0]]);
    setSummaryList2([result.data[1]]);
    setSummaryList3([result.data[2]]);
  };
  return (
    <div className="flex flex-row justify-center gap-5 mt-5 ">
      <div className="w-52 flex-nowrap rounded-xl items-center justify-center bg-white p-2 shadow-lg dark:border-slate-800 dark:bg-dark-box dark:text-slate-200 ">
        <div className="px-5 py-5 flex flex-col justify-center items-center gap-2">
          {summaryList1.length > 0 && summaryList1.map((item) => {
            return (
              <>
              <span key={item.id} className="font-bold text-2xl">{item.name}</span>
              {item.value != null ? 
              <>
              <GaugeChart
                  nrOfLevels={3}
                  animate
                  colors={["red", "yellow", "green"]}
                  arcWidth={0.3}
                  percent={
                    item.value == "Low"
                      ? 0.15
                      : item.value == "Medium"
                      ? 0.5
                      : 0.85
                  }
                  textColor={"black"}
                  hideText={true} 
                  
                  // hideText={true} // If you want to hide the text
                />
                <span key={item.id} className="font-bold text-2xl">{item.value}</span></> : "-"}
                
              </>
            );
          })}
          <span className="font-normal text-xl">Efficiency</span>
        </div>
      </div>

      <div className="w-auto flex items-center justify-center rounded-xl bg-white p-2 shadow-lg dark:border-slate-800 dark:bg-dark-box dark:text-slate-200 ">
      <div className="px-5 py-5 flex flex-col justify-center items-center gap-3">
      {summaryList2.map((item) => {
        return (
          <>
          <span key={item.id} className="font-bold text-2xl">{item.name}</span>
            {item.value != null ? 
            <div >
              
              <span key={item.id} className="font-bold text-2xl">{item.value}</span>
              
            </div> : "-"}
            </> 
            
        );
      })}
      <span className="font-normal text-xl">kW</span>
      </div>
          </div>

          <div
            
            className="w-auto flex items-center justify-center rounded-xl bg-white p-2 shadow-lg dark:border-slate-800 dark:bg-dark-box dark:text-slate-200 "
          >
            <div className="px-5 py-5 flex flex-col items-center gap-2">
      {summaryList3.map((item) => {
        return (
          <>
          <span key={item.id} className="font-bold text-2xl">{item.name}</span>
          {item.value != null ?
          <><span key={item.id} className="font-bold text-2xl">{item.value}</span></> : "-"}
          
          
          </>
              
           
        );
      })}
      <span className="font-normal text-xl">baht/Month VS Baseline</span>
       </div>
          </div>
    </div>
  );
}
