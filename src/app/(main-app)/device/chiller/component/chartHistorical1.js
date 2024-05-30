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
import dayjs from 'dayjs';
import { getHistoricalChart1 } from "@/utils/api";
import { DatePicker, Radio} from "antd";
import moment from "moment";
const { MonthPicker, RangePicker ,YearPicker} = DatePicker;
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

export default function HistoricalChart1({ BuildingId }) {
  const [floorId, setFloorId] = useState();
  const [CHSList, setCHSList] = useState([]);
  const [CHRList, setCHRList] = useState([]);
  const [OutdoorList, setOutdoorList] = useState([]);
  const [ListLabel, setListLabel] = useState([0]);
  const [dateFrom, setdateFrom] = useState(new Date());
  const [dateTo, setdateTo] = useState(new Date());
  const [buildingId, setBuildingId] = useState();
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
    if (BuildingId != 0) {
      GetHistoricalGraph(BuildingId, formatDate(new Date()), formatDate(new Date()));
    }
  }, [BuildingId]);
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
  const options = {
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
          text: "Temperature (°F)",
          padding: { top: 30, left: 0, right: 0, bottom: 0 },
        },
      },
      y1: {
        beginAtZero: true,
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "Power (kW)",
          padding: { top: 30, left: 0, right: 0, bottom: 0 },
        },
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
    },
  };
  const chartRef = useRef(null);

  const onResetZoom = () => {
    chartRef.current.resetZoom();
  };

  const RandomColor = () => {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + randomColor;
  };

  async function GetHistoricalGraph(buildingId, dateFrom, dateTo) {
    setBuildingId(buildingId);
    const paramsNav = {
      buildingId: buildingId,
      dateFrom: dateFrom,
      dateTo: dateTo,
    };
    const res = await getHistoricalChart1(paramsNav);
    console.log(paramsNav);
    if (res.status === 200) {
      console.log(res.data[0])
      if (res.data[0]) {
        console.log([res.data[0]])
        setCHSList([res.data[0]]);
        let label = [];
        let modday = 0;
        if (res.data[0].data != null){
          for (let j = 0; j < res.data[0].data.length; j++) {
            label.push(res.data[0].data[j].time);
          }
          setListLabel(label);
        console.log(label)
        }    
        
        // console.log(label);
      }
      if (res.data[1]) {
        console.log(res.data[1])
        setCHRList([res.data[1]]);
        let label = [];
        let modday = 0;
        if (res.data[1].data != null){
          for (let j = 0; j < res.data[1].data.length; j++) {
            label.push(res.data[1].data[j].time);
          }
          setListLabel(label);
          console.log(label)
        }  
      
      }
      if (res.data[2]) {
        setOutdoorList([res.data[2]]);
        let label = [];
        let modday = 0;
        if (res.data[2].data != null){
          for (let j = 0; j < res.data[2].data.length; j++) {
            label.push(res.data[2].data[j].time);
          }
        setListLabel(label);
        console.log(label)
        }   
      }
    }
  }
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current > dayjs().endOf('day');
  };
  function onChangeDay(date, dateString) {
    console.log(dateString);
    if(dateString[0] != "" && dateString[1] != ""){
    GetHistoricalGraph(BuildingId, formatDate(dateString[0]), formatDate(dateString[1]));
    }
    else {
      setCHRList([])
      setCHSList([])
      setOutdoorList([])
      setListLabel([])
    }
  }

  // const [placement, SetPlacement] = useState('day');
  // const placementChange = (e) => {
  //   SetPlacement(e.target.value);
  // };
  return (
    <div className="grid rounded-xl bg-white p-3 shadow-default dark:border-slate-800 dark:bg-dark-box dark:text-slate-200 my-5">
      <div className="flex flex-col gap-4 p-2">
      <span className="text-lg  font-bold">Historical</span>
        <div className="flex gap-4 items-center">
        {/* <Radio.Group value={placement} onChange={placementChange} buttonStyle="solid" style={{color : "primary"}}>
        <Radio.Button className="bg-white border shadow-default dark:border-slate-300 dark:bg-dark-box dark:text-slate-200" value="day">Day</Radio.Button>
        <Radio.Button className="bg-white border shadow-default dark:border-slate-300 dark:bg-dark-box dark:text-slate-200" value="month">Month</Radio.Button>
        <Radio.Button className="bg-white border shadow-default dark:border-slate-300 dark:bg-dark-box dark:text-slate-200" value="year">Year</Radio.Button>
      </Radio.Group> */}
          <RangePicker className="bg-white border shadow-default dark:border-slate-300 dark:bg-dark-box dark:text-slate-200" onChange={onChangeDay} defaultValue={[dayjs(formatDate(dateFrom), dateFormat), dayjs(formatDate(dateTo), dateFormat)]}
      format={dateFormat} disabledDate={disabledDate}/>
      
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
              ...CHSList.map((item) => {
                console.log(item)
                return {
                  label: item.label ,
                  data: item.data != null ? item.data?.map((data) => {
                    return data.value;
                  }) : null,
                  borderColor: RandomColor(),
                  fill: false,
                  tension: 0,
                  yAxisID: "y",
                };
              }),

              ...CHRList.map((item) => {
                return {
                  label: item.label,
                  data: item.data != null ? item.data.map((data) => {
                    return data.value;
                  }) : null,
                  borderColor: RandomColor(),
            
                  fill: true,
                  tension: 0,
                  yAxisID: "y",
                };
              }),

              ...OutdoorList.map((item) => {
                return {
                  label: item.label,
                  data: item.data != null ? item.data.map((data) => {
                    return data.value;
                  }) : null,
                  borderColor: RandomColor(),
                  
                  fill: true,
                  tension: 0,
                  yAxisID: "y",
                };
              }),
            ],
          }}
          ref={chartRef}
          options={options}
        />
      )}
    </div>
  );
}
