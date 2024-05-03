"use client";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import { NumericFormat } from 'react-number-format';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from "react";
import { Switch } from '@headlessui/react'
import Highlighter from "react-highlight-words";
import { IoMdPower } from "react-icons/io";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {
  SmartIRSetTemp, ChangeSetModeSmartIR, ChangeSetFanSmartIR ,ChangeControlSmartIR 
} from "@/utils/api";
import Loading from "./Loading";
import ModalPopError from "./ModalError";
export default function SmartIRtable({SmartIRlist,onSubmitControl,onSubmitSettemp,onSubmitSetMode,onSubmitSetFan}) {
  const [searchTable, setSerachTable] = useState("");
  const [OpenSettempModal, setOpenSettempModal] = useState(false)
  const [DecviceId, setDeviceId] = useState(null);
  const [DevId,setDevId] = useState()
  const [DeviceName, setDeviceName] = useState('');
  const [Values, setValues] = useState();
  const [OpenSetFanModal, setOpenSetFanModal] = useState(false)
  const [OpenSetModeModal, setOpenSetModeModal] = useState(false)
  const [loading, setLoading] = useState(false);
  const [ModalError, setModalError] = useState(false);
  const [showModalControlestart, setShowModalControlestart] = useState(false);
  const [showModalControlestop, setShowModalControlestop] = useState(false);
  const [alerttitle, setAlertTitle] = useState("");
  const [alertmassage, setAlertmessage] = useState("");
  const [toggle, setToggle] = useState(false);
  const min = 10;
  const max = 40;
  const handleToggleChange = () => {
    
    setToggle(!toggle);
  };
  function titleCase(str) {
    return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
  }

  const openModalControleIsStop = (DecviceId,Devicename,DevId) => {
    setDeviceId(DecviceId)
    setDeviceName(Devicename)
    setDevId(DevId)
    setValues('off')
    setShowModalControlestop(true);
    
  }
  const openModalControleIsStart = (DecviceId,Devicename,DevId) => {
    setDeviceId(DecviceId)
    setDeviceName(Devicename)
    setDevId(DevId)
    setValues('on')
    setShowModalControlestart(true);
    
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

  const handleChangeValueSettemp = async () => {
    setLoading(true);
    const res = await SmartIRSetTemp(DecviceId, Values);
    if (res.status === 200) {
      console.log(res.data)
      closeModal();
      setLoading(false);
      notifySuccess(res.data.title,res.data.message);
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

  async function clickChangestatusControle() {
    setLoading(true);
    const res = await ChangeControlSmartIR(DecviceId, Values);
    if (res.status === 200) {
      console.log(res.data)
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      closeModal();
      setLoading(false);
      notifySuccess(res.data.title,res.data.message);
    } else if (res.status === 401) {
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      closeModal();
      setLoading(false);
      
    }
    else if (res.status === 500) {
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      closeModal();
      setLoading(false);
    }
  }

  const handleChangeValueSetMode = async () => {
    setLoading(true);
    const res = await ChangeSetModeSmartIR(DecviceId, Values);
    if (res.status === 200) {
      console.log(res.data)
      closeModal();
      setLoading(false);
      notifySuccess(res.data.title,res.data.message);
    } else if (res.status === 401) {
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      closeModal();
      setLoading(false);
      
    }
    else if (res.status === 500) {
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      closeModal();
      setLoading(false);
    }
  }

  const handleChangeValueSetFan = async () => {
    setLoading(true);
    const res = await ChangeSetFanSmartIR(DecviceId, Values);
    if (res.status === 200) {
      console.log(res.data)
      closeModal();
      setLoading(false);
      notifySuccess(res.data.title,res.data.message);
    } else if (res.status === 401) {
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      closeModal();
      setLoading(false);
      
    }
    else if (res.status === 500) {
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      closeModal();
      setLoading(false);
    }
  }
  const onChangeValue = (event) => {
    setValues(event);
  };

  const onclickOPenSettemp = (id, DecviceId, values,DevId) => {
    console.log(id)
    setOpenSettempModal(true)
    setDeviceId(id)
    setDevId(DevId)
    setDeviceName(DecviceId)
    setValues(values)
  }

  const onclickOPenSetFan = (id, mode,DecviceId,DevId) => {
    
    setDeviceId(id)
    setDevId(DevId)
    setValues(mode)
    setDeviceName(DecviceId)
    setOpenSetFanModal(true)
  }

  const onclickOPenSetMode = (id,fan, DecviceId,DevId) => {
    
    setDeviceId(id)
    setDevId(DevId)
    setValues(fan)
    setDeviceName(DecviceId)
    setOpenSetModeModal(true)
  }



  const closeModal = () => {
    setOpenSettempModal(false)
    setOpenSetFanModal(false)
    setOpenSetModeModal(false)
    setShowModalControlestart(false)
    setShowModalControlestop(false)
    setModalError(false)
    setDeviceId(null);
    setValues("")
   

  };
 
  return (
    <div>
      <div className="grid rounded-xl bg-white p-3 shadow-default dark:border-slate-800 dark:bg-dark-box dark:text-slate-200 my-5">
        <div className="flex flex-col gap-4 p-2">
          <div className="flex justify-between">
            <span className="text-lg  font-bold">Smart IR</span>

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
                        
                      </tr>
                    </thead>
                    <tbody>
                      {SmartIRlist.length > 0 &&
                        SmartIRlist.filter((item) => {
                          // let data = []
                          //  if (item.power.toString().includes(searchTable)){
                          //   data = item
                          // }
                          // console.log(data)
                          return (
                            item.deviceName.toLowerCase().includes(searchTable.toLowerCase()) ||
                            item.deviceName.toUpperCase().includes(searchTable.toUpperCase()) ||
                            //   item.status.includes(searchTable) ||
                            String(item.setTemp).includes(searchTable) ||
                            (item.control).toLowerCase().includes(searchTable.toLowerCase()) ||
                            (item.control).toUpperCase().includes(searchTable.toUpperCase()) ||
                            (item.fan).toLowerCase().includes(searchTable.toLowerCase()) ||
                            (item.fan).toUpperCase().includes(searchTable.toUpperCase()) ||
                            (item.mode).toLowerCase().includes(searchTable.toLowerCase()) ||
                            (item.mode).toUpperCase().includes(searchTable.toUpperCase()) ||
                            item.status.toLowerCase().includes(searchTable.toLowerCase()) ||
                            item.status.toUpperCase().includes(searchTable.toUpperCase()) 
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
                                    : "whitespace-nowrap px-6 py-4 text-center text-gray-500 font-extrabold "
                                }
                              >
                                <Highlighter
                                  highlightClassName="highlight" // Define your custom highlight class
                                  searchWords={[searchTable]}
                                  autoEscape={true}
                                  textToHighlight={titleCase(item.status)}// Replace this with your text
                                />

                              </td>
                              
                              <td className="whitespace-nowrap px-6 py-4 text-center " >
                                
                              { item.status == "on"  ? 
                              <Highlighter
                              className="text-[#5eead4] underline font-bold cursor-pointer" onClick={(event) => item.status == "on" ? onclickOPenSettemp(item.id, item.deviceName, item.setTemp,item.devId ,event.preventDefault()) : null}
                                highlightClassName="highlight" // Define your custom highlight class
                                searchWords={[searchTable]}
                                autoEscape={true}
                                textToHighlight={String(item.setTemp)} // Replace this with your text
                                
                              />: <Highlighter
                              className="font-bold cursor-pointer"
                                highlightClassName="highlight" // Define your custom highlight class
                                searchWords={[searchTable]}
                                autoEscape={true}
                                textToHighlight={String(item.setTemp)} // Replace this with your text
                                
                              />}
                                
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-center ">
                              
                              {item.status == "on" ? 
                              <Highlighter
                              className="text-[#5eead4] underline font-bold cursor-pointer"onClick={(event) => item.status == "on" ? onclickOPenSetMode(item.id,item.fan, item.deviceName,item.devId ,event.preventDefault()) : null}
                                highlightClassName="highlight" // Define your custom highlight class
                                searchWords={[searchTable]}
                                autoEscape={true}
                                textToHighlight={titleCase(item.fan)} // Replace this with your text
                               
                              />
                              :  <Highlighter
                              className="font-bold cursor-pointer"
                                highlightClassName="highlight" // Define your custom highlight class
                                searchWords={[searchTable]}
                                autoEscape={true}
                                textToHighlight={titleCase(item.fan)} // Replace this with your text
                               
                              />}
                                
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-center " >
                              { item.status == "on"  ? <Highlighter
                                className="text-[#5eead4] underline font-bold cursor-pointer" onClick={(event) => item.status == "on" ? onclickOPenSetFan(item.id,item.mode, item.deviceName,item.devId ,event.preventDefault()) : null}
                                  highlightClassName="highlight" // Define your custom highlight class
                                  searchWords={[searchTable]}
                                  autoEscape={true}
                                  textToHighlight={titleCase(item.mode)} // Replace this with your text
                                />: 
                                <Highlighter
                                className="font-bold cursor-pointer"
                                  highlightClassName="highlight" // Define your custom highlight class
                                  searchWords={[searchTable]}
                                  autoEscape={true}
                                  textToHighlight={titleCase(item.mode)} // Replace this with your text
                                />}
                                
                                
                                
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-center">
                              <div className="flex flex-col items-center">
                              {item.status == "offline" ? "-" : 
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
                                        ? openModalControleIsStop(item.id,item.deviceName,item.devId )
                                        : item.control == "off" ? openModalControleIsStart(item.id,item.deviceName,item.devId ) : null
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
          {OpenSettempModal ? (
          <div className="fixed inset-0 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="p-8 border w-auto shadow-lg rounded-md bg-white">
              <h5 className="mt-5">Set Temp. (°C) : {DeviceName}</h5>
              <NumericFormat 
              type="number" 
              className="border border-slate-300 rounded-md h-9 px-2 mt-2 w-80" 
              min={10}
              max={40}
              value={Values} 
              decimalScale={0}
              onChange={e => setValues(e.target.value)}
    onBlur={e => {
        setValues(Math.min(max, Math.max(min, Values)).toFixed(2));
    }}
              />
              {/* <input
    type="number"
    className="border border-slate-300 rounded-md h-9 px-2 mt-2 w-80" 
    min={min}
    max={max}
    value={Values}
    onChange={e => setValues(e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,3))}
    onBlur={e => {
        setValues(Math.min(max, Math.max(min, Values)));
    }}
/> */}
              <div className="flex justify-center mt-10 gap-5">
                <button
                  className="px-4 py-2 bg-white text-[#14b8a6] border border-teal-300 font-medium rounded-md  focus:outline-none"
                  onClick={() => closeModal()}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-[#14b8a6] text-white font-medium rounded-md  focus:outline-none"
                  onClick={() => {onSubmitSettemp(DecviceId,Values,DevId); setOpenSettempModal(false)}}
                >
                  Confirm
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
                
                <div className='mt-5'>
          <ButtonGroup >
          <Button
          variant="outlined"
          style={ Values === "auto" ? {backgroundColor : "#5eead4",color : "white" ,borderBlockColor : "white",border : "1px solid", width : "100px"} : {backgroundColor : "white",color : "#5eead4",
        borderBlockColor : "#5eead4",border : "1px solid", width : "100px"}}
            onClick={() => setValues('auto')}
          >
            Auto
          </Button>
          <Button
          variant="outlined"
        style={Values === "low" ? {backgroundColor : "#5eead4",color : "white" ,borderBlockColor : "white",border : "1px solid", width : "100px"} : {backgroundColor : "white",color : "#5eead4",
        borderBlockColor : "#5eead4" ,border : "1px solid", width : "100px"}}
            onClick={() => setValues('low')}
          >
           Low
          </Button>
          <Button
          variant="outlined"
            style={ Values === "medium" ? {backgroundColor : "#5eead4",color : "white" ,borderBlockColor : "white",border : "1px solid", width : "100px"} : {backgroundColor : "white",color : "#5eead4",
            borderBlockColor : "#5eead4",border : "1px solid", width : "100px"}}
            onClick={() => setValues('medium')}
          >
            Medium
          </Button>
          <Button
          variant="outlined"
            style={ Values === "high" ? {backgroundColor : "#5eead4",color : "white" ,borderBlockColor : "white",border : "1px solid", width : "100px"} : {backgroundColor : "white",color : "#5eead4",
            borderBlockColor : "#5eead4",border : "1px solid", width : "100px"}}
            onClick={() => setValues('high')}
          >
            High
          </Button>
        </ButtonGroup>
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
                    onClick={() => {onSubmitSetFan(DecviceId,Values,DevId); setOpenSetModeModal(false)}}
                  >
                    Confirm
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
               
                <div className='mt-5'>
          <ButtonGroup >
          <Button
          variant="outlined"
          style={ Values === "cool" ? {backgroundColor : "#5eead4",color : "white" ,borderBlockColor : "white",border : "1px solid", width : "100px"} : {backgroundColor : "white",color : "#5eead4",
        borderBlockColor : "#5eead4",border : "1px solid", width : "100px"}}
            onClick={() => setValues('cold')}
          >
            Cool
          </Button>
          <Button
          variant="outlined"
        style={Values === "dry" ? {backgroundColor : "#5eead4",color : "white" ,borderBlockColor : "white",border : "1px solid", width : "100px"} : {backgroundColor : "white",color : "#5eead4",
        borderBlockColor : "#5eead4" ,border : "1px solid", width : "100px"}}
            onClick={() => setValues('dry')}
          >
           Dry
          </Button>
          <Button
          variant="outlined"
            style={ Values === "fan" ? {backgroundColor : "#5eead4",color : "white" ,borderBlockColor : "white",border : "1px solid", width : "100px"} : {backgroundColor : "white",color : "#5eead4",
            borderBlockColor : "#5eead4",border : "1px solid", width : "100px"}}
            onClick={() => setValues('fan')}
          >
            Fan
          </Button>
        </ButtonGroup>
        </div>
                <div className="flex justify-center mt-8 gap-5">
                  <button
                    className="px-4 py-2 bg-white text-[#14b8a6] border border-teal-300 font-medium rounded-md  focus:outline-none"
                    onClick={() => closeModal()}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-[#14b8a6] text-white font-medium rounded-md  focus:outline-none"
                    onClick={() => {onSubmitSetMode(DecviceId,Values,DevId); setOpenSetFanModal(false)}}
                  >
                    Confirm
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
        
      </div>
      
    </div>

  )
}
