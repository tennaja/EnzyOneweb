"use client";
import React, { useEffect, useState, useRef } from "react";
import { getSummaryCHiller,getCHillerList,ChangeControlChiller,ChillerSetTemp } from "@/utils/api";
import GaugeChart from "react-gauge-chart";
import ChillerTable from "./Chillertable";
import { IoMdPower } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HistoricalChart1 from "./chartHistorical1";
import HistoricalChart2 from "./chartHistorical2";

export default function Summary({ BuldingId }) {
  const [summaryList1, setSummaryList1] = useState([]);
  const [summaryList2, setSummaryList2] = useState([]);
  const [summaryList3, setSummaryList3] = useState([]);
  const [summaryList4, setSummaryList4] = useState([]);
  const [summaryList5, setSummaryList5] = useState([]);
  const [summaryList6, setSummaryList6] = useState([]);
  const [summaryList7, setSummaryList7] = useState([]);
  const [summaryList8, setSummaryList8] = useState([]);
  const [summaryList9, setSummaryList9] = useState([]);
  const [AImode,setAImode ] = useState ();
  const [buildingId, setBuildingId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [alerttitle, setAlertTitle] = useState("");
  const [alertmassage, setAlertmessage] = useState("");
  const [chillerList, setChillerList] = useState([]);
  const [DeviceName, setDeviceName] = useState("");
  const [DevId,setDevId] = useState()
  const [DecviceId, setDeviceId] = useState();
  function titleCase(str) {
    return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
  }
  const notifySuccess = (title,message) =>
    toast.success(
      <div className="px-2">
      <div className="flex flex-row font-bold">{title}</div>
      <div className="flex flex-row text-xs">{message}</div>
      </div>,
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
    if (BuldingId != 0) {
      GetExternalList(BuldingId);
      getChillerList(BuldingId)
    }
  }, [BuldingId]);

  const GetExternalList = async (BuldingId) => {
    const result = await getSummaryCHiller(BuldingId);
    console.log(result.data[0]);
    console.log(result.data[1]);
    console.log(result.data[2]);
    setSummaryList1([result.data[0]]);
    setSummaryList2([result.data[1]]);
    setSummaryList3([result.data[2]]);
    setSummaryList4([result.data[3]]);
    [result.data[3]].map((item) => setAImode(item.value))
    setSummaryList5([result.data[4]]);
    setSummaryList6([result.data[5]]);
    setSummaryList7([result.data[6]]);
    setSummaryList8([result.data[7]]);
    setSummaryList9([result.data[8]]);
  };
  const getChillerList = async (buildingId) => {
    setBuildingId(buildingId);
    console.log(buildingId);
    const result = await getCHillerList(buildingId);
    console.log(result.data);
    setChillerList(result.data);
  };

  async function clickChangestatusControleChiller(DecviceId, Values,DevId) {
    setLoading(true);
    const res = await ChangeControlChiller(DecviceId, Values);
    if (res.status === 200) {
      console.log(res.data);
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      // closeModal();
      setLoading(false);
      notifySuccess(res.data.title,res.data.message);
      // getLightingdetail(DevId)
      // getLightingList(FloorId)
    } else if (res.response.status === 401) {
      setAlertTitle(res.response.data.title);
      setAlertmessage(res.response.data.message);
      // closeModal();
      setLoading(false);
    } else if (res.response.status === 500) {
      setAlertTitle(res.response.data.title);
      setAlertmessage(res.response.data.message);
      // closeModal();
      setLoading(false);
    }
  }
  const handleChangeValueSettemp = async (DecviceId, Values,DevId) => {
    setLoading(true);
    const res = await ChillerSetTemp(DecviceId, Values);
    if (res.status === 200) {
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      console.log(res.data);
      // closeModal();
      setLoading(false);
      notifySuccess(res.data.title, res.data.message);
      // getSplittypeList(FloorId);
      // getSplitdetail(DevId)
    } else if (res.response.status === 401) {
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      // closeModal();
      setLoading(false);
      setModalError(true);
    } else if (res.response.status === 500) {
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      // closeModal();
      setLoading(false);
      setModalError(true);
    }
  };
  const openModalControleIsStop = (DecviceId, deviceName) => {
    setDeviceId(DecviceId);
    setValues("off");
    setDeviceName(deviceName);
    setShowModalControleOffHeater(true);
  };
  const openModalControleIsStart = (DecviceId, deviceName) => {
    setDeviceId(DecviceId);
    setValues("on");
    setDeviceName(deviceName);
    setShowModalControleOnHeater(true);
  };
  return (
    <>
    <div className="flex flex-row w-auto justify-center gap-3 mt-5 ">
    <div className="w-48 h-32 items-center justify-center rounded-xl bg-white p-3 shadow-lg dark:border-slate-800 dark:bg-dark-box dark:text-slate-200 ">
        <div className="h-28 p-6 flex flex-col justify-center items-center">
          {summaryList1.length > 0 &&
            summaryList1.map((item) => {
              return (
                <>
                  <span key={item.id} className="font-bold text-sm">
                    {item.name}
                  </span>
                  {item.value != null ? (
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
                        // style={{height : "150px" , width : "150px", background : "red"}}
                        // hideText={true} // If you want to hide the text
                      />
                      <span className="font-bold text-base">
                        {item.value}
                      </span>
                    </>
                  ) : (
                    "-"
                  )}
                </>
              );
            })}
          
        </div>
      </div>

      <div className="w-48 h-32 items-center justify-center rounded-xl bg-white p-2 shadow-lg dark:border-slate-800 dark:bg-dark-box dark:text-slate-200 ">
        <div className="h-28 p-3 flex flex-col justify-center items-center gap-1">
          {summaryList2.map((item) => {
            return (
              <>
                <span key={item.id} className="font-bold text-sm">
                  {item.name}
                </span>
                {item.value != null ? (
                  <div>
                    <span key={item.id} className="font-bold text-base">
                      {item.value}
                    </span>
                  </div>
                ) : (
                  "-"
                )}
              </>
            );
          })}
          <span className="font-normal text-sm">kW</span>
        </div>
      </div>

      <div className="w-48 h-32 items-center justify-center rounded-xl bg-white p-2 shadow-lg dark:border-slate-800 dark:bg-dark-box dark:text-slate-200 ">
        <div className="h-28 p-3 flex flex-col justify-center items-center gap-1">
          {summaryList3.map((item) => {
            return (
              <>
                <span key={item.id} className="font-bold text-sm">
                  {item.name}
                </span>
                {item.value != null ? (
                  <>
                    <span key={item.id} className="font-bold text-base">
                      {item.value}
                    </span>
                  </>
                ) : (
                  "-"
                )}
              </>
            );
          })}
          <span className="font-normal text-sm">kW/ton</span>
        </div>
      </div>
      <div className="w-48 h-32 rounded-xl bg-white p-2 shadow-lg dark:border-slate-800 dark:bg-dark-box dark:text-slate-200 ">
        <div className="h-28 p-3 flex flex-col justify-center items-center gap-1">
          {summaryList4.map((item) => {
            return (
              <>
                <span key={item.id} className="font-bold text-sm">
                  {item.name}
                </span>
                {item.value != null ? (
                  <>
                    <button
                                    type="button"
                                    className={
                                      item.value == "on"
                                        ? "text-white bg-[#5eead4] font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                                        : item.value == "off"  ? "text-gray-500 bg-gray-200  font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                                        : "text-white bg-red-500  font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center opacity-50 cursor-not-allowed"
                                      }
                                    // onClick={() =>
                                    //   item.value == "on"
                                    //     ? openModalControleIsStop(item.id,item.deviceName,item.devId)
                                    //     : item.value == "off" ? openModalControleIsStart(item.id,item.deviceName,item.devId) : null
                                    // }
                                  ><IoMdPower size="1.5em"/>
                                    
                                  </button>
                                  <span className='text-sm mt-1 text-gray-500 font-bold'>{titleCase(item.value)}</span>
                  </>
                ) : (
                  "-"
                )}
              </>
            );
          })}
          
        </div>
      </div>
     
    </div>
    <div className="flex flex-row justify-center gap-3 mt-5 ">
      <div className="w-48 h-32 items-center justify-center rounded-xl bg-white p-2 shadow-lg dark:border-slate-800 dark:bg-dark-box dark:text-slate-200 ">
        <div className="h-28 p-3 flex flex-col justify-center items-center gap-1">
          {summaryList5.map((item) => {
            return (
              <>
                <span key={item.id} className="font-bold text-sm">
                  {item.name}
                </span>
                {item.value != null ? (
                  <>
                    <span key={item.id} className="font-bold text-base">
                      {item.value}
                    </span>
                  </>
                ) : (
                  "-"
                )}
              </>
            );
          })}
          <span className="font-normal text-sm">gal/min</span>
        </div>
      </div>
      <div className="w-auto h-32 items-center justify-center rounded-xl bg-white p-2 shadow-lg dark:border-slate-800 dark:bg-dark-box dark:text-slate-200 ">
        <div className="h-28 p-3 flex flex-col justify-center items-center gap-1">
          {summaryList6.map((item) => {
            return (
              <>
                <span key={item.id} className="font-bold text-sm">
                  {item.name}
                </span>
                {item.value != null ? (
                  <>
                    <span key={item.id} className="font-bold text-base">
                      {item.value}
                    </span>
                  </>
                ) : (
                  "-"
                )}
              </>
            );
          })}
          <span className="font-normal text-sm">°F</span>
        </div>
      </div>
      <div className="w-auto h-32 items-center justify-center rounded-xl bg-white p-2 shadow-lg dark:border-slate-800 dark:bg-dark-box dark:text-slate-200 ">
        <div className="h-28 p-3 flex flex-col justify-center items-center gap-1">
          {summaryList7.map((item) => {
            return (
              <>
                <span key={item.id} className="font-bold text-sm">
                  {item.name}
                </span>
                {item.value != null ? (
                  <>
                    <span key={item.id} className="font-bold text-base">
                      {item.value}
                    </span>
                  </>
                ) : (
                  "-"
                )}
              </>
            );
          })}
          <span className="font-normal text-sm">°F</span>
        </div>
      </div>
      <div className="w-auto h-32 items-center justify-center rounded-xl bg-white p-2 shadow-lg dark:border-slate-800 dark:bg-dark-box dark:text-slate-200 ">
        <div className="h-28 p-3 flex flex-col justify-center items-center gap-1">
          {summaryList8.map((item) => {
            return (
              <>
                <span key={item.id} className="font-bold text-sm">
                  {item.name}
                </span>
                {item.value != null ? (
                  <>
                    <span key={item.id} className="font-bold text-base">
                      {item.value}
                    </span>
                  </>
                ) : (
                  "-"
                )}
              </>
            );
          })}
          <span className="font-normal text-sm">°F</span>
        </div>
      </div>
      <div className="w-48 h-32 items-center justify-center rounded-xl bg-white p-2 shadow-lg dark:border-slate-800 dark:bg-dark-box dark:text-slate-200 ">
        <div className="h-28 p-3 flex flex-col justify-center items-center gap-1">
          {summaryList9.map((item) => {
            return (
              <>
                <span key={item.id} className="font-bold text-sm">
                  {item.name}
                </span>
                {item.value != null ? (
                  <>
                    <span key={item.id} className="font-bold text-base">
                      {item.value}
                    </span>
                  </>
                ) : (
                  "-"
                )}
              </>
            );
          })}
          <span className="font-normal text-sm">%</span>
        </div>
      </div>
     
      </div>
    <ChillerTable ChillerList={chillerList} onSubmitControl={clickChangestatusControleChiller} AIMODE={AImode} onSubmitsetTemp = {handleChangeValueSettemp}/>
    <HistoricalChart1 BuildingId ={buildingId}/>
    <HistoricalChart2 BuildingId ={buildingId}/>
    </>
  );
}
