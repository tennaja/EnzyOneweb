"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Highlighter from "react-highlight-words";
import Link from "next/link";
import {
  ChangeValueSettempAHU,ChangeAutomationAHU
} from "@/utils/api";
import Loading from "./Loading";

export default function Ligthing(Ligthinglist) {
  const [searchTable, setSerachTable] = useState("");
  const [DecviceId, setDeviceId] = useState(null);
  const [DeviceName, setDeviceName] = useState('');
  const [Values, setValues] = useState();
  const [OpenSettempModal, setOpenSettempModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ModalError, setModalError] = useState(false);
  const [showModalAutomation, setShowModalAutomation] = useState(false);
  

  const notifySuccess = () =>
  toast.success(`Operation Complete
  `, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  const onChangeValue = (event) => {
    setValues(event);
  };
  const onclickOPenSettemp = (id, DecviceId, values) => {
    setOpenSettempModal(true)
    setDeviceId(id)
    setDeviceName(DecviceId)
    setValues(values)
  }
  const closeModal = () => {
    setOpenSettempModal(false)
    setModalError(false)
    setDeviceId(null);
    setShowModalAutomation(false)
    // setShowModalStop(false);
    // setShowModalStart(false);
};
const handleChangeValueSettemp = async () => {
  setLoading(true);
  const res = await ChangeValueSettempAHU(DecviceId, Values);
  if (res.status === 200) {
    console.log(res.data)
    closeModal();
    setLoading(false);
    notifySuccess();
  } else if (res.response.status === 401) {
    closeModal();
    setLoading(false);
    setModalError(true)
  } else if (res.response.status === 500) {
    closeModal();
    setLoading(false);
    setModalError(true)
  }
}
const openModalAutomationIsStop = (DecviceId,values) => {
  setDeviceId(DecviceId)
  setValues('off')
  setShowModalAutomation(true);
  
}
const openModalAutomationIsStart = (DecviceId,values) => {
  setDeviceId(DecviceId)
  setValues('on')
  setShowModalAutomation(true);
  
}

  return (
<div className="grid rounded-xl bg-white p-3 shadow-default dark:border-slate-800 dark:bg-dark-box dark:text-slate-200 my-5">
        <div className="flex flex-col gap-4 p-2">
          <div className="flex justify-between">
            <span className="text-lg  font-bold">Ligthing</span>
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
                  Control
                  </th>
                 
                </tr>
              </thead>
              <tbody>
                {Ligthinglist.Ligthinglist.length > 0 &&
                  Ligthinglist.Ligthinglist.filter((item) => {
                    // let data = []
                    //  if (item.power.toString().includes(searchTable)){
                    //   data = item
                    // }
                    // console.log(data)
                    return (
                      item.deviceName.includes(searchTable) ||
                      item.deviceName.toLowerCase().includes(searchTable) ||
                      item.status.includes(searchTable) ||
                      String(item.supplyTemp).includes(searchTable) ||
                      String(item.supplyTempSetPoint).includes(searchTable) ||
                      String(item.returnTemp).includes(searchTable) ||
                      String(item.vsdDrive).includes(searchTable)||
                      String(item.vsdPower).includes(searchTable)||
                      String(item.vsdSpeed).includes(searchTable)||
                      String(item.controlValve).includes(searchTable)
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
                                    textToHighlight={item.status}// Replace this with your text
                                  />
                          
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-center">
                               
                               <button
                                   type="button"
                                   className={
                                     item.control == "on"
                                       ? "text-white bg-[#5eead4] hover:bg-gray-100 hover:text-gray-700 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                                       : item.control == "off"  ? "text-gray-500 bg-gray-200 hover:bg-gray-100 hover:text-gray-700 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                                       : "text-white bg-red-500  font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center opacity-50 cursor-not-allowed"
                                     }
                                   onClick={() =>
                                     item.control == "on"
                                       ? openModalControleIsStop(item.id,item.deviceName)
                                       : item.control == "off" ? openModalControleIsStart(item.id,item.deviceName) : null
                                   }
                                 >
                                   <Highlighter
                                 highlightClassName="highlight" // Define your custom highlight class
                                 searchWords={[searchTable]}
                                 autoEscape={true}
                                 textToHighlight={item.control} // Replace this with your text
                               />
                                 </button>
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
    {OpenSettempModal ? (
          <div className="fixed inset-0 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="p-8 border w-auto shadow-lg rounded-md bg-white">
              <h5 className="mt-5">Set Supply Temp. Setpoint (°C) : {DeviceName}</h5>

              <h5 className="mt-5">Temperature</h5>
              <input
                type="number"
                placeholder="Enter your username"
                className="border border-slate-300 rounded-md h-9 px-2 mt-2 w-80"
                min={10}
                max={40}
                value={Values}
                onChange={(e) => {
                  onChangeValue(e.target.value);
                }}
              />

              <div className="flex justify-center mt-10 gap-5">
                <button
                  className="px-4 py-2 bg-white text-[#14b8a6] border border-teal-300 font-medium rounded-md  focus:outline-none"
                  onClick={() => closeModal()}
                >
                  cancel
                </button>
                <button
                  className="px-4 py-2 bg-[#14b8a6] text-white font-medium rounded-md  focus:outline-none"
                  onClick={() => handleChangeValueSettemp()}
                >
                  confirm
                </button>
              </div>
            </div>
          </div>
        ) : null}
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
        {showModalAutomation  ? (
          <div className="fixed inset-0 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="p-8 border w-auto shadow-lg rounded-md bg-white">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mt-5">
                  Are you sure ?
                </h3>
                <div className="mt-2 px-7 py-3">
                  <p className="text-lg text-gray-500 mt-2"> Are you sure this device start {DeviceName} now ? </p>
                </div>
                <div className="flex justify-center mt-10 gap-5">
                  <button
                    className="px-4 py-2 bg-white text-[#14b8a6] border border-teal-300 font-medium rounded-md  focus:outline-none"
                    onClick={() => closeModal()}
                  >
                    cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-[#14b8a6] text-white font-medium rounded-md  focus:outline-none"
                    onClick={() => clickChangestatusAutomation()}
                  >
                    confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <ToastContainer /></div>
  );
}
