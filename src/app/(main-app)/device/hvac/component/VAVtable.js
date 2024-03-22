"use client";
import React, { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import {
  ChangeValueDamperVAV
} from "@/utils/api";
import Loading from "./Loading";

export default function VAVtable(VAVList) {
    const [searchTable, setSerachTable] = useState("");
    const [DecviceId, setDeviceId] = useState(null);
  const [DeviceName, setDeviceName] = useState('');
  const [Values, setValues] = useState();
  const [OpenSettempModal, setOpenSettempModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ModalError, setModalError] = useState(false);

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
    // setShowModalStop(false);
    // setShowModalStart(false);
};

const handleChangeValueSettemp = async () => {
  setLoading(true);
  const res = await ChangeValueDamperVAV(DecviceId, Values);
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
    
  return (
    <div className="grid rounded-xl bg-white p-3 shadow-default dark:border-slate-800 dark:bg-dark-box dark:text-slate-200 my-5">
        <div className="flex flex-col gap-4 p-2">
          <div className="flex justify-between">
            <span className="text-lg  font-bold">VAV</span>
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
                        <td className="whitespace-nowrap px-6 py-4 text-center text-[#5eead4] underline font-bold">
                        <Link href="/device/hvac" onClick={(event) => onclickOPenSettemp(item.id, item.devId, item.damper ,event.preventDefault())}>
                        <Highlighter
                                    highlightClassName="highlight" // Define your custom highlight class
                                    searchWords={[searchTable]}
                                    autoEscape={true}
                                    textToHighlight={String(item.damper)} // Replace this with your text
                                  />
                          </Link>
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
              <h5 className="mt-5">Set Damper (%) : {DeviceName}</h5>

              <h5 className="mt-5">Temperature</h5>
              <input
                type="number"
                placeholder="Enter your username"
                className="border border-slate-300 rounded-md h-9 px-2 mt-2 w-80"
                min={0}
                max={100}
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
        <ToastContainer />
    </div>
  )
}
