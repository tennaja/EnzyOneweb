"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  getBranch, getBulding, getFloor, getFloorplan ,getAHU ,getVAV ,getSplittype , getIOT
} from "@/utils/api";
import FloorPlan from "./FloorPlan";
import AHUtable from "./AHUtable";
import VAVtable from "./VAVtable";
import SplitTypetable from "./SplitTypetable";
import SmartIRtable from "./SmartIRtable";
export default function FilterCard() {
  const [isFirst, setIsFirst] = useState(true);
  const companyData = useSelector((state) => state.companyData.company);
  const [branchList, setBranchList] = useState([]);
  const [buildingList, setBuildingList] = useState([]);
  const [floorList, setFloorList] = useState([]);
  const [AHUList, setAHUList] = useState([]);
  const [VAVList, setVAVList] = useState([]);
  const [SplittypeList, setSplittypeList] = useState([]);
  const [IOTList, setIOTList] = useState([]);
  const [floorplanList, setFloorplanList] = useState([]);
  const [branchId, setBranchId] = useState(0);
  const [buildingId, setBuildingId] = useState(0);
  const [floorId, setFloorId] = useState(0);
  

  useEffect(() => {
    getBranchList();
  }, []);

  useEffect(() => {
    if (isFirst ) {
      onSearchData();
     
    }
  }, [floorId]);
  
  

  const onTableChange = async (floorId) => {
    setFloorId(floorId);
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
    getFloorLit(result.data[0].Id);
  };
  //ชั้น
  const getFloorLit = async (buildingId) => {
    setBuildingId(buildingId);
    console.log(buildingId)
    const result = await getFloor(buildingId);
    console.log(result.data)
    if (result.data.length != 0) {
      setFloorList(result.data);
      setFloorId(result.data[0].Id);
      
      // onSearchTable(result.data[0].Id);
      
    }
    // getTableAirCompressorList(result.data[0].Id)
  };
  
  const onSearchData = async () => {
    setFloorId(floorId);
    const result = await getFloorplan(floorId);
    console.log(floorId)
      let data = []
      data.push(result.data)
      setFloorplanList(data);
      console.log(result.data)
      setIsFirst(false);
      getAHUList(floorId)
      getVAVList(floorId)
      getSplittypeList(floorId)
      getIOTList(floorId)
    
  };
  
  const getAHUList = async (floorId) => {
    setFloorId(floorId);
    const result = await getAHU(floorId);
    console.log(result.data)
      setAHUList(result.data);
  };
  
  const getVAVList = async (floorId) => {
    setFloorId(floorId);
    const result = await getVAV(floorId);
    console.log(result.data)
    setVAVList(result.data);
  };

  const getSplittypeList = async (floorId) => {
    setFloorId(floorId);
    const result = await getSplittype(floorId);
    console.log(result.data)
    setSplittypeList(result.data);
  };

  const getIOTList = async (floorId) => {
    setFloorId(floorId);
    const result = await getIOT(floorId);
    console.log(result.data)
    setIOTList(result.data);
  };


  return (
    <div>
    <div className="grid rounded-xl bg-white p-3 shadow-default dark:border-slate-800 dark:bg-dark-box dark:text-slate-200">
      <div className="flex flex-col gap-4 p-2">
        <span className="text-lg  font-bold">Hvac</span>
        <div className="w-full py-1 pb-2">
          <div className="inline-flex">
            <div className="flex justify-center bg-white p-3 shadow-default dark:border-slate-800 dark:bg-dark-box dark:text-slate-200">
              <p className=" text-red-700 mx-2 ">*</p>
              <label>
                สาขา :
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
                อาคาร :
                <select
                  className="w-44 border border-slate-300 mx-2 rounded-md h-9"
                  onChange={(event) => {
                    getFloorLit(event.target.value);
                  }}
                  value={buildingId}
                >
                  <option value={2}>test</option>
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
            <div className="flex justify-center bg-white p-3 shadow-default dark:border-slate-800 dark:bg-dark-box dark:text-slate-200">
              <p className=" text-red-700 mx-2">*</p>
              <label>
                ชั้น :
                <select
                  className="w-44 border border-slate-300 mx-2 rounded-md h-9"
                  onChange={(event) => {
                    onTableChange(event.target.value);
                  }}
                  value={floorId}
                >
                  {floorList.map((item) => {
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
              เลือก
            </button>
          </div>
        </div>
      </div>
      {floorplanList.id}
    </div>
    <FloorPlan Data = {floorplanList}/>
    <AHUtable AHUlist = {AHUList}/>
    <VAVtable VAVList = {VAVList}/>
    <SplitTypetable SplittypeList = {SplittypeList}/>
    <SmartIRtable IotList = {IOTList}/>
    </div>
    
  )
}
