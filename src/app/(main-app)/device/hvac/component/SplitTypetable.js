"use client";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from "react";
import { Switch } from '@headlessui/react'
import Highlighter from "react-highlight-words";
import {
  ChangeValueSettempSplttpye, ChangeValueSetMode, ChangeValueSetFan ,ChangeControlSplittypeIsOff 
} from "@/utils/api";
import Loading from "./Loading";
import ModalPopError from "./ModalError";
export default function SplitTypetable(SplittypeList) {
  const [searchTable, setSerachTable] = useState("");
  const [OpenSettempModal, setOpenSettempModal] = useState(false)
  const [DecviceId, setDeviceId] = useState(null);
  const [DeviceName, setDeviceName] = useState('');
  const [Values, setValues] = useState();
  const [isPrivate, setPrivate] = useState(true);
  const [OpenSetFanModal, setOpenSetFanModal] = useState(false)
  const [OpenSetModeModal, setOpenSetModeModal] = useState(false)
  const [loading, setLoading] = useState(false);
  const [ModalError, setModalError] = useState(false);
  const [showModalStart, setShowModalStart] = useState(false);
  const [showModalStop, setShowModalStop] = useState(false);
  const [alerttitle, setAlertTitle] = useState("");
  const [alertmassage, setAlertmessage] = useState("");
  const [enabled, setEnabled] = useState(false)

  const [toggle, setToggle] = useState(false);
  const handleToggleChange = () => {
    
    setToggle(!toggle);
  };

  const openModalControleIsStop = (DecviceId,values) => {
    setDeviceId(DecviceId)
    setValues('off')
    setShowModalStop(true);
    
  }
  const openModalControleIsStart = (DecviceId,values) => {
    setDeviceId(DecviceId)
    setValues('on')
    setShowModalStop(true);
    
  }

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

  const handleChangeValueSettemp = async () => {
    setLoading(true);
    const res = await ChangeValueSettempSplttpye(DecviceId, Values);
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

  async function clickChangestatusStop() {
    setLoading(true);
    const res = await ChangeControlSplittypeIsOff(DecviceId, Values);
    if (res.status === 200) {
      console.log(res.data)
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      closeModal();
      setLoading(false);
      notifySuccess();
    } else if (res.response.status === 401) {
      setAlertTitle(res.response.data.title);
      setAlertmessage(res.response.data.message);
      closeModal();
      setLoading(false);
      
    }
    else if (res.response.status === 500) {
      setAlertTitle(res.response.data.title);
      setAlertmessage(res.response.data.message);
      closeModal();
      setLoading(false);
    }
  }

  const handleChangeValueSetMode = async () => {
    setLoading(true);
    const res = await ChangeValueSetMode(DecviceId, Values);
    if (res.status === 200) {
      console.log(res.data)
      closeModal();
      setLoading(false);
      notifySuccess();
    } else {
      closeModal();
      setLoading(false);
      setModalError(true)
    }
  }

  const handleChangeValueSetFan = async () => {
    setLoading(true);
    const res = await ChangeValueSetFan(DecviceId, Values);
    if (res.status === 200) {
      console.log(res.data)
      closeModal();
      setLoading(false);
      notifySuccess();
    } else {
      closeModal();
      setLoading(false);
      setModalError(true)
    }
  }
  const onChangeValue = (event) => {
    setValues(event);
  };

  const onclickOPenSettemp = (id, DecviceId, values) => {
    console.log(id)
    setOpenSettempModal(true)
    setDeviceId(id)
    setDeviceName(DecviceId)
    setValues(values)
  }

  const onclickOPenSetFan = (id, DecviceId) => {
    setOpenSetFanModal(true)
    setDeviceId(id)
    setDeviceName(DecviceId)
  }

  const onclickOPenSetMode = (id, DecviceId) => {
    setOpenSetModeModal(true)
    setDeviceId(id)
    setDeviceName(DecviceId)
  }



  const closeModal = () => {
    setOpenSettempModal(false)
    setOpenSetFanModal(false)
    setOpenSetModeModal(false)
    setModalError(false)
    setDeviceId(null);
    setShowModalStop(false);
    setShowModalStart(false);

  };
 
  return (
    <div>
      <div className="grid rounded-xl bg-white p-3 shadow-default dark:border-slate-800 dark:bg-dark-box dark:text-slate-200 my-5">
        <div className="flex flex-col gap-4 p-2">
          <div className="flex justify-between">
            <span className="text-lg  font-bold">Split Type</span>

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
                          Room Temp. (°C)
                        </th>
                        <th scope="col" className="px-6 py-4 text-center">
                          Humidity (%)
                        </th>
                        <th scope="col" className="px-6 py-4 text-center">
                          Set Temp. (°C)
                        </th>
                        <th scope="col" className="px-6 py-4 text-center">
                          Fan
                        </th>
                        <th scope="col" className="px-6 py-4 text-center">
                        Mode
                        </th>
                        <th scope="col" className="px-6 py-4 text-center">
                          Control
                        </th>
                        <th scope="col" className="px-6 py-4 text-center">
                          Automation
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {SplittypeList.SplittypeList.length > 0 &&
                        SplittypeList.SplittypeList.filter((item) => {
                          // let data = []
                          //  if (item.power.toString().includes(searchTable)){
                          //   data = item
                          // }
                          // console.log(data)
                          return (
                            item.deviceName.includes(searchTable) ||
                            item.deviceName.toLowerCase().includes(searchTable) ||
                            item.deviceName.toUpperCase().includes(searchTable) ||
                            //   item.status.includes(searchTable) ||
                            String(item.roomTemp).includes(searchTable) ||
                            String(item.humidity).includes(searchTable) ||
                            String(item.setTemp).includes(searchTable) ||
                            (item.control).toLowerCase().includes(searchTable) ||
                            (item.control).toUpperCase().includes(searchTable) ||
                            (item.control).includes(searchTable) ||
                            (item.fan).toLowerCase().includes(searchTable) ||
                            (item.fan).toUpperCase().includes(searchTable) ||
                            (item.fan).includes(searchTable) ||
                            (item.mode).toLowerCase().includes(searchTable) ||
                            (item.mode).toUpperCase().includes(searchTable) ||
                            (item.mode).includes(searchTable) ||
                            (item.automation).includes(searchTable)
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
                                  textToHighlight={String(item.roomTemp)} // Replace this with your text

                                />


                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-center font-extrabold">
                                <Highlighter
                                  highlightClassName="highlight" // Define your custom highlight class
                                  searchWords={[searchTable]}
                                  autoEscape={true}
                                  textToHighlight={String(item.humidity)} // Replace this with your text
                                />

                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-center text-[#5eead4] underline font-bold">
                                <Link href="/device/hvac" onClick={(event) => onclickOPenSettemp(item.id, item.devId, item.setTemp ,event.preventDefault())}>
                                <Highlighter
                                  highlightClassName="highlight" // Define your custom highlight class
                                  searchWords={[searchTable]}
                                  autoEscape={true}
                                  textToHighlight={String(item.setTemp)} // Replace this with your text
                                  
                                /></Link>

                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-center text-[#5eead4] underline font-bold">
                              <Link href="/device/hvac" onClick={(event) => onclickOPenSetMode(item.id, item.devId,event.preventDefault())}>
                                <Highlighter
                                  highlightClassName="highlight" // Define your custom highlight class
                                  searchWords={[searchTable]}
                                  autoEscape={true}
                                  textToHighlight={item.fan} // Replace this with your text
                                 
                                />
                                </Link>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-center text-[#5eead4] underline font-bold">
                        
                                <Link href="/device/hvac" onClick={(event) => onclickOPenSetFan(item.id, item.devId,event.preventDefault())}>
                                <Highlighter
                                  highlightClassName="highlight" // Define your custom highlight class
                                  searchWords={[searchTable]}
                                  autoEscape={true}
                                  textToHighlight={item.mode} // Replace this with your text
                                />
                                </Link>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-center">
                               
                                <button
                                    type="button"
                                    className={
                                      item.control == "on"
                                        ? "text-white bg-[#5eead4] hover:bg-gray-100 hover:text-gray-700 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                                        : item.control == "off"  ? "text-gray-500 bg-gray-200 hover:bg-gray-100 hover:text-gray-700 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                                        : "text-white bg-red-500 hover:bg-gray-100 hover:text-gray-700 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                                      }
                                    onClick={() =>
                                      item.control == "on"
                                        ? openModalControleIsStop(item.id)
                                        : openModalControleIsStart(item.id)
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
                              <td className="whitespace-nowrap px-6 py-4 flex justify-center items-center font-extrabold">
                                
                                {/* <Highlighter
                                  highlightClassName="highlight" // Define your custom highlight class
                                  searchWords={[searchTable]}
                                  autoEscape={true}
                                  textToHighlight={String(item.automation)} // Replace this with your text
                                /> */}

       
       <div className='toggle-container' onClick={handleToggleChange}>
           <div className={`toggle-btn ${item.automation=="off" ? "disable" : ""}`}>
               {item.automation=="on" ? "ON" : "OFF"}
           </div>
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
        {OpenSettempModal ? (
          <div className="fixed inset-0 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="p-8 border w-auto shadow-lg rounded-md bg-white">
              <h5 className="mt-5">Set Temp. (°C) : {DeviceName}</h5>

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
        {OpenSetModeModal ? (
          <div className="fixed inset-0 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="p-8 border w-auto shadow-lg rounded-md bg-white">
              <div className="text-center">
                <h5 className="mt-5">Set Fan Speed : {DeviceName}</h5>
                <div class="inline-flex rounded-md shadow-sm mt-5 w" role="group">
                  <button value={'auto'} type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-s-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                    onClick={() => setValues('auto')}
                  >
                    Auto
                  </button>
                  <button value={'low'} type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-r border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                    onClick={() => setValues('low')}
                  >
                    Low
                  </button>
                  <button value={'medium'} type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-900  hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                    onClick={() => setValues('medium')}>
                    Medium
                  </button>
                  <button value={'high'} type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-e-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                    onClick={() => setValues('high')}>
                    High
                  </button>
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
                    onClick={() => handleChangeValueSetFan()}
                  >
                    confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {OpenSetFanModal ? (
          <div className="fixed inset-0 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="p-8 border w-auto shadow-lg rounded-md bg-white">
              <div className="text-center">
                <h5 className="mt-5">Set Temp. (°C) : {DeviceName}</h5>
                <div class="inline-flex rounded-md shadow-sm mt-5 w" role="group">
                  <button value={'cold'} type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-s-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                    onClick={() => setValues('cold')}
                  >
                    Cold
                  </button>
                  <button value={'dry'} type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                    onClick={() => setValues('dry')}
                  >
                    Dry
                  </button>
                  <button value={'fan'} type="button" class="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-e-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                    onClick={() => setValues('fan')}>
                    Fan
                  </button>
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
                    onClick={() => handleChangeValueSetMode()}
                  >
                    confirm
                  </button>
                </div>
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
        {showModalStop ? (
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
                    onClick={() => clickChangestatusStop()}
                  >
                    confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <ToastContainer />
    </div>

  )
}
