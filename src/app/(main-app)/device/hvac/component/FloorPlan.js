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
  ChangeControlSplittypeIsOff,
} from "@/utils/api";

export default function FloorPlan({
  Data,
  AHUlist,
  VSVlist,
  Splittypelist,
  IOTlist,
}) {
  // console.log(Data);
  const [Values, setValues] = useState();
  const [valueSettemp, setvalueSettemp] = useState();
  const [DecviceId, setDeviceId] = useState();
  const [test, setTest] = useState();
  const [DeviceName, setDeviceName] = useState();
  const [OpenSettempModal, setOpenSettempModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ModalError, setModalError] = useState(false);

  const [toggle, setToggle] = useState(false);
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

  const onclickOPenSettemp = (id, values, devicename) => {
    setOpenSettempModal(true);
    setDeviceId(id);
    setDeviceName(devicename);
    setValues(values);
  };

  const onChangeValue = (value,dataId,dataList) => {
    console.log(dataId)
    setTest(dataList)
    setDeviceId(dataId);
    console.log(DecviceId)
    setValues(value);
    
  };

  const closeModal = () => {
    setOpenSettempModal(false);
    // setOpenSetFanModal(false)
    // setOpenSetModeModal(false)
    setModalError(false);
    setDeviceId(null);
    // setShowModalStop(false);
    // setShowModalStart(false);
  };

  
  return (
    <div>
      <ToastContainer />
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
                            {marker}+marker.id
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
                            marker
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
                            marker
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
                        className="w-32"
                        style={{
                          left: marker.position.x,
                          top: marker.position.y,
                          position: "absolute",
                        }}
                        onClick={() =>
                          onChangeValue(
                            "SPLIT",
                            marker.id,
                            marker
                          )
                        }
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
          <div className="flex justify-end  w-56">
            {Values == "VAV" ? (
              <div class="w-56 h-60 rounded shadow-md">
                <div class="font-bold text-md py-2 px-3">{DeviceName}</div>
                <div class="px-3">
                  <span class="text-gray-700 text-xs">Supply Temp. (°C)</span>
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-xs">Air Flow (CFM)</span>
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-xs">Damper (%)</span>
                </div>
              </div>
            ) : Values == "AHU" ? (
              <div class="w-56 h-60 rounded shadow-md">
                <div class="font-bold text-xs text-center py-2">
                  {DeviceName}
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-xs">Supply Temp. (°C)</span>
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-xs">Supply Temp. Setpoint (°C)</span>
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-xs">Return Temp. (°C)</span>
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-xs">VSD %Drive (Hz)</span>
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-xs">VSD Power (kW)</span>
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-xs">VSD Speed (rpm)</span>
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-xs">Control Valve (%)</span>
                </div>
              </div>
            ) : Values == "SPLIT" ? (
              <div class="w-56 h-60 rounded shadow-md">
                <div class="font-bold text-xs text-center py-2">
                  {DeviceName}
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-xs">Room Temp. (°C) :</span>
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-xs">Humidity (%) :</span>
                </div>
                <div class="px-3">
                  <span
                    class="text-gray-700 text-xs"
                    onClick={() =>
                      onclickOPenSettemp(DecviceId, valueSettemp, DeviceName)
                    }
                  >
                    Set Temp. (°C) : {valueSettemp}
                  </span>
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-xs">Control :</span>
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-xs">Fan :</span>
                </div>
                <div class="px-3">
                  <span class="text-gray-700 text-xs">Mode :</span>
                </div>
                <div class="px-3 flex gap-4">
                  <span class="text-gray-700 text-xs">Automation : </span><div className='toggle-container' onClick={handleToggleChange}>
           <div className={`toggle-btn ${!toggle ? "disable" : ""}`}>
               {toggle ? "ON" : "OFF"}
           </div>
       </div>
                </div>
              </div>
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
                  onChangeValue(e.target.value);
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
      </div>
    </div>
  );
}
