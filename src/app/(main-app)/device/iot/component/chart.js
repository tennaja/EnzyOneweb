"use client";
import React, { useEffect, useState, useRef } from "react";
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
import { getIotModuleGraph,getdeviceparameter } from "@/utils/api";
import dayjs from 'dayjs';
import { DatePicker, Radio } from "antd";
const { MonthPicker, RangePicker } = DatePicker;
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

export default function Chart({deviceTypeId}) {
  const [DeviceParameterId, setDeviceParameterId] = useState(1);
  const [chartList, setChartList] = useState([]);
  const [deviceparameterList,setDeviceparameterList] = useState([])
  const [ListLabel, setListLabel] = useState([0]);
  const [dateFrom, setdateFrom] = useState(new Date());
  const [dateTo, setdateTo] = useState(new Date());
  const dateFormat = 'YYYY/MM/DD';
  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  useEffect(() => {
    if (deviceTypeId != 0) {
      getDeviceparameterList(deviceTypeId);
    }
  }, [deviceTypeId]);
  
  useEffect(() => {
    if(DeviceParameterId != 0){GetGraph(DeviceParameterId, dateFrom, dateTo);}
  },[DeviceParameterId]);

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
      limits: {
        y: { min: 0, max: 100 },
        y2: { min: -5, max: 5 },
      },

      mode: "x",
    },
  };
  // const options = {
  //   aspectRatio: 4,
  //   responsive: true,
  //   interaction: {
  //     mode: "index",
  //     intersect: false,
  //   },
  //   spanGaps: true,
  //   plugins: {
  //     legend: {
  //       position: "top",
  //     },
  //     zoom: zoomOptions,
  //   },
  //   scales: {
  //     x: {
  //       display: true,
  //       grid: {
  //         drawOnChartArea: false, // only want the grid lines for one axis to show up
  //       },
  //     },
  //     y: {
  //       beginAtZero: true,
  //       type: "linear",
  //       display: true,
  //       position: "left",

  //       title: {
  //         display: true,
  //         text: "Controle Value %",
  //         padding: { top: 30, left: 0, right: 0, bottom: 0 },
  //       },
  //     },
     
  //   },
  // };
  const chartRef = useRef(null);

  const onResetZoom = () => {
    chartRef.current.resetZoom();
  };

  const RandomColor = () => {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomColor;
  };
  
  const OnchangeList = (event) => {
    setDeviceParameterId(event)
    GetGraph(event,dateFrom,dateTo)
  }
 
  const getDeviceparameterList = async (deviceTypeId) => {
    const result = await getdeviceparameter(deviceTypeId);
    console.log(result.data);
    setDeviceparameterList(result.data);
    };

  async function GetGraph(deviceParameterid, dateFrom, dateTo) {
    
    const paramsNav = {
      deviceParameterId : deviceParameterid,
      dateFrom: dateFrom,
      dateTo: dateTo,
    };
    const res = await getIotModuleGraph(paramsNav);
    // console.log(paramsNav);
    if (res.status === 200) {
        let data = [];
        data.push(res.data)
        console.log(data)
        setChartList(data);
        let label = [];
        for (let j = 0; j < res.data.data.length; j++)
        {
        label.push(res.data.data[j].time)
        }
        setListLabel(label)
        console.log(label)    
      }
      
    

  }

  function onChangeDay(date, dateString) {
    console.log(dateString);
    setdateFrom(dateString[0])
    setdateTo(dateString[1])
    GetGraph(DeviceParameterId, formatDate(dateString[0]), formatDate(dateString[1]));
  }
  return (
    <div className="grid rounded-xl bg-white p-3 shadow-default dark:border-slate-800 dark:bg-dark-box dark:text-slate-200 my-5">
      <div className="flex flex-col gap-4 p-2">
        <div className="flex gap-4">
        <div style={{ position: "relative"  }}>
          <RangePicker className="bg-white border shadow-default dark:border-slate-300 dark:bg-dark-box dark:text-slate-200" onChange={onChangeDay} defaultValue={[dayjs(formatDate(dateFrom), dateFormat), dayjs(formatDate(dateTo), dateFormat)]}
      format={dateFormat}/>
      <div className="bg-white shadow-default dark:border-slate-800 dark:bg-dark-box dark:text-slate-200" style={{position: "absolute", paddingLeft : "1rem", paddingRight : "1rem" , paddingBottom : "0.5rem", paddingTop: "1rem" ,left: "15.2rem",top: "0.1em",}}></div>
      </div>
          <select
              className="w-auto border border-slate-300 mx-2 rounded-md h-9 px-3"
              onChange={(e) => OnchangeList(e.target.value)}
              >
              {deviceparameterList.length > 0 &&
                deviceparameterList.map((item) => {
                  
                  return (
                  <option className="rounded-lg" key={item.id} value={item.id}>{item.name}</option>)
                })}
            </select>
          <button
            className="border border-slate-300 rounded-md h-9 px-2"
            onClick={onResetZoom}
          >
            zoom reset
          </button>
        </div>
      </div>

      {typeof window !== "undefined" && (
        <Line
          data={{
            labels: ListLabel,
            datasets: [
              ...chartList.map((item) => {
                return {
                  label: item.name,
                  data: item.data.map((data) => {
                    return data.value;
                  }),
                  borderColor: RandomColor(),
                  fill: false,
                  tension: 0,
                  yAxisID: "y",
                }
              }),
            ]
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
          text: "Controle Value %",
          padding: { top: 30, left: 0, right: 0, bottom: 0 },
        },
      },
     
    },
          }}
        />
      )}
    </div>
  );
}
