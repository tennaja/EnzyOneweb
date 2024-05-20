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
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import dayjs from 'dayjs';
import { getEnergyConsumptionChart } from "@/utils/api";
import { DatePicker, TimePicker,Radio} from "antd";


ChartJS.register(
  zoomPlugin,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function ChartEnergyConsumption({ FloorId }) {
  const [floorId, setFloorId] = useState();
  const [chartListAHU1, setChartListAHU1] = useState([]);
  const [ListLabelAHU, setListLabelAHU] = useState([0]);
  const [placement, SetPlacement] = useState('day');
  const [startdate, setStartDate] = useState(new Date());
  const dateFormat = 'YYYY/MM/DD';
  // const yearlabel =['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  
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
    if (FloorId != 0 && placement) {
      GetEnergyGraph(FloorId, formatDate(new Date()),placement );
    }
  }, [FloorId,placement]);
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
          text: "Energy Consumption (kWh)",
          padding: { top: 30, left: 0, right: 0, bottom: 0 },
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

  async function GetEnergyGraph(floorId, date, period) {
    setFloorId(floorId);
    const paramsNav = {
      floorId: floorId,
      date: date,
      period: placement,
    };
    const res = await getEnergyConsumptionChart(paramsNav);
    console.log(paramsNav);
    if (res.status === 200) {
      console.log(res.data)
      if (res.data.length > 0) {
        setChartListAHU1(res.data);
        let label = [];
        let yearlabel =['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
        let modday = 0;

        if(placement == "year"){
          setListLabelAHU(yearlabel)
        }
        else {
          if (res.data[0].data != null){
            for (let j = 0; j < res.data[0].data.length; j++) {
              label.push(res.data[0].data[j].time);
              }
              setListLabelAHU(label);
          }
          
        }
        
        console.log(label)
        // console.log(label);
      }
    }
  }
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current > dayjs().endOf('day');
  };
  function onChangeDay(dateString) {
    console.log(formatDate(dateString));
    setStartDate(dateString)
    GetEnergyGraph(FloorId, formatDate(dateString),placement);
  }
  
  const placementChange = (event) => {
    console.log(event)
    onChangeDay(startdate)
    SetPlacement(event);
  };
  return (
    <div className="grid rounded-xl bg-white p-3 shadow-default dark:border-slate-800 dark:bg-dark-box dark:text-slate-200 my-5">
      <div className="flex flex-col gap-4 p-2">
      <span className="text-lg  font-bold">Energy Consumption</span>
        <div className="flex justify-center gap-4 items-center">
        <Radio.Group value={placement} onChange={(event) => placementChange(event.target.value)} buttonStyle="solid" style={{ backgroundcolor: '#2563eb'}}>
        <Radio.Button className="bg-white border shadow-default dark:border-slate-300 dark:bg-dark-box dark:text-slate-200" value="day">Day</Radio.Button>
        <Radio.Button className="bg-white border shadow-default dark:border-slate-300 dark:bg-dark-box dark:text-slate-200" value="month">Month</Radio.Button>
        <Radio.Button className="bg-white border shadow-default dark:border-slate-300 dark:bg-dark-box dark:text-slate-200" value="year">Year</Radio.Button>
      </Radio.Group>
          {/* <RangePicker className="bg-white border shadow-default dark:border-slate-300 dark:bg-dark-box dark:text-slate-200" onChange={onChangeDay} defaultValue={[dayjs(formatDate(dateFrom), dateFormat), dayjs(formatDate(dateTo), dateFormat)]}
      format={dateFormat} disabledDate={disabledDate}/> */}
      {placement == "day" ? <DatePicker defaultValue={[dayjs(formatDate(startdate), dateFormat)]} onChange={onChangeDay} disabledDate={disabledDate} /> : placement == "month" ? <DatePicker onChange={onChangeDay} picker="month" disabledDate={disabledDate}/> : <DatePicker onChange={onChangeDay} picker="year" disabledDate={disabledDate}/>}
          <button
            className="border border-slate-300 rounded-md h-9 px-2"
            onClick={onResetZoom}
          >
            zoom reset
          </button>
        </div>
      </div>

      {typeof window !== "undefined" && (
        <Bar
          data={{
            labels: ListLabelAHU,
            datasets: [
              ...chartListAHU1.map((item) => {
                return {
                  label: "Controle Value " + item.label,
                  data: item.data != null ? item.data.map((data) => {
                    return data.value;
                  }) : null,
                  backgroundColor : '#2563eb',
                  borderColor: 'red',
                  fill: false,
                  tension: 0,
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
