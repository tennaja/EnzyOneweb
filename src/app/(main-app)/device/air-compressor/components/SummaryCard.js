"use client";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import "../../../../globals.css";
import Highlighter from "react-highlight-words";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DatePicker, Radio } from "antd";
import { IoMdPower } from "react-icons/io";
import {
  ChangestatusIsOff,
  ChangestatusIsOn,
  getHistoricalGraph,
  getBranch,
  getBulding,
  getFloor,
} from "@/utils/api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import dayjs from 'dayjs';
ChartJS.register(
  zoomPlugin,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function SummaryCard() {

  function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}
  //toast notify
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
    const { MonthPicker, RangePicker } = DatePicker;
    const dateFormat = 'YYYY/MM/DD';
  //funtion Zoom graph
  const zoomOptions = {
    pan: {
      enabled: true,
      mode: "x",
      modifierKey: "ctrl",
    },
    zoom: {
      drag: {
        enabled: true,
      },

      mode: "x",
    },
  };

  // Option Graph
  

  function onChangeDay(date, dateString) {
    console.log(dateString);
    GetAHUGraph(floorId, formatDate(dateString[0]), formatDate(dateString[1]));
  }

  const chartRef = useRef(null);

  //reset zoom graph
  const onResetZoom = () => {
    chartRef.current.resetZoom();
  };
  const companyData = useSelector((state) => state.companyData.company);
  const [branchList, setBranchList] = useState([]);
  const [buildingList, setBuildingList] = useState([]);
  const [floorList, setFloorList] = useState([]);
  const [tableList, setTableList] = useState([]);
  const [chartList, setChartList] = useState([]);
  const [branchId, setBranchId] = useState(0);
  const [buildingId, setBuildingId] = useState(0);
  const [floorId, setFloorId] = useState(0);
  const [DecviceId, setDeviceId] = useState(null);
  const [isFirst, setIsFirst] = useState(true);
  const [showModalStart, setShowModalStart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingGraph, setLoadingGraph] = useState(false);
  const [listChange, setListChange] = useState("barg");
  const [errorMsg, setErrorMsg] = useState("");
  const [searchTable, setSerachTable] = useState("");
  const [showModalError, setShowModalError] = useState(false);
  const [showModalStop, setShowModalStop] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [ListLabel, setListLabel] = useState([0]);
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [typedate, setTypeDate] = useState("day");
  const [alerttitle, setAlertTitle] = useState("");
  const [alertmassage, setAlertmessage] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [Color, setColor] = useState();
  const [dateFrom, setdateFrom] = useState(new Date());
  const [dateTo, setdateTo] = useState(new Date());

  const colors = [
    "#278BE1",
    "#05B8AA",
    "#E84F6E",
    "#F8872B",
    "#FEBB20",
    "#9071CC",
    "#00998F",
    "#C14233",
    "#00C2E",
    "#345381",
  ];

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  // const username = useSelector((state) => state.userData.username);
  // const password = useSelector((state) => state.userData.password);
  useEffect(() => {
    getBranchList();
    // OnListChange();
  }, []);

  useEffect(() => {
    if (isFirst && floorId != 0 && listChange) {
      onSearchTable();
      GetHitoricalGraph(
        floorId,
        listChange,
        formatDate(new Date()),
        formatDate(new Date())
      );
    }
  }, [floorId, listChange]);

  function onChangeDay(date, dateString) {
    setStartDate(dateString[0])
    setEndDate(dateString[1])
    console.log(dateString);
    GetHitoricalGraph(floorId, listChange, formatDate(dateString[0]), formatDate(dateString[1]));
  }
  const OnListChange = async (event) => {
    setListChange(event);
    GetHitoricalGraph(floorId, event, formatDate(startDate), formatDate(endDate))
  };

  //Open popup for Start
  const openModalIsStart = (DecviceId) => {
    setShowModalStart(true);
    setDeviceId(DecviceId);
  };

  //Open popup for Stop
  const openModalIsStop = (DecviceId) => {
    setShowModalStop(true);
    setDeviceId(DecviceId);
  };

  //Close popup
  const closeModal = () => {
    setShowModalStart(false);
    setShowModalStop(false);
    setDeviceId(null);
    setShowModalError(false);
  };

  //สุ่มสี
  const RandomColor = () => {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomColor;
  };

  //Get Branch
  const getBranchList = async () => {
    const result = await getBranch(companyData);

    if (result.data.length != 0) {
      setBranchList(result.data);

      setBranchId(result.data[0].Id);
      getBuldingList(result.data[0].Id);
    }
  };

  //Get Building
  const getBuldingList = async (branchId) => {
    setBranchId(branchId);
    const result = await getBulding(branchId);
    if (result.data.length != 0) {
      setBuildingList(result.data);
      setBuildingId(result.data[0].Id);
      getFloorLit(result.data[0].Id);
    }
  };
  //Get Floor
  const getFloorLit = async (buildingId) => {
    setBuildingId(buildingId);
    const result = await getFloor(buildingId);
    if (result.data.length != 0) {
      setFloorList(result.data);
      setFloorId(result.data[0].Id);
    }
  };

  // input username
  const onChangeUsername = (event) => {
    setUsername(event);
  };

  // input password
  const onChangePassword = (event) => {
    setPassword(event);
  };

  //
  const onTableChange = async (floorId) => {
    setFloorId(floorId);
  };

  //Deatail in table
  const onSearchTable = async () => {
    setFloorId(floorId);
    const result = await axios.get(
      "https://enzy.egat.co.th/api/device-management/air-compressor/list/" +
        floorId
    );

    GetHitoricalGraph(
      floorId,
      listChange,
      formatDate(new Date()),
      formatDate(new Date())
    );
    setTableList(result.data);
    setDeviceId(result.data[0].id);
    setIsFirst(false);
  };

  //click is off
  const clickChangestatusStop = async () => {
    setLoading(true);
    const res = await ChangestatusIsOff(DecviceId, username, password);
    if (res.status === 200) {
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      onSearchTable();
      closeModal();
      setUsername("");
      setPassword("");
      setLoading(false);
      notifySuccess(res.data.title,res.data.message);
    } else if (res.response.status === 401) {
      setAlertTitle(res.response.data.title);
      setAlertmessage(res.response.data.message);
      closeModal();
      setUsername("");
      setPassword("");
      setLoading(false);
      setShowModalError(true);
    } else if (res.response.status === 500) {
      setAlertTitle(res.response.data.title);
      setAlertmessage(res.response.data.message);
      closeModal();
      setUsername("");
      setPassword("");
      setLoading(false);
      setShowModalError(true);
    }
  };

  //Click is on
  async function clickChangestatusStart() {
    setLoading(true);
    const res = await ChangestatusIsOn(DecviceId, username, password);
    if (res.status === 200) {
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      onSearchTable();
      closeModal();
      setUsername("");
      setPassword("");
      setLoading(false);
      notifySuccess(res.data.title,res.data.message);
    } else if (res.response.status === 401) {
      setAlertTitle(res.response.data.title);
      setAlertmessage(res.response.data.message);
      closeModal();
      setUsername("");
      setPassword("");
      setLoading(false);
      setShowModalError(true);
    } else if (res.response.status === 500) {
      setAlertTitle(res.response.data.title);
      setAlertmessage(res.response.data.message);
      closeModal();
      setUsername("");
      setPassword("");
      setLoading(false);
      setShowModalError(true);
    }
  }

  //Graph
  async function GetHitoricalGraph(floorId, listChange, dateFrom, dateTo) {
    setLoadingGraph(true);

    const paramsNav = {
      floorId: floorId,
      unit: listChange,
      dateFrom: dateFrom,
      dateTo: dateTo,
    };
    const res = await getHistoricalGraph(paramsNav);
    if (res.status === 200) {
      if (res.data.length > 0) {
        setChartList(res.data);
        console.log(res.data)
        let label = [];
        let modday = 0;

        // if (typedate == "day") {
        //   modday = 30;
        // } else if (typedate == "month") {
        //   modday = 1440;
        // } else if (typedate == "year") {
        //   modday = 43200;
        // }
        for (let j = 0; j < res.data[0].data.length; j++) {
          // console.log(j % modday);
          //  if (j%modday == 0 ) {
          label.push(res.data[0].data[j].time);
          // }
        }

        setListLabel(label);
      } else {
        setChartList([]);
        setListLabel([]);
      }

      setLoadingGraph(false);
    } else {
      setErrorMsg("error");
    }
  }

 

  //FormatDate
  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  return (
    <div>
      <div className="grid rounded-xl bg-white p-3 shadow-default dark:border-slate-800 dark:bg-dark-box dark:text-slate-200">
        <div className="flex flex-col gap-4 p-2">
          <span className="text-lg  font-bold">Air Compressor</span>
          <div className="w-full py-1 pb-2">
            <div className="inline-flex">
              <div className="flex justify-center bg-white p-3 shadow-default dark:border-slate-800 dark:bg-dark-box dark:text-slate-200">
                <p className=" text-red-700 mx-2 ">*</p>
                <label>
                  Branch :
                  <select
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
                  </select>
                </label>
              </div>
              <div className="flex justify-center bg-white p-3 shadow-default dark:border-slate-800 dark:bg-dark-box dark:text-slate-200">
                <p className=" text-red-700 mx-2 ">*</p>
                <label>
                  Building :
                  <select
                    className="w-44 border border-slate-300 mx-2 rounded-md h-9"
                    onChange={(event) => {
                      getFloorLit(event.target.value);
                    }}
                    value={buildingId}
                  >
                    {buildingList.map((item) => {
                      
                      return (
                        <option key={item.id} Value={item.Id}>
                          {item.Name}
                        </option>
                      );
                    })}
                  </select>
                </label>
              </div>
              <div className="flex justify-center bg-white p-3 shadow-default dark:border-slate-800 dark:bg-dark-box dark:text-slate-200">
                <p className=" text-red-700 mx-2">*</p>
                <label>
                  Floor :
                  <select
                    className="w-44 border border-slate-300 mx-2 rounded-md h-9"
                    onChange={(event) => {
                      onTableChange(event.target.value);
                    }}
                    value={floorId}
                  >
                    {floorList.map((item) => {
                      return (
                        <option key={item.id} Value={item.Id}>
                          {item.Name}
                        </option>
                      );
                    })}
                  </select>
                </label>
              </div>
              <div className="flex justify-center bg-white p-3 shadow-default dark:border-slate-800 dark:bg-dark-box dark:text-slate-200 items-center"></div>
              <button
                type="button"
                className="text-white bg-[#14b8a6] rounded-md text-lg px-10 h-9 mt-3 
                "
                onClick={onSearchTable}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="grid rounded-xl bg-white p-3 shadow-default dark:border-slate-800 dark:bg-dark-box dark:text-slate-200 my-5">
        <div className="flex flex-col gap-4 p-2">
          <div className="flex justify-between">
            <span className="text-lg  font-bold">Control Device</span>
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
                          Pressure(Barg)
                        </th>
                        <th scope="col" className="px-6 py-4 text-center">
                          Power(kW)
                        </th>
                        <th scope="col" className="px-6 py-4 text-center">
                          Efficiency (%)
                        </th>
                        <th scope="col" className="px-6 py-4 text-center">
                          Running Hour (Wks )
                        </th>
                        <th scope="col" className="px-6 py-4 text-center">
                          Control
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableList.length > 0 &&
                        tableList
                          .filter((item) => {
                            return (
                              item.name.includes(searchTable) ||
                              item.name.toLowerCase().includes(searchTable) ||
                              item.status.includes(searchTable) ||
                              item.status.toLowerCase().includes(searchTable) ||
                              String(item.power).includes(searchTable) ||
                              String(item.pressure).includes(searchTable) ||
                              String(item.efficiency).includes(searchTable) ||
                              String(item.workingHours).includes(searchTable)
                            );
                          })
                          .map((item, index) => {
                            return (
                              <tr
                                className="border-b dark:border-neutral-500"
                                key={index}
                              >
                                <td className="whitespace-nowrap px-6 py-4 font-extrabold">
                                  {/* {getHighlightedText(item.name,searchTable)} */}
                                  <Highlighter
                                    highlightClassName="highlight" // Define your custom highlight class
                                    searchWords={[searchTable]}
                                    autoEscape={true}
                                    textToHighlight={item.name} // Replace this with your text
                                  />{" "}
                                </td>
                                <td
                                  className={
                                    item.status == "On"
                                      ? "whitespace-nowrap px-6 py-4 text-center text-green-500 font-extrabold"
                                      : item.status == "Offline" ? "whitespace-nowrap px-6 py-4 text-center text-red-500 font-extrabold"
                                      : "whitespace-nowrap px-6 py-4 text-center text-gray-500 font-extrabold"
                                  }
                                >
                                  <Highlighter
                                    highlightClassName="highlight" // Define your custom highlight class
                                    searchWords={[searchTable]}
                                    autoEscape={true}
                                    textToHighlight={item.status} // Replace this with your text
                                  />
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-center font-extrabold">
                                {item.status == "Offline" ? "-" :  <Highlighter
                                    highlightClassName="highlight" // Define your custom highlight class
                                    searchWords={[searchTable]}
                                    autoEscape={true}
                                    textToHighlight={String(item.pressure)} // Replace this with your text
                                  />}
                                 
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-center font-extrabold">
                                {item.status == "offline" ? "-" : <Highlighter
                                    highlightClassName="highlight" // Define your custom highlight class
                                    searchWords={[searchTable]}
                                    autoEscape={true}
                                    textToHighlight={String(item.power)} // Replace this with your text
                                  />}
                                  
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-center font-extrabold">
                                {item.status == "offline" ? "-" : <Highlighter
                                    highlightClassName="highlight" // Define your custom highlight class
                                    searchWords={[searchTable]}
                                    autoEscape={true}
                                    textToHighlight={String(item.efficiency)} // Replace this with your text
                                  />}
                                  
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-center font-extrabold">
                                {item.status == "offline" ? "-" : <Highlighter
                                    highlightClassName="highlight" // Define your custom highlight class
                                    searchWords={[searchTable]}
                                    autoEscape={true}
                                    textToHighlight={String(item.workingHours)} // Replace this with your text
                                  />}
                                  
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-center font-extrabold">
                                  <div className="flex flex-col items-center">
                                {item.status == "Offline" ? "-" : <button
                                    type="button"
                                    className={
                                      item.status == "On"
                                        ? "text-white  bg-[#5eead4] hover:bg-gray-100 hover:text-gray-700 font-extrabold rounded-full text-sm p-1.5 text-center inline-flex items-center"
                                        : "text-gray-500 bg-gray-200 hover:bg-gray-100 hover:text-gray-700 font-extrabold rounded-full text-sm p-1.5 text-center inline-flex items-center"
                                    }
                                    onClick={() =>
                                      item.status == "On"
                                        ? openModalIsStop(item.id)
                                        : openModalIsStart(item.id)
                                    }
                                  ><IoMdPower size="1.5em"/>
                                  </button>}<div className="text-xs mt-1 text-gray-500 font-bold">{item.status == "On" ? "On" : item.status == "Off" ? "Off" : null }</div>
                                  
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
          </div>
        </div>
        {showModalStop ? (
          <div className="fixed inset-0 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="p-8 border w-auto shadow-lg rounded-md bg-white">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mt-5">
                  Are you sure?
                </h3>
                <div className="flex gap-5 justify-center items-center mt-5 ">
                  <span>Are you sure to control this device?</span>
                </div>
                <div className="flex gap-5 justify-center items-center mt-5 ">
                  <p className="text-gray-900">Username : </p>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    className="border border-slate-300 rounded-md h-9 px-2"
                    onChange={(e) => {
                      onChangeUsername(e.target.value);
                    }}
                  />
                </div>
                <div className="flex justify-center gap-5 items-center mt-5 px-1 ml-12">
                  <p className="text-gray-900 ml-3">Password : </p>
                  <input
                    type={isShowPassword ? "text" : "password"}
                    placeholder="********"
                    className="border border-slate-300 rounded-md h-9 px-2 "
                    onChange={(e) => {
                      onChangePassword(e.target.value);
                    }}
                  />
                  <div
                    onClick={toggleShowPassword}
                    className="flex mr-2 w-6 h-6 items-center justify-center hover:bg-"
                  >
                    {isShowPassword ? (
                      <EyeSlashIcon className="w-4 h-4" />
                    ) : (
                      <EyeIcon className="w-4 h-4" />
                    )}
                  </div>
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
                    onClick={() => clickChangestatusStop()}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {showModalStart ? (
          <div className="fixed inset-0 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="p-8 border w-auto shadow-lg rounded-md bg-white">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mt-5">
                  Are you sure?
                </h3>
                <div className="flex gap-5 justify-center items-center mt-5 ">
                  <span>Are you sure to control this device?</span>
                </div>
                <div className="flex gap-5 justify-center items-center mt-5 ">
                  <p className="text-gray-900">Username : </p>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    className="border border-slate-300 rounded-md h-9 px-2"
                    onChange={(e) => {
                      onChangeUsername(e.target.value);
                    }}
                  />
                </div>
                <div className="flex justify-center gap-5 items-center mt-5 px-1 ml-12">
                  <p className="text-gray-900 ml-3">Password : </p>
                  <input
                    type={isShowPassword ? "text" : "password"}
                    placeholder="********"
                    className="border border-slate-300 rounded-md h-9 px-2"
                    onChange={(e) => {
                      onChangePassword(e.target.value);
                    }}
                  />
                  <div
                    onClick={toggleShowPassword}
                    className="flex mr-2 w-6 h-6 items-center justify-center hover:bg-"
                  >
                    {isShowPassword ? (
                      <EyeSlashIcon className="w-4 h-4" />
                    ) : (
                      <EyeIcon className="w-4 h-4" />
                    )}
                  </div>
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
                    onClick={() => clickChangestatusStart()}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {loading ? (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div
              className="py-12 border w-auto shadow-lg rounded-md bg-white items-center text-center"
              style={{ textAlign: "-webkit-center" }}
            >
              <RotatingLines
                visible={true}
                height="96"
                width="96"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
              <div className="text-center">
                <div className="mt-2 px-7 py-3">
                  <p className="text-lg text-gray-500 mt-5">
                    Processing please wait ...
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {showModalError ? (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="p-8 border w-auto shadow-lg rounded-md bg-white">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mt-5">
                  {alerttitle}
                </h3>
                <div className="mt-2 px-7 py-3">
                  <p className="text-lg text-gray-500 mt-2">{alertmassage}</p>
                </div>
                <div className="flex justify-center mt-10 gap-5">
                  <button
                    className="px-4 py-2 bg-red-600 text-white font-medium rounded-md  focus:outline-none w-62"
                    onClick={() => closeModal()}
                  >
                    Close
                  </button>
                  {/* <ToastContainer /> */}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="grid rounded-xl bg-white p-3 shadow-default dark:border-slate-800 dark:bg-dark-box dark:text-slate-200 my-5 ">
        <div className="flex flex-col gap-4 p-2">
          <div className="flex justify-between ">
            <span className="text-lg  font-bold">Historical</span>
            <select
              className="w-44 border border-slate-300 mx-2 rounded-md h-9"
              onChange={(event) => OnListChange(event.target.value)}
              value={listChange}
            >
              <option value="barg">Pressure (barg)</option>
              <option value="kw">Power (kw)</option>
              <option value="%">Efficiency (%)</option>
            </select>
          </div>
          <div className="flex gap-5">
          
          <RangePicker type="number" className="bg-white border shadow-default dark:border-slate-300 dark:bg-dark-box dark:text-slate-200" onChange={onChangeDay} defaultValue={[dayjs(formatDate(startDate), dateFormat), dayjs(formatDate(endDate), dateFormat)]}
      format={dateFormat}/>

            <button
              className="border border-slate-300 rounded-md h-9 px-2"
              onClick={onResetZoom}
            >
              zoom reset
            </button>
          </div>
        </div>
        {loadingGraph ? (
          <div
            className="py-12 w-auto items-center text-center"
            style={{ textAlign: "-webkit-center" }}
          >
            <RotatingLines
              visible={true}
              height="96"
              width="96"
              color="grey"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        ) : (
          <div>

            {typeof window !== "undefined" && (
              <Line
                data={{
                  labels: ListLabel,
                  datasets: chartList.map((item,index) => {
                    return {
                      label: item.name,
                      data: item.data.map((data) => {
                        return data.value;
                      }),
                      borderColor: getRandomColor(),
                      fill: false,
                      tension: 0,
                    };
                  }),
                }}
                ref={chartRef}
                options = {{
                  aspectRatio: 4,
          responsive: true,
          interaction: {
            mode: "index",
            intersect: false,
          },
          spanGaps: true,
          plugins: {
            legend: {
              position: "top",
            },
            zoom: zoomOptions,
          },
          scales: {
            x: {
              display: true,
              grid: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
              },
            },
            y: {
              beginAtZero: true,
              type: "linear",
              display: true,
              position: "left",
      
              title: {
                display: true,
                text: listChange === "barg" ? "Pressure (barg)" : listChange === "kw" ? "Power (kw)" : "Efficiency (%)",
                padding: { top: 30, left: 0, right: 0, bottom: 0 },
              },
            },
           
          },
                }}
              />
            )}
          </div>
        )}
      </div>
      <div></div>
      {/* <button
                    className="px-4 py-2 bg-red-600 text-white font-medium rounded-md  focus:outline-none w-62"
                    onClick={() => setShowModalStart(true)}
                  >
                    Close
                  </button> */}
      <ToastContainer />
    </div>
  );
}
