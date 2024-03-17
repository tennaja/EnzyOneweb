// "use client";
// import React, { useEffect, useState ,useRef} from "react";
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
//   } from "chart.js";
//   import { Line } from "react-chartjs-2";
//   import zoomPlugin from "chartjs-plugin-zoom";
  
//   ChartJS.register(
//     zoomPlugin,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
//   );
// export default function HoricalGraph({Data,Labels}) {
//     const zoomOptions = {
//         pan: {
//             enabled: true,
//             mode: 'x',
//             modifierKey: 'ctrl',
//         },
//         zoom: {
//             drag: {
//                 enabled: true
//             },

//             mode: 'x',
//         },

//     };
//     const options = {
//         responsive: true,
//         interaction: {
//             mode: "index",
//             intersect: false,
//         },
//         spanGaps: true,
//         plugins: {
//             legend: {
//                 position: "top",
//             },
//             zoom: zoomOptions,
//         },
//         scales: {
//             x: {
//                 display: true,
//                 grid: {
//                     drawOnChartArea: false, // only want the grid lines for one axis to show up
//                 },
//             },
//             y: {
//                 beginAtZero: true,
//                 type: 'linear',
//                 display: true,
//                 position: 'left',
//                 title: {
//                     display: true,
//                     text: 'Controle Value %',
//                     padding: { top: 30, left: 0, right: 0, bottom: 0 }
//                   },
//             },
//             y1: {
//                 beginAtZero: true,
//                 type: 'linear',
//                 display: true,
//                 position: 'right',
//                 title: {
//                     display: true,
//                     text: 'Temp',
//                     padding: { top: 30, left: 0, right: 0, bottom: 0 }
//                   },
//                 grid: {
//                     drawOnChartArea: false, // only want the grid lines for one axis to show up
//                 },
//             },
//         },
//     };
//     const chartRef = useRef(null);

//     const onResetZoom = () => {
//         chartRef.current.resetZoom();
//     };

//     const RandomColor = () => {
//         var randomColor = Math.floor(Math.random() * 16777215).toString(16);
//         return "#" + randomColor;
//     };
//     return (
//         <div>
//             <button
//               className="border border-slate-300 rounded-md h-9 px-2"
//               onClick={onResetZoom}
//             >
//               zoom reset
//             </button>
//               {(typeof window !== 'undefined') &&
//                         <Line
//                             data={{
//                                 labels: Labels,
//                                 datasets: [
//                                     ...Data.map((item) => {
//                                         return {
//                                             label: "Controle Value "+item.deviceName,
//                                             data: item.data.map((data) => {
//                                                 return data.value;
//                                             }),
//                                             borderColor: RandomColor(),
//                                             fill: false,
//                                             tension: 0,
//                                             yAxisID: 'y'
//                                         }

//                                     }),

//                                 ]





//                             }}
//                             ref={chartRef}
//                             options={options}
//                         />}
//                 </div>
            
        
//     )
// }
