"use client";
import Loading from "./Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState, useRef } from "react";
import ImageMarker, { Marker } from "react-image-marker";
import {
  ChangeValueSettempSplttpye,
  ChangeValueSetMode,
  ChangeValueSetFan,
  ChangeControlSplittypeIsOff,ChangeValueDamperVAV
} from "@/utils/api";

export default function FloorPlan({
  Data,
  AHUlist,
  VSVlist,
  Splittypelist,
  IOTlist,
}) {
  console.log(Data);
  const [Values, setValues] = useState();
  const [Decvicetype, setDevicetype] = useState();
  const [valueSettemp, setvalueSettemp] = useState();
  const [DecviceId, setDeviceId] = useState();
  const [test, setTest] = useState();
  const [Listcontrol, setListcontrol] = useState({});
  const [OpenSettempModal, setOpenSettempModal] = useState(false);
  const [OpenSettempModalVAV, setOpenSettempModalVAV] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ModalError, setModalError] = useState(false);
  const [DeviceName, setDeviceName] = useState('');
  const [toggle, setToggle] = useState(false);
  const [OpenSetModeModal, setOpenSetModeModal] = useState(false)
  const [OpenSetFanModal, setOpenSetFanModal] = useState(false)
  const handleToggleChange = () => {
    setToggle(!toggle);
  };
 
  const notifySuccess = () =>
    toast.success(
      `Operation Complete
    `,
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
    const onclickOPenSettemp = (id, DecviceId, values) => {
      console.log(id)
      setOpenSettempModal(true)
      setDeviceId(id)
      setDeviceName(DecviceId)
      setValues(values)
    }
    const onclickOPenSetMode = (id, DecviceId) => {
      setOpenSetModeModal(true)
      setDeviceId(id)
      setDeviceName(DecviceId)
    }

    const onclickOPenSetFan = (id, DecviceId) => {
      setOpenSetFanModal(true)
      setDeviceId(id)
      setDeviceName(DecviceId)
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
    const handleChangeValueSettempVav = async () => {
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

  const handleChangeValueSettemp = async () => {
    setLoading(true);
    const res = await ChangeValueSettempSplttpye(DecviceId, Values);
    if (res.status === 200) {
      console.log(res.data);
      closeModal();
      setLoading(false);
      toast.success(
        `Operation Complete
    `,
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
    } else if (res.response.status === 401) {
      closeModal();
      setLoading(false);
      setModalError(true);
    } else if (res.response.status === 500) {
      closeModal();
      setLoading(false);
      setModalError(true);
    }
  };
  const onChangeValueSettempVav = (event) => {
    setValues(event);
  };
  const onclickOPenSettempVav = (id, DecviceId, values) => {
    setOpenSettempModalVAV(true)
    setDeviceId(id)
    setDeviceName(DecviceId)
    setValues(values)
  }

  useEffect(() => {
    if (Listcontrol && Decvicetype != 0) {
      onChangeValue(Decvicetype,Listcontrol);
      
    }
  }, [Listcontrol, Decvicetype]);
  
  const onChangeValueSettemp = (event) => {
    setValues(event);
  };

  function onChangeValue (value,dataId)  {
    setListcontrol(dataId);
    setDevicetype(value);
    console.log(Values)
    console.log(Listcontrol)
   };
  
  const closeModal = () => {
    setOpenSettempModal(false);
    setOpenSetFanModal(false)
    setOpenSetModeModal(false)
    setOpenSettempModalVAV(false)
    setModalError(false);
    setDeviceId(null);
    // setShowModalStop(false);
    // setShowModalStart(false);
  };
  
  
  return (
    <div>
      <div className="grid rounded-xl bg-white p-2 shadow-default dark:border-slate-800 dark:bg-dark-box dark:text-slate-200 mt-5">
      <div className="flex flex-col gap-4 p-2">
        
          <div className="flex">
          {/* <select
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
                  </select> */}
          </div>
        </div>
        <div className="flex flex-row gap-4 p-2 ">
          <div className="flex justify-center items-center w-full">
            {/* { Data.length > 0 && Data.map((item) => {
        return <div><span>{item.name}</span></div>,
        <div><img width='100%' height='100%' src={item.imageUrl}/></div>
        })} */}

            <div style={{ position: "relative" }}>
              {Data.length > 0 &&
                Data.map((item, index) => {
                  console.log(item)
                  return (
                    <img
                      key={index}
                      style={{ width: 700, height: 700 }}
                      src={item.imageUrl}
                    />
                  );
                })}
              {AHUlist.length > 0 &&
                AHUlist.map((marker, index) => {
                  return (
                    <div>
                      <div
                        key={marker.id}
                        className="bg-red-600 rounded-full px-1 py-1"
                        style={{
                          left: marker.position.x,
                          top: marker.position.y,
                          position: "absolute",
                        }}
                      ></div>
                      <div
                        key={marker.id}
                        value={"AHU"}
                        className="w-32"
                        style={{
                          left: marker.position.x,
                          top: marker.position.y,
                          position: "absolute",
                        }}
                        onClick={() =>
                          onChangeValue(
                            "AHU",
                            [marker]
                          )
                        }
                        // onClick={() => onChangeValue('AHU',item.deviceName)}
                      >
                        <div class="bottom-arrow font-bold text-xs bg-gray-400 text-center text-white py-2">
                          {marker.deviceName}
                        </div>
                      </div>
                    </div>
                  );
                })}

              {VSVlist.length > 0 &&
                VSVlist.map((marker, index) => {
                  return (
                    <div>
                      <div
                        key={index}
                        className="bg-green-600 rounded-full px-1 py-1"
                        style={{
                          left: marker.position.x,
                          top: marker.position.y,
                          position: "absolute",
                        }}
                      ></div>
                      <div
                        key={index}
                        value={"VAV"}
                        className="w-32"
                        style={{
                          left: marker.position.x,
                          top: marker.position.y,
                          position: "absolute",
                        }}
                        onClick={() =>
                          onChangeValue(
                            
                            "VAV",
                            [marker]
                          )
                        }
                        // onClick={() => onChangeValue('VAV',item.deviceName,item.status,item.temp,item.airFlow)}
                      >
                        <div class="bottom-arrow font-bold text-xs bg-red-600 text-center text-white py-2">
                          {marker.deviceName}
                        </div>
                        {/* <div class="px-3">
                      <span class="text-gray-700 text-xs">
                      Temp. (°C) : {String(item.temp)}
                      </span></div>
                      <div class="px-3">
                      <span class="text-gray-700 text-xs">
                      Air Flow (CFM) : {String(item.airFlow)}
                      </span></div>
                      <div class="px-3">
                      <span class="text-gray-700 text-xs">
                      Damper (%) : {String(item.damper)}
                      </span>
                      </div> */}
                      </div>{" "}
                    </div>
                  );
                })}
              {Splittypelist.length > 0 &&
                Splittypelist.map((marker, index) => {
                  return (
                    <div>
                      <div
                        key={marker.id}
                        className="bg-blue-600 rounded-full px-1 py-1"
                        style={{
                          left: marker.position.x,
                          top: marker.position.y,
                          position: "absolute",
                        }}
                      ></div>

                      <div
                        key={marker.id}
                        value={"SPLIT"}
                        className="w-32"
                        style={{
                          left: marker.position.x,
                          top: marker.position.y,
                          position: "absolute",
                        }}
                        onClick={() =>
                          onChangeValue(
                            "SPLIT",
                            [marker]
                          )
                        }
                      >
                        <div class="bottom-arrow font-bold text-xs bg-red-600 text-center text-white py-2">
                          {marker.deviceName}
                          {/* <div class="px-3 bg-white">
              <span class="text-gray-700 text-xs">
              Room Temp. (°C) : {String(marker.roomTemp)}
              </span>
              
              <span class="text-gray-700 text-xs">
              Humidity (%) : {String(marker.humidity)}
              </span>
              
              <span class="text-gray-700 text-xs">
              Set Temp. (°C) : {String(marker.setTemp)}
              </span>
              </div> */}
                        </div>
                      </div>
                    </div>
                  );
                })}

              {IOTlist.length > 0 &&
                IOTlist.map((marker, index) => { 
                  return (
                    <div>
                      <div
                        key={marker.id}
                        className="bg-yellow-600 rounded-full px-1 py-1"
                        style={{
                          left: marker.position.x,
                          top: marker.position.y,
                          position: "absolute",
                        }}
                      ></div>
                      <div
                        key={marker.id}
                        value={"SPLIT"}
                        className="w-40"
                        style={{
                          left: marker.position.x,
                          top: marker.position.y,
                          position: "absolute",
                        }}
                        // onClick={() =>
                        //   onChangeValue( 
                        //     "SPLIT",
                        //     [marker]
                        //   )
                        // }
                      >
                        <div class="bottom-arrow font-bold text-xs bg-yellow-600 text-center text-white py-2">
                          {marker.deviceName}
                          {/* <div class="px-3 bg-white">
          <span class="text-gray-700 text-xs">
          Room Temp. (°C) : {String(marker.roomTemp)}
          </span>
          
          <span class="text-gray-700 text-xs">
          Humidity (%) : {String(marker.humidity)}
          </span>
          
          <span class="text-gray-700 text-xs">
          Set Temp. (°C) : {String(marker.setTemp)}
          </span>
          </div> */}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="flex justify-end w-auto">
            {Decvicetype == "VAV" ? (
              Listcontrol.length > 0 &&
              Listcontrol.map((marker, index) => {
                console.log(marker)
                return (
                  <div> 
              <div class="w-64 bg-white h-auto rounded shadow-md pb-6">
                <div class="font-bold text-lg text-center py-2">{marker.deviceName}</div>
                <div class="px-3">
                  <span class="text-gray-700 text-sm">Supply Temp. (°C) : {marker.temp}</span>
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-sm">Air Flow (CFM) : {marker.airFlow}</span>
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-sm">Damper (%) : <span className="text-[#5eead4] underline text-sm"onClick={() =>
                      onclickOPenSettempVav(marker.id,marker.deviceName,marker.damper)
                    }>{marker.damper}</span></span>
                </div>
              </div></div> )
                })
            ) : Decvicetype == "AHU" ? (
              Listcontrol.length > 0 &&
                Listcontrol.map((marker, index) => {
                  console.log(marker)
                  return (
                    <div> 
              <div key={index} class="w-64 bg-white h-auto rounded shadow-md pb-6">
                <div class="font-bold text-lg text-center py-2">
                {marker.deviceName}
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-sm">Supply Temp. (°C) : {marker.supplyTemp}</span>
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-sm">Supply Temp. Setpoint (°C) : {marker.supplyTempSetPoint}</span>
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-sm">Return Temp. (°C) : {marker.returnTemp}</span>
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-sm">VSD %Drive (Hz) : {marker.vsdDrive}</span>
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-sm">VSD Power (kW) : {marker.vsdPower}</span>
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-sm">VSD Speed (rpm) : {marker.vsdSpeed}</span>
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-sm">Control Valve (%) : {marker.controlValve}</span>
                </div>
              </div> 
              </div>
              )
                })
            ) : Decvicetype == "SPLIT" ? (
              Listcontrol.length > 0 &&
                Listcontrol.map((marker, index) => {
                  console.log(marker)
                  return (
              <div>     
              <div key={index} class="w-64 bg-white h-auto rounded shadow-md pb-6">
                <div class="font-bold text-lg text-center py-2">
                {marker.deviceName}
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-sm">Room Temp. (°C) : {marker.roomTemp}</span>
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-sm">Humidity (%) : {marker.humidity}</span>
                </div>
                <div class="px-3 flex gap-2">
                  <span
                    class="text-gray-700 text-sm"
                  >
                    Set Temp. (°C) : <span className="text-[#5eead4] underline text-sm" onClick={() =>
                      onclickOPenSettemp(marker.id,marker.deviceName,marker.setTemp)
                    }>{marker.setTemp}</span>
                  </span>
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-sm">Control : {marker.control}</span>
                </div>
                <div class="px-3 flex gap-2">
                  <span class="text-gray-700 text-sm">Fan : <span className="text-[#5eead4] underline text-sm" onClick={(event) => onclickOPenSetMode(marker.id, marker.devId,event.preventDefault())}>{marker.fan}</span></span>
                </div>
                <div class="px-3 flex gap-2">
                  <span class="text-gray-700 text-sm " 
                  >Mode : <span className="text-[#5eead4] underline text-sm" onClick={(event) => onclickOPenSetFan(marker.id, marker.devId,event.preventDefault())}>{marker.mode}</span></span>
                </div>
                <div class="px-3 flex gap-2">
                  <span class="text-gray-700 text-sm">Automation : </span><div className='toggle-container' onClick={handleToggleChange}>
           <div className={`toggle-btn ${!toggle ? "disable" : ""}`}>
               {toggle ? "ON" : "OFF"}
           </div>
       </div>
                </div>
              </div>
              </div>
                    
                  )
                })
            ) : null}
          </div>
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
                  onChangeValueSettemp(e.target.value);
                  e.preventDefault();
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
        {OpenSettempModalVAV ? (
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
                  onChangeValueSettempVav(e.target.value);
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
                  onClick={() => handleChangeValueSettempVav()}
                >
                  confirm
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <ToastContainer />
    </div>
  );
}
