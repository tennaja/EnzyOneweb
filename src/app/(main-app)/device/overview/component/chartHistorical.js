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
import { getHistoricalChart } from "@/utils/api";
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

export default function HistoricalChart({ FloorId }) {
  const [floorId, setFloorId] = useState();
  const [currentpower, setCurrentPower] = useState([]);
  const [powergeneration, setPowergeneration] = useState([]);
  const [numberpeople, setNumberpeople] = useState([]);
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
    if (FloorId != 0) {
      GetHistoricalGraph(FloorId, formatDate(new Date()), formatDate(new Date()));
    }
  }, [FloorId]);
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
          text: "Power (kW)",
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
          text: "No. of people",
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

  async function GetHistoricalGraph(floorId, dateFrom, dateTo) {
    setFloorId(floorId);
    const paramsNav = {
      floorId: floorId,
      dateFrom: dateFrom,
      dateTo: dateTo,
    };
    const res = await getHistoricalChart(paramsNav);
    console.log(paramsNav);
    if (res.status === 200) {
      console.log(res.data.power[0])
      if (res.data.power[0]) {
        console.log([res.data.power[0]])
        setCurrentPower([res.data.power[0]]);
        let label = [];
        let modday = 0;
        if (res.data.power[0].data != null){
          for (let j = 0; j < res.data.power[0].data.length; j++) {
            label.push(res.data.power[0].data[j].time);
          }
          setListLabel(label);
        console.log(label)
        }    
        
        // console.log(label);
      }else{
        console.log("No Data .....")
      }
      if (res.data.power[1]) {
        console.log(res.data.power[1])
        setPowergeneration([res.data.power[1]]);
        let label = [];
        let modday = 0;
        if (res.data.power[1].data != null){
          for (let j = 0; j < res.data.power[1].data.length; j++) {
            label.push(res.data.power[1].data[j].time);
          }
          setListLabel(label);
          console.log(label)
        }  
      
      }
      if (res.data.count[0]) {
        setNumberpeople([res.data.count[0]]);
        let label = [];
        let modday = 0;
        if (res.data.count[0].data != null){
          for (let j = 0; j < res.data.count[0].data.length; j++) {
            label.push(res.data.count[0].data[j].time);
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
    GetHistoricalGraph(FloorId, formatDate(dateString[0]), formatDate(dateString[1]));
    }
    else {
      setCurrentPower([])
      setPowergeneration([])
      setNumberpeople([])
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
              ...currentpower.map((item) => {
                console.log(item)
                return {
                  label: item.label + " (kW)",
                  data: item.data != null ? item.data?.map((data) => {
                    return data.value;
                  }) : null,
                  borderColor: RandomColor(),
                  fill: false,
                  tension: 0,
                  yAxisID: "y",
                };
              }),

              ...powergeneration.map((item) => {
                return {
                  label: item.label + " (kW)",
                  data: item.data != null ? item.data.map((data) => {
                    return data.value;
                  }) : null,
                  borderColor: RandomColor(),
            
                  fill: true,
                  tension: 0,
                  yAxisID: "y",
                };
              }),

              ...numberpeople.map((item) => {
                return {
                  label: item.label,
                  data: item.data != null ? item.data.map((data) => {
                    return data.value;
                  }) : null,
                  borderColor: RandomColor(),
                  borderWidth: 1,
                  borderDash: [10, 5],
                  fill: true,
                  tension: 0,
                  yAxisID: "y1",
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
