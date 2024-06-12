"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Highlighter from "react-highlight-words";
import Link from "next/link";
import {
  ChangeControlChiller
} from "@/utils/api";
import Loading from "./Loading";
import { IoMdPower } from "react-icons/io";
import { NumericFormat } from "react-number-format";
export default function ChillerTable({ChillerList,onSubmitControl,AIMODE,onSubmitsetTemp}) {
  console.log(ChillerList)
  console.log(AIMODE)
  const [searchTable, setSerachTable] = useState("");
  const [DevId,setDevId] = useState()
  const [DecviceId, setDeviceId] = useState(null);
  const [DeviceName, setDeviceName] = useState('');
  const [Values, setValues] = useState();
  const [loading, setLoading] = useState(false);
  const [ModalError, setModalError] = useState(false);
  const [alerttitle, setAlertTitle] = useState("");
  const [alertmassage, setAlertmessage] = useState("");
  const [showModalControlestart, setShowModalControlestart] = useState(false);
  const [showModalControlestop, setShowModalControlestop] = useState(false);
  const [OpenSettempModal, setOpenSettempModal] = useState(false);
  const min = 40;
  const max = 70;
  function titleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
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
  const closeModal = () => {
    
    setModalError(false)
    setDeviceId(null);
    setShowModalControlestart(false)
    setShowModalControlestop(false)
    setOpenSettempModal(false)
    
};
function financial(x) {
  return Number.parseFloat(x).toFixed(2);
}
const openModalControleIsStop = (DecviceId,DeviceName,DevId) => {
  setDeviceId(DecviceId)
  setDevId(DevId)
  setDeviceName(DeviceName);
  setValues('off')
  setShowModalControlestop(true);
  
}
const openModalControleIsStart = (DecviceId,DeviceName,DevId) => {
  setDeviceId(DecviceId)
  setDevId(DevId)
  setDeviceName(DeviceName);
  setValues('on')
  setShowModalControlestart(true);
  
}
const onclickOPenSettemp = (id, DecviceId, values,DevId) => {
  console.log(id);
  setOpenSettempModal(true);
  setDeviceId(id);
  setDeviceName(DecviceId);
  setDevId(DevId)
  setValues(values);
};

  return (
<div className="grid rounded-xl bg-white p-3 shadow-default dark:border-slate-800 dark:bg-dark-box dark:text-slate-200 my-5">
        <div className="flex flex-col gap-4 p-2">
          <div className="flex justify-between">
            <span className="text-lg  font-bold">Chiller</span>
            <input
              type="text"
              placeholder="ค้นหา"
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
                  Power (kW)
                  </th>
                  <th scope="col" className="px-6 py-4 text-center">
                  % Drawer (%)
                  </th>
                  <th scope="col" className="px-6 py-4 text-center">
                  CHS Temp. (°F)
                  </th>
                  <th scope="col" className="px-6 py-4 text-center">
                  CHR Temp. (°F)
                  </th>
                  <th scope="col" className="px-6 py-4 text-center">
                  Set Temp. (°F)
                  </th>
                  <th scope="col" className="px-6 py-4 text-center">
                  Control
                  </th>
                </tr>
              </thead>
              <tbody>
                {ChillerList.length > 0 &&
                  ChillerList.filter((item) => {
                    // let data = []
                    //  if (item.power.toString().includes(searchTable)){
                    //   data = item
                    // }
                    // console.log(data)
                    return (
                      item.deviceName.toUpperCase().includes(searchTable.toUpperCase()) ||
                      item.deviceName.toLowerCase().includes(searchTable.toLowerCase()) ||
                      item.status.toUpperCase().includes(searchTable.toUpperCase()) ||
                      item.status.toLowerCase().includes(searchTable.toLowerCase()) ||
                      String(item.power).includes(searchTable) ||
                      String(financial(item.drawer)).includes(searchTable) ||
                      String(item.chillerReturnTemp).includes(searchTable) ||
                      String(item.chillerSupplyTemp).includes(searchTable)||
                      String(item.chillerSupplySetTemp).includes(searchTable)||
                      String(item.control).includes(searchTable)  
                    );
                  }).map((item) => {
                    
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
                              : item.status == "offline" ? "whitespace-nowrap px-6 py-4 text-center text-red-500 font-extrabold"
                              : "whitespace-nowrap px-6 py-4 text-center text-gray-500 font-extrabold"
                          }
                        >
                          <Highlighter
                                    highlightClassName="highlight" // Define your custom highlight class
                                    searchWords={[searchTable]}
                                    autoEscape={true}
                                    textToHighlight={titleCase(item.status)}// Replace this with your text
                                  />
                          
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-center font-extrabold">
                         <Highlighter
                                highlightClassName="highlight" // Define your custom highlight class
                                searchWords={[searchTable]}
                                autoEscape={true}
                                textToHighlight={String(item.power)} // Replace this with your text
                              />
                        
                        
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-center font-extrabold">
                         <Highlighter
                                highlightClassName="highlight" // Define your custom highlight class
                                searchWords={[searchTable]}
                                autoEscape={true}
                                textToHighlight= {item.status == "offline" ? String(item.drawer) : financial(item.drawer)} // Replace this with your text
                              />
                        
                          
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-center font-extrabold">
                          <Highlighter
                                highlightClassName="highlight" // Define your custom highlight class
                                searchWords={[searchTable]}
                                autoEscape={true}
                                textToHighlight={String(item.chillerSupplyTemp)} // Replace this with your text
                              />
                        
                          
                        </td>
                       
                        <td className="whitespace-nowrap px-6 py-4 text-center font-extrabold">
                         <Highlighter
                                highlightClassName="highlight" // Define your custom highlight class
                                searchWords={[searchTable]}
                                autoEscape={true}
                                textToHighlight={String(item.chillerReturnTemp)} // Replace this with your text
                              />
                        
                        
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-center font-extrabold">
                        {item.status == "offline" ? (
                                  <Highlighter
                                  highlightClassName="highlight" // Define your custom highlight class
                                  searchWords={[searchTable]}
                                  autoEscape={true}
                                  textToHighlight={String(item.chillerSupplySetTemp)} // Replace this with your text
                                />
                                ) : 
                                item.status == "off" || AIMODE == "on" ? (
                                  <Highlighter
                                    className="font-bold cursor-pointer"
                                    highlightClassName="highlight" // Define your custom highlight class
                                    searchWords={[searchTable]}
                                    autoEscape={true}
                                    textToHighlight={String(item.chillerSupplySetTemp)} // Replace this with your text
                                  />
                                ) : (
                                  <Highlighter
                                    className="text-[#5eead4] underline font-bold cursor-pointer"
                                    onClick={(event) =>
                                      item.status == "on"
                                        ? onclickOPenSettemp(
                                            item.id,
                                            item.deviceName,
                                            item.chillerSupplySetTemp,
                                            item.devId,
                                            event.preventDefault()
                                          )
                                        : null
                                    }
                                    highlightClassName="highlight" // Define your custom highlight class
                                    searchWords={[searchTable]}
                                    autoEscape={true}
                                    textToHighlight={String(item.chillerSupplySetTemp)} // Replace this with your text
                                  />
                                )}
                       
                          
                        </td>

                        <td className="whitespace-nowrap px-6 py-4 text-center font-extrabold">
                        <div className="flex flex-col items-center">
                        {item.status == "offline" ? <Highlighter
                                  
                                  highlightClassName="highlight " // Define your custom highlight class
                                  searchWords={[searchTable]}
                                  autoEscape={true}
                                  textToHighlight={titleCase(item.control)} // Replace this with your text
                                /> : 
                              <button
                                    type="button"
                                    className={
                                      AIMODE == "on" ? "text-gray-500 bg-gray-200 hover:bg-gray-100 hover:text-gray-700 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center cursor-not-allowed" :
                                      item.control == "on"
                                        ? "text-white bg-[#5eead4] hover:bg-gray-100 hover:text-gray-700 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                                        : item.control == "off"  ? "text-gray-500 bg-gray-200 hover:bg-gray-100 hover:text-gray-700 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                                        : "text-white bg-red-500  font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center opacity-50 cursor-not-allowed"
                                      }
                                    onClick={() =>
                                      item.control == "on" && AIMODE == "off"
                                        ? openModalControleIsStop(item.id,item.deviceName,item.devId)
                                        : item.control == "off" && AIMODE == "off" ? openModalControleIsStart(item.id,item.deviceName,item.devId) : null
                                    }
                                  ><IoMdPower size="1.5em"/>
                                    
                                  </button>}
                                  {item.status == "offline" ? null : <Highlighter
                                  className='text-xs mt-1 text-gray-500 font-bold'
                                  highlightClassName="highlight " // Define your custom highlight class
                                  searchWords={[searchTable]}
                                  autoEscape={true}
                                  textToHighlight={titleCase(item.control)} // Replace this with your text
                                />}
                                  
                                </div>
                             </td>
                        
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div></div>
   
        {loading ? (
          <Loading />
        ) : null}
        {ModalError ? (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="p-8 border w-auto shadow-lg rounded-md bg-white">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mt-5">
                  Something Went wrong
                </h3>
                <div className="mt-2 px-7 py-3">
                  <p className="text-lg text-gray-500 mt-2">We aren&apos;t able to process your requested operation
                    Please try again </p>
                </div>
                <div className="flex justify-center mt-10 gap-5">
                  <button
                    className="px-4 py-2 bg-red-600 text-white font-medium rounded-md  focus:outline-none w-62"
                    onClick={() => closeModal()}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {showModalControlestart  ? (
          <div className="fixed inset-0 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="p-8 border w-auto shadow-lg rounded-md bg-white">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mt-5">
                  Are you sure ?
                </h3>
                <div className="mt-2 px-7 py-3">
                  <p className="text-lg text-gray-500 mt-2"> Are you sure you want to start {DeviceName} now ? </p>
                </div>
                <div className="flex justify-center mt-10 gap-5">
                  <button
                    className="px-4 py-2 bg-white text-[#14b8a6] border border-teal-300 font-medium rounded-md  focus:outline-none"
                    onClick={() => closeModal()}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-[#14b8a6] text-white font-medium rounded-md  focus:outline-none"
                    onClick={() => {onSubmitControl(DecviceId,Values,DevId); setShowModalControlestart(false)}}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {showModalControlestop  ? (
          <div className="fixed inset-0 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="p-8 border w-auto shadow-lg rounded-md bg-white">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mt-5">
                  Are you sure ?
                </h3>
                <div className="mt-2 px-7 py-3">
                  <p className="text-lg text-gray-500 mt-2"> Are you sure you want to stop {DeviceName} now ? </p>
                </div>
                <div className="flex justify-center mt-10 gap-5">
                  <button
                    className="px-4 py-2 bg-white text-[#14b8a6] border border-teal-300 font-medium rounded-md  focus:outline-none"
                    onClick={() => closeModal()}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-[#14b8a6] text-white font-medium rounded-md  focus:outline-none"
                    onClick={() => {onSubmitControl(DecviceId,Values,DevId); setShowModalControlestop(false)}}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {OpenSettempModal ? (
          <div className="fixed inset-0 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="p-8 border w-auto shadow-lg rounded-md bg-white">
              <h5 className="mt-5">Set Temp. (°F) : {DeviceName}</h5>
              <NumericFormat
                type="number"
                className="border border-slate-300 rounded-md h-9 px-2 mt-2 w-80"
                min={40}
                max={70}
                value={Values}
                decimalScale={2}
                onChange={(e) => setValues(e.target.value)}
                onBlur={(e) => {
                  setValues(Math.min(max, Math.max(min, Values)).toFixed(2));
                }}
              />
              
              <div className="flex justify-center mt-10 gap-5">
                <button
                  className="px-4 py-2 bg-white text-[#14b8a6] border border-teal-300 font-medium rounded-md  focus:outline-none"
                  onClick={() => closeModal()}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-[#14b8a6] text-white font-medium rounded-md  focus:outline-none"
                  onClick={() => {onSubmitsetTemp(DecviceId,Values,DevId); setOpenSettempModal(false);}}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        ) : null}
        </div>
  );
}
