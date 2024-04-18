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

import { getAHUGraph } from "@/utils/api";
import { DatePicker, Radio } from "antd";
import moment from "moment";
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

export default function ChartAHU({ FloorId }) {
  const [floorId, setFloorId] = useState();
  const [chartListAHU1, setChartListAHU1] = useState([]);
  const [chartListAHU2, setChartListAHU2] = useState([]);
  const [chartListAHU3, setChartListAHU3] = useState([]);
  const [ListLabelAHU, setListLabelAHU] = useState([0]);
  const [dateFrom, setdateFrom] = useState(new Date());
  const [dateTo, setdateTo] = useState(new Date());
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
      GetAHUGraph(FloorId, formatDate(new Date()), formatDate(new Date()));
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
          text: "Controle Valve %",
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
          text: "Temp",
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

  async function GetAHUGraph(floorId, dateFrom, dateTo) {
    setFloorId(floorId);
    const paramsNav = {
      floorId: floorId,
      dateFrom: dateFrom,
      dateTo: dateTo,
    };
    const res = await getAHUGraph(paramsNav);
    console.log(paramsNav);
    if (res.status === 200) {
      if (res.data.controlValve.length > 0) {
        setChartListAHU1(res.data.controlValve);
        let label = [];
        let modday = 0;
        console.log(res.data.controlValve);
        for (let j = 0; j < res.data.controlValve[0].data.length; j++) {
          label.push(res.data.controlValve[0].data[j].time);
        }
        setListLabelAHU(label);
        // console.log(label);
      }
      if (res.data.supplyTemp.length > 0) {
        setChartListAHU2(res.data.supplyTemp);
        let label = [];
        let modday = 0;
        console.log(res.data.supplyTemp);
      }
      if (res.data.returnTemp.length > 0) {
        setChartListAHU3(res.data.returnTemp);
        let label = [];
        let modday = 0;
        console.log(res.data.returnTemp);
      }
    }
  }

  function onChangeDay(date, dateString) {
    console.log(dateString);
    GetAHUGraph(FloorId, formatDate(dateString[0]), formatDate(dateString[1]));
  }
  return (
    <div className="grid rounded-xl bg-white p-3 shadow-default dark:border-slate-800 dark:bg-dark-box dark:text-slate-200 my-5">
      <div className="flex flex-col gap-4 p-2">
        <div className="flex gap-4">
          <RangePicker onChange={onChangeDay} />
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
            labels: ListLabelAHU,
            datasets: [
              ...chartListAHU1.map((item) => {
                return {
                  label: "Controle Value " + item.deviceName,
                  data: item.data.map((data) => {
                    return data.value;
                  }),
                  borderColor: RandomColor(),
                  fill: false,
                  tension: 0,
                  yAxisID: "y",
                };
              }),

              ...chartListAHU2.map((item) => {
                return {
                  label: "Supply Temp " + item.deviceName,
                  data: item.data.map((data) => {
                    return data.value;
                  }),
                  borderColor: RandomColor(),
                  borderWidth: 1,
                  borderDash: [10, 5],
                  fill: true,
                  tension: 0,
                  yAxisID: "y1",
                };
              }),

              ...chartListAHU3.map((item) => {
                return {
                  label: "Return Temp " + item.deviceName,
                  data: item.data.map((data) => {
                    return data.value;
                  }),
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
