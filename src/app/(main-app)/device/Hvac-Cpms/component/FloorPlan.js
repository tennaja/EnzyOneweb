"use client";
import React from 'react'

export default function FloorPlan(Data) {
  console.log(Data)
  return (
    <div className="grid rounded-xl bg-white p-3 shadow-default dark:border-slate-800 dark:bg-dark-box dark:text-slate-200 mt-5">
      <div className="flex flex-col gap-4 p-2">
      { Data.Data.length > 0 && Data.Data.map((item) => {
        console.log(item)
        
        return <div><span>{item.name}</span></div>,<div><img width={500} height={500} src={item.imageUrl}/></div>
        
      })}
                    
        
      
      
    </div></div>
  )
}
