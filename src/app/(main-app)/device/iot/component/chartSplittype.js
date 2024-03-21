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
  import { Line } from "react-chartjs-2";
  import zoomPlugin from "chartjs-plugin-zoom";
  
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
export default function ChartSplittype({power,temp,roomtemp,external,label}) {
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
    return (
        <div className="grid rounded-xl bg-white p-3 shadow-default dark:border-slate-800 dark:bg-dark-box dark:text-slate-200 my-5">
            <div className="flex flex-col gap-4 p-2">
                <div className="flex justify-between">
                    <span className="text-lg  font-bold">Graph Split Type</span>
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
                                labels: label,
                                datasets: [
                                    ...power.map((item) => {
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


                                    ...temp.map((item) => {

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

                                    ...roomtemp.map((item) => {

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

                                    ...external.map((item) => {

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
