"use client";
import Loading from "./Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState, useRef } from "react";
import ImageMarker, { Marker } from "react-image-marker";
import {
  getFloorplanIoT,getdeviceparameter,getindoortemphumid,getoutdoortemphumid,getPressuregauge,getPowerMeter,getInveter,getFlowMeter,getMotionSensor,getLighting,getCounter,getSmartIR,getEfficiency,getCCTV,getCO2Sensor,
  getWaterMeter,getHeater,getHeaterWater,ChangeControlLightning,ChangeControlSmartIR,SmartIRSetTemp, ChangeSetModeSmartIR, ChangeSetFanSmartIR 
} from "@/utils/api";
import Heatertable from "./Heatertable";
import VAVtable from "./Outdoorhumidtable";
import SmartIRtable from "./SmartIRtable";
import WaterMetertable from "./WaterMetertable";
import ChartAHU from "./chart";
import ChartSplittype from "./chartSplittype";
import CO2Sensor from "./CO2tble";
import HeaterWatertable from "./Heaterwater";
import CCTV from "./CCTVtable";
import Efficiency from "./Efficiencytable";
import OutdoorHumid from "./Outdoorhumidtable";
import IndoorHumid from "./Indoorhumidtable";
import Pressuregauge from "./Pressuregaugetable";
import Chart from "./chart";
import PowerMeter from "./Powermetertable";
import Inverter from "./Invertertable";
import FlowMeter from "./FlowMetertable";
import MotionSensor from "./Motiontable";
import Counter from "./CounterTable";
import Ligthing from "./Ligthingtable";
import { NumericFormat } from 'react-number-format';
import { IoMdPower } from "react-icons/io";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
export default function FloorPlan({ FloorId }) {
  // console.log(FloorId);
  const [Values, setValues] = useState();
  const [Decvicetype, setDevicetype] = useState();
  const [valueSettemp, setvalueSettemp] = useState();
  const [DecviceId, setDeviceId] = useState();
  const [Listcontrol, setListcontrol] = useState({});
  const [OpenSettempModal, setOpenSettempModal] = useState(false);
  const [OpenSetModeModal, setOpenSetModeModal] = useState(false);
  const [OpenSetFanModal, setOpenSetFanModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ModalError, setModalError] = useState(false);
  const [DeviceName, setDeviceName] = useState("");
  const [toggle, setToggle] = useState(false);
  const [showModalControleOnLighting, setShowModalControleOnLighting] = useState(false);
  const [showModalControleOffLighting, setShowModalControleOffLighting] = useState(false);
  const [showModalControleOnSmartIr, setShowModalControleOnSmartIr] = useState(false);
  const [showModalControleOffSmartIr, setShowModalControleOffSmartIr] = useState(false);
  const [alerttitle, setAlertTitle] = useState("");
  const [alertmassage, setAlertmessage] = useState("");
  const [indoortemphumidList, setIndoortemphumidList] = useState([]);
  const [outdoortemphumidList, setOutdoortemphumidList] = useState([]);
  const [PressuregaugeList, setPressuregaugeList] = useState([]);
  const [PowerMeterList, setPowerMeterList] = useState([]);
  const [InveterList, setInveterList] = useState([]);
  const [FlowMeterList, setFlowMeterList] = useState([]);
  const [MotionSensorList, setMotionSensorList] = useState([]);
  const [LightingList, setLightingList] = useState([]);
  const [CounterList, setCounterList] = useState([]);
  const [SmartIRList, setSmartIRList] = useState([]);
  const [EfficiencyList, setEfficiencyList] = useState([]);
  const [CCTVList, setCCTVList] = useState([]);
  const [CO2SensorList, setCO2SensorList] = useState([]);
  const [WaterMeterList, setWaterMeterList] = useState([]);
  const [HeaterList, setHeaterList] = useState([]);
  const [HeaterWaterList, setHeaterWaterList] = useState([]);
  const [deviceTypeId,setdeviceTypeId] = useState();
  const [floorId, setFloorId] = useState();
  const [floorplanList, setFloorplanList] = useState([]);
  const [deviceTypeList, setdeviceTypeList] = useState([]);
  const [option, setOption] = useState("All Type");
  const [isFirst,setIsfirst] = useState(true)
  const min = 10;
  const max = 40;
  useEffect(() => {
    if (FloorId != 0 && option) {
      getfloorplan(FloorId);
      OnchangeListFloorplan(option)
    }
  }, [FloorId,option]);
  

  const getfloorplan = async (floorId) => {
    setFloorId(floorId);
    const result = await getFloorplanIoT(floorId);
    let data = [];
    data.push(result.data);
    // console.log(result.data);
    setFloorplanList(data);
    setdeviceTypeList(result.data.deviceType);
    if(isFirst) {
      const selected = result.data.deviceType.find(item => item.displayName.toLowerCase() === ("All Type").toLowerCase() );
      setdeviceTypeId(selected.id)
      setIsfirst(false)
    }
  
    
  
  };
  const getIndoortemphumidList = async (floorId) => {
    setFloorId(floorId);
    console.log(floorId);
    const result = await getindoortemphumid(floorId);
    console.log(result.data);
    setIndoortemphumidList(result.data);
  
    };
  const getoutdoortemphumidList = async (floorId) => {
    setFloorId(floorId);
    
    const result = await getoutdoortemphumid(floorId);
    
    setOutdoortemphumidList(result.data);
    console.log(result.data.id)
    setdeviceTypeId(result.data.id)
  };
  const getPressuregaugeList = async (floorId) => {
    setFloorId(floorId);
    console.log(floorId);
    const result = await getPressuregauge(floorId);
    console.log(result.data);
    setPressuregaugeList(result.data);
    console.log(result.data.id)
    setdeviceTypeId(result.data.id)
  };
  const getPowerMeterList = async (floorId) => {
    setFloorId(floorId);
    console.log(floorId);
    const result = await getPowerMeter(floorId);
    console.log(result.data);
    setPowerMeterList(result.data);
  };
  const getInveterList = async (floorId) => {
    setFloorId(floorId);
    console.log(floorId);
    const result = await getInveter(floorId);
    console.log(result.data);
    setInveterList(result.data);
  };
  const getFlowMeterList = async (floorId) => {
    setFloorId(floorId);
    console.log(floorId);
    const result = await getFlowMeter(floorId);
    console.log(result.data);
    setFlowMeterList(result.data);
  };
  const getMotionSensorList = async (floorId) => {
    setFloorId(floorId);
    console.log(floorId);
    const result = await getMotionSensor(floorId);
    console.log(result.data);
    setMotionSensorList(result.data);
  };
  const getLightingList = async (floorId) => {
    setFloorId(floorId);
    console.log(floorId);
    const result = await getLighting(floorId);
    console.log(result.data);
    setLightingList(result.data);
  };
  const getCounterList = async (floorId) => {
    setFloorId(floorId);
    console.log(floorId);
    const result = await getCounter(floorId);
    console.log(result.data);
    setCounterList(result.data);
  };
  const getSmartIRList = async (floorId) => {
    setFloorId(floorId);
    console.log(floorId);
    const result = await getSmartIR(floorId);
    console.log(result.data);
    setSmartIRList(result.data);
  };
  const getEfficiencyList = async (floorId) => {
    setFloorId(floorId);
    console.log(floorId);
    const result = await getEfficiency(floorId);
    console.log(result.data);
    setEfficiencyList(result.data);
  };
  const getCCTVList = async (floorId) => {
    setFloorId(floorId);
    console.log(floorId);
    const result = await getCCTV(floorId);
    console.log(result.data);
    setCCTVList(result.data);
  };
  const getCO2SensorList = async (floorId) => {
    setFloorId(floorId);
    console.log(floorId);
    const result = await getCO2Sensor(floorId);
    console.log(result.data);
    setCO2SensorList(result.data);
  };
  const getWaterMeterList = async (floorId) => {
    setFloorId(floorId);
    console.log(floorId);
    const result = await getWaterMeter(floorId);
    console.log(result.data);
    setWaterMeterList(result.data);
  };
  const getHeaterList = async (floorId) => {
    setFloorId(floorId);
    console.log(floorId);
    const result = await getHeater(floorId);
    console.log(result.data);
    setHeaterList(result.data);
  };
  const getHeaterWaterList = async (floorId) => {
    setFloorId(floorId);
    console.log(floorId);
    const result = await getHeaterWater(floorId);
    console.log(result.data);
    setHeaterWaterList(result.data);
  };
  const onclickOPenSetMode = (id, fan,DecviceId) => {
    
    setDeviceId(id);
    setValues(fan)
    setDeviceName(DecviceId);
    setOpenSetModeModal(true);
  };
  const openModalControleIsStopLighting = (DecviceId, deviceName) => {
    setDeviceId(DecviceId);
    setValues("off");
    setDeviceName(deviceName);
    setShowModalControleOffLighting(true);
  };
  const openModalControleIsStartLighting = (DecviceId, deviceName) => {
    setDeviceId(DecviceId);
    setValues("on");
    setDeviceName(deviceName);
    setShowModalControleOnLighting(true);
  };
  const openModalControleIsStopSmartIr = (DecviceId, deviceName) => {
    setDeviceId(DecviceId);
    setValues("off");
    setDeviceName(deviceName);
    setShowModalControleOffSmartIr(true);
  };
  const openModalControleIsStartSmartIr = (DecviceId, deviceName) => {
    setDeviceId(DecviceId);
    setValues("on");
    setDeviceName(deviceName);
    setShowModalControleOnSmartIr(true);
  };
  const onclickOPenSetFan = (id, mode,DecviceId) => {
    setDeviceId(id);
    setValues(mode)
    setDeviceName(DecviceId);
    setOpenSetFanModal(true);
  };
  function onChangeValue(value, dataId) {
    setListcontrol(dataId);
    setDevicetype(value);
    console.log(Values);
    console.log(Listcontrol);
  }
  const onclickOPenSettemp = (id, DecviceId, values) => {
    console.log(id);
    setOpenSettempModal(true);
    setDeviceId(id);
    setDeviceName(DecviceId);
    setValues(values);
  };


  const handleToggleChange = () => {
    setToggle(!toggle);
  };

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

  const handleChangeValueSetFan = async () => {
    setLoading(true);
    const res = await ChangeSetFanSmartIR(DecviceId, Values);
    if (res.status === 200) {
      console.log(res.data);
      closeModal();
      setLoading(false);
      notifySuccess(res.data.title,res.data.message);
    } else if (res.response.status === 401) {
      closeModal();
      setAlertTitle(res.response.data.title);
      setAlertmessage(res.response.data.message);
      setLoading(false);
    }
    else if (res.response.status === 500) {
      closeModal();
      setAlertTitle(res.response.data.title);
      setAlertmessage(res.response.data.message);
      
      setLoading(false);
    }
  };
  
 
  const handleChangeValueSetMode = async () => {
    setLoading(true);
    const res = await ChangeSetModeSmartIR(DecviceId, Values);
    if (res.status === 200) {
      console.log(res.data);
      closeModal();
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      setLoading(false);
      notifySuccess(res.data.title,res.data.message);
    } else if (res.response.status === 401) {
      closeModal();
      setAlertTitle(res.response.data.title);
      setAlertmessage(res.response.data.message);
      setLoading(false);
    }
    else if (res.response.status === 500) {
      closeModal();
      setAlertTitle(res.response.data.title);
      setAlertmessage(res.response.data.message);
      
      setLoading(false);
    }
  };
  
  const handleChangeValueSettemp = async () => {
    setLoading(true);
    const res = await SmartIRSetTemp(DecviceId, Values);
    if (res.status === 200) {
      console.log(res.data);
      closeModal();
      setLoading(false);
      notifySuccess(res.data.title,res.data.message);
    } else if (res.response.status === 401) {
      closeModal();
      setAlertTitle(res.response.data.title);
      setAlertmessage(res.response.data.message);
      setLoading(false);
    }
    else if (res.response.status === 500) {
      closeModal();
      setAlertTitle(res.response.data.title);
      setAlertmessage(res.response.data.message);
      
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Listcontrol && Decvicetype != 0) {
      onChangeValue(Decvicetype, Listcontrol);
    }
  }, [Listcontrol, Decvicetype]);

  // const onChangeValueSettemp = (event) => {
  //   setValues(event);
  // };

  

  async function clickChangestatusControleLighting() {
    setLoading(true);
    const res = await ChangeControlLightning(DecviceId, Values);
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
  async function clickChangestatusControleSmartIr() {
    setLoading(true);
    const res = await ChangeControlSmartIR(DecviceId, Values);
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

  
  const OnchangeListFloorplan = (event) => {
    const selectedValue = event
    const selected = deviceTypeList.find(item => item.id === parseInt(selectedValue));
    if (selected){
      console.log(selected.id)
      setdeviceTypeId(selected.id);
      setOption(selected.displayName)
    }
   
 
  
    if (option == "All Type"){
      getIndoortemphumidList(FloorId);
      getoutdoortemphumidList(FloorId);
      getPressuregaugeList(FloorId);
      getPowerMeterList(FloorId);
      getInveterList(FloorId);
      getFlowMeterList(FloorId);
      getMotionSensorList(FloorId);
      getLightingList(FloorId);
      getCounterList(FloorId);
      getSmartIRList(FloorId);
      getEfficiencyList(FloorId);
      getCCTVList(FloorId);
      getCO2SensorList(FloorId);
      getWaterMeterList(FloorId);
      getHeaterList(FloorId);
      getHeaterWaterList(FloorId);
      console.log(option)
      
    }
    else if(option == "Indoor Temp & Humid"){getIndoortemphumidList(FloorId);}
    else if(option == "Outdoor Temp & Humid"){getoutdoortemphumidList(FloorId);}
    else if(option == "Pressure Gauge"){getPressuregaugeList(FloorId);}
    else if(option == "Power Meter"){getPowerMeterList(FloorId);}
    else if(option == "Inverter"){getInveterList(FloorId);}
    else if(option == "Flow Meter"){getFlowMeterList(FloorId);}
    else if(option == "Motion Sensor"){getMotionSensorList(FloorId);}
    else if(option == "Lighting"){getLightingList(FloorId);}
    else if(option == "Counter"){getCounterList(FloorId);}
    else if(option == "Smart IR"){getSmartIRList(FloorId);}
    else if(option == "Efficiency"){getEfficiencyList(FloorId);}
    else if(option == "CCTV"){getCCTVList(FloorId);}
    else if(option == "CO2 Sensor"){getCO2SensorList(FloorId);}
    else if(option == "Water Meter"){getWaterMeterList(FloorId);}
    else if(option == "Heater"){getHeaterList(FloorId);}
    else if(option == "Heater Water"){getHeaterWaterList(FloorId);}
  }

  const closeModal = () => {
    setOpenSettempModal(false);
    setOpenSetFanModal(false);
    setOpenSetModeModal(false);
    setShowModalControleOnLighting(false);
    setShowModalControleOffLighting(false);
    setShowModalControleOnSmartIr(false);
    setShowModalControleOffSmartIr(false);
    setModalError(false);
    setDeviceId(null);
    // setShowModalStop(false);
    // setShowModalStart(false);
  };

  function titleCase(str) {
    return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
  }
  return (
    <div>
      <div className="grid rounded-xl bg-white p-2 shadow-default dark:border-slate-800 dark:bg-dark-box dark:text-slate-200 mt-5">
        <div className="flex flex-col gap-4 p-2">
        
              {floorplanList.length > 0 &&
                floorplanList.map((item, index) => {
                  
                  return (
                    <div key={item.id}>
                      <div className="flex flex-row gap-4 p-2">
                      <span className="text-lg  font-bold">IoT Floor</span>
                      <span className="text-lg  font-bold">{item.name}</span>
            <select
              className="w-auto border border-slate-300 mx-2 rounded-md h-9 px-3"
              onChange={(event) => OnchangeListFloorplan(event.target.value)}
              value={deviceTypeId}
            >
              
              {deviceTypeList.length > 0 &&
                deviceTypeList.map((item) => {
                  return (
                  <option className="rounded-lg" key={item.id} value={item.id}> {item.displayName}</option>)
                })}
            </select>
            {/* <p>Selected ID: {deviceTypeId.id}</p>
        <p>Selected Label: {deviceTypeId.label}</p> */}
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
                  {indoortemphumidList.length > 0 &&
                    indoortemphumidList.map((marker, index) => {
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
                            className="w-auto"
                            style={{
                              left: marker.position.x,
                              top: marker.position.y,
                              position: "absolute",
                            }}
                            onClick={() => onChangeValue("SPLIT", [marker])}
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
                          </div>
                        </div>
                      );
                    })}
                     {outdoortemphumidList.length > 0 &&
                    outdoortemphumidList.map((marker, index) => {
                      // //
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
                            className="w-auto"
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
                          </div>
                        </div>
                      );
                    })}
                    {PressuregaugeList.length > 0 &&
                   PressuregaugeList.map((marker, index) => {
                      //
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
                            className="w-auto"
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
                          </div>
                        </div>
                      );
                    })}
                    {PowerMeterList.length > 0 &&
                    PowerMeterList  .map((marker, index) => {
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
                            className="w-auto"
                            style={{
                              left: marker.position.x,
                              top: marker.position.y,
                              position: "absolute",
                            }}
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
                            </div></div>
                        </div>
                      );
                    })}
                    {InveterList.length > 0 &&
                    InveterList.map((marker, index) => {
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
                            className="w-auto"
                            style={{
                              left: marker.position.x,
                              top: marker.position.y,
                              position: "absolute",
                            }}
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
                           
                          </div>
                        </div>
                      );
                    })}
                    {FlowMeterList.length > 0 &&
                      FlowMeterList.map((marker, index) => {
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
                              className="w-auto"
                              style={{
                                left: marker.position.x,
                                top: marker.position.y,
                                position: "absolute",
                              }}
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
                              
                            </div>
                          </div>  
                        );
                      })}
                    {MotionSensorList.length > 0 &&
                    MotionSensorList .map((marker, index) => {
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
                            className="w-auto "
                            style={{
                              left: marker.position.x,
                              top: marker.position.y,
                              position: "absolute",
                            }}>
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
                            
                          </div>
                        </div>
                      );
                    })}
                     {LightingList.length > 0 &&
                    LightingList.map((marker, index) => {
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
                            className="w-44"
                            style={{
                              left: marker.position.x,
                              top: marker.position.y,
                              position: "absolute",
                            }}
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
                            
                          </div>
                        </div>
                      );
                    })}
                    {CounterList.length > 0 &&
                    CounterList.map((marker, index) => {
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
                            className="w-44"
                            style={{
                              left: marker.position.x,
                              top: marker.position.y,
                              position: "absolute",
                            }}
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
                            
                          </div>
                        </div>
                      );
                    })}
                    {SmartIRList.length > 0 &&
                    SmartIRList.map((marker, index) => {
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
                            className="w-44"
                            style={{
                              left: marker.position.x,
                              top: marker.position.y,
                              position: "absolute",
                            }}
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
                            
                          </div>
                        </div>
                      );
                    })}
                    {EfficiencyList.length > 0 &&
                    EfficiencyList.map((marker, index) => {
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
                            className="w-44"
                            style={{
                              left: marker.position.x,
                              top: marker.position.y,
                              position: "absolute",
                            }}>
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
                            
                          </div>
                        </div>
                      );
                    })}
                    {CCTVList.length > 0 &&
                    CCTVList.map((marker, index) => {
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
                            className="w-44"
                            style={{
                              left: marker.position.x,
                              top: marker.position.y,
                              position: "absolute",
                            }} >
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
                            </div>
                        </div>
                      );
                    })}
                    {CO2SensorList.length > 0 &&
                    CO2SensorList.map((marker, index) => {
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
                            className="w-44"
                            style={{
                              left: marker.position.x,
                              top: marker.position.y,
                              position: "absolute",
                            }} >
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
                            
                          </div>
                        </div>
                      );
                    })}
                    {WaterMeterList.length > 0 &&
                    WaterMeterList.map((marker, index) => {
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
                            className="w-44"
                            style={{
                              left: marker.position.x,
                              top: marker.position.y,
                              position: "absolute",
                            }}>
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
                            
                          </div>
                        </div>
                      );
                    })}
                    {HeaterList.length > 0 &&
                    HeaterList.map((marker, index) => {
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
                            className="w-44"
                            style={{
                              left: marker.position.x,
                              top: marker.position.y,
                              position: "absolute",
                            }}>
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
                           
                          </div>
                        </div>
                      );
                    })}
                    {HeaterWaterList.length > 0 &&
                    HeaterWaterList.map((marker, index) => {
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
                            className="w-44"
                            style={{
                              left: marker.position.x,
                              top: marker.position.y,
                              position: "absolute",
                            }}>
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
                           
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : option == "Indoor Temp & Humid" ? (
                <div>
                  {indoortemphumidList.length > 0 &&
                    indoortemphumidList.map((marker, index) => {
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
                            value={"1"}
                            className="w-auto"
                            style={{
                              left: marker.position.x,
                              top: marker.position.y,
                              position: "absolute",
                            }}
                            onClick={() => onChangeValue("1", [marker])}
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
              ) : option == "Outdoor Temp & Humid" ? (
                <div>
                  {outdoortemphumidList.length > 0 &&
                    outdoortemphumidList.map((marker, index) => {
                      //
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
                            value={"2"}
                            className="w-auto"
                            style={{
                              left: marker.position.x,
                              top: marker.position.y,
                              position: "absolute",
                            }}
                            onClick={() => onChangeValue("2", [marker])}
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
                                Temp. (°C) :{" "}
                                  {String(marker.roomTemp )}
                                </span>
                              </div>
                              <div class="px-3">
                                <span class="text-gray-700 text-xs ">
                                Humidity (%) :{" "}
                                  {String(marker.humidity)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : option == "Pressure Gauge" ? (
                <div>
                  {PressuregaugeList.length > 0 &&
                   PressuregaugeList.map((marker, index) => {
                      //
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
                            value={"3"}
                            className="w-auto"
                            style={{
                              left: marker.position.x,
                              top: marker.position.y,
                              position: "absolute",
                            }}
                            onClick={() => onChangeValue("3", [marker])}
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
                                  Pressure : {marker.pressure}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : option == "Power Meter" ? (
                <div>
                   {PowerMeterList.length > 0 &&
                    PowerMeterList  .map((marker, index) => {
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
                            value={"4"}
                            className="w-auto"
                            style={{
                              left: marker.position.x,
                              top: marker.position.y,
                              position: "absolute",
                            }}
                            onClick={() => onChangeValue("4", [marker])}
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
                                Power (kW) : {marker.power}
                                </span></div>
                                <div class="px-3 ">
                                <span class="text-gray-700 text-xs">
                                Current (A) : {marker.current}
                                </span></div>
                                <div class="px-3 ">
                                <span class="text-gray-700 text-xs">
                                Volt (V) : {marker.volt}
                                </span></div>
                                <div class="px-3 ">
                                <span class="text-gray-700 text-xs">
                                Energy import (kWh) : {marker.energy_import}
                                </span></div>
                                <div class="px-3 ">
                                <span class="text-gray-700 text-xs">
                                Energy export (kWh) : {marker.energy_export}
                                </span></div>
                              
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : option == "Inverter" ? (
                <div>
                   {InveterList.length > 0 &&
                    InveterList.map((marker, index) => {
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
                            value={"5"}
                            className="w-auto"
                            style={{
                              left: marker.position.x,
                              top: marker.position.y,
                              position: "absolute",
                            }}
                            onClick={() => onChangeValue("5", [marker])}
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
                                Power (kW) : {marker.power}
                                </span></div>
                                <div class="px-3 ">
                                <span class="text-gray-700 text-xs">
                                Current (A) : {marker.current}
                                </span></div>
                                <div class="px-3 ">
                                <span class="text-gray-700 text-xs">
                                Volt (V) : {marker.volt}
                                </span></div>
                                <div class="px-3 ">
                                <span class="text-gray-700 text-xs">
                                Energy (kWh)  : {marker.energy}
                                </span></div>
                              
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : option == "Flow Meter" ? (
                <div>
                   {FlowMeterList.length > 0 &&
                    FlowMeterList.map((marker, index) => {
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
                            value={"6"}
                            className="w-auto"
                            style={{
                              left: marker.position.x,
                              top: marker.position.y,
                              position: "absolute",
                            }}
                            onClick={() => onChangeValue("6", [marker])}
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
                                Flow (gal/min) : {marker.flow}
                                </span></div>
                            </div>
                          </div>
                        </div>  
                      );
                    })}
                </div>
              ) : option == "Motion Sensor" ? (
                <div>
                   {MotionSensorList.length > 0 &&
                    MotionSensorList .map((marker, index) => {
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
                            value={"7"}
                            className="w-auto "
                            style={{
                              left: marker.position.x,
                              top: marker.position.y,
                              position: "absolute",
                            }}
                            onClick={() => onChangeValue("7", [marker])}>
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
                                Detected : {String(marker.detect)}
                                </span></div>
                                </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : option == "Lighting" ? (
                <div>
                   {LightingList.length > 0 &&
                    LightingList.map((marker, index) => {
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
                            value={"8"}
                            className="w-44"
                            style={{
                              left: marker.position.x,
                              top: marker.position.y,
                              position: "absolute",
                            }}
                            onClick={() =>
                              onChangeValue(
                                "8",
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
                            
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : option == "Counter" ? (
                <div>
                   {CounterList.length > 0 &&
                    CounterList.map((marker, index) => {
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
                            value={"9"}
                            className="w-44"
                            style={{
                              left: marker.position.x,
                              top: marker.position.y,
                              position: "absolute",
                            }}
                            onClick={() => onChangeValue("9", [marker])}
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
                                  Pieces : {marker.pieces}
                                </span></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : option == "Smart IR" ? (
                <div>
                   {SmartIRList.length > 0 &&
                    SmartIRList.map((marker, index) => {
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
                            value={"10"}
                            className="w-44"
                            style={{
                              left: marker.position.x,
                              top: marker.position.y,
                              position: "absolute",
                            }}
                            onClick={() =>
                              onChangeValue(
                                "10",
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
                                  Set Temp. (°C) : {marker.setTemp}
                                </span></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : option == "Efficiency" ? (    
                <div>
                   {EfficiencyList.length > 0 &&
                    EfficiencyList.map((marker, index) => {
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
                            value={"11"}
                            className="w-44"
                            style={{
                              left: marker.position.x,
                              top: marker.position.y,
                              position: "absolute",
                            }}
                            onClick={() =>
                              onChangeValue(
                                "11",
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
                                Efficiency : {marker.efficiency}
                                </span></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : option == "CCTV" ? ( 
                <div>
                   {CCTVList.length > 0 &&
                    CCTVList.map((marker, index) => {
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
                            value={"12"}
                            className="w-44"
                            style={{
                              left: marker.position.x,
                              top: marker.position.y,
                              position: "absolute",
                            }}  onClick={() => onChangeValue("12", [marker])}>
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
                            </div>
                        </div>
                      );
                    })}
                </div>
              ) : option == "CO2 Sensor" ? (
                <div>
                   {CO2SensorList.length > 0 &&
                    CO2SensorList.map((marker, index) => {
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
                            value={"13"}
                            className="w-44"
                            style={{
                              left: marker.position.x,
                              top: marker.position.y,
                              position: "absolute",
                            }} onClick={() => onChangeValue("13", [marker])} >
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
                                  CO2 (ppm) : {marker.co2}
                                </span></div>
                                 </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : option == "Water Meter" ? (
                <div>
                   {WaterMeterList.length > 0 &&
                    WaterMeterList.map((marker, index) => {
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
                            value={"14"}
                            className="w-44"
                            style={{
                              left: marker.position.x,
                              top: marker.position.y,
                              position: "absolute",
                            }} onClick={() => onChangeValue("14", [marker])}>
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
                                Flow (m3/min) : {marker.flow}
                                </span></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : option == "Heater" ? (
                <div>
                   {HeaterList.length > 0 &&
                    HeaterList.map((marker, index) => {
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
                            value={"15"}
                            className="w-44"
                            style={{
                              left: marker.position.x,
                              top: marker.position.y,
                              position: "absolute",
                            }} onClick={() => onChangeValue("15", [marker])}>
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
                                Temp (°C) : {marker.temp}
                                </span></div>
                                <div class="px-3 ">
                                <span class="text-gray-700 text-xs">
                                Power (kW) : {marker.power}
                                </span></div> 
                               </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : option == "Heater Water" ? (
                <div>
                {HeaterWaterList.length > 0 &&
                 HeaterWaterList.map((marker, index) => {
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
                            value={"16"}
                            className="w-44"
                            style={{
                              left: marker.position.x,
                              top: marker.position.y,
                              position: "absolute",
                            }}  onClick={() => onChangeValue("16", [marker])}>
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
                                Temp (°F) : {marker.temp}
                                </span></div>
                               </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : 
              null}
            </div>
          </div>
          <div className="flex justify-end w-auto">
            {Decvicetype == "1"
              ? Listcontrol.length > 0 && 
                Listcontrol.map((marker, index) => {
                  //
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
                          {titleCase(marker.status)}
                          </span> 
                          </span>
                        </div>
                        <div class="px-3">
                          <span class="text-gray-700 text-sm">
                          Room Temp. (°C) : {marker.roomTemp}
                          </span>
                        </div>
                        <div class="px-3">
                          <span class="text-gray-700 text-sm">
                          Humidity (%) : {marker.humidity }
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              : Decvicetype == "2"
              ? Listcontrol.length > 0 && 
              Listcontrol.map((marker, index) => {
                //
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
                        {titleCase(marker.status)}
                        </span> 
                        </span>
                      </div>
                      <div class="px-3">
                        <span class="text-gray-700 text-sm">
                        Room Temp. (°C) : {marker.roomTemp}
                        </span>
                      </div>
                      <div class="px-3">
                        <span class="text-gray-700 text-sm">
                        Humidity (%) : {marker.humidity }
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
              : Decvicetype == "3"
              ? Listcontrol.length > 0 && 
              Listcontrol.map((marker, index) => {
                //
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
                        {titleCase(marker.status)}
                        </span> 
                        </span>
                      </div>
                      <div class="px-3">
                        <span class="text-gray-700 text-sm">
                        Pressure (bar) : {marker.pressure}
                        </span>
                      </div>
                      
                    </div>
                  </div>
                );
              })
              : Decvicetype == "4"
              ? Listcontrol.length > 0 && 
              Listcontrol.map((marker, index) => {
                //
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
                        {titleCase(marker.status)}
                        </span> 
                        </span>
                      </div>
                      <div class="px-3">
                        <span class="text-gray-700 text-sm">
                        Power (kW) : {marker.power}
                        </span>
                      </div>
                      <div class="px-3">
                        <span class="text-gray-700 text-sm">
                        Current (A) : {marker.current}
                        </span>
                      </div>
                      <div class="px-3">
                        <span class="text-gray-700 text-sm">
                        Volt (V) : {marker.volt}
                        </span>
                      </div>
                      <div class="px-3">
                        <span class="text-gray-700 text-sm">
                        Energy import (kWh) : {marker.energy_import}
                        </span>
                      </div>
                      <div class="px-3">
                        <span class="text-gray-700 text-sm">
                        Energy export (kWh) : {marker.energy_export}
                        </span>
                      </div>
                      
                    </div>
                  </div>
                );
              })
              : Decvicetype == "5"
              ? Listcontrol.length > 0 && 
              Listcontrol.map((marker, index) => {
                //
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
                        {titleCase(marker.status)}
                        </span> 
                        </span>
                      </div>
                      <div class="px-3">
                        <span class="text-gray-700 text-sm">
                        Power (kW) : {marker.power}
                        </span>
                      </div>
                      <div class="px-3">
                        <span class="text-gray-700 text-sm">
                        Current (A) : {marker.current}
                        </span>
                      </div>
                      <div class="px-3">
                        <span class="text-gray-700 text-sm">
                        Volt (V) : {marker.volt}
                        </span>
                      </div>
                      <div class="px-3">
                        <span class="text-gray-700 text-sm">
                        Energy (kWh) : {marker.energy}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
              : Decvicetype == "6"
              ? Listcontrol.length > 0 && 
              Listcontrol.map((marker, index) => {
                //
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
                        {titleCase(marker.status)}
                        </span> 
                        </span>
                      </div>
                      <div class="px-3">
                        <span class="text-gray-700 text-sm">
                        Flow (gal/min) : {marker.flow}
                        </span>
                      </div>
                      
                    </div>
                  </div>
                );
              })
              : Decvicetype == "7"
              ? Listcontrol.length > 0 && 
              Listcontrol.map((marker, index) => {
                //
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
                        {titleCase(marker.status)}
                        </span> 
                        </span>
                      </div>
                      <div class="px-3">
                        <span class="text-gray-700 text-sm">
                        Detected : {String(marker.detect)}
                        </span>
                      </div>
                      
                    </div>
                  </div>
                );
              })
              : Decvicetype == "8"
              ? Listcontrol.length > 0 &&
                Listcontrol.map((marker, index) => {
                  //
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
                        {titleCase(marker.status)}
                        </span> 
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
                                  ? openModalControleIsStopLighting(
                                      marker.id,
                                      marker.deviceName
                                    )
                                  : marker.control == "off" ? openModalControleIsStartLighting(
                                      marker.id,
                                      marker.deviceName
                                    ) : null
                              }
                            >
                               
                              <IoMdPower size="1.2em"/>
                            </button><div className="text-xs  text-gray-500 font-bold">{ titleCase(marker.control)}</div></div>}
                            
                            
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
                : Decvicetype == "9"
              ? Listcontrol.length > 0 && 
              Listcontrol.map((marker, index) => {
                //
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
                        {titleCase(marker.status)}
                        </span> 
                        </span>
                      </div>
                      <div class="px-3">
                        <span class="text-gray-700 text-sm">
                        Pieces : {marker.pieces}
                        </span>
                      </div>
                      
                    </div>
                  </div>
                );
              })
              : Decvicetype == "10"
              ? Listcontrol.length > 0 &&
              Listcontrol.map((marker, index) => {
                //
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
                        {titleCase(marker.status)}
                        </span> 
                        </span>
                      </div>
                      <div class="px-3 flex gap-2">
                        <span class="text-gray-700 text-sm">
                          Set Temp. (°C) : {" "}
                          {marker.status == "on" ? <span
                            className="text-[#5eead4] underline text-sm"
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
                                ? "text-white bg-[#5eead4] hover:bg-gray-100 hover:text-gray-700 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                                : marker.control == "off"
                                ? "text-gray-500 bg-gray-200 hover:bg-gray-100 hover:text-gray-700 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                                : "text-white bg-red-500  font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center opacity-50 cursor-not-allowed"
                            }
                            onClick={() =>
                              marker.control == "on"
                                ? openModalControleIsStopSmartIr(
                                    marker.id,
                                    marker.deviceName
                                  )
                                : marker.control == "off" ? openModalControleIsStartSmartIr(
                                    marker.id,
                                    marker.deviceName
                                  ) : null
                            }
                          >
                          <IoMdPower size="1.2em"/>
                          </button><div className="text-xs  text-gray-500 font-bold">{titleCase(marker.control)}</div></div>}
                          
                        </span>
                      </div>
                      <div class="px-3 flex gap-2">
                        <span class="text-gray-700 text-sm">
                          Fan  : {" "}
                          {marker.status == "on" ? <span
                            className="text-[#5eead4] underline text-sm"
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
                            {titleCase(marker.fan)}
                          </span> : marker.status == "off" ? <span class="text-gray-700 text-sm">
                           {titleCase(marker.fan)}
                        </span> : "-"}
                        </span>
                      </div>
                      <div class="px-3 flex gap-2">
                        <span class="text-gray-700 text-sm ">
                          Mode  : {" "}
                          {marker.status == "on" ? <span
                            className="text-[#5eead4] underline text-sm"
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
                            {titleCase(marker.mode)}
                          </span> : marker.status == "off" ? <span class="text-gray-700 text-sm">
                           {titleCase(marker.mode)}
                        </span> : "-"}
                        </span>
                      </div>
                     
                    </div>
                  </div>
                );
              })
              : Decvicetype == "11"
              ? Listcontrol.length > 0 && 
              Listcontrol.map((marker, index) => {
                //
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
                        {titleCase(marker.status)}
                        </span> 
                        </span>
                      </div>
                      <div class="px-3">
                        <span class="text-gray-700 text-sm">
                        Efficiency (%) : {marker.efficiency}
                        </span>
                      </div>
                      
                    </div>
                  </div>
                );
              })
              : Decvicetype == "12"
              ? Listcontrol.length > 0 && 
              Listcontrol.map((marker, index) => {
                //
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
                        {titleCase(marker.status)}
                        </span> 
                        </span>
                      </div>
                      
                      
                    </div>
                  </div>
                );
              })
              : Decvicetype == "13"
              ? Listcontrol.length > 0 && 
              Listcontrol.map((marker, index) => {
                //
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
                        {titleCase(marker.status)}
                        </span> 
                        </span>
                      </div>
                      <div class="px-3">
                        <span class="text-gray-700 text-sm">
                        CO2 (ppm) : {marker.co2}
                        </span>
                      </div>
                      
                    </div>
                  </div>
                );
              })
              : Decvicetype == "14"
              ? Listcontrol.length > 0 && 
              Listcontrol.map((marker, index) => {
                //
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
                        {titleCase(marker.status)}
                        </span> 
                        </span>
                      </div>
                      <div class="px-3">
                        <span class="text-gray-700 text-sm">
                        Flow (m3/min) : {marker.flow}
                        </span>
                      </div>
                      
                    </div>
                  </div>
                );
              })
              : Decvicetype == "15"
              ? Listcontrol.length > 0 &&
              Listcontrol.map((marker, index) => { 
                //
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
                        {titleCase(marker.status)}
                        </span> 
                        </span>
                      </div>
                      <div class="px-3">
                        <span class="text-gray-700 text-sm">
                        Temp. (°C) : {marker.temp}
                        </span>
                      </div>
                      <div class="px-3">
                        <span class="text-gray-700 text-sm">
                        Power (kW) : {marker.power}
                        </span>
                      </div>
                      <div class="px-3">
                        <span class="text-gray-700 text-sm">
                        Model : {marker.model}
                        </span>
                      </div>
                      <div class="px-3">
                        <span class="text-gray-700 text-sm">
                        Waste : {marker.waste}
                        </span>
                      </div>
                      <div class="px-3">
                        <span class="text-gray-700 text-sm">
                        Counter : {marker.counter}
                        </span>
                      </div>
                    
                      <div class="px-3">
                        <span class="text-gray-700 text-sm">
                          Control :{" "}
                          {marker.status == "offline" ? "-" : <button
                            type="button"
                            className={
                              marker.control == "on"
                                ? "text-white bg-[#5eead4] hover:bg-gray-100 hover:text-gray-700 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                                : marker.control == "off"
                                ? "text-gray-500 bg-gray-200 hover:bg-gray-100 hover:text-gray-700 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                                : "text-white bg-red-500  font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center opacity-50 cursor-not-allowed"
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
                            {marker.control}
                          </button>}
                          
                        </span>
                      </div>
                     
                     
                    </div>
                  </div>
                );
              })
              : Decvicetype == "16"
              ? Listcontrol.length > 0 && 
              Listcontrol.map((marker, index) => {
                //
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
                        {titleCase(marker.status)}
                        </span> 
                        </span>
                      </div>
                      <div class="px-3">
                        <span class="text-gray-700 text-sm">
                        Temp (°F) : {marker.temp}
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
                  onClick={() => handleChangeValueSettemp()}
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
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-[#14b8a6] text-white font-medium rounded-md  focus:outline-none"
                    onClick={() => handleChangeValueSetFan()}
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
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-[#14b8a6] text-white font-medium rounded-md  focus:outline-none"
                    onClick={() => handleChangeValueSetMode()}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {showModalControleOnSmartIr ? (
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
                    onClick={() => clickChangestatusControleSmartIr()}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {showModalControleOffSmartIr ? (
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
                    onClick={() => clickChangestatusControleSmartIr()}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {showModalControleOnLighting ? (
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
                    onClick={() => clickChangestatusControleLighting()}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {showModalControleOffLighting ? (
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
                    onClick={() => clickChangestatusControleLighting()}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>

              {option == "All Type" ? (
                <div>
                 <IndoorHumid Indoorlist={indoortemphumidList} />
                 <OutdoorHumid Outdoorlist={outdoortemphumidList} />
                 <Pressuregauge Pressuregaugelist={PressuregaugeList} />
                 <PowerMeter PowerMeterlist={PowerMeterList} />
                 <Inverter Inverterlist={InveterList} />
                 <FlowMeter FlowMeterlist={FlowMeterList} />
                 <MotionSensor Motionsensorlist={MotionSensorList} />
                 <Ligthing Ligthinglist={LightingList} />
                 <Counter Counterlist={CounterList} />
                 <SmartIRtable SmartIRlist={SmartIRList} />
                 <Efficiency Efficiencylist={EfficiencyList} />
                 <CCTV CCTVlist={CCTVList} />
                 <CO2Sensor CO2Sensorlist={CO2SensorList} />
                 <WaterMetertable Watermeterlist={WaterMeterList} />
                 <Heatertable Heaterlist={HeaterList} />
                 <HeaterWatertable HeaterWaterlist={HeaterWaterList} />
                 </div>
              ) : option == "Indoor Temp & Humid" ? (
                <IndoorHumid Indoorlist={indoortemphumidList} />
              ) : option == "Outdoor Temp & Humid" ? (
                <OutdoorHumid Outdoorlist={outdoortemphumidList} />
              ) : option == "Pressure Gauge" ? (
                <Pressuregauge Pressuregaugelist={PressuregaugeList} />
              ) : option == "Power Meter" ? (
                <PowerMeter PowerMeterlist={PowerMeterList} />
              ) : option == "Inverter" ? (
                <Inverter Inverterlist={InveterList} />
              ) : option == "Flow Meter" ? (
                <FlowMeter FlowMeterlist={FlowMeterList} />
              ) : option == "Motion Sensor" ? (
                <MotionSensor Motionsensorlist={MotionSensorList} />
              ) : option == "Lighting" ? (
                <Ligthing Ligthinglist={LightingList} />
              ) : option == "Counter" ? (
                <Counter Counterlist={CounterList} />
              ) : option == "Smart IR" ? (
                <SmartIRtable SmartIRlist={SmartIRList} />
              ) : option == "Efficiency" ? (    
                <Efficiency Efficiencylist={EfficiencyList} />
              ) : option == "CCTV" ? ( 
                <CCTV CCTVlist={CCTVList} />
              ) : option == "CO2 Sensor" ? (
                <CO2Sensor CO2Sensorlist={CO2SensorList} />
              ) : option == "Water Meter" ? (
                <WaterMetertable Watermeterlist={WaterMeterList} />
              ) : option == "Heater" ? (
                <Heatertable Heaterlist={HeaterList} />
              ) : option == "Heater Water" ? (
                <HeaterWatertable HeaterWaterlist={HeaterWaterList} />
              ) : 
              null}
               
              {option != "All Type" || "CCTV" ? (
                <Chart deviceTypeId={deviceTypeId} />
               ): null}
      
    </div>
  );
}
