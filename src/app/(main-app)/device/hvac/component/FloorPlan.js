"use client";
import { NumericFormat } from 'react-number-format';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState, useRef } from "react";
import TextField from '@mui/material/TextField';
import { IoMdPower } from "react-icons/io";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
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
} from "@/utils/api";
import Loading from "./Loading";

export default function FloorPlan({ FloorId }) {
  console.log(FloorId);
  const [Values, setValues] = useState();
  const [Decvicetype, setDevicetype] = useState();
  const [valueSettemp, setvalueSettemp] = useState();
  const [DecviceId, setDeviceId] = useState();
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
  const [VAVList, setVAVList] = useState([]);
  const [SplittypeList, setSplittypeList] = useState([]);
  const [IOTList, setIOTList] = useState([]);
  const [floorId, setFloorId] = useState();
  const [floorplanList, setFloorplanList] = useState([]);
  const [deviceTypeList, setdeviceTypeList] = useState([]);
  const [option, setOption] = useState("All Type");
  const minS = 10;
  const maxS = 40;
  const minV = 0;
  const maxV = 100;
  const minA = 10;
  const maxA = 40;
  useEffect(() => {
    if (FloorId != 0) {
      getfloorplan(FloorId);
      getAHUList(FloorId);
      getVAVList(FloorId);
      getSplittypeList(FloorId);
      getIOTList(FloorId);
    }
  }, [FloorId]);
  
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
  const getfloorplan = async (floorId) => {
    setFloorId(floorId);
    const result = await getFloorplanHvac(floorId);
    let data = [];
    data.push(result.data);
    console.log(result.data);
    setFloorplanList(data);

    console.log(result.data.deviceType);
    setdeviceTypeList(result.data.deviceType);
    // if (result.data.deviceType.length > 0) {
    //   console.log(result.data.deviceType)
    //   setdeviceTypeList(result.data.deviceType)
    // }
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

  const handleToggleChange = () => {
    setToggle(!toggle);
  };


    

  const handleChangeValueSetFan = async () => {
    setLoading(true);
    const res = await ChangeValueSetFan(DecviceId, Values);
    if (res.status === 200) {
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      console.log(res.data);
      closeModal();
      setLoading(false);
      notifySuccess(res.data.title,res.data.message);
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
  const onclickOPenSettemp = (id, DecviceId, values) => {
    console.log(id);
    
    setDeviceId(id);
    setDeviceName(DecviceId);
    setValues(values);
    setOpenSettempModal(true);
  };
  const onclickOPenSetMode = (id, fan,DecviceId) => {
    
    setDeviceId(id);
    setValues(fan)
    setDeviceName(DecviceId);
    setOpenSetModeModal(true);
  };

  const onclickOPenSetFan = (id, mode,DecviceId) => {
    setDeviceId(id);
    setValues(mode)
    setDeviceName(DecviceId);
    setOpenSetFanModal(true);
  };

  const handleChangeValueSetMode = async () => {
    setLoading(true);
    const res = await ChangeValueSetMode(DecviceId, Values);
    if (res.status === 200) {
      console.log(res.data);
      closeModal();
      setLoading(false);
      notifySuccess(res.data.title,res.data.message);
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
  const handleChangeValueSettempVav = async () => {
    setLoading(true);
    const res = await ChangeValueDamperVAV(DecviceId, Values);
    if (res.status === 200) {
      console.log(res.data);
      closeModal();
      setLoading(false);
      notifySuccess(res.data.title,res.data.message);
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

  const handleChangeValueSettemp = async () => {
    setLoading(true);
    const res = await ChangeValueSettempSplttpye(DecviceId, Values);
    if (res.status === 200) {
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      console.log(res.data);
      closeModal();
      setLoading(false);
      notifySuccess(res.data.title,res.data.message);
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
  const onChangeValueSettempVav = (event) => {
    setValues(event);
  };
  const onChangeValueSettempAHU = (event) => {
    setValues(event);
  };
  const onclickOPenSettempVav = (id, DecviceId, values) => {
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
  const handleChangeValueSettempAHU = async () => {
    setLoading(true);
    const res = await ChangeValueSettempAHU(DecviceId, Values);
    if (res.status === 200) {
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      console.log(res.data);
      closeModal();
      setLoading(false);
      notifySuccess(res.data.title,res.data.message);
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

  useEffect(() => {
    if (Listcontrol && Decvicetype != 0) {
      onChangeValue(Decvicetype, Listcontrol);
    }
  }, [Listcontrol, Decvicetype]);

  const onChangeValueSettemp = (event) => {
    setValues(event);
  };

  function onChangeValue(value, dataId) {
    setListcontrol(dataId);
    setDevicetype(value);
    console.log(Values);
    console.log(Listcontrol);
  }

  async function clickChangestatusControle() {
    setLoading(true);
    const res = await ChangeControlSplittype(DecviceId, Values);
    if (res.status === 200) {
      console.log(res.data);
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      closeModal();
      setLoading(false);
      notifySuccess(res.data.title,res.data.message);
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

  async function clickChangestatusAutomation() {
    setLoading(true);
    const res = await ChangeAutomationSplittype(DecviceId, Values);
    if (res.status === 200) {
      console.log(res.data);
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      closeModal();
      setLoading(false);
      notifySuccess(res.data.title,res.data.message);
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
  async function clickChangestatusAutomationAHU() {
    setLoading(true);
    const res = await ChangeAutomationAHU(DecviceId, Values);
    if (res.status === 200) {
      console.log(res.data);
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      closeModal();
      setLoading(false);
      notifySuccess(res.data.title,res.data.message);
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
                  console.log(item);
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
                  console.log(item);
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
                            className="w-60 cursor-pointer"
                            style={{
                              left: marker.position.x,
                              top: marker.position.y,
                              position: "absolute",
                            }}
                            onClick={() => onChangeValue("AHU", [marker])}
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
                                  {String(marker.supplyTemp.toFixed(2))}
                                </span>
                              </div>
                              <div class="px-3">
                                <span class="text-gray-700 text-xs ">
                                  Supply Temp. Setpoint (°C) :{" "}
                                  {String(marker.supplyTempSetPoint.toFixed(2))}
                                </span>
                              </div>
                              <div class="px-3">
                                <span class="text-gray-700 text-xs">
                                  Return Temp. (°C) :{" "}
                                  {String(marker.returnTemp.toFixed(2))}
                                </span>
                              </div>
                              <div class="px-3">
                                <span class="text-gray-700 text-xs">
                                  VSD %Drive (Hz) : {String(marker.vsdDrive.toFixed(2))}
                                </span>
                              </div>
                              <div class="px-3">
                                <span class="text-gray-700 text-xs">
                                  VSD Power (kW) : {String(marker.vsdPower.toFixed(2))}
                                </span>
                              </div>
                              <div class="px-3">
                                <span class="text-gray-700 text-xs">
                                  VSD Speed (rpm) : {String(marker.vsdSpeed.toFixed(2))}
                                </span>
                              </div>
                              <div class="px-3">
                                <span class="text-gray-700 text-xs">
                                  Control Valve (%) :{" "}
                                  {String(marker.controlValve.toFixed(2))}
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
                            onClick={() => onChangeValue("VAV", [marker])}
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
                                  Temp. (°C) : {marker.temp.toFixed(2)}
                                </span>
                              </div>
                              <div class="px-3">
                                <span class="text-gray-700 text-xs">
                                  Air Flow (CFM) : {marker.airFlow.toFixed(2)}
                                </span>
                              </div>
                              <div class="px-3">
                                <span class="text-gray-700 text-xs">
                                  Damper (%) : {marker.damper.toFixed(2)}
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
                              marker.control == "on"
                                ? "bg-[#5eead4] rounded-full px-1 py-1"
                                : marker.control == "offline"
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
                            onClick={() => onChangeValue("SPLIT", [marker])}
                          >
                            <div
                              class={
                                marker.control == "on"
                                  ? "bottom-arrow font-bold text-xs bg-[#5eead4] text-center text-white py-2 border border-black"
                                  : marker.control == "offline"
                                  ? "  bottom-arrow font-bold text-xs bg-red-500 text-center text-white py-2 border border-black"
                                  : "bottom-arrow font-bold text-xs bg-gray-300 text-center text-white py-2 border border-black"
                              }
                            >
                              {marker.deviceName}
                            </div>
                            <div className="bg-white border border-black ml-4">
                              <div class="px-3 ">
                                <span class="text-gray-700 text-xs">
                                  Room Temp. (°C) : {String(marker.roomTemp.toFixed(2))}
                                </span>
                              </div>
                              <div class="px-3 ">
                                <span class="text-gray-700 text-xs">
                                  Humidity (%) : {String(marker.humidity.toFixed(2))}
                                </span>
                              </div>
                              <div class="px-3 ">
                                <span class="text-gray-700 text-xs">
                                  Set Temp. (°C) : {String(marker.setTemp.toFixed(2))}
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
                              onChangeValue(
                                "IoT",
                                [marker]
                              )
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
                                Temp. (°C) :  {marker.temp.toFixed(2)}
                                </span></div>
                                <div class="px-3 ">
                                <span class="text-gray-700 text-xs">
                                  Humidity (%) : {marker.humidity.toFixed(2)}
                                </span></div>
                                <div class="px-3 ">
                                <span class="text-gray-700 text-xs">
                                CO2 (ppm) : : {marker.co2.toFixed(2)}
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
                      return (
                        <div key={marker.id}>
                          <div
                            className={
                              marker.control == "on"
                                ? "bg-[#5eead4] rounded-full px-1 py-1"
                                : marker.control == "offline"
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
                            onClick={() => onChangeValue("SPLIT", [marker])}
                          >
                            <div
                              class={
                                marker.control == "on"
                                  ? "bottom-arrow font-bold text-xs bg-[#5eead4] text-center text-white py-2 border border-black"
                                  : marker.control == "offline"
                                  ? "  bottom-arrow font-bold text-xs bg-red-500 text-center text-white py-2 border border-black"
                                  : "bottom-arrow font-bold text-xs bg-gray-300 text-center text-white py-2 border border-black"
                              }
                            >
                              {marker.deviceName}
                            </div>
                            <div className="bg-white border border-black ml-4">
                              <div class="px-3 ">
                                <span class="text-gray-700 text-xs">
                                  Room Temp. (°C) : {String(marker.roomTemp.toFixed(2))}
                                </span>
                              </div>
                              <div class="px-3 ">
                                <span class="text-gray-700 text-xs">
                                  Humidity (%) : {String(marker.humidity.toFixed(2))}
                                </span>
                              </div>
                              <div class="px-3 ">
                                <span class="text-gray-700 text-xs">
                                  Set Temp. (°C) : {String(marker.setTemp.toFixed(2))}
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
                            className="w-60 cursor-pointer"
                            style={{
                              left: marker.position.x,
                              top: marker.position.y,
                              position: "absolute",
                            }}
                            onClick={() => onChangeValue("AHU", [marker])}
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
                                  {String(marker.supplyTemp.toFixed(2))}
                                </span>
                              </div>
                              <div class="px-3">
                                <span class="text-gray-700 text-xs ">
                                  Supply Temp. Setpoint (°C) :{" "}
                                  {String(marker.supplyTempSetPoint.toFixed(2))}
                                </span>
                              </div>
                              <div class="px-3">
                                <span class="text-gray-700 text-xs">
                                  Return Temp. (°C) :{" "}
                                  {String(marker.returnTemp.toFixed(2))}
                                </span>
                              </div>
                              <div class="px-3">
                                <span class="text-gray-700 text-xs">
                                  VSD %Drive (Hz) : {String(marker.vsdDrive.toFixed(2))}
                                </span>
                              </div>
                              <div class="px-3">
                                <span class="text-gray-700 text-xs">
                                  VSD Power (kW) : {String(marker.vsdPower.toFixed(2))}
                                </span>
                              </div>
                              <div class="px-3">
                                <span class="text-gray-700 text-xs">
                                  VSD Speed (rpm) : {String(marker.vsdSpeed.toFixed(2))}
                                </span>
                              </div>
                              <div class="px-3">
                                <span class="text-gray-700 text-xs">
                                  Control Valve (%) :{" "}
                                  {String(marker.controlValve.toFixed(2))}
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
                            onClick={() => onChangeValue("VAV", [marker])}
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
                                  Temp. (°C) : {marker.temp.toFixed(2)}
                                </span>
                              </div>
                              <div class="px-3">
                                <span class="text-gray-700 text-xs">
                                  Air Flow (CFM) : {marker.airFlow.toFixed(2)}
                                </span>
                              </div>
                              <div class="px-3">
                                <span class="text-gray-700 text-xs">
                                  Damper (%) : {marker.damper.toFixed(2)}
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
                              onChangeValue(
                                "IoT",
                                [marker]
                              )
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
                                Temp. (°C) :  {marker.temp.toFixed(2)}
                                </span></div>
                                <div class="px-3 ">
                                <span class="text-gray-700 text-xs">
                                  Humidity (%) : {marker.humidity.toFixed(2)}
                                </span></div>
                                <div class="px-3 ">
                                <span class="text-gray-700 text-xs">
                                CO2 (ppm) : : {marker.co2.toFixed(2)}
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
              ? Listcontrol.length > 0 &&
                Listcontrol.map((marker, index) => {
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
                          {marker.status}
                          </span> 
                          </span>
                        </div>
                        <div class="px-3">
                          <span class="text-gray-700 text-sm">
                            Temp. (°C) : {" "}
                            {marker.status == "offline" ? "-" : marker.status == "off" ? <span class="text-gray-700 text-sm">
                             {marker.temp.toFixed(2)}
                          </span> : marker.temp.toFixed(2)}
                          </span>
                        </div>
                        <div class="px-3">
                          <span class="text-gray-700 text-sm">
                            Air Flow (CFM) : {" "}
                            {marker.status == "offline" ? "-" : marker.status == "off" ? <span class="text-gray-700 text-sm">
                             {marker.airFlow.toFixed(2)}
                          </span> : marker.airFlow.toFixed(2)}
                            
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
                                  marker.damper
                                ) : null
                              }
                            >
                              {marker.damper.toFixed(2)}
                            </span> : marker.status == "off" ? <span class="text-gray-700 text-sm">
                             {marker.damper.toFixed(2)}
                          </span> : "-"}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              : Decvicetype == "AHU"
              ? Listcontrol.length > 0 &&
                Listcontrol.map((marker, index) => {
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
                          {marker.status}
                          </span> 
                          </span>
                        </div>
                        <div class="px-3">
                          <span class="text-gray-700 text-sm">
                            Supply Temp. (°C) : {" "}
                            {marker.status == "offline" ? "-" : marker.status == "off" ? <span class="text-gray-700 text-sm">
                             {marker.supplyTemp.toFixed(2)}
                          </span> : marker.supplyTemp.toFixed(2)}
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
                              {marker.supplyTempSetPoint.toFixed(2)}
                            </span> : marker.status == "off" ? <span class="text-gray-700 text-sm">
                             {marker.supplyTempSetPoint.toFixed(2)}
                          </span> : "-"}
                          </span>
                        </div>
                        <div class="px-3">
                          <span class="text-gray-700 text-sm">
                            Return Temp. (°C) : {" "}
                            {marker.status == "offline" ? "-" : marker.status == "off" ? <span class="text-gray-700 text-sm">
                             {marker.returnTemp.toFixed(2)}
                          </span> : marker.returnTemp.toFixed(2)}
                          </span>
                        </div>
                        <div class="px-3">
                          <span class="text-gray-700 text-sm">
                            VSD %Drive (Hz) : {" "}
                            {marker.status == "offline" ? "-" : marker.status == "off" ? <span class="text-gray-700 text-sm">
                             {marker.vsdDrive.toFixed(2)}
                          </span> : marker.vsdDrive.toFixed(2)}
                          </span>
                        </div>
                        <div class="px-3">
                          <span class="text-gray-700 text-sm">
                            VSD Power (kW) : {" "}
                            {marker.status == "offline" ? "-" : marker.status == "off" ? <span class="text-gray-700 text-sm">
                             {marker.vsdPower.toFixed(2)}
                          </span> : marker.vsdPower.toFixed(2)}
                          </span>
                        </div>
                        <div class="px-3">
                          <span class="text-gray-700 text-sm">
                            VSD Speed (rpm) : {" "}
                            {marker.status == "offline" ? "-" : marker.status == "off" ? <span class="text-gray-700 text-sm">
                             {marker.vsdSpeed.toFixed(2)}
                          </span> : marker.vsdSpeed.toFixed(2)}
                          </span>
                        </div>
                        <div class="px-3">
                          <span class="text-gray-700 text-sm">
                            Control Valve (%) : {" "}
                            {marker.status == "offline" ? "-" : marker.status == "off" ? <span class="text-gray-700 text-sm">
                             {marker.controlValve.toFixed(2)}
                          </span> : marker.controlValve.toFixed(2)}
                          </span>
                        </div>
                        <div class="px-3 flex gap-2">
                          <span class="text-gray-700 text-sm">
                            Automation :{" "}
                          </span>
                          {" "}
                            {marker.status == "offline" ? "-" : <div
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
                              className={`toggle-btn ${
                                marker.automation == "off" ? "disable" : ""
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
              ? Listcontrol.length > 0 &&
                Listcontrol.map((marker, index) => {
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
                          {marker.status}
                          </span> 
                          </span>
                        </div>
                        <div class="px-3">
                          <span class="text-gray-700 text-sm">
                            Room Temp. (°C) : 
                            {" "}
                            {marker.status == "offline" ? "-" : marker.status == "off" ? <span class="text-gray-700 text-sm">
                             {marker.roomTemp.toFixed(2)}
                          </span> : marker.roomTemp.toFixed(2)}
                            
                          </span>
                        </div>
                        <div class="px-3">
                          <span class="text-gray-700 text-sm">
                            Humidity (%) : {" "}
                            {marker.status == "offline" ? "-" : marker.status == "off" ? <span class="text-gray-700 text-sm">
                             {marker.humidity.toFixed(2)}
                          </span> : marker.humidity.toFixed(2)}
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
                              {marker.setTemp.toFixed(2)}
                            </span> : marker.status == "off" ? <span class="text-gray-700 text-sm">
                             {marker.setTemp.toFixed(2)}
                          </span> : "-"}
                          </span>
                        </div>
                        <div class="px-3">
                          <span class="text-gray-700 text-sm">
                            Control :{" "}
                            
                            {marker.status == "offline" ? "-" : <button
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
                              
                              <IoMdPower size="1.2em"/>
                            </button>}
                            {marker.control}
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
                              {marker.fan}
                            </span> : marker.status == "off" ? <span class="text-gray-700 text-sm">
                             {marker.fan}
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
                              {marker.mode}
                            </span> : marker.status == "off" ? <span class="text-gray-700 text-sm">
                             {marker.mode}
                          </span> : "-"}
                          </span>
                        </div>
                        <div class="px-3 flex gap-2">
                          <span class="text-gray-700 text-sm">
                            Automation :{" "}
                          </span>
                          {marker.status == "offline" ? "-" : <div
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
                              className={`toggle-btn ${
                                marker.automation == "off" ? "disable" : ""
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
              ? Listcontrol.length > 0 &&
                Listcontrol.map((marker, index) => {
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
                          {marker.status}
                          </span> 
                          </span>
                        </div>
                        <div class="px-3">
                          <span class="text-gray-700 text-sm">
                          Temp. (°C) : 
                          {" "}
                            {marker.status == "offline" ? "-" : marker.status == "off" ? <span class="text-gray-700 text-sm">
                             {marker.temp.toFixed(2)}
                          </span> : marker.temp.toFixed(2)}
                          
                          </span>
                        </div>
                        <div class="px-3">
                          <span class="text-gray-700 text-sm">
                          Humidity (%) : 
                          {" "}
                            {marker.status == "offline" ? "-" : marker.status == "off" ? <span class="text-gray-700 text-sm">
                             {marker.humidity.toFixed(2)}
                          </span> : marker.humidity.toFixed(2)}
                          
                          </span>
                        </div>
                        <div class="px-3">
                          <span class="text-gray-700 text-sm">
                          CO2 (ppm) : 
                          {" "}
                            {marker.status == "offline" ? "-" : marker.status == "off" ? <span class="text-gray-700 text-sm">
                             {marker.co2.toFixed(2)}
                          </span> : marker.co2.toFixed(2)}
                          
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
        {/* 
        {VSVlist.length > 0 &&
          VSVlist.map((item) => {
            return (
              <div
                key={item.id}
                value={"VAV"}
                class="max-w-48 rounded overflow-hidden shadow-lg border border-black"
                style={{ left: item.position.x, top: item.position.y }}
                // onClick={() => onChangeValue('VAV',item.deviceName,item.status,item.temp,item.airFlow)}
              >
                <div class="font-bold text-xs bg-red-600 text-center text-white py-2">
                  {item.deviceName}
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-xs">
                    Temp. (°C) : {String(item.temp)}
                  </span>
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-xs">
                    Air Flow (CFM) : {String(item.airFlow)}
                  </span>
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-xs">
                    Damper (%) : {String(item.damper)}
                  </span>
                </div>
              </div>
            );
          })}
        {AHUlist.length > 0 &&
          AHUlist.map((item) => {
            return (
              <div
                key={item.id}
                value={"AHU"}
                class="max-w-48 rounded overflow-hidden shadow-lg border border-black"
                style={{ left: item.position.x, top: item.position.y }}
                // onClick={() => onChangeValue('AHU',item.deviceName)}
              >
                <div class="font-bold text-xs bg-gray-400 text-center text-white py-2">
                  {item.deviceName}
                </div>
                <div class="px-3 py-2">
                  <span class="text-gray-700 text-xs">
                    Supply Temp. (°C) : {String(item.supplyTemp)}
                  </span>
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-xs ">
                    Supply Temp. Setpoint (°C) :{" "}
                    {String(item.supplyTempSetPoint)}
                  </span>
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-xs">
                    Return Temp. (°C) : {String(item.returnTemp)}
                  </span>
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-xs">
                    VSD %Drive (Hz) : {String(item.vsdDrive)}
                  </span>
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-xs">
                    VSD Power (kW) : {String(item.vsdPower)}
                  </span>
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-xs">
                    VSD Speed (rpm) : {String(item.vsdSpeed)}
                  </span>
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-xs">
                    Control Valve (%) : {String(item.controlValve)}
                  </span>
                </div>
              </div>
            );
          })}

        {Splittypelist.length > 0 &&
          Splittypelist.map((item) => {
            return (
              <div
                key={item.id}
                value={"SPLIT"}
                class="max-w-48 rounded overflow-hidden shadow-lg border border-black"
                style={{ left: item.position.x, top: item.position.y }}
                onClick={() =>
                  onChangeValue("SPLIT", item.deviceName, item.id, item.setTemp)
                }
              >
                <div class="font-bold text-xs bg-red-600 text-center text-white py-2">
                  {item.deviceName}
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-xs">
                    Room Temp. (°C) : {String(item.roomTemp)}
                  </span>
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-xs">
                    Humidity (%) : {String(item.humidity)}
                  </span>
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-xs">
                    Set Temp. (°C) : {String(item.setTemp)}
                  </span>
                </div>
              </div>
            );
          })}

        {IOTlist.length > 0 &&
          IOTlist.map((item) => {
            return (
              <div
                key={item.id}
                value={"IOT"}
                class="max-w-48 rounded overflow-hidden shadow-lg border border-black"
                style={{ left: item.position.x, top: item.position.y }}
                onClick={(e) => {
                  onChangeValue(e.target.value);
                }}
              >
                <div class="font-bold text-xs bg-red-600 text-center text-white py-2">
                  {item.deviceName}
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-xs">
                    Temp. (°C) : {String(item.temp)}
                  </span>
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-xs">
                    Humidity (%) : {String(item.humidity)}
                  </span>
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-xs">
                    CO2 (ppm) : {String(item.co2)}
                  </span>
                </div>
              </div>
            );
          })} */}

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
        setValues(Math.min(maxS, Math.max(minS, Values)).toFixed(2));
    }}
              />
    {/* <input
    type="number"
    className="border border-slate-300 rounded-md h-9 px-2 mt-2 w-80" 
    maxLength={Math.max(minS.toString().length, maxS.toString().length)}
    value={Values}
    min={minS}
    max={maxS}
    onChange={e => setValues(e.target.value)}
    onBlur={e => {
      if (Values && !isNaN(Values))
        setValues(Math.min(maxS, Math.max(minS, Values)));
    }}
/> */}
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

                <div className="flex justify-center mt-8 gap-5">
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
                <h5 className="mt-5">Set Mode : {DeviceName}</h5>
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
        setValues(Math.min(maxV, Math.max(minV, Values)).toFixed(2));
    }}
              />
      {/* <input
    type="number"
    className="border border-slate-300 rounded-md h-9 px-2 mt-2 w-80" 
    maxLength={Math.max(minV.toString().length, maxV.toString().length + 3)}
    min={minV}
    max={maxV}
    value={Values}
    onChange={e => setValues(e.target.value)}
    onBlur={e => {
      if (Values && !isNaN(Values))
        setValues(Math.min(maxV, Math.max(minV, Values)).toFixed(2));
    }}
/> */}
              <div className="flex justify-center mt-10 gap-5">
                <button
                  className="px-4 py-2 bg-white text-[#14b8a6] border border-teal-300 font-medium rounded-md  focus:outline-none"
                  onClick={() => closeModal()}
                >
                  cancel
                </button>
                <button
                  className="px-4 py-2 bg-[#14b8a6] text-white font-medium rounded-md  focus:outline-none"
                  onClick={() => handleChangeValueSettempVav()}
                >
                  confirm
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
        setValues(Math.min(maxA, Math.max(minA, Values)).toFixed(2));
    }}
              />
              {/* <input
    type="number"
    className="border border-slate-300 rounded-md h-9 px-2 mt-2 w-80" 
    maxLength={Math.max(minA.toString().length, maxA.toString().length + 3)}
    min={minA}
    max={maxA}
    value={Values}
    onChange={e => setValues(e.target.value)}
    onBlur={e => {
      if (Values && !isNaN(Values))
        setValues(Math.min(maxA, Math.max(minA, Values)).toFixed(2));
    }}
/> */}
              <div className="flex justify-center mt-10 gap-5">
                <button
                  className="px-4 py-2 bg-white text-[#14b8a6] border border-teal-300 font-medium rounded-md  focus:outline-none"
                  onClick={() => closeModal()}
                >
                  cancel
                </button>
                <button
                  className="px-4 py-2 bg-[#14b8a6] text-white font-medium rounded-md  focus:outline-none"
                  onClick={() => handleChangeValueSettempAHU()}
                >
                  confirm
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
                    cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-[#14b8a6] text-white font-medium rounded-md  focus:outline-none"
                    onClick={() => clickChangestatusControle()}
                  >
                    confirm
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
                    cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-[#14b8a6] text-white font-medium rounded-md  focus:outline-none"
                    onClick={() => clickChangestatusControle()}
                  >
                    confirm
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
                    cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-[#14b8a6] text-white font-medium rounded-md  focus:outline-none"
                    onClick={() => clickChangestatusAutomationAHU()}
                  >
                    confirm
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
                    cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-[#14b8a6] text-white font-medium rounded-md  focus:outline-none"
                    onClick={() => clickChangestatusAutomationAHU()}
                  >
                    confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      
      
    </div>
  );
}
