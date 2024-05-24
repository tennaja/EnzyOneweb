"use client";
import { NumericFormat } from 'react-number-format';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState, useRef } from "react";
import TextField from '@mui/material/TextField';
import { IoMdPower } from "react-icons/io";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AHUtable from "./AHUtable";
import VAVtable from "./VAVtable";
import SplitTypetable from "./SplitTypetable";
import SmartIRtable from "./SmartIRtable";
import {
  ChangeValueSettempSplttpye,
  ChangeValueSetMode,
  ChangeValueSetFan,
  ChangeControlSplittype,
  ChangeValueDamperVAV,
  ChangeValueSettempAHU,
  ChangeAutomationSplittype,
  ChangeAutomationAHU,
  getFloorplanHvac,
  getAHU,
  getVAV,
  getSplittype,
  getIOT,
  getVAVDetail,
  getSplitTypeDetail,
  getAHUDetail,
  getIoTDetail
} from "@/utils/api";
import Loading from "./Loading";
import { Slackside_One } from 'next/font/google';
import ColorLoop from './test';

export default function FloorPlan({ FloorId }) {
  console.log(FloorId);
  const [Values, setValues] = useState();
  const [Decvicetype, setDevicetype] = useState();
  const [DecviceId, setDeviceId] = useState();
  const [DevId,setDevId] = useState()
  const [Listcontrol, setListcontrol] = useState({});
  const [OpenSettempModal, setOpenSettempModal] = useState(false);
  const [OpenSettempModalVAV, setOpenSettempModalVAV] = useState(false);
  const [OpenSettempModalAHU, setOpenSettempModalAHU] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ModalError, setModalError] = useState(false);
  const [DeviceName, setDeviceName] = useState("");
  const [toggle, setToggle] = useState(false);
  const [OpenSetModeModal, setOpenSetModeModal] = useState(false);
  const [OpenSetFanModal, setOpenSetFanModal] = useState(false);
  const [showModalControleOn, setShowModalControleOn] = useState(false);
  const [showModalControleOff, setShowModalControleOff] = useState(false);
  const [showModalAutomationOn, setShowModalAutomationOn] = useState(false);
  const [showModalAutomationOff, setShowModalAutomationOff] = useState(false);
  const [showModalAutomationAHUOn, setShowModalAutomationAHUOn] = useState(false);
  const [showModalAutomationAHUOff, setShowModalAutomationAHUOff] = useState(false);
  const [alerttitle, setAlertTitle] = useState("");
  const [alertmassage, setAlertmessage] = useState("");
  const [AHUList, setAHUList] = useState([]);
  const [AHUDetailList, setAHUDetailList] = useState([]);
  const [VAVList, setVAVList] = useState([]);
  const [VAVDetailList, setVAVDetailList] = useState([]);
  const [SplittypeList, setSplittypeList] = useState([]);
  const [SplittypeDetailList, setSplittypeDetailList] = useState([]);
  const [IOTList, setIOTList] = useState([]);
  const [IoTDetailList, setIoTDetailList] = useState([]);
  const [floorId, setFloorId] = useState();
  const [floorplanList, setFloorplanList] = useState([]);
  const [deviceTypeList, setdeviceTypeList] = useState([]);
  const [option, setOption] = useState();
  const minS = 10;
  const maxS = 40;
  const minV = 0;
  const maxV = 100;
  const minA = 10;
  const maxA = 40;
  useEffect(() => {
    if (FloorId) {
      getfloorplan(FloorId);
      getAHUList(FloorId);
      getVAVList(FloorId);
      getSplittypeList(FloorId);
      getIOTList(FloorId);
    }
  }, [FloorId]);

  const notifySuccess = (title, message) =>
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
    const getfloorplan = async (floorId) => {
    setFloorId(floorId);
    const result = await getFloorplanHvac(floorId);
    setFloorplanList(result.data);
    result.data.map((item) => {setdeviceTypeList(item.deviceType); setOption(item.deviceType[0].displayName) })
    // console.log(result.data);
   
    // setdeviceTypeList(result.data.deviceType);
    
  };

  const getAHUList = async (floorId) => {
    setFloorId(floorId);
    console.log(floorId);
    const result = await getAHU(floorId);
    console.log(result.data);
    setAHUList(result.data);
  };
  const getVAVList = async (floorId) => {
    setFloorId(floorId);
    console.log(floorId);
    const result = await getVAV(floorId);
    console.log(result.data);
    setVAVList(result.data);
  };

  const getSplittypeList = async (floorId) => {
    setFloorId(floorId);
    console.log(floorId);
    const result = await getSplittype(floorId);
    console.log(result.data);
    setSplittypeList(result.data);
  };

  const getIOTList = async (floorId) => {
    setFloorId(floorId);
    console.log(floorId);
    const result = await getIOT(floorId);
    console.log(result.data);
    setIOTList(result.data);
  };
  
  const getVAVdetail = async (devId) => {
    setDevId(devId);
    const result = await getVAVDetail(devId);
    if(result.status === 200){
    setVAVDetailList([result.data]);
    
    getVAVList(FloorId);}
    else if(result.status === 401){
      setVAVDetailList([]);
      
      getVAVList(FloorId);}
      else if(result.status === 500){
        setVAVDetailList([]);
        
        getVAVList(FloorId);}
    
  };
  const getSplitdetail = async (devId) => {
    setDevId(devId);
    
    const result = await getSplitTypeDetail(devId);
    if(result.status === 200){
    setSplittypeDetailList([result.data]);
    console.log(result.data)
    console.log(SplittypeDetailList)
    getSplittypeList(FloorId);
    }
    else if(result.status === 500) {
      setSplittypeDetailList([]);
      getSplittypeList(FloorId);
      console.log("error")
    }
  };
  const getAHUdetail = async (devId) => {
    setDevId(devId);
    
    const result = await getAHUDetail(devId);
    if(result.status === 200){
    setAHUDetailList([result.data]);
    getAHUList(FloorId);
    }
    else if(result.status === 401){
      setAHUDetailList([]);
      getAHUList(FloorId);
      }
    else if(result.status === 500){
        setAHUDetailList([]);
        getAHUList(FloorId);
        }
  };
  const getIoTdetail = async (devId) => {
    
    setDevId(devId);
    
    const result = await getIoTDetail(devId);
    if(result.status === 200){
    console.log([result.data])
    setIoTDetailList([result.data]);
    getIOTList(FloorId);
    }
    else if(result.status === 401){
    setIoTDetailList([]);
    getIOTList(FloorId);
    }
    else if(result.status === 500){
    setIoTDetailList([]);
    getIOTList(FloorId);
    }
  };
  const handleToggleChange = () => {
    setToggle(!toggle);
  };



  const handleChangeValueSetFan = async (DecviceId, Values,DevId) => {
    setLoading(true);
    const res = await ChangeValueSetFan(DecviceId, Values);
    if (res.status === 200) {
      setOpenSetModeModal(false)
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      console.log(res.data);
      setLoading(false);
      notifySuccess(res.data.title, res.data.message);
      getSplittypeList(floorId);
      getSplitdetail(DevId)
    } else if (res.response.status === 401) {
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      closeModal();
      setLoading(false);
      setModalError(true);
    } else if (res.response.status === 500) {
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      closeModal();
      setLoading(false);
      setModalError(true);
    }
  };
  const handleChangeValueSetMode = async (DecviceId, Values,DevId) => {
    setLoading(true);
    const res = await ChangeValueSetMode(DecviceId, Values);
    if (res.status === 200) {
      console.log(res.data);
      setOpenSetFanModal(false)
      setLoading(false);
      notifySuccess(res.data.title, res.data.message);
      getSplittypeList(FloorId);
      getSplitdetail(DevId)
    } else if (res.response.status === 401) {
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      closeModal();
      setLoading(false);
      setModalError(true);
    } else if (res.response.status === 500) {
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      closeModal();
      setLoading(false);
      setModalError(true);
    }
  };
  const handleChangeValueSettemp = async (DecviceId, Values,DevId) => {
    setLoading(true);
    const res = await ChangeValueSettempSplttpye(DecviceId, Values);
    if (res.status === 200) {
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      console.log(res.data);
      closeModal();
      setLoading(false);
      notifySuccess(res.data.title, res.data.message);
      getSplittypeList(FloorId);
      getSplitdetail(DevId)
    } else if (res.response.status === 401) {
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      closeModal();
      setLoading(false);
      setModalError(true);
    } else if (res.response.status === 500) {
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      closeModal();
      setLoading(false);
      setModalError(true);
    }
  };
  async function clickChangestatusControle(DecviceId, Values) {
    setLoading(true);
    const res = await ChangeControlSplittype(DecviceId, Values);
    console.log(res)
    if (res.status === 200) {
      console.log(res.data);
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      closeModal();
      setLoading(false);
      notifySuccess(res.data.title, res.data.message);
      getSplittypeList(FloorId);
      getSplitdetail(DevId)
    } else if (res.response.status === 401) {
      setAlertTitle(res.response.data.title);
      setAlertmessage(res.response.data.message);
      closeModal();
      setLoading(false);
    } else if (res.response.status === 500) {
      setAlertTitle(res.response.data.title);
      setAlertmessage(res.response.data.message);
      closeModal();
      setLoading(false);
    }
  }
  async function clickChangestatusAutomation(DecviceId, Values,DevId) {
    setLoading(true);
    const res = await ChangeAutomationSplittype(DecviceId, Values);
    if (res.status === 200) {
      console.log(res.data);
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      closeModal();
      setLoading(false);
      notifySuccess(res.data.title, res.data.message);
      getSplittypeList(FloorId);
      getSplitdetail(DevId)
    } else if (res.response.status === 401) {
      setAlertTitle(res.response.data.title);
      setAlertmessage(res.response.data.message);
      closeModal();
      setLoading(false);
    } else if (res.response.status === 500) {
      setAlertTitle(res.response.data.title);
      setAlertmessage(res.response.data.message);
      closeModal();
      setLoading(false);
    }
  }
  const onclickOPenSettemp = (id, DecviceId, values) => {
    console.log(id);

    setDeviceId(id);
    setDeviceName(DecviceId);
    setValues(values);
    setOpenSettempModal(true);
  };
  const onclickOPenSetMode = (id, fan, DecviceId) => {

    setDeviceId(id);
    setValues(fan)
    setDeviceName(DecviceId);
    setOpenSetModeModal(true);
  };
  

  const onclickOPenSetFan = (id, mode, DecviceId) => {
    setDeviceId(id);
    setValues(mode)
    setDeviceName(DecviceId);
    setOpenSetFanModal(true);
  };

  
  const handleChangeValueSettempVav = async (DecviceId, Values,DevId) => {
    setLoading(true);
    const res = await ChangeValueDamperVAV(DecviceId, Values);
    if (res.status === 200) {
      console.log(res.data);
      closeModal();
      setLoading(false);
      notifySuccess(res.data.title, res.data.message);
      getVAVList(FloorId)
      getVAVdetail(DevId)
    } else if (res.response.status === 401) {
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      closeModal();
      setLoading(false);
      setModalError(true);
    } else if (res.response.status === 500) {
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      closeModal();
      setLoading(false);
      setModalError(true);
    }
  };
  const openModalControleIsStop = (DecviceId, deviceName) => {
    setDeviceId(DecviceId);
    setValues("off");
    setDeviceName(deviceName);
    setShowModalControleOff(true);
  };
  const openModalControleIsStart = (DecviceId, deviceName) => {
    setDeviceId(DecviceId);
    setValues("on");
    setDeviceName(deviceName);
    setShowModalControleOn(true);
  };

  const openModalAutomationIsStop = (DecviceId, deviceName) => {
    setDeviceId(DecviceId);
    setValues("off");
    setDeviceName(deviceName);
    setShowModalAutomationOff(true);
  };
  const openModalAutomationIsStart = (DecviceId, deviceName) => {
    setDeviceId(DecviceId);
    setValues("on");
    setDeviceName(deviceName);
    setShowModalAutomationOn(true);
  };

  const openModalAutomationAHUIsStop = (DecviceId, deviceName) => {
    setDeviceId(DecviceId);
    setValues("off");
    setDeviceName(deviceName);
    setShowModalAutomationAHUOff(true);
  };
  const openModalAutomationAHUIsStart = (DecviceId, deviceName) => {
    setDeviceId(DecviceId);
    setValues("on");
    setDeviceName(deviceName);
    setShowModalAutomationAHUOn(true);
  };

 
  const onclickOPenSettempVav = (id, DecviceId, values,DevId) => {
    setOpenSettempModalVAV(true);
    setDeviceId(id);
    setDeviceName(DecviceId);
    setValues(values);
  };
  const onclickOPenSettempAHU = (id, DecviceId, values) => {
    setOpenSettempModalAHU(true);
    setDeviceId(id);
    setDeviceName(DecviceId);
    setValues(values);
  };
  

  useEffect(() => {
    if (Decvicetype != null && DevId != null) {
        onChangeValue(Decvicetype);
        console.log(DevId)
        if( Decvicetype === "VAV"){
          getVAVdetail(DevId)
        }
    }
  }, [Decvicetype,DevId]);

  const onChangeValueSettemp = (event) => {
    setValues(event);
  };

  const onChangeValue = (value) => {
    console.log(value)
    setDevicetype(value);

  }

 
  const handleChangeValueSettempAHU = async (DecviceId, Values,DevId) => {
    setLoading(true);
    const res = await ChangeValueSettempAHU(DecviceId, Values);
    if (res.status === 200) {
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      console.log(res.data);
      closeModal();
      setLoading(false);
      notifySuccess(res.data.title, res.data.message);
      getAHUList(FloorId)
      getAHUdetail(DevId)
    } else if (res.response.status === 401) {
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      closeModal();
      setLoading(false);
      setModalError(true);
    } else if (res.response.status === 500) {
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      closeModal();
      setLoading(false);
      setModalError(true);
    }
  };
  
  async function clickChangestatusAutomationAHU(DecviceId, Values,DevId) {
    setLoading(true);
    const res = await ChangeAutomationAHU(DecviceId, Values);
    if (res.status === 200) {
      console.log(res.data);
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      closeModal();
      setLoading(false);
      notifySuccess(res.data.title, res.data.message);
      getAHUList(FloorId)
      getAHUdetail(DevId)
    } else if (res.response.status === 401) {
      setAlertTitle(res.response.data.title);
      setAlertmessage(res.response.data.message);
      closeModal();
      setLoading(false);
    } else if (res.response.status === 500) {
      setAlertTitle(res.response.data.title);
      setAlertmessage(res.response.data.message);
      closeModal();
      setLoading(false);
    }
  }

  const closeModal = () => {
    setOpenSettempModal(false);
    setOpenSetFanModal(false);
    setOpenSetModeModal(false);
    setOpenSettempModalVAV(false);
    setOpenSettempModalAHU(false);
    setShowModalControleOn(false);
    setShowModalControleOff(false);
    setShowModalAutomationOn(false);
    setShowModalAutomationOff(false);
    setShowModalAutomationAHUOn(false);
    setShowModalAutomationAHUOff(false);
    setModalError(false);
    setDeviceId(null);
    // setShowModalStop(false);
    // setShowModalStart(false);
  };

  return (
    <div>
      <div className="grid rounded-xl bg-white p-2 shadow-default dark:border-slate-800 dark:bg-dark-box dark:text-slate-200 mt-5">
        <div className="flex flex-col gap-4 p-2">
          {floorplanList.length > 0 &&
            floorplanList.map((item, index) => {
              console.log(item)
              
              return (
                <div key={item.id}>
                  <div className="flex flex-row gap-4 p-2">
                    <span className="text-lg  font-bold">HVAC Floor</span>
                    <span className="text-lg  font-bold">{item.name}</span>
                    
                    <select
                      className="w-44 border border-slate-300 mx-2 rounded-md h-9"
                      onChange={(e) => setOption(e.target.value)}
                    >

                      {deviceTypeList.length > 0 &&
                        deviceTypeList.map((item) => {
                          console.log(item)
                          return (
                            <option key={item.id}>{item.displayName}</option>)
                        })}
                    </select>
                  </div>
                  <div className="flex flex-row gap-4 p-2 mt-5">
                    <div className="flex justify-center items-center w-full">
                      <div style={{ position: "relative" }}>
                        <img
                          key={index}
                          style={{ width: 700, height: 700 }}
                          src={item.imageUrl}
                        />

                        {option == "All Type" ? (
                          <div>
                            {AHUList.length > 0 &&
                              AHUList.map ((marker, index) => {
                                console.log(marker);
                                return (
                                  <div key={marker.id}>
                                    <div
                                      className={
                                        marker.status == "on"
                                          ? "bg-[#5eead4] rounded-full px-1 py-1"
                                          : marker.status == "offline"
                                            ? " bg-red-500 rounded-full px-1 py-1"
                                            : " bg-gray-300 rounded-full px-1 py-1"
                                      }
                                      style={{
                                        left: marker.position.x,
                                        top: marker.position.y,
                                        position: "absolute",
                                      }}
                                    ></div>
                                    <div
                                      key={marker.id}
                                      value={"AHU"}
                                      className="w-48 cursor-pointer"
                                      style={{
                                        left: marker.position.x,
                                        top: marker.position.y,
                                        position: "absolute",
                                      }}
                                      onClick={() => {onChangeValue("AHU"); getAHUdetail(marker.id);}}
                                    // onClick={() => onChangeValue('AHU',item.deviceName)}
                                    >
                                      <div
                                        class={
                                          marker.status == "on"
                                            ? "bottom-arrow font-bold text-xs bg-[#5eead4] text-center text-white py-2"
                                            : marker.status == "offline"
                                              ? "bottom-arrow font-bold text-xs bg-red-500 text-center text-white py-2"
                                              : "bottom-arrow font-bold text-xs bg-gray-300 text-center text-white py-2"
                                        }
                                      >
                                        {marker.deviceName}
                                      </div>
                                      <div className="bg-white ml-4 border border-black">
                                        <div class="px-3 py-2">
                                          <span class="text-gray-700 text-xs">
                                            Supply Temp. (°C) :{" "}
                                            {String(marker.supplyTemp)}
                                          </span>
                                        </div>

                                        <div class="px-3">
                                          <span class="text-gray-700 text-xs">
                                            Return Temp. (°C) :{" "}
                                            {String(marker.returnTemp)}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            {VAVList.length > 0 &&
                              VAVList.map((marker, index) => {
                                console.log(marker);
                                return (
                                  <div key={index}>
                                    <div
                                      className={
                                        marker.status == "on"
                                          ? "bg-[#5eead4] rounded-full px-1 py-1"
                                          : marker.status == "offline"
                                            ? " bg-red-500 rounded-full px-1 py-1"
                                            : " bg-gray-300 rounded-full px-1 py-1"
                                      }
                                      style={{
                                        left: marker.position.x,
                                        top: marker.position.y,
                                        position: "absolute",
                                      }}
                                    ></div>
                                    <div
                                      key={index}
                                      value={"VAV"}
                                      className="w-44 cursor-pointer"
                                      style={{
                                        left: marker.position.x,
                                        top: marker.position.y,
                                        position: "absolute",
                                      }}
                                      onClick={() => {onChangeValue("VAV"); getVAVdetail(marker.id);}}
                                    // onClick={() => onChangeValue('VAV',item.deviceName,item.status,item.temp,item.airFlow)}
                                    >
                                      <div
                                        class={
                                          marker.status == "on"
                                            ? "bottom-arrow font-bold text-xs bg-[#5eead4] text-center text-white py-2 border border-black"
                                            : marker.status == "offline"
                                              ? "  bottom-arrow font-bold text-xs bg-red-500 text-center text-white py-2 border border-black"
                                              : "bottom-arrow font-bold text-xs bg-gray-300 text-center text-white py-2 border border-black"
                                        }
                                      >
                                        {marker.deviceName}
                                      </div>
                                      <div className="bg-white border border-black ml-4">
                                        <div class="px-3">
                                          <span class="text-gray-700 text-xs">
                                            Temp. (°C) : {marker.temp}
                                          </span>
                                        </div>
                                        <div class="px-3">
                                          <span class="text-gray-700 text-xs">
                                            Air Flow (CFM) : {marker.airFlow}
                                          </span>
                                        </div>
                                        <div class="px-3">
                                          <span class="text-gray-700 text-xs">
                                            Damper (%) : {marker.damper}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            {SplittypeList.length > 0 &&
                              SplittypeList.map((marker, index) => {
                                return (
                                  <div key={marker.id}>
                                    <div
                                      className={
                                        marker.status == "on"
                                          ? "bg-[#5eead4] rounded-full px-1 py-1"
                                          : marker.status == "offline"
                                            ? " bg-red-500 rounded-full px-1 py-1"
                                            : " bg-gray-300 rounded-full px-1 py-1"
                                      }
                                      style={{
                                        left: marker.position.x,
                                        top: marker.position.y,
                                        position: "absolute",
                                      }}
                                    ></div>

                                    <div
                                      key={marker.id}
                                      value={"SPLIT"}
                                      className="w-44 cursor-pointer"
                                      style={{
                                        left: marker.position.x,
                                        top: marker.position.y,
                                        position: "absolute",
                                      }}
                                      onClick={() =>  {onChangeValue("SPLIT"); getSplitdetail(marker.id);}}
                                    >
                                      <div
                                        class={
                                          marker.status == "on"
                                            ? "bottom-arrow font-bold text-xs bg-[#5eead4] text-center text-white py-2 border border-black"
                                            : marker.status == "offline"
                                              ? "  bottom-arrow font-bold text-xs bg-red-500 text-center text-white py-2 border border-black"
                                              : "bottom-arrow font-bold text-xs bg-gray-300 text-center text-white py-2 border border-black"
                                        }
                                      >
                                        {marker.deviceName}
                                      </div>
                                      <div className="bg-white border border-black ml-4">
                                        <div class="px-3 ">
                                          <span class="text-gray-700 text-xs">
                                            Room Temp. (°C) : {String(marker.roomTemp)}
                                          </span>
                                        </div>
                                        <div class="px-3 ">
                                          <span class="text-gray-700 text-xs">
                                            Humidity (%) : {String(marker.humidity)}
                                          </span>
                                        </div>

                                      </div>
                                    </div>
                                  </div>
                                );
                              })}

                            {IOTList.length > 0 &&
                              IOTList.map((marker, index) => {
                                return (
                                  <div key={marker.id}>
                                    <div
                                      className={
                                        marker.status == "on"
                                          ? "bg-[#5eead4] rounded-full px-1 py-1"
                                          : marker.status == "offline"
                                            ? " bg-red-500 rounded-full px-1 py-1"
                                            : " bg-gray-300 rounded-full px-1 py-1"
                                      }
                                      style={{
                                        left: marker.position.x,
                                        top: marker.position.y,
                                        position: "absolute",
                                      }}
                                    ></div>
                                    <div
                                      key={marker.id}
                                      value={"SPLIT"}
                                      className="w-44 cursor-pointer"
                                      style={{
                                        left: marker.position.x,
                                        top: marker.position.y,
                                        position: "absolute",
                                      }}
                                      onClick={() =>
                                        {onChangeValue("IoT"); getIoTdetail(marker.id);}
                                      }
                                    >
                                      <div
                                        class={
                                          marker.status == "on"
                                            ? "bottom-arrow font-bold text-xs bg-[#5eead4] text-center text-white py-2 border border-black"
                                            : marker.status == "offline"
                                              ? "  bottom-arrow font-bold text-xs bg-red-500 text-center text-white py-2 border border-black"
                                              : "bottom-arrow font-bold text-xs bg-gray-300 text-center text-white py-2 border border-black"
                                        }
                                      >
                                        {marker.deviceName}
                                      </div>
                                      <div className="bg-white ml-4 border border-black">
                                        <div class="px-3 ">
                                          <span class="text-gray-700 text-xs">
                                            Temp. (°C) :  {marker.temp}
                                          </span></div>
                                        <div class="px-3 ">
                                          <span class="text-gray-700 text-xs">
                                            Humidity (%) : {marker.humidity}
                                          </span></div>
                                        <div class="px-3 ">
                                          <span class="text-gray-700 text-xs">
                                            CO2 (ppm) : {marker.co2}
                                          </span></div>

                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        ) : option == "Split Type" ? (
                          <div>
                            {SplittypeList.length > 0 &&
                              SplittypeList.map((marker, index) => {
                                console.log(marker)
                                return (
                                  <div key={marker.id}>
                                    <div
                                      className={
                                        marker.status == "on"
                                          ? "bg-[#5eead4] rounded-full px-1 py-1"
                                          : marker.status == "offline"
                                            ? " bg-red-500 rounded-full px-1 py-1"
                                            : " bg-gray-300 rounded-full px-1 py-1"
                                      }
                                      style={{
                                        left: marker.position.x,
                                        top: marker.position.y,
                                        position: "absolute",
                                      }}
                                    ></div>

                                    <div
                                      key={marker.id}
                                      value={"SPLIT"}
                                      className="w-44 cursor-pointer"
                                      style={{
                                        left: marker.position.x,
                                        top: marker.position.y,
                                        position: "absolute",
                                      }}
                                      onClick={() => {onChangeValue("SPLIT"); getSplitdetail(marker.id);}}
                                      
                                    >
                                      <div
                                        class={
                                          marker.status == "on"
                                            ? "bottom-arrow font-bold text-xs bg-[#5eead4] text-center text-white py-2 border border-black"
                                            : marker.status == "offline"
                                              ? "  bottom-arrow font-bold text-xs bg-red-500 text-center text-white py-2 border border-black"
                                              : "bottom-arrow font-bold text-xs bg-gray-300 text-center text-white py-2 border border-black"
                                        }
                                      >
                                        {marker.deviceName}
                                      </div>
                                      <div className="bg-white border border-black ml-4">
                                        <div class="px-3 ">
                                          <span class="text-gray-700 text-xs">
                                            Room Temp. (°C) : {String(marker.roomTemp)}
                                          </span>
                                        </div>
                                        <div class="px-3 ">
                                          <span class="text-gray-700 text-xs">
                                            Humidity (%) : {String(marker.humidity)}
                                          </span>
                                        </div>

                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        ) : option == "AHU" ? (
                          <div>
                            {AHUList.length > 0 &&
                              AHUList.map((marker, index) => {
                                console.log(marker);
                                return (
                                  <div key={marker.id}>
                                    <div
                                      className={
                                        marker.status == "on"
                                          ? "bg-[#5eead4] rounded-full px-1 py-1"
                                          : marker.status == "offline"
                                            ? " bg-red-500 rounded-full px-1 py-1"
                                            : " bg-gray-300 rounded-full px-1 py-1"
                                      }
                                      style={{
                                        left: marker.position.x,
                                        top: marker.position.y,
                                        position: "absolute",
                                      }}
                                    ></div>
                                    <div
                                      key={marker.id}
                                      value={"AHU"}
                                      className="w-48 cursor-pointer"
                                      style={{
                                        left: marker.position.x,
                                        top: marker.position.y,
                                        position: "absolute",
                                      }}
                                      onClick={() => {onChangeValue("AHU"); getAHUdetail(marker.id);}}
                                    // onClick={() => onChangeValue('AHU',item.deviceName)}
                                    >
                                      <div
                                        class={
                                          marker.status == "on"
                                            ? "bottom-arrow font-bold text-xs bg-[#5eead4] text-center text-white py-2"
                                            : marker.status == "offline"
                                              ? "bottom-arrow font-bold text-xs bg-red-500 text-center text-white py-2"
                                              : "bottom-arrow font-bold text-xs bg-gray-300 text-center text-white py-2"
                                        }
                                      >
                                        {marker.deviceName}
                                      </div>
                                      <div className="bg-white ml-4 border border-black">
                                        <div class="px-3 py-2">
                                          <span class="text-gray-700 text-xs">
                                            Supply Temp. (°C) :{" "}
                                            {String(marker.supplyTemp)}
                                          </span>
                                        </div>
                                        <div class="px-3">
                                          <span class="text-gray-700 text-xs">
                                            Return Temp. (°C) :{" "}
                                            {String(marker.returnTemp)}
                                          </span>
                                        </div>


                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        ) : option == "VAV" ? (
                          <div>
                            {VAVList.length > 0 &&
                              VAVList.map((marker, index) => {
  
                                return (
                                  <div key={index}>
                                    <div
                                      className={
                                        marker.status == "on"
                                          ? "bg-[#5eead4] rounded-full px-1 py-1"
                                          : marker.status == "offline"
                                            ? " bg-red-500 rounded-full px-1 py-1"
                                            : " bg-gray-300 rounded-full px-1 py-1"
                                      }
                                      style={{
                                        left: marker.position.x,
                                        top: marker.position.y,
                                        position: "absolute",
                                      }}
                                    ></div>
                                    <div
                                      key={index}
                                      value={"VAV"}
                                      className="w-44 cursor-pointer"
                                      style={{
                                        left: marker.position.x,
                                        top: marker.position.y,
                                        position: "absolute",
                                      }}
                                      onClick={() => {onChangeValue("VAV"); getVAVdetail(marker.id);}}
                                    // onClick={() => onChangeValue('VAV',item.deviceName,item.status,item.temp,item.airFlow)}
                                    >
                                      <div
                                        class={
                                          marker.status == "on"
                                            ? "bottom-arrow font-bold text-xs bg-[#5eead4] text-center text-white py-2 border border-black"
                                            : marker.status == "offline"
                                              ? "  bottom-arrow font-bold text-xs bg-red-500 text-center text-white py-2 border border-black"
                                              : "bottom-arrow font-bold text-xs bg-gray-300 text-center text-white py-2 border border-black"
                                        }
                                      >
                                        {marker.deviceName}
                                      </div>
                                      <div className="bg-white border border-black ml-4">
                                        <div class="px-3">
                                          <span class="text-gray-700 text-xs">
                                            Temp. (°C) : {marker.temp}
                                          </span>
                                        </div>
                                        <div class="px-3">
                                          <span class="text-gray-700 text-xs">
                                            Air Flow (CFM) : {marker.airFlow}
                                          </span>
                                        </div>
                                        <div class="px-3">
                                          <span class="text-gray-700 text-xs">
                                            Damper (%) : {marker.damper}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        ) : option == "IoT" ? (
                          <div>
                            {IOTList.length > 0 &&
                              IOTList.map((marker, index) => {
                                console.log(marker)
                                return (
                                  <div key={marker.id}>
                                    <div
                                      className={
                                        marker.status == "on"
                                          ? "bg-[#5eead4] rounded-full px-1 py-1"
                                          : marker.status == "offline"
                                            ? " bg-red-500 rounded-full px-1 py-1"
                                            : " bg-gray-300 rounded-full px-1 py-1"
                                      }
                                      style={{
                                        left: marker.position.x,
                                        top: marker.position.y,
                                        position: "absolute",
                                      }}
                                    ></div>
                                    <div
                                      key={marker.id}
                                      value={"IoT"}
                                      className="w-44 cursor-pointer"
                                      style={{
                                        left: marker.position.x,
                                        top: marker.position.y,
                                        position: "absolute",
                                      }}
                                      onClick={() =>
                                        {onChangeValue("IoT"); getIoTdetail(marker.id);}
                                      }
                                    >
                                      <div
                                        class={
                                          marker.status == "on"
                                            ? "bottom-arrow font-bold text-xs bg-[#5eead4] text-center text-white py-2 border border-black"
                                            : marker.status == "offline"
                                              ? "  bottom-arrow font-bold text-xs bg-red-500 text-center text-white py-2 border border-black"
                                              : "bottom-arrow font-bold text-xs bg-gray-300 text-center text-white py-2 border border-black"
                                        }
                                      >
                                        {marker.deviceName}
                                      </div>
                                      <div className="bg-white ml-4 border border-black">
                                        <div class="px-3 ">
                                          <span class="text-gray-700 text-xs">
                                            Temp. (°C) :  {marker.temp}
                                          </span></div>
                                        <div class="px-3 ">
                                          <span class="text-gray-700 text-xs">
                                            Humidity (%) : {marker.humidity}
                                          </span></div>
                                        <div class="px-3 ">
                                          <span class="text-gray-700 text-xs">
                                            CO2 (ppm) : {marker.co2}
                                          </span></div>

                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex justify-end w-auto">
                      {Decvicetype == "VAV"
                        ?(
                        VAVDetailList.length > 0 &&
                        VAVDetailList.map((marker, index) => {
                          console.log(marker);
                          return (
                            <div key={marker.id}>
                              <div class="w-64 bg-white h-auto rounded shadow-md pb-6">
                                <div class="font-bold text-lg text-center py-2">
                                  {marker.deviceName}
                                </div>
                                <div class="px-3">
                                  <span class="text-gray-700 text-sm">
                                    Status : <span className={
                                      marker.status == "on"
                                        ? " text-center text-green-500 font-extrabold"
                                        : marker.status == "offline" ? " text-center text-red-500 font-extrabold"
                                          : " text-center text-gray-500 font-extrabold"
                                    }>
                                      {
                                        marker.status == "on"
                                          ? "On"
                                          : marker.status == "offline" ? " Offline"
                                            : " Off"
                                      }
                                    </span>
                                  </span>
                                </div>
                                <div class="px-3">
                                  <span class="text-gray-700 text-sm">
                                    Temp. (°C) : {" "}
                                    {marker.status == "offline" ? "-" : marker.status == "off" ? <span class="text-gray-700 text-sm">
                                      {marker.temp}
                                    </span> : marker.temp}
                                  </span>
                                </div>
                                <div class="px-3">
                                  <span class="text-gray-700 text-sm">
                                    Air Flow (CFM) : {" "}
                                    {marker.status == "offline" ? "-" : marker.status == "off" ? <span class="text-gray-700 text-sm">
                                      {marker.airFlow}
                                    </span> : marker.airFlow}

                                  </span>
                                </div>
                                <div class="px-3">
                                  <span class="text-gray-700 text-sm">
                                    Damper (%) :{" "}
                                    {marker.status == "on" ? <span
                                      className="text-[#5eead4] underline text-sm cursor-pointer"
                                      onClick={() => marker.status == "on" ?
                                        onclickOPenSettempVav(
                                          marker.id,
                                          marker.deviceName,
                                          marker.damper,
                                          marker.devId
                                        ) : null
                                      }
                                    >
                                      {marker.damper}
                                    </span> : marker.status == "off" ? <span class="text-gray-700 text-sm">
                                      {marker.damper}
                                    </span> : "-"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        }))
                        : Decvicetype == "AHU"
                          ? AHUDetailList.length > 0 &&
                          AHUDetailList.map((marker, index) => {
                            console.log(marker);
                            return (
                              <div key={marker.id}>
                                <div class="w-64 bg-white h-auto rounded shadow-md pb-6">
                                  <div class="font-bold text-lg text-center py-2">
                                    {marker.deviceName}
                                  </div>
                                  <div class="px-3">
                                    <span class="text-gray-700 text-sm">
                                      Status : <span className={
                                        marker.status == "on"
                                          ? " text-center text-green-500 font-extrabold"
                                          : marker.status == "offline" ? " text-center text-red-500 font-extrabold"
                                            : " text-center text-gray-500 font-extrabold"
                                      }>
                                        {
                                          marker.status == "on"
                                            ? "On"
                                            : marker.status == "offline" ? " Offline"
                                              : " Off"
                                        }
                                      </span>
                                    </span>
                                  </div>
                                  <div class="px-3">
                                    <span class="text-gray-700 text-sm">
                                      Supply Temp. (°C) : {" "}
                                      {marker.status == "offline" ? "-" : marker.status == "off" ? <span class="text-gray-700 text-sm">
                                        {marker.supplyTemp}
                                      </span> : marker.supplyTemp}
                                    </span>
                                  </div>
                                  <div class="px-3">
                                    <span class="text-gray-700 text-sm">
                                      Supply Temp. Setpoint (°C) :{" "}
                                      {marker.status == "on" ? <span
                                        className="text-[#5eead4] underline text-sm cursor-pointer"
                                        onClick={() => marker.status == "on" ?
                                          onclickOPenSettempAHU(
                                            marker.id,
                                            marker.deviceName,
                                            marker.supplyTempSetPoint
                                          ) : null
                                        }
                                      >
                                        {marker.supplyTempSetPoint}
                                      </span> : marker.status == "off" ? <span class="text-gray-700 text-sm">
                                        {marker.supplyTempSetPoint}
                                      </span> : "-"}
                                    </span>
                                  </div>
                                  <div class="px-3">
                                    <span class="text-gray-700 text-sm">
                                      Return Temp. (°C) : {" "}
                                      {marker.status == "offline" ? "-" : marker.status == "off" ? <span class="text-gray-700 text-sm">
                                        {marker.returnTemp}
                                      </span> : marker.returnTemp}
                                    </span>
                                  </div>
                                  <div class="px-3">
                                    <span class="text-gray-700 text-sm">
                                      VSD %Drive (Hz) : {" "}
                                      {marker.status == "offline" ? "-" : marker.status == "off" ? <span class="text-gray-700 text-sm">
                                        {marker.vsdDrive}
                                      </span> : marker.vsdDrive}
                                    </span>
                                  </div>
                                  <div class="px-3">
                                    <span class="text-gray-700 text-sm">
                                      VSD Power (kW) : {" "}
                                      {marker.status == "offline" ? "-" : marker.status == "off" ? <span class="text-gray-700 text-sm">
                                        {marker.vsdPower}
                                      </span> : marker.vsdPower}
                                    </span>
                                  </div>
                                  <div class="px-3">
                                    <span class="text-gray-700 text-sm">
                                      VSD Speed (rpm) : {" "}
                                      {marker.status == "offline" ? "-" : marker.status == "off" ? <span class="text-gray-700 text-sm">
                                        {marker.vsdSpeed}
                                      </span> : marker.vsdSpeed}
                                    </span>
                                  </div>
                                  <div class="px-3">
                                    <span class="text-gray-700 text-sm">
                                      Control Valve (%) : {" "}
                                      {marker.status == "offline" ? "-" : marker.status == "off" ? <span class="text-gray-700 text-sm">
                                        {marker.controlValve}
                                      </span> : marker.controlValve}
                                    </span>
                                  </div>
                                  <div class="px-3 flex gap-2">
                                    <span class="text-gray-700 text-sm">
                                      Automation :{" "}
                                    </span>
                                    {" "}
                                    {marker.status == "offline" ? "-" : marker.status == "off" ? <div
                                      className="toggle-container-disable"
                                      onClick={() =>
                                        marker.status == "on" ?
                                          marker.automation == "on"
                                            ? openModalAutomationAHUIsStop(
                                              marker.id,
                                              marker.deviceName
                                            )
                                            : openModalAutomationAHUIsStart(
                                              marker.id,
                                              marker.deviceName
                                            ) : null
                                      }
                                    >
                                      <div
                                        className={`toggle-btn-disable ${marker.automation == "off" ? "disableNone" : ""
                                          }`}
                                      >
                                        {marker.automation == "on" ? "ON" : "OFF"}
                                      </div>
                                    </div> : <div
                                      className="toggle-container"
                                      onClick={() =>
                                        marker.status == "on" ?
                                          marker.automation == "on"
                                            ? openModalAutomationAHUIsStop(
                                              marker.id,
                                              marker.deviceName
                                            )
                                            : openModalAutomationAHUIsStart(
                                              marker.id,
                                              marker.deviceName
                                            ) : null
                                      }
                                    >
                                      <div
                                        className={`toggle-btn ${marker.automation == "off" ? "disable" : ""
                                          }`}
                                      >
                                        {marker.automation == "on" ? "ON" : "OFF"}
                                      </div>
                                    </div>}

                                  </div>
                                </div>
                              </div>
                            );
                          })
                          : Decvicetype == "SPLIT"
                            ? SplittypeDetailList.length > 0 &&
                            SplittypeDetailList.map((marker, index) => {
                              console.log(marker);
                              return (
                                <div key={marker.id}>
                                  <div class="w-64 bg-white h-auto rounded shadow-md pb-6">
                                    <div class="font-bold text-lg text-center py-2">
                                      {marker.deviceName}
                                    </div>
                                    <div class="px-3">
                                      <span class="text-gray-700 text-sm">
                                        Status : <span className={
                                          marker.status == "on"
                                            ? " text-center text-green-500 font-extrabold"
                                            : marker.status == "offline" ? " text-center text-red-500 font-extrabold"
                                              : " text-center text-gray-500 font-extrabold"
                                        }>
                                          {
                                            marker.status == "on"
                                              ? "On"
                                              : marker.status == "offline" ? " Offline"
                                                : " Off"
                                          }
                                        </span>
                                      </span>
                                    </div>
                                    <div class="px-3">
                                      <span class="text-gray-700 text-sm">
                                        Room Temp. (°C) :
                                        {" "}
                                        {marker.status == "offline" ? "-" : marker.status == "off" ? <span class="text-gray-700 text-sm">
                                          {marker.roomTemp}
                                        </span> : marker.roomTemp}

                                      </span>
                                    </div>
                                    <div class="px-3">
                                      <span class="text-gray-700 text-sm">
                                        Humidity (%) : {" "}
                                        {marker.status == "offline" ? "-" : marker.status == "off" ? <span class="text-gray-700 text-sm">
                                          {marker.humidity}
                                        </span> : marker.humidity}
                                      </span>
                                    </div>
                                    <div class="px-3 flex gap-2">
                                      <span class="text-gray-700 text-sm">
                                        Set Temp. (°C) : {" "}
                                        {marker.status == "on" ? <span
                                          className="text-[#5eead4] underline text-sm cursor-pointer"
                                          onClick={() =>
                                            marker.status == "on" ?
                                              onclickOPenSettemp(
                                                marker.id,
                                                marker.deviceName,
                                                marker.setTemp
                                              ) : null
                                          }
                                        >
                                          {marker.setTemp}
                                        </span> : marker.status == "off" ? <span class="text-gray-700 text-sm">
                                          {marker.setTemp}
                                        </span> : "-"}
                                      </span>
                                    </div>
                                    <div class="px-3 flex">
                                      <span class="text-gray-700 text-sm flex flex-row items-center">
                                        Control :{" "}

                                        {marker.status == "offline" ? "-" :
                                          <div className='flex flex-col items-center pl-2'>
                                            <button
                                              type="button"
                                              className={
                                                marker.control == "on"
                                                  ? "text-white bg-[#5eead4] hover:bg-gray-100 hover:text-gray-700 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center"
                                                  : marker.control == "off"
                                                    ? "text-gray-500 bg-gray-200 hover:bg-gray-100 hover:text-gray-700 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center"
                                                    : "text-white bg-red-500  font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center opacity-50 cursor-not-allowed"
                                              }
                                              onClick={() =>
                                                marker.control == "on"
                                                  ? openModalControleIsStop(
                                                    marker.id,
                                                    marker.deviceName
                                                  )
                                                  : marker.control == "off" ? openModalControleIsStart(
                                                    marker.id,
                                                    marker.deviceName
                                                  ) : null
                                              }
                                            >

                                              <IoMdPower size="1.2em" />
                                            </button><div className="text-xs  text-gray-500 font-bold">{marker.status == "offline" ? null : marker.control == "on" ? "On" : marker.control == "off" ? "Off" : "Offline"}</div></div>}


                                      </span>
                                    </div>
                                    <div class="px-3 flex gap-2">
                                      <span class="text-gray-700 text-sm">
                                        Fan Speed  : {" "}
                                        {marker.status == "on" ? <span
                                          className="text-[#5eead4] underline text-sm cursor-pointer"
                                          onClick={(event) =>
                                            marker.status == "on" ?
                                              onclickOPenSetMode(
                                                marker.id,
                                                marker.fan,
                                                marker.deviceName,
                                                event.preventDefault()
                                              ) : null
                                          }
                                        >
                                          {marker.fan == "auto" ? "Auto" : marker.fan == "low" ? "Low" : marker.fan == "medium" ? "Medium" : "High"}
                                        </span> : marker.status == "off" ? <span class="text-gray-700 text-sm">
                                          {marker.fan == "auto" ? "Auto" : marker.fan == "low" ? "Low" : marker.fan == "medium" ? "Medium" : "High"}
                                        </span> : "-"}
                                      </span>
                                    </div>
                                    <div class="px-3 flex gap-2">
                                      <span class="text-gray-700 text-sm ">
                                        Mode  : {" "}
                                        {marker.status == "on" ? <span
                                          className="text-[#5eead4] underline text-sm cursor-pointer"
                                          onClick={(event) =>
                                            marker.status == "on" ?
                                              onclickOPenSetFan(
                                                marker.id,
                                                marker.mode,
                                                marker.deviceName,
                                                event.preventDefault()
                                              ) : null
                                          }
                                        >
                                          {marker.mode == "cool" ? "Cool" : marker.mode == "dry" ? "Dry" : "Fan"}
                                        </span> : marker.status == "off" ? <span class="text-gray-700 text-sm">
                                          {marker.mode == "cool" ? "Cool" : marker.mode == "dry" ? "Dry" : "Fan"}
                                        </span> : "-"}
                                      </span>
                                    </div>
                                    <div class="px-3 flex gap-2">
                                      <span class="text-gray-700 text-sm">
                                        Automation :{" "}
                                      </span>
                                      {marker.status == "offline" ? "-" : marker.status == "off" ? <div
                                        className="toggle-container-disable"
                                        onClick={() =>
                                          marker.status == "on" ?
                                            marker.automation == "on"
                                              ? openModalAutomationIsStop(
                                                marker.id,
                                                marker.deviceName
                                              )
                                              : openModalAutomationIsStart(
                                                marker.id,
                                                marker.deviceName
                                              )
                                            : null}
                                      >
                                        <div
                                          className={`toggle-btn-disable ${marker.automation == "off" ? "disableNone" : ""
                                            }`}
                                        >
                                          {marker.automation == "on" ? "ON" : "OFF"}
                                        </div>
                                      </div> : <div
                                        className="toggle-container"
                                        onClick={() =>
                                          marker.status == "on" ?
                                            marker.automation == "on"
                                              ? openModalAutomationIsStop(
                                                marker.id,
                                                marker.deviceName
                                              )
                                              : openModalAutomationIsStart(
                                                marker.id,
                                                marker.deviceName
                                              )
                                            : null}
                                      >
                                        <div
                                          className={`toggle-btn ${marker.automation == "off" ? "disable" : ""
                                            }`}
                                        >
                                          {marker.automation == "on" ? "ON" : "OFF"}
                                        </div>
                                      </div>}

                                    </div>
                                  </div>
                                </div>
                              );
                            })
                            : Decvicetype == "IoT"
                              ? IoTDetailList.length > 0 &&
                              IoTDetailList.map((marker, index) => {
                                console.log(marker);
                                return (
                                  <div key={marker.id}>
                                    <div class="w-64 bg-white h-auto rounded shadow-md pb-6">
                                      <div class="font-bold text-lg text-center py-2">
                                        {marker.deviceName}
                                      </div>
                                      <div class="px-3">
                                        <span class="text-gray-700 text-sm">
                                          Status : <span className={
                                            marker.status == "on"
                                              ? " text-center text-green-500 font-extrabold"
                                              : marker.status == "offline" ? " text-center text-red-500 font-extrabold"
                                                : " text-center text-gray-500 font-extrabold"
                                          }>
                                            {
                                              marker.status == "on"
                                                ? "On"
                                                : marker.status == "offline" ? " Offline"
                                                  : " Off"
                                            }
                                          </span>
                                        </span>
                                      </div>
                                      <div class="px-3">
                                        <span class="text-gray-700 text-sm">
                                          Temp. (°C) :
                                          {" "}
                                          {marker.status == "offline" ? "-" : marker.status == "off" ? <span class="text-gray-700 text-sm">
                                            {marker.temp}
                                          </span> : marker.temp}

                                        </span>
                                      </div>
                                      <div class="px-3">
                                        <span class="text-gray-700 text-sm">
                                          Humidity (%) :
                                          {" "}
                                          {marker.status == "offline" ? "-" : marker.status == "off" ? <span class="text-gray-700 text-sm">
                                            {marker.humidity}
                                          </span> : marker.humidity}

                                        </span>
                                      </div>
                                      <div class="px-3">
                                        <span class="text-gray-700 text-sm">
                                          CO2 (ppm) :
                                          {" "}
                                          {marker.status == "offline" ? "-" : marker.status == "off" ? <span class="text-gray-700 text-sm">
                                            {marker.co2}
                                          </span> : marker.co2}

                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })
                              : null}
                    </div>
                  </div></div>
              );
            })}




        </div>


        <div></div>
        {loading ? (
          <Loading />
        ) : null}
        {OpenSettempModal ? (
          <div className="fixed inset-0 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="p-8 border w-auto shadow-lg rounded-md bg-white">
              <h5 className="mt-5">Set Temp. (°C) : {DeviceName}</h5>
              <NumericFormat
                type="number"
                className="border border-slate-300 rounded-md h-9 px-2 mt-3 w-80"
                min={10}
                max={40}
                value={Values}
                decimalScale={0}
                onChange={e => setValues(e.target.value)}
                onBlur={e => {
                  setValues(Math.min(maxS, Math.max(minS, Values)));
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
                  onClick={() => { handleChangeValueSettemp(DecviceId, Values,DevId); setOpenSettempModal(false) }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        ) : null}
        {ModalError ? (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="p-8 border w-auto shadow-lg rounded-md bg-white">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mt-5">
                  Something Went wrong
                </h3>
                <div className="mt-2 px-7 py-3">
                  <p className="text-lg text-gray-500 mt-2">
                    We aren&apos;t able to process your requested operation
                    Please try again{" "}
                  </p>
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
        {OpenSetModeModal ? (
          <div className="fixed inset-0 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="p-8 border w-auto shadow-lg rounded-md bg-white">

              <h5 className="mt-5">Set Fan Speed : {DeviceName}</h5>
              <div className='mt-5'>
                <ButtonGroup >
                  <Button
                    variant="outlined"
                    style={Values === "auto" ? { backgroundColor: "#5eead4", color: "white", borderBlockColor: "white", border: "1px solid", width: "100px" } : {
                      backgroundColor: "white", color: "#5eead4",
                      borderBlockColor: "#5eead4", border: "1px solid", width: "100px"
                    }}
                    onClick={() => setValues('auto')}
                  >
                    Auto
                  </Button>
                  <Button
                    variant="outlined"
                    style={Values === "1" ? { backgroundColor: "#5eead4", color: "white", borderBlockColor: "white", border: "1px solid", width: "100px" } : {
                      backgroundColor: "white", color: "#5eead4",
                      borderBlockColor: "#5eead4", border: "1px solid", width: "100px"
                    }}
                    onClick={() => setValues('1')}
                  >
                    1
                  </Button>
                  <Button
                    variant="outlined"
                    style={Values === "2" ? { backgroundColor: "#5eead4", color: "white", borderBlockColor: "white", border: "1px solid", width: "100px" } : {
                      backgroundColor: "white", color: "#5eead4",
                      borderBlockColor: "#5eead4", border: "1px solid", width: "100px"
                    }}
                    onClick={() => setValues('2')}
                  >
                    2
                  </Button>
                  <Button
                    variant="outlined"
                    style={Values === "3" ? { backgroundColor: "#5eead4", color: "white", borderBlockColor: "white", border: "1px solid", width: "100px" } : {
                      backgroundColor: "white", color: "#5eead4",
                      borderBlockColor: "#5eead4", border: "1px solid", width: "100px"
                    }}
                    onClick={() => setValues('3')}
                  >
                    3
                  </Button>
                  <Button
                    variant="outlined"
                    style={Values === "4" ? { backgroundColor: "#5eead4", color: "white", borderBlockColor: "white", border: "1px solid", width: "100px" } : {
                      backgroundColor: "white", color: "#5eead4",
                      borderBlockColor: "#5eead4", border: "1px solid", width: "100px"
                    }}
                    onClick={() => setValues('4')}
                  >
                    4
                  </Button>
                  <Button
                    variant="outlined"
                    style={Values === "5" ? { backgroundColor: "#5eead4", color: "white", borderBlockColor: "white", border: "1px solid", width: "100px" } : {
                      backgroundColor: "white", color: "#5eead4",
                      borderBlockColor: "#5eead4", border: "1px solid", width: "100px"
                    }}
                    onClick={() => setValues('5')}
                  >
                    5
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
                  onClick={() => { handleChangeValueSetFan(DecviceId, Values,DevId); setOpenSetModeModal(false) }}
                >
                  Confirm
                </button>
              </div>

            </div>
          </div>
        ) : null}
        {OpenSetFanModal ? (
          <div className="fixed inset-0 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="p-8 border w-auto shadow-lg rounded-md bg-white">

              <h5 className="mt-5">Set Mode : {DeviceName}</h5>
              <div className='mt-5'>
                <ButtonGroup >
                <Button
                    variant="outlined"
                    style={Values === "auto" ? { backgroundColor: "#5eead4", color: "white", borderBlockColor: "white", border: "1px solid", width: "100px" } : {
                      backgroundColor: "white", color: "#5eead4",
                      borderBlockColor: "#5eead4", border: "1px solid", width: "100px"
                    }}
                    onClick={() => setValues('auto')}
                  >
                    Auto
                  </Button>
                  <Button
                    variant="outlined"
                    style={Values === "cool" ? { backgroundColor: "#5eead4", color: "white", borderBlockColor: "white", border: "1px solid", width: "100px" } : {
                      backgroundColor: "white", color: "#5eead4",
                      borderBlockColor: "#5eead4", border: "1px solid", width: "100px"
                    }}
                    onClick={() => setValues('cool')}
                  >
                    Cool
                  </Button>
                  <Button
                    variant="outlined"
                    style={Values === "dry" ? { backgroundColor: "#5eead4", color: "white", borderBlockColor: "white", border: "1px solid", width: "100px" } : {
                      backgroundColor: "white", color: "#5eead4",
                      borderBlockColor: "#5eead4", border: "1px solid", width: "100px"
                    }}
                    onClick={() => setValues('dry')}
                  >
                    Dry
                  </Button>
                  <Button
                    variant="outlined"
                    style={Values === "fan" ? { backgroundColor: "#5eead4", color: "white", borderBlockColor: "white", border: "1px solid", width: "100px" } : {
                      backgroundColor: "white", color: "#5eead4",
                      borderBlockColor: "#5eead4", border: "1px solid", width: "100px"
                    }}
                    onClick={() => setValues('fan')}
                  >
                    Fan
                  </Button>
                  <Button
                    variant="outlined"
                    style={Values === "heat" ? { backgroundColor: "#5eead4", color: "white", borderBlockColor: "white", border: "1px solid", width: "100px" } : {
                      backgroundColor: "white", color: "#5eead4",
                      borderBlockColor: "#5eead4", border: "1px solid", width: "100px"
                    }}
                    onClick={() => setValues('heat')}
                  >
                    Heat
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
                  onClick={() => { handleChangeValueSetMode(DecviceId, Values,DevId); setOpenSetFanModal(false) }}
                >
                  Confirm
                </button>
              </div>

            </div>
          </div>
        ) : null}
        {OpenSettempModalVAV ? (
          <div className="fixed inset-0 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="p-8 border w-auto shadow-lg rounded-md bg-white">
              <h5 className="mt-5">Set Damper (%) : {DeviceName}</h5>

              <NumericFormat
                type="number"
                className="border border-slate-300 rounded-md h-9 px-2 mt-2 w-80"
                min={0}
                max={100}
                value={Values}
                decimalScale={2}
                onChange={e => setValues(e.target.value)}
                onBlur={e => {
                  setValues(Math.min(maxV, Math.max(minV, Values)));
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
                  onClick={() => { handleChangeValueSettempVav(DecviceId, Values,DevId); setOpenSettempModalVAV(false) }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        ) : null}
        {OpenSettempModalAHU ? (
          <div className="fixed inset-0 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="p-8 border w-auto shadow-lg rounded-md bg-white">
              <h5 className="mt-5">
                Set Supply Temp. Setpoint (°C) : {DeviceName}
              </h5>


              <NumericFormat
                type="number"
                className="border border-slate-300 rounded-md h-9 px-2 mt-2 w-80"
                min={10}
                max={40}
                value={Values}
                decimalScale={2}
                onChange={e => setValues(e.target.value)}
                onBlur={e => {
                  setValues(Math.min(maxA, Math.max(minA, Values)));
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
                  onClick={() => { handleChangeValueSettempAHU(DecviceId, Values,DevId); setOpenSettempModalAHU(false) }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        ) : null}
        {showModalControleOn ? (
          <div className="fixed inset-0 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="p-8 border w-auto shadow-lg rounded-md bg-white">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mt-5">
                  Are you sure ?
                </h3>
                <div className="mt-2 px-7 py-3">
                  <p className="text-lg text-gray-500 mt-2">
                    {" "}
                    Are you sure you want to start {DeviceName} now ?{" "}
                  </p>
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
                    onClick={() => { clickChangestatusControle(DecviceId, Values,DevId); setShowModalControleOn(false) }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {showModalControleOff ? (
          <div className="fixed inset-0 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="p-8 border w-auto shadow-lg rounded-md bg-white">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mt-5">
                  Are you sure ?
                </h3>
                <div className="mt-2 px-7 py-3">
                  <p className="text-lg text-gray-500 mt-2">
                    {" "}
                    Are you sure you want to stop {DeviceName} now ?{" "}
                  </p>
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
                    onClick={() => { clickChangestatusControle(DecviceId, Values,DevId); setShowModalControleOff(false) }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {showModalAutomationOn ? (
          <div className="fixed inset-0 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="p-8 border w-auto shadow-lg rounded-md bg-white">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mt-5">
                  Are you sure ?
                </h3>
                <div className="mt-2 px-7 py-3">
                  <p className="text-lg text-gray-500 mt-2">
                    {" "}
                    Are you sure you want to start {DeviceName} now ?{" "}
                  </p>
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
                    onClick={() => { clickChangestatusAutomation(DecviceId, Values,DevId); setShowModalAutomationAHUOn(false) }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {showModalAutomationOff ? (
          <div className="fixed inset-0 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="p-8 border w-auto shadow-lg rounded-md bg-white">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mt-5">
                  Are you sure ?
                </h3>
                <div className="mt-2 px-7 py-3">
                  <p className="text-lg text-gray-500 mt-2">
                    {" "}
                    Are you sure you want to stop {DeviceName} now ?{" "}
                  </p>
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
                    onClick={() => { clickChangestatusAutomation(DecviceId, Values,DevId); setShowModalAutomationAHUOff(false) }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {showModalAutomationAHUOn ? (
          <div className="fixed inset-0 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="p-8 border w-auto shadow-lg rounded-md bg-white">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mt-5">
                  Are you sure ?
                </h3>
                <div className="mt-2 px-7 py-3">
                  <p className="text-lg text-gray-500 mt-2">
                    {" "}
                    Are you sure you want to start {DeviceName} now ?{" "}
                  </p>
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
                    onClick={() => { clickChangestatusAutomationAHU(DecviceId, Values,DevId); setShowModalAutomationAHUOn(false) }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {showModalAutomationAHUOff ? (
          <div className="fixed inset-0 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="p-8 border w-auto shadow-lg rounded-md bg-white">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mt-5">
                  Are you sure ?
                </h3>
                <div className="mt-2 px-7 py-3">
                  <p className="text-lg text-gray-500 mt-2">
                    {" "}
                    Are you sure you want to stop {DeviceName} now ?{" "}
                  </p>
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
                    onClick={() => { clickChangestatusAutomationAHU(DecviceId, Values,DevId); setShowModalAutomationAHUOff(false) }}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <SplitTypetable SplittypeList={SplittypeList} onSubmitControl={clickChangestatusControle} onSubmitSettemp={handleChangeValueSettemp} onSubmitSetMode={handleChangeValueSetMode} onSubmitSetFan={handleChangeValueSetFan} onSubmitAutomation={clickChangestatusAutomation} />
      <AHUtable AHUlist={AHUList} onSubmitAutomation={clickChangestatusAutomationAHU} onSubmitSettemp={handleChangeValueSettempAHU} />
      <VAVtable VAVList={VAVList} onSubmitSettemp={handleChangeValueSettempVav} />
      <SmartIRtable IotList={IOTList} />

    </div>
  );
}
