"use client";
import React, { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
export default function VAVtable(VAVList) {
    const [searchTable, setSerachTable] = useState("");
    console.log(VAVList)
  return (
    <div className="grid rounded-xl bg-white p-3 shadow-default dark:border-slate-800 dark:bg-dark-box dark:text-slate-200 my-5">
        <div className="flex flex-col gap-4 p-2">
          <div className="flex justify-between">
            <span className="text-lg  font-bold">VAV</span>
            <input
              type="text"
              placeholder="ค้นหา Device"
              className="border border-slate-300 rounded-md h-9 px-2"
              onKeyUp={(e) => {
                setSerachTable(e.target.value);
              }}
            />
          </div>

    <div className="flex flex-col ">
      <div className="sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8 ">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b  dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Device
                  </th>
                  <th scope="col" className="px-6 py-4 text-center">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-4 text-center">
                  Temp. (°C)
                  </th>
                  <th scope="col" className="px-6 py-4 text-center">
                  Air Flow (CFM)
                  </th>
                  <th scope="col" className="px-6 py-4 text-center">
                  Damper (%)
                  </th>
                </tr>
              </thead>
              <tbody>
                {VAVList.VAVList.length > 0 &&
                  VAVList.VAVList.filter((item) => {
                    // let data = []
                    //  if (item.power.toString().includes(searchTable)){
                    //   data = item
                    // }
                    // console.log(data)
                    return (
                      item.deviceName.includes(searchTable) ||
                      item.status.includes(searchTable) ||
                      String(item.temp).includes(searchTable) ||
                      String(item.airFlow).includes(searchTable) ||
                      String(item.damper).includes(searchTable) 
                      
                    );
                  }).map((item) => {
                    console.log(item)
                    return (
                      <tr
                        className="border-b dark:border-neutral-500"
                        key={item.id}
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-extrabold">
                        <Highlighter
                                    highlightClassName="highlight" // Define your custom highlight class
                                    searchWords={[searchTable]}
                                    autoEscape={true}
                                    textToHighlight={item.deviceName}// Replace this with your text
                                  />
                          
                        </td>
                        <td
                          className={
                            item.status == "on"
                              ? "whitespace-nowrap px-6 py-4 text-center text-green-500 font-extrabold"
                              : "whitespace-nowrap px-6 py-4 text-center text-red-500 font-extrabold"
                          }
                        >
                          <Highlighter
                                    highlightClassName="highlight" // Define your custom highlight class
                                    searchWords={[searchTable]}
                                    autoEscape={true}
                                    textToHighlight={item.status}// Replace this with your text
                                  />
                          
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-center font-extrabold">
                        <Highlighter
                                    highlightClassName="highlight" // Define your custom highlight class
                                    searchWords={[searchTable]}
                                    autoEscape={true}
                                    textToHighlight={String(item.temp)} // Replace this with your text
                                  />
      
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-center font-extrabold">
                        <Highlighter
                                    highlightClassName="highlight" // Define your custom highlight class
                                    searchWords={[searchTable]}
                                    autoEscape={true}
                                    textToHighlight={String(item.airFlow)} // Replace this with your text
                                  />
                          
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-center font-extrabold">
                        <Highlighter
                                    highlightClassName="highlight" // Define your custom highlight class
                                    searchWords={[searchTable]}
                                    autoEscape={true}
                                    textToHighlight={String(item.damper)} // Replace this with your text
                                  />
                          
                        </td>
                        
                        
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div></div></div>
  )
}
