"use client";

import { NumericFormat } from "react-number-format";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import TextField from "@mui/material/TextField";
import { IoMdPower } from "react-icons/io";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import {
  ChangeValueSettempSplttpye,
  ChangeValueSetMode,
  ChangeValueSetFan,
  ChangeControlSplittype,
  ChangeAutomationSplittype,
} from "@/utils/api";
import Loading from "./Loading";

export default function SplitTypetable({SplittypeList,onSubmitControl,onSubmitSettemp,onSubmitSetMode,onSubmitSetFan,onSubmitAutomation}) {
  // console.log(SplittypeList)
  // console.log(onSubmitControl)

  const [List, setList] = useState([]);
  const [searchTable, setSerachTable] = useState("");
  const [OpenSettempModal, setOpenSettempModal] = useState(false);
  const [DecviceId, setDeviceId] = useState(null);
  const [DevId,setDevId] = useState()
  const [DeviceName, setDeviceName] = useState("");
  const [Values, setValues] = useState();
  const [isPrivate, setPrivate] = useState(true);
  const [OpenSetFanModal, setOpenSetFanModal] = useState(false);
  const [OpenSetModeModal, setOpenSetModeModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ModalError, setModalError] = useState(false);
  const [showModalStart, setShowModalStart] = useState(false);
  const [showModalControlestart, setShowModalControlestart] = useState(false);
  const [showModalControlestop, setShowModalControlestop] = useState(false);
  const [showModalAutomationstart, setShowModalAutomationstart] = useState(false);
  const [showModalAutomationstop, setShowModalAutomationstop] = useState(false);
  const [alerttitle, setAlertTitle] = useState("");
  const [alertmassage, setAlertmessage] = useState("");
  const [toggle, setToggle] = useState(false);
  const min = 10;
  const max = 40;
  useEffect (() => {
    setList(SplittypeList)
  },[SplittypeList,]) 
  

  function titleCase(str) {
    return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
  }
  const handleToggleChange = () => {
    setToggle(!toggle);
  };
  const openModalControleIsStop = (DecviceId, deviceName,DevId) => {
    setDeviceId(DecviceId);
    setDeviceName(deviceName);
    setDevId(DevId)
    setValues("off");
    setShowModalControlestop(true);
  };
  const openModalControleIsStart = (DecviceId, deviceName,DevId) => {
    setDeviceId(DecviceId);
    setDeviceName(deviceName);
    setDevId(DevId)
    setValues("on");
    setShowModalControlestart(true);
  };
  const openModalAutomationIsStop = (DecviceId, deviceName,DevId) => {
    setDeviceId(DecviceId);
    setDeviceName(deviceName);
    setDevId(DevId)
    setValues("off");
    setShowModalAutomationstop(true);
  };
  const openModalAutomationIsStart = (DecviceId, deviceName,DevId) => {
    setDeviceId(DecviceId);
    setDeviceName(deviceName);
    setDevId(DevId)
    setValues("on");
    setShowModalAutomationstart(true);
  };
  const onclickOPenSettemp = (id, DecviceId, values,DevId) => {
    console.log(id);
    setOpenSettempModal(true);
    setDeviceId(id);
    setDeviceName(DecviceId);
    setDevId(DevId)
    setValues(values);
  };
  const onclickOPenSetFan = (id, mode, DecviceId,DevId) => {
    setDeviceId(id);
    setValues(mode);
    setDeviceName(DecviceId);
    setDevId(DevId)
    setOpenSetFanModal(true);
  };
  const onclickOPenSetMode = (id, fan, DecviceId,DevId) => {
    setDeviceId(id);
    setValues(fan);
    setDeviceName(DecviceId);
    setDevId(DevId)
    setOpenSetModeModal(true);
  };
  const closeModal = () => {
    setOpenSettempModal(false);
    setOpenSetFanModal(false);
    setOpenSetModeModal(false);
    setShowModalControlestart(false);
    setShowModalControlestop(false);
    setShowModalAutomationstop(false);
    setShowModalAutomationstart(false);
    setLoading(false);
    setModalError(false);
    setDeviceId(null);
  };

  return (
    <div>
      <div className="grid rounded-xl bg-white p-3 shadow-default dark:border-slate-800 dark:bg-dark-box dark:text-slate-200 my-5">
        <div className="flex flex-col gap-4 p-2">
          <div className="flex justify-between">
            <span className="text-lg  font-bold">Split Type</span>

            <input
              type="text"
              placeholder="Search Device"
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
                          Fan Speed
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
                      {List.length > 0 &&
                        List.filter((item) => {
                          // console.log
                          // let data = []
                          //  if (item.power.toString().includes(searchTable)){
                          //   data = item
                          // }
                          // console.log(data)
                          return (
                            item.deviceName.includes(searchTable) ||
                            item.deviceName
                              .toLowerCase()
                              .includes(searchTable.toLowerCase()) ||
                            item.deviceName
                              .toUpperCase()
                              .includes(searchTable.toUpperCase()) ||
                            item.status.toLowerCase().includes(searchTable.toLowerCase()) ||
                            item.status.toUpperCase().includes(searchTable.toUpperCase()) ||
                            String(item.roomTemp).includes(
                              searchTable
                            ) ||
                            String(item.humidity).includes(
                              searchTable
                            ) ||
                            String(item.setTemp).includes(searchTable) ||
                            item.control.toLowerCase().includes(searchTable.toLowerCase()) ||
                            item.control.toUpperCase().includes(searchTable.toUpperCase()) ||
                            item.fan.toLowerCase().includes(searchTable.toLowerCase()) ||
                            item.fan.toUpperCase().includes(searchTable.toUpperCase()) ||
                            item.mode.toLowerCase().includes(searchTable.toLowerCase()) ||
                            item.mode.toUpperCase().includes(searchTable.toUpperCase()) ||
                            item.automation.includes(searchTable)
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
                                  textToHighlight={item.deviceName} // Replace this with your text
                                />
                              </td>
                              <td
                                className={
                                  item.status == "on"
                                    ? "whitespace-nowrap px-6 py-4 text-center text-green-500 font-extrabold"
                                    : item.status == "offline"
                                    ? "whitespace-nowrap px-6 py-4 text-center text-red-500 font-extrabold"
                                    : "whitespace-nowrap px-6 py-4 text-center text-gray-500 font-extrabold "
                                }
                              >
                                <Highlighter
                                  highlightClassName="highlight" // Define your custom highlight class
                                  searchWords={[searchTable]}
                                  autoEscape={true}
                                  textToHighlight={
                                    // item.status == "on"
                                    //   ? "On"
                                    //   : item.status == "offline" ? " Offline"
                                    //   : " Off"
                                    titleCase(item.status)
                                  }
                                />
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-center font-extrabold">
                                {item.status == "offline" ? (
                                  "-"
                                ) : (
                                  <Highlighter
                                    highlightClassName="highlight" // Define your custom highlight class
                                    searchWords={[searchTable]}
                                    autoEscape={true}
                                    textToHighlight=
                                    {String(item.roomTemp)} // Replace this with your text
                                  />
                                )}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-center font-extrabold">
                                {item.status == "Offline" ? (
                                  "-"
                                ) : (
                                  <Highlighter
                                    highlightClassName="highlight" // Define your custom highlight class
                                    searchWords={[searchTable]}
                                    autoEscape={true}
                                    textToHighlight={String(
                                      item.humidity
                                    )} // Replace this with your text
                                  />
                                )}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-center font-extrabold">
                                {item.status == "offline" ? (
                                  "-"
                                ) : item.status == "off" ? (
                                  <Highlighter
                                    className="font-bold cursor-pointer"
                                    highlightClassName="highlight" // Define your custom highlight class
                                    searchWords={[searchTable]}
                                    autoEscape={true}
                                    textToHighlight={String(item.setTemp)} // Replace this with your text
                                  />
                                ) : (
                                  <Highlighter
                                    className="text-[#5eead4] underline font-bold cursor-pointer"
                                    onClick={(event) =>
                                      item.status == "on"
                                        ? onclickOPenSettemp(
                                            item.id,
                                            item.deviceName,
                                            item.setTemp,
                                            item.devId,
                                            event.preventDefault()
                                          )
                                        : null
                                    }
                                    highlightClassName="highlight" // Define your custom highlight class
                                    searchWords={[searchTable]}
                                    autoEscape={true}
                                    textToHighlight={String(item.setTemp)} // Replace this with your text
                                  />
                                )}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-center font-extrabold">
                                {item.status == "offline" ? (
                                  "-"
                                ) : item.status == "off" ? (
                                  <Highlighter
                                    className="font-bold cursor-pointer"
                                    highlightClassName="highlight" // Define your custom highlight class
                                    searchWords={[searchTable]}
                                    autoEscape={true}
                                    textToHighlight={
                                      titleCase(item.fan)
                                    } // Replace this with your text
                                  />
                                ) : (
                                  <Highlighter
                                    className="text-[#5eead4] underline font-bold cursor-pointer"
                                    onClick={(event) =>
                                      item.status == "on"
                                        ? onclickOPenSetMode(
                                            item.id,
                                            item.fan,
                                            item.deviceName,
                                            item.devId,
                                            event.preventDefault()
                                          )
                                        : null
                                    }
                                    highlightClassName="highlight" // Define your custom highlight class
                                    searchWords={[searchTable]}
                                    autoEscape={true}
                                    textToHighlight={
                                      titleCase(item.fan) 
                                    } // Replace this with your text
                                  />
                                )}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-center font-extrabold">
                                {item.status == "offline" ? (
                                  "-"
                                ) : item.status == "off" ? (
                                  <Highlighter
                                    className="font-bold cursor-pointer"
                                    highlightClassName="highlight" // Define your custom highlight class
                                    searchWords={[searchTable]}
                                    autoEscape={true}
                                    textToHighlight={
                                      titleCase(item.mode)
                                    } // Replace this with your text
                                  />
                                ) : (
                                  <Highlighter
                                    className="text-[#5eead4] underline font-bold cursor-pointer"
                                    onClick={(event) =>
                                      item.status == "on"
                                        ? onclickOPenSetFan(
                                            item.id,
                                            item.mode,
                                            item.deviceName,
                                            item.devId,
                                            event.preventDefault()
                                          )
                                        : null
                                    }
                                    highlightClassName="highlight" // Define your custom highlight class
                                    searchWords={[searchTable]}
                                    autoEscape={true}
                                    textToHighlight={
                                      titleCase(item.mode)
                                    } // Replace this with your text
                                  />
                                )}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-center font-extrabold">
                                <div className="flex flex-col items-center">
                                  {item.status == "offline" ? (
                                    "-"
                                  ) : (
                                    <button
                                      type="button"
                                      className={
                                        item.control == "on"
                                          ? "text-white bg-[#5eead4] hover:bg-gray-100 hover:text-gray-700 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                                          : item.control == "off"
                                          ? "text-gray-500 bg-gray-200 hover:bg-gray-100 hover:text-gray-700 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                                          : "text-white bg-red-500 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center opacity-50 cursor-not-allowed"
                                      }
                                      onClick={() =>
                                        item.control == "on"
                                          ? openModalControleIsStop(
                                              item.id,
                                              item.deviceName,item.devId
                                            )
                                          : item.control == "off"
                                          ? openModalControleIsStart(
                                              item.id,
                                              item.deviceName,item.devId
                                            )
                                          : null
                                      }
                                    >
                                      <IoMdPower size="1.5em" />
                                    </button>
                                  )}
                                  {item.status == "offline" ? null : (
                                    <Highlighter
                                      className="text-xs mt-1 text-gray-500 font-bold"
                                      highlightClassName="highlight " // Define your custom highlight class
                                      searchWords={[searchTable]}
                                      autoEscape={true}
                                      textToHighlight={
                                        titleCase(item.control)
                                      } // Replace this with your text
                                    />
                                  )}
                                </div>
                              </td>

                              <td className="whitespace-nowrap px-6 py-4 flex flex-justify-center items-center text-center font-extrabold">
                                {item.status == "offline" ? (
                                  "-"
                                ) : item.status == "off" ? (
                                  <div
                                    className="toggle-container-disable "
                                    onClick={() =>
                                      item.status == "on"
                                        ? item.automation == "on"
                                          ? openModalAutomationIsStop(
                                              item.id,
                                              item.deviceName,item.devId,
                                            )
                                          : openModalAutomationIsStart(
                                              item.id,
                                              item.deviceName,item.devId,
                                            )
                                        : null
                                    }
                                  >
                                    <div
                                      className={`toggle-btn-disable ${
                                        item.automation == "off"
                                          ? "disableNone"
                                          : ""
                                      }`}
                                    >
                                      {titleCase(item.automation)}
                                    </div>
                                  </div>
                                ) : (
                                  <div
                                    className="toggle-container"
                                    onClick={() =>
                                      item.status == "on"
                                        ? item.automation == "on"
                                          ? openModalAutomationIsStop(
                                              item.id,
                                              item.deviceName,item.devId
                                            )
                                          : openModalAutomationIsStart(
                                              item.id,
                                              item.deviceName,item.devId
                                            )
                                        : null
                                    }
                                  >
                                    <div
                                      className={`toggle-btn ${
                                        item.automation == "off"
                                          ? "disable"
                                          : ""
                                      }`}
                                    >
                                      {titleCase(item.automation)}
                                    </div>
                                  </div>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                  onClick={() => {onSubmitSettemp(DecviceId,Values,DevId); setOpenSettempModal(false);}}
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
              <h5 className="mt-5">Set Fan Speed : {DeviceName}</h5>

              <div className="mt-5">
                <ButtonGroup>
                  <Button
                    variant="outlined"
                    style={
                      Values === "auto"
                        ? {
                            backgroundColor: "#5eead4",
                            color: "white",
                            borderBlockColor: "white",
                            border: "1px solid",
                            width: "100px",
                          }
                        : {
                            backgroundColor: "white",
                            color: "#5eead4",
                            borderBlockColor: "#5eead4",
                            border: "1px solid",
                            width: "100px",
                          }
                    }
                    onClick={() => setValues("auto")}
                  >
                    Auto
                  </Button>
                  <Button
                    variant="outlined"
                    style={
                      Values === "1"
                        ? {
                            backgroundColor: "#5eead4",
                            color: "white",
                            borderBlockColor: "white",
                            border: "1px solid",
                            width: "100px",
                          }
                        : {
                            backgroundColor: "white",
                            color: "#5eead4",
                            borderBlockColor: "#5eead4",
                            border: "1px solid",
                            width: "100px",
                          }
                    }
                    onClick={() => setValues("1")}
                  >
                    1
                  </Button>
                  <Button
                    variant="outlined"
                    style={
                      Values === "2"
                        ? {
                            backgroundColor: "#5eead4",
                            color: "white",
                            borderBlockColor: "white",
                            border: "1px solid",
                            width: "100px",
                          }
                        : {
                            backgroundColor: "white",
                            color: "#5eead4",
                            borderBlockColor: "#5eead4",
                            border: "1px solid",
                            width: "100px",
                          }
                    }
                    onClick={() => setValues("2")}
                  >
                    2
                  </Button>
                  <Button
                    variant="outlined"
                    style={
                      Values === "3"
                        ? {
                            backgroundColor: "#5eead4",
                            color: "white",
                            borderBlockColor: "white",
                            border: "1px solid",
                            width: "100px",
                          }
                        : {
                            backgroundColor: "white",
                            color: "#5eead4",
                            borderBlockColor: "#5eead4",
                            border: "1px solid",
                            width: "100px",
                          }
                    }
                    onClick={() => setValues("3")}
                  >
                    3
                  </Button>
                  <Button
                    variant="outlined"
                    style={
                      Values === "4"
                        ? {
                            backgroundColor: "#5eead4",
                            color: "white",
                            borderBlockColor: "white",
                            border: "1px solid",
                            width: "100px",
                          }
                        : {
                            backgroundColor: "white",
                            color: "#5eead4",
                            borderBlockColor: "#5eead4",
                            border: "1px solid",
                            width: "100px",
                          }
                    }
                    onClick={() => setValues("4")}
                  >
                    4
                  </Button>
                  <Button
                    variant="outlined"
                    style={
                      Values === "5"
                        ? {
                            backgroundColor: "#5eead4",
                            color: "white",
                            borderBlockColor: "white",
                            border: "1px solid",
                            width: "100px",
                          }
                        : {
                            backgroundColor: "white",
                            color: "#5eead4",
                            borderBlockColor: "#5eead4",
                            border: "1px solid",
                            width: "100px",
                          }
                    }
                    onClick={() => setValues("5")}
                  >
                    5
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
                  onClick={() => {onSubmitSetFan(DecviceId,Values,DevId); setOpenSetModeModal(false) }}
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
              <h5 className="mt-5">Set Temp. (°C) : {DeviceName}</h5>

              <div className="mt-5">
                <ButtonGroup>
                <Button
                    variant="outlined"
                    style={
                      Values === "auto"
                        ? {
                            backgroundColor: "#5eead4",
                            color: "white",
                            borderBlockColor: "white",
                            border: "1px solid",
                            width: "100px",
                          }
                        : {
                            backgroundColor: "white",
                            color: "#5eead4",
                            borderBlockColor: "#5eead4",
                            border: "1px solid",
                            width: "100px",
                          }
                    }
                    onClick={() => setValues("auto")}
                  >
                    Auto
                  </Button>
                  <Button
                    variant="outlined"
                    style={
                      Values === "cool"
                        ? {
                            backgroundColor: "#5eead4",
                            color: "white",
                            borderBlockColor: "white",
                            border: "1px solid",
                            width: "100px",
                          }
                        : {
                            backgroundColor: "white",
                            color: "#5eead4",
                            borderBlockColor: "#5eead4",
                            border: "1px solid",
                            width: "100px",
                          }
                    }
                    onClick={() => setValues("cool")}
                  >
                    Cool
                  </Button>
                  <Button
                    variant="outlined"
                    style={
                      Values === "dry"
                        ? {
                            backgroundColor: "#5eead4",
                            color: "white",
                            borderBlockColor: "white",
                            border: "1px solid",
                            width: "100px",
                          }
                        : {
                            backgroundColor: "white",
                            color: "#5eead4",
                            borderBlockColor: "#5eead4",
                            border: "1px solid",
                            width: "100px",
                          }
                    }
                    onClick={() => setValues("dry")}
                  >
                    Dry
                  </Button>
                  <Button
                    variant="outlined"
                    style={
                      Values === "fan"
                        ? {
                            backgroundColor: "#5eead4",
                            color: "white",
                            borderBlockColor: "white",
                            border: "1px solid",
                            width: "100px",
                          }
                        : {
                            backgroundColor: "white",
                            color: "#5eead4",
                            borderBlockColor: "#5eead4",
                            border: "1px solid",
                            width: "100px",
                          }
                    }
                    onClick={() => setValues("fan")}
                  >
                    Fan
                  </Button>
                  <Button
                    variant="outlined"
                    style={
                      Values === "heat"
                        ? {
                            backgroundColor: "#5eead4",
                            color: "white",
                            borderBlockColor: "white",
                            border: "1px solid",
                            width: "100px",
                          }
                        : {
                            backgroundColor: "white",
                            color: "#5eead4",
                            borderBlockColor: "#5eead4",
                            border: "1px solid",
                            width: "100px",
                          }
                    }
                    onClick={() => setValues("heat")}
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
                  onClick={() => {onSubmitSetMode(DecviceId,Values,DevId); setOpenSetFanModal(false)}}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        ) : null}
        {loading ? <Loading /> : null}
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
        {showModalControlestart ? (
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
                    onClick={() => {onSubmitControl(DecviceId,Values,DevId); setShowModalControlestart(false);}}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {showModalControlestop ? (
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
                    onClick={() => {onSubmitControl(DecviceId,Values,DevId); setShowModalControlestop(false)}}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {showModalAutomationstart ? (
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
                    onClick={() => {onSubmitAutomation(DecviceId,Values,DevId); setShowModalAutomationstart(false);}}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {showModalAutomationstop ? (
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
                    onClick={() => {onSubmitAutomation(DecviceId,Values,DevId); setShowModalAutomationstop(false);}}
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
  );
}
