"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import "../../../../globals.css";
import Highlighter from "react-highlight-words";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { Bar, Line } from "react-chartjs-2";
import {
  ChangestatusIsOff,
  ChangestatusIsOn,
  getHistoricalGraph,
} from "@/utils/api";
import * as userSlice from "@/redux/slicer/userSlice";
// import ModalStart from "./ModalStart";

export default function SummaryCard() {
  const companyData = useSelector((state) => state.companyData.company);
  const hour = ("0" + new Date().getUTCHours()).slice(-2);
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
  const [listChange, setListChange] = useState("barg");
  const [errorMsg, setErrorMsg] = useState("");
  const [searchTable, setSerachTable] = useState("");
  const [showModalError, setShowModalError] = useState(false);
  const [showModalStop, setShowModalStop] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [ListLabel, setListLabel] = useState([0]);
  const [username, setUsername] = useState([]);
  const [password, setPassword] = useState([]);
  const [typedate, setTypeDate] = useState("day");
  const [alerttitle, setAlertTitle] = useState("");
  const [alertmassage, setAlertmessage] = useState("");

  // const username = useSelector((state) => state.userData.username);
  // const password = useSelector((state) => state.userData.password);
  useEffect(() => {
    getBranchList();
    OnListChange();
  }, []);
 
 useEffect(() => {
    if (isFirst && floorId != 0) {
      onSearchTable();
      GetHitoricalGraph(floorId,listChange,new Date(),new Date());
    }
  }, [floorId,listChange]);
  
  const OnListChange = async (event) => {
    setListChange(event);
    console.log(listChange)
    if(typedate == "day"){
      onChangeDay(startDate) 
    }else if (typedate == "month"){
      onChangeMonth(startDate) 
    }
  else if (typedate == "year"){
    onChangeYear(startDate) 
  }
    
  };
  const OnListtypeDateChange = async (event) => {
    setTypeDate(event);
    console.log(typedate)
  };
  //เปิด popup เพื่อสั่ง Start
  const openModalIsStart = (DecviceId) => {
    setShowModalStart(true);
    setDeviceId(DecviceId);
  };

  //เปิด popup เพื่อสั่ง Stop
  const openModalIsStop = (DecviceId) => {
    setShowModalStop(true);
    setDeviceId(DecviceId);
  };

  //ปิด popup
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

  useEffect(() => {}, []);

  //สาขา
  const getBranchList = async () => {
    const result = await axios.get(
      "https://enzy.egat.co.th/api/branch-list/" + companyData.Id
    );
    if (result.data.length != 0) {
      setBranchList(result.data);

      setBranchId(result.data[0].Id);
      getBuldingList(result.data[0].Id);
    }
  };

  //อาคาร
  const getBuldingList = async (branchId) => {
    setBranchId(branchId);
    const result = await axios.get(
      "https://enzy.egat.co.th/api/building-list/" + branchId
    );

    setBuildingList(result.data);
    setBuildingId(result.data[0].Id);
    getFloorLit(result.data[0].Id);
  };
  //ชั้น
  const getFloorLit = async (buildingId) => {
    setBuildingId(buildingId);
    const result = await axios.get(
      "https://enzy.egat.co.th/api/floor-list/" + buildingId
    );

    if (result.data.length != 0) {
      setFloorList(result.data);
      setFloorId(result.data[0].Id);
    }
    // getTableAirCompressorList(result.data[0].Id)
  };

  const onChangeUsername = (event) => {
    setUsername(event);
    console.log(event);
  };
  const onChangePassword = (event) => {
    setPassword(event);
    console.log(event);
  };

  const onTableChange = async (floorId) => {
    setFloorId(floorId);
  };

  //ข้อมูลในตาราง
  const onSearchTable = async () => {
    setFloorId(floorId);
    const result = await axios.get(
      "https://enzy.egat.co.th/api/device-management/air-compressor/list/" +
        floorId
    );
    GetHitoricalGraph(floorId,listChange,new Date(),new Date());
    setTableList(result.data);
    setDeviceId(result.data[0].id);
    setIsFirst(false);
  };

  //คลิกปิด
  async function clickChangestatusStop() {
    setLoading(true);
    const res = await ChangestatusIsOff(DecviceId, username, password);

    if (res.status === 200) {
      console.log(res.data);
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      onSearchTable();
      closeModal();
      setLoading(false);
      setShowModalError(true);
    } else {
      console.log(res);
      setAlertTitle(res.title);
      setAlertmessage(res.message);
      closeModal();
      setLoading(false);
      setShowModalError(true);
    }
  }

  //คลิกเพื่อเปิด
  async function clickChangestatusStart() {
    setLoading(true);
    const res = await ChangestatusIsOn(DecviceId, username, password);
    if (res.status === 200) {
      console.log(res.data);
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      onSearchTable();
      closeModal();
      setLoading(false);
      setShowModalError(true);
    } else {
      console.log(res.data);
      setAlertTitle(res.data.title);
      setAlertmessage(res.data.message);
      closeModal();
      setLoading(false);
      setShowModalError(true);
    }
  }

  //กราฟ
  async function GetHitoricalGraph(floorId, listChange, dateFrom, dateTo) {
    setLoading(true)
    console.log(listChange)
    const paramsNav = {
      floorId: floorId,
      unit: listChange,
      dateFrom: dateFrom,
      dateTo: dateTo,
    };
    const res = await getHistoricalGraph(paramsNav);
    if (res.status === 200) {
      setChartList(res.data);
      let label = [];
      let modday = 0;
      console.log(res.data);
      if(typedate == "day"){
        modday = 30
      }else if (typedate == "month"){
        modday = 1440
      }
    else if (typedate == "year"){
      modday = 43200
    }
      for (let j = 0; j < res.data[0].data.length; j++) {
         if (j%modday == 0 ) {
          label.push(res.data[0].data[j].time);
        }
      }


      setListLabel(label);
      console.log(label);
      setLoading(false)
    } else {
      setErrorMsg("error");
      console.log(errorMsg);
    }
  }

  //Dropdown Month
  const onChangeMonth = (date) => {
    setStartDate(date)
    let Month = date.getMonth();
    console.log(Month);
    let Year = date.getFullYear();
    console.log(Year);
    let startDate = new Date(Year, Month, 1);
    let endDate = new Date(Year, Month + 1, 0);
    GetHitoricalGraph(
      floorId,
      listChange,
      formatDate(startDate),
      formatDate(endDate)
    );
  };

  //Drpdown Year
  const onChangeYear = (date) => {
    setStartDate(date)
    let Year = date.getFullYear();
    console.log(Year);
    let startDate = new Date(Year, 0, 1);
    let endDate = new Date(Year, 12, 0);
    GetHitoricalGraph(
      floorId,
      listChange,
      formatDate(startDate),
      formatDate(endDate)
    );
  };

  const onChangeDay = (date) => {
    setStartDate(date)
    let Month = date.getMonth();
    let Year = date.getFullYear();
    let day = date.getDay();
    let startDate = new Date(Year, Month, day);
    GetHitoricalGraph(
      floorId,
      listChange,
      formatDate(startDate),
      formatDate(startDate)
    );
  };

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
                  สาขา :
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
                  อาคาร :
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
                  ชั้น :
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
                className="focus:outline-none text-white bg-[#14b8a6]  rounded-md text-lg px-5 m-2 mb-2 h-9 mt-3 w-40
                "
                onClick={onSearchTable}
              >
                เลือก
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
              placeholder="ค้นหา Device"
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
                          Efficiency
                        </th>
                        <th scope="col" className="px-6 py-4 text-center">
                          Running Hour
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
                            // let data = []
                            //  if (item.power.toString().includes(searchTable)){
                            //   data = item
                            // }
                            // console.log(data)
                            return (
                              item.name.includes(searchTable) ||
                              item.status.includes(searchTable) ||
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
                                <td
                                  className="whitespace-nowrap px-6 py-4 font-extrabold"
                                  Value={item.Id}
                                >
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
                                      : "whitespace-nowrap px-6 py-4 text-center text-red-500 font-extrabold"
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
                                  
                                <Highlighter
                                    highlightClassName="highlight" // Define your custom highlight class
                                    searchWords={[searchTable]}
                                    autoEscape={true}
                                    textToHighlight= {String(item.pressure)} // Replace this with your text
                                  />
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-center font-extrabold">
                                  
                                <Highlighter
                                    highlightClassName="highlight" // Define your custom highlight class
                                    searchWords={[searchTable]}
                                    autoEscape={true}
                                    textToHighlight= {String(item.power)} // Replace this with your text
                                  />
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-center font-extrabold">
                                  
                                <Highlighter
                                    highlightClassName="highlight" // Define your custom highlight class
                                    searchWords={[searchTable]}
                                    autoEscape={true}
                                    textToHighlight= {String(item.efficiency)} // Replace this with your text
                                  />
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-center font-extrabold">
                                <Highlighter
                                    highlightClassName="highlight" // Define your custom highlight class
                                    searchWords={[searchTable]}
                                    autoEscape={true}
                                    textToHighlight= {String(item.workingHours)} // Replace this with your text
                                  />
                                 
                                </td>
                                <td className="whitespace-nowrap px-6 py-4 text-center">
                                  <button
                                    type="button"
                                    className={
                                      item.status == "On"
                                        ? "text-white bg-[#5eead4] hover:bg-gray-100 hover:text-gray-700 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                                        : "text-gray-500 bg-gray-200 hover:bg-gray-100 hover:text-gray-700 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
                                    }
                                    onClick={() =>
                                      item.status == "On"
                                        ? openModalIsStop(item.id)
                                        : openModalIsStart(item.id)
                                    }
                                  >
                                    {item.status == "On" ? "On" : "Off"}
                                  </button>
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
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="p-8 border w-auto shadow-lg rounded-md bg-white">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mt-5">
                  Are you sure ?
                </h3>
                <div className="flex gap-5 items-center mt-5">
                  <p>Username : </p>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    className="border border-slate-300 rounded-md h-9 px-2"
                    onChange={(e) => {
                      onChangeUsername(e.target.value);
                    }}
                  />
                </div>
                <div className="flex gap-5 items-center mt-5 px-1">
                  <p>Password : </p>
                  <input
                    type="text"
                    placeholder="Enter your Password"
                    className="border border-slate-300 rounded-md h-9 px-2"
                    onChange={(e) => {
                      onChangePassword(e.target.value);
                    }}
                  />
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
        {showModalStart ? (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="p-8 border w-auto shadow-lg rounded-md bg-white">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mt-5">
                  Are you sure ?
                </h3>
                <div className="flex gap-5 items-center mt-5">
                  <p>Username : </p>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    className="border border-slate-300 rounded-md h-9 px-2"
                    onChange={(e) => {
                      onChangeUsername(e.target.value);
                    }}
                  />
                </div>
                <div className="flex gap-5 items-center mt-5 px-1">
                  <p>Password : </p>
                  <input
                    type="text"
                    placeholder="Enter your Password"
                    className="border border-slate-300 rounded-md h-9 px-2"
                    onChange={(e) => {
                      onChangePassword(e.target.value);
                    }}
                  />
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
                    onClick={() => clickChangestatusStart()}
                  >
                    confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {loading ? (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="py-12 border w-auto shadow-lg rounded-md bg-white items-center text-center" style={{textAlign : '-webkit-center'}}>
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
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="grid rounded-xl bg-white p-3 shadow-default dark:border-slate-800 dark:bg-dark-box dark:text-slate-200 my-5">
        <div className="flex flex-col gap-4 p-2">
          <span className="text-lg  font-bold">Historical</span>
          <div className="flex gap-5">
            {typedate == "day" ? (
              <DatePicker
                className="w-44 border border-slate-300 mx-2 rounded-md h-9 px-2"
                selected={startDate}
                onChange={(date) => onChangeDay(date)}
                dateFormat="dd/MM/yyyy"
              />
            ) : typedate == "month" ? (
              <DatePicker
                className="w-44 border border-slate-300 mx-2 rounded-md h-9 px-2"
                selected={startDate}
                // onChange={(date) => setStartDate(date)}
                onChange={(date) => onChangeMonth(date)}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                showFullMonthYearPicker
                showFourColumnMonthYearPicker
              />
            ) : (
              <DatePicker
                className="w-44 border border-slate-300 mx-2 rounded-md h-9 px-2"
                selected={startDate}
                onChange={(date) => onChangeYear(date)}
                showYearPicker
                dateFormat="yyyy"
              />
            )}

            <select
              className="w-44 border border-slate-300 mx-2 rounded-md h-9"
              onChange={(event) => OnListtypeDateChange(event.target.value)}
              value={typedate}
            >
              <option value="day">รายวัน</option>
              <option value="month">รายเดือน</option>
              <option value="year">รายปี</option>
            </select>
            <select
              className="w-44 border border-slate-300 mx-2 rounded-md h-9"
              onChange={(event) => OnListChange(event.target.value)}
              value={listChange}
            >
              <option value="barg">Presure (barg)</option>
              <option value="kw">Power (kw)</option>
              <option value="%">Efficlency (%)</option>
            </select>
          </div>
        </div>
        <Line
          data={{
            labels: ListLabel,
            datasets: chartList.map((item) => {
              return {
                label: item.name,
                data: item.data.map((data, index) => {
                  return data.value;
                }),
                borderColor: RandomColor(),
                fill: false,
              };
            }),
            options: {
              maintainAspectRatio: false,
              responsive: true,
              title: {
                display: false,
                text: "Sales Charts",
              },

              legend: {
                labels: {},
                align: "end",
                position: "bottom",
              },
              tooltips: {
                mode: "index",
                intersect: false,
              },
              hover: {
                mode: "nearest",
                intersect: true,
              },
            },
          }}
        />
      </div>
      <div></div>
      {/* <button
                    className="px-4 py-2 bg-red-600 text-white font-medium rounded-md  focus:outline-none w-62"
                    onClick={() => setShowModalStart(true)}
                  >
                    Close
                  </button> */}
    </div>
  );
}
