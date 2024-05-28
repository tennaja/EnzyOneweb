"use client";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  getBranch,
  getBulding,
  getFloor,
  
} from "@/utils/api";

import Summary from "./Summary";


export default function FilterCard() {
  const [isFirst, setIsFirst] = useState(true);
  const companyData = useSelector((state) => state.companyData.company);
  const [branchList, setBranchList] = useState([]);
  const [buildingList, setBuildingList] = useState([]);
  const [floorList, setFloorList] = useState([]);
  const [branchId, setBranchId] = useState(0);
  const [buildingId, setBuildingId] = useState(0);
  const [floorId, setFloorId] = useState(0);
  const notifySuccess = () =>
    toast.success(
      `Operation Complete
    `,
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );

  useEffect(() => {
    getBranchList();
  }, []);

  useEffect(() => {
    if (isFirst && buildingId != 0) {
      onSearchData();
    }
  }, [buildingId]);

  const onTableChange = async (building) => {
    setBuildingId(building);
  };
  //สาขา
  const getBranchList = async () => {
    const result = await getBranch(companyData);

    if (result.data.length != 0) {
      setBranchList(result.data);
      setBranchId(result.data[0].Id);
      getBuldingList(result.data[0].Id);
    }
  };
  //อาคาร
  const getBuldingList = async (branchId) => {
    setBranchId(branchId);
    const result = await getBulding(branchId);
    setBuildingList(result.data);
    setBuildingId(result.data[0].Id);
    
  };
  


  const onSearchData = async () => {
    setBuildingId(buildingId);
 
    setIsFirst(false);
    
  };

  
  

  return (
    <div>
      <div className="grid rounded-xl bg-white p-3 shadow-default dark:border-slate-800 dark:bg-dark-box dark:text-slate-200">
        <div className="flex flex-col gap-4 p-2">
          <span className="text-lg  font-bold">Chiller</span>
          <div className="w-full py-1 pb-2">
            <div className="inline-flex">
              <div className="flex justify-center bg-white p-3 shadow-default dark:border-slate-800 dark:bg-dark-box dark:text-slate-200">
                <p className=" text-red-700 mx-2 ">*</p>
                <label>
                  Branch :
                  <select
                    className="w-44 border border-slate-300 mx-2 rounded-md h-9"
                    onChange={(event) => {
                      getBuldingList(event.target.value);
                    }}
                    value={branchId}
                  >
                    {branchList.map((item) => {
                      return (
                        <option key={item.id} value={item.Id}>
                          {item.Name}
                        </option>
                      );
                    })}
                  </select>
                </label>
              </div>

              <div className="flex justify-center bg-white p-3 shadow-default dark:border-slate-800 dark:bg-dark-box dark:text-slate-200">
                <p className=" text-red-700 mx-2 ">*</p>
                <label>
                  Building :
                  <select
                    className="w-44 border border-slate-300 mx-2 rounded-md h-9"
                    onChange={(event) => {
                      onTableChange(event.target.value);
                    }}
                    value={buildingId}
                  >
                    {buildingList.map((item) => {
                      return (
                        <option key={item.id} Value={item.Id}>
                          {item.Name}
                        </option>
                      );
                    })}
                  </select>
                </label>
              </div>
              
              <div className="flex justify-center bg-white p-3 shadow-default dark:border-slate-800 dark:bg-dark-box dark:text-slate-200 items-center"></div>
              <button
                type="button"
                className="text-white bg-[#14b8a6] rounded-md text-lg px-10 h-9 mt-3 
                "
                onClick={onSearchData}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        
      </div>
      <Summary BuldingId= {buildingId}/>
      
    
      <ToastContainer />  
    </div>
  );
}
