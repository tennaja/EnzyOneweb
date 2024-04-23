"use client";
import React, { useEffect, useState ,useRef} from "react";
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
  import dayjs from 'dayjs';
  
  import { Line } from "react-chartjs-2";
  import zoomPlugin from "chartjs-plugin-zoom";
  import { getSplittypeGraph } from "@/utils/api";
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
    Legend,
  );
export default function ChartSplittype({FloorId}) {
  const [floorId, setFloorId] = useState();
  const [chartListSplittype1, setChartListSplittype1] = useState([]);
  const [chartListSplittype2, setChartListSplittype2] = useState([]);
  const [chartListSplittype3, setChartListSplittype3] = useState([]);
  const [chartListSplittype4, setChartListSplittype4] = useState([]);
  const [ListLabelSplittype, setListLabelSplittype] = useState([0]);
  const [dateFrom, setdateFrom] = useState(new Date());
  const [dateTo, setdateTo] = useState(new Date());
  const dateFormat = 'YYYY/MM/DD';
  useEffect(() => {
    if (FloorId != 0) {
        GetSplittypeGraph(FloorId, formatDate(new Date()), formatDate(new Date()));
    }
  }, [FloorId]);

  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };
    const zoomOptions = {
        pan: {
            enabled: true,
            mode: 'x',
            modifierKey: 'ctrl',
        },
        zoom: {
            drag: {
                enabled: true
            },
            

            mode: 'x',
        },

    };
    const options = {
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
            afterDraw: chart => {
                if (chart.tooltip?._active?.length) {               
                   let x = chart.tooltip._active[0].element.x;             
                   let yAxis = chart.scales.y;
                   let ctx = chart.ctx;
                   ctx.save();
                   ctx.beginPath();
                   ctx.moveTo(x, yAxis.top);
                   ctx.lineTo(x, yAxis.bottom);
                   ctx.lineWidth = 1;
                   ctx.strokeStyle = 'rgba(0, 0, 255, 0.4)';
                   ctx.stroke();
                   ctx.restore();
                }
              }
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
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Power',
                    padding: { top: 30, left: 0, right: 0, bottom: 0 }
                  },
            },
            y1: {
                beginAtZero: true,
                type: 'linear',
                display: true,
                position: 'right',
                title: {
                    display: true,
                    text: 'Temp',
                    padding: { top: 30, left: 0, right: 0, bottom: 0 }
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

    async function GetSplittypeGraph(floorId, dateFrom, dateTo) {
        setFloorId(floorId);
        const paramsNav = {
          floorId: floorId,
          dateFrom: dateFrom,
          dateTo: dateTo,
        };
        const res = await getSplittypeGraph(paramsNav);
        console.log(paramsNav);
        if (res.status === 200) {
          if (res.data.power.length > 0) {
            setChartListSplittype1(res.data.power);
            let label = [];
            let modday = 0;
            console.log(res.data.power);
            for (let j = 0; j < res.data.power[0].data.length; j++) {
              label.push(res.data.power[0].data[j].time);
            }
            setListLabelSplittype(label);
            // console.log(label);
          }
          if (res.data.temp.length > 0) {
            setChartListSplittype2(res.data.temp);
            let label = [];
            let modday = 0;
            console.log(res.data.temp);
          }
          if (res.data.roomTemp.length > 0) {
            setChartListSplittype3(res.data.roomTemp);
            let label = [];
            let modday = 0;
            console.log(res.data.roomTemp);
          }
          if (res.data.external.length > 0) {
            setChartListSplittype4(res.data.external);
            let label = [];
            let modday = 0;
            console.log(res.data.external);
          }
        }
      }
      function onChangeDay(date, dateString) {
        console.log(dateString);
        GetSplittypeGraph(FloorId, formatDate(dateString[0]), formatDate(dateString[1]));
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
                    <button
              className="border border-slate-300 rounded-md h-9 px-2"
              onClick={onResetZoom}
            >
              zoom reset
            </button>
                </div>
            
            </div>
                
                    
                    {(typeof window !== 'undefined') &&
                        <Line
                            data={{
                                labels: ListLabelSplittype,
                                datasets: [
                                    ...chartListSplittype1.map((item) => {
                                        return {
                                            label: "Power "+item.deviceName,
                                            data: item.data.map((data) => {
                                                return data.value;
                                            }),
                                            borderColor: RandomColor(),
                                            fill: false,
                                            tension: 0,
                                            yAxisID: 'y'
                                        }

                                    }),


                                    ...chartListSplittype2.map((item) => {

                                        return {
                                            label: "Temp "+item.deviceName,
                                            data: item.data.map((data) => {

                                                return data.value;
                                            }),
                                            borderColor: RandomColor(),
                                            borderWidth: 1,
                                            borderDash: [10, 5],
                                            fill: true,
                                            tension: 0,
                                            yAxisID: 'y1'
                                        }
                                    }),

                                    ...chartListSplittype3.map((item) => {

                                        return {
                                            label: "Room Temp "+item.deviceName,
                                            data: item.data.map((data) => {

                                                return data.value;
                                            }),
                                            borderColor: RandomColor(),
                                            borderWidth: 1,
                                            borderDash: [10, 5],
                                            fill: true,
                                            tension: 0,
                                            yAxisID: 'y1'
                                        }
                                    }),

                                    ...chartListSplittype4.map((item) => {

                                        return {
                                            label: "External "+item.deviceName,
                                            data: item.data.map((data) => {

                                                return data.value;
                                            }),
                                            borderColor: RandomColor(),
                                            borderWidth: 1,
                                            borderDash: [10, 5],
                                            fill: true,
                                            tension: 0,
                                            yAxisID: 'y1'
                                        }
                                    })


                                ]





                            }}
                            ref={chartRef}
                            options={options}
                        />}
                </div>
            
        
    )
}
