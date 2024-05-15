import axios from "axios";
import Cookies from "js-cookie";

let authorizationHeader = {
  Authorization: "Bearer " + Cookies.get("token"),
};

export async function login(req) {
  const username = req.username;
  const password = req.password;
  try {
    const url = process.env.NEXT_PUBLIC_APP_URL + `/api/user/login`;
    const res = await axios.post(
      url,
      {
        username: username,
        password: password,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return res;
  } catch (error) {
    console.log("error", error);
    return error.response.status;
  }
}

export async function getUserCompany(token) {
  try {
    const url = process.env.NEXT_PUBLIC_APP_URL + `/api/user-company`;
    const res = await axios.get(url, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "Authorization":"Bearer " + token,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
}

export async function getNavigationItems(req) {
  const companyId = req.companyId;
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + `/api/company-module?id=${companyId}`;
    const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json", "Authorization":"Bearer " + Cookies.get("token") },
    });
    return res;
  } catch (error) {
    return error;
  }
}

export async function getUserModule(token) {
  try {
    const url = process.env.NEXT_PUBLIC_APP_URL + `/api/user-module`;
    const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json", "Authorization":"Bearer " + Cookies.get("token") },
      withCredentials: true,
    });
    return res;
  } catch (error) {
    return error;
  }
}

export async function getVariableData(req) {
  try {
    const month = req.month;
    const year = req.year;
    const url =
      process.env.NEXT_PUBLIC_APP_URL +
      `/api/variable?month=${month}&year=${year}`;
    const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json", "Authorization":"Bearer " + Cookies.get("token") },
    });
    return res;
  } catch (error) {
    return error;
  }
}

//-----------------------Air Compressor-----------------------------
export async function ChangestatusIsOff (devId,username,password) {
  try {
    let url = process.env.NEXT_PUBLIC_APP_URL + `/api/device-management/air-compressor/stop`;
    let res = await axios.post(
      url,
      {
        devId : devId,
        username : username,
        password : password,
      },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" ,"Authorization":"Bearer " + Cookies.get("token")},
      }
    );
    return res;
  } catch (error) {
    console.log("error", error);
    return error
  }
}


export async function ChangestatusIsOn (devId,username,password) {
  try {
    let url = process.env.NEXT_PUBLIC_APP_URL + `/api/device-management/air-compressor/start`;
    console.log(authorizationHeader)
    let res = await axios.post(
      url,
      {
        username : username,
        password : password,
        devId : devId,
      },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" ,"Authorization":"Bearer " + Cookies.get("token")},
      }
    );
    return res;
  } catch (error) {
    console.log("error", error);
    return error
  }
}

export async function getHistoricalGraph(req) {
  // console.log(Cookies.get("token"))
  const floorId = req.floorId;
  const unit = req.unit
  const dateFrom = req.dateFrom
  const dateTo = req.dateTo
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + `/api/device-management/air-compressor/graph?floorId=${floorId}&unit=${unit}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",},
    });
    return res;
  } catch (error) {
    return error;
  }
}

export async function getBranch(req) {
  const companyid = req.Id
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/branch-list/'+companyid;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
  } catch (error) {
    return error;
  }
}

export async function getBulding(branchId) {
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/building-list/'+branchId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
  } catch (error) {
    return error;
  }
}

export async function getFloor(buildingId) {
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/floor-list/'+buildingId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
  } catch (error) {
    return error;
  }
}


//-------------------Hvac----------------------------------- 
export async function getFloorplanHvac(floorId) {
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/cpms/hvac/floor-plan/'+floorId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}

export async function getAHU(floorId) {
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/cpms/hvac/ahu/list/'+floorId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}

export async function getVAV(floorId) {
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/cpms/hvac/vav/list/'+floorId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}

export async function getIOT(floorId) {
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/cpms/hvac/iot/list/'+floorId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}

export async function getSplittype(floorId) {
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/cpms/hvac/split-type/list/'+floorId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}

export async function ChangeValueSettempSplttpye (devId,value) {
  try {
    let url = process.env.NEXT_PUBLIC_APP_URL + `/api/device-management/cpms/hvac/split-type/temp`;
    let res = await axios.post(
      url,
      {
        value : value,
        devId : devId,
      },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" ,"Authorization":"Bearer " + Cookies.get("token")},
      }
    );
    return res;
  } catch (error) {
    console.log("error", error);
    return error
  }
}

export async function ChangeValueSetMode (devId,value) {
  try {
    let url = process.env.NEXT_PUBLIC_APP_URL + `/api/device-management/cpms/hvac/split-type/mode`;
    let res = await axios.post(
      url,
      {
        value : value,
        devId : devId,
      },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" ,"Authorization":"Bearer " + Cookies.get("token")},
      }
    );
    return res;
  } catch (error) {
    console.log("error", error);
    return error
  }
}

export async function ChangeValueSetFan (devId,value) {
  try {
    let url = process.env.NEXT_PUBLIC_APP_URL + `/api/device-management/cpms/hvac/split-type/fan`;
    let res = await axios.post(
      url,
      {
        value : value,
        devId : devId,
      },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" ,"Authorization":"Bearer " + Cookies.get("token")},
      }
    );
    return res;
  } catch (error) {
    console.log("error", error);
    return error
  }
}

export async function ChangeControlSplittype (devId,value) {
  try {
    let url = process.env.NEXT_PUBLIC_APP_URL + `/api/device-management/cpms/hvac/split-type/control`;
    let res = await axios.post(
      url,
      {
        devId : devId,
        value : value,
        
      },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" ,"Authorization":"Bearer " + Cookies.get("token")},
      }
    );
    return res;
  } catch (error) {
    console.log("error", error);
    return error
  }
}

export async function ChangeAutomationSplittype (devId,value) {
  try {
    let url = process.env.NEXT_PUBLIC_APP_URL + `/api/device-management/cpms/hvac/split-type/automation`;
    let res = await axios.post(
      url,
      {
        devId : devId,
        value : value,
        
      },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" ,"Authorization":"Bearer " + Cookies.get("token")},
      }
    );
    return res;
  } catch (error) {
    console.log("error", error);
    return error
  }
}
export async function ChangeAutomationAHU (devId,value) {
  try {
    let url = process.env.NEXT_PUBLIC_APP_URL + `/api/device-management/cpms/hvac/ahu/automation`;
    let res = await axios.post(
      url,
      {
        devId : devId,
        value : value,
        
      },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" ,"Authorization":"Bearer " + Cookies.get("token")},
      }
    );
    return res;
  } catch (error) {
    console.log("error", error);
    return error
  }
}
export async function getAHUGraph(req) {
  
  const floorId = req.floorId;
  const dateFrom = req.dateFrom
  const dateTo = req.dateTo
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + `/api/device-management/cpms/hvac/ahu/graph?floorId=${floorId}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",},
    });
    return res;
  } catch (error) {
    return error;
  }
}

export async function getSplittypeGraph(req) {
  
  const floorId = req.floorId;
  const dateFrom = req.dateFrom
  const dateTo = req.dateTo
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + `/api/device-management/cpms/hvac/split-type/graph?floorId=${floorId}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",},
    });
    return res;
  } catch (error) {
    return error;
  }
}

export async function ChangeValueSettempAHU (devId,value) {
  try {
    let url = process.env.NEXT_PUBLIC_APP_URL + `/api/device-management/cpms/hvac/ahu/supply-temp`;
    let res = await axios.post(
      url,
      {
        value : value,
        devId : devId,
      },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" ,"Authorization":"Bearer " + Cookies.get("token")},
      }
    );
    return res;
  } catch (error) {
    console.log("error", error);
    return error
  }
}

export async function ChangeValueDamperVAV (devId,value) {
  try {
    let url = process.env.NEXT_PUBLIC_APP_URL + `/api/device-management/cpms/hvac/vav/damper`;
    let res = await axios.post(
      url,
      {
        value : value,
        devId : devId,
      },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" ,"Authorization":"Bearer " + Cookies.get("token")},
      }
    );
    return res;
  } catch (error) {
    console.log("error", error);
    return error
  }
}
//Detail
export async function getVAVDetail(devId) {
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/cpms/hvac/vav/detail/'+devId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}
export async function getSplitTypeDetail(devId) {
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/cpms/hvac/split-type/detail/'+devId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}
export async function getAHUDetail(devId) {
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/cpms/hvac/ahu/detail/'+devId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}
export async function getIoTDetail(devId) {
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/cpms/hvac/iot/detail/'+devId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}



//-------------------------Iot-----------------------------------------------*
export async function getFloorplanIoT(floorId) {
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/iot/floor-plan/'+floorId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}
//****---device-parameter data on table---****
export async function getdeviceparameter(deviceTypeId) {
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-parameter/'+deviceTypeId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}
export async function getExternalList(floorId) {
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/cpms/hvac/external/'+floorId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}
//indoor-temp-humid
export async function getindoortemphumid(floorId) {
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/iot/indoor-temp-humid/list/'+floorId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}
//outdoor-temp-humid
export async function getoutdoortemphumid(floorId) {
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/iot/outdoor-temp-humid/list/'+floorId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}
//Pressure gauge
export async function getPressuregauge(floorId) {
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/iot/pressure-gauge/list/'+floorId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}
//Power Meter
export async function getPowerMeter(floorId) {
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/iot/power-meter/list/'+floorId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}
//Inveter
export async function getInveter(floorId) {
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/iot/inverter/list/'+floorId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}
//Flow Meter
export async function getFlowMeter(floorId) {
  try {     
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/iot/flow-meter/list/'+floorId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}
//Motion Sensor
export async function getMotionSensor(floorId) {
  try {     
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/iot/motion-sensor/list/'+floorId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}
//Lighting
export async function getLighting(floorId) {
  try {     
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/iot/lighting/list/'+floorId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}
//Counter
export async function getCounter(floorId) {
  try {     
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/iot/counter/list/'+floorId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}
//Smart IR
export async function getSmartIR(floorId) {
  try {     
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/iot/smart-ir/list/'+floorId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}
//Efficiency
export async function getEfficiency(floorId) {
  try {     
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/iot/efficiency/list/'+floorId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}
//CCTV ยังมีปัญหาเป็น Api เดียวกับ Efficiency
export async function getCCTV(floorId) {
  try {     
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/iot/cctv/list/'+floorId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}
//CO2 Sensor
export async function getCO2Sensor(floorId) {
  try {     
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/iot/co2/list/'+floorId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}
//Water Meter  
export async function getWaterMeter(floorId) {
  try {     
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/iot/water-meter/list/'+floorId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
} 
//Heater  
export async function getHeater(floorId) {
  try {     
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/iot/heater/list/'+floorId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}
//Heater Water 
export async function getHeaterWater(floorId) { 
  try {     
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/iot/heater-water/list/'+floorId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}    
export async function getIotModuleGraph(req) {
  
  const deviceParameterId = req.deviceParameterId;
  const dateFrom = req.dateFrom
  const dateTo = req.dateTo
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + `/api/device-management/iot/graph/${deviceParameterId}?dateFrom=${dateFrom}&dateTo=${dateTo}`;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",},
      
    });
    return res;
    
  } catch (error) {
    return error;
  }
}
export async function SmartIRSetTemp (devId,value) {
  try {
    let url = process.env.NEXT_PUBLIC_APP_URL + `/api/device-management/iot/smart-ir/temp`;
    let res = await axios.post(
      url,
      {
        value : value,
        devId : devId,
      },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" ,"Authorization":"Bearer " + Cookies.get("token")},
      }
    );
    return res;
  } catch (error) {
    console.log("error", error);
    return error
  }
}
export async function ChangeControlSmartIR (devId,value) {
  try {
    let url = process.env.NEXT_PUBLIC_APP_URL + `/api/device-management/iot/smart-ir/control`;
    let res = await axios.post(
      url,
      {
        devId : devId,
        value : value,
        
      },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" ,"Authorization":"Bearer " + Cookies.get("token")},
      }
    );
    return res;
  } catch (error) {
    console.log("error", error);
    return error
  }
}
export async function ChangeSetFanSmartIR (devId,value) {
  try {
    let url = process.env.NEXT_PUBLIC_APP_URL + `/api/device-management/iot/smart-ir/fan`;
    let res = await axios.post(
      url,
      {
        value : value,
        devId : devId,
      },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" ,"Authorization":"Bearer " + Cookies.get("token")},
      }
    );
    return res;
  } catch (error) {
    console.log("error", error);
    return error
  }
}
export async function ChangeSetModeSmartIR (devId,value) {
  try {
    let url = process.env.NEXT_PUBLIC_APP_URL + `/api/device-management/iot/smart-ir/mode`;
    let res = await axios.post(
      url,
      {
        value : value,
        devId : devId,
      },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" ,"Authorization":"Bearer " + Cookies.get("token")},
      }
    );
    return res;
  } catch (error) {
    console.log("error", error);
    return error
  }
}
export async function ChangeControlLightning (devId,value) {
  try {
    let url = process.env.NEXT_PUBLIC_APP_URL + `/api/device-management/iot/lighting/control`;
    let res = await axios.post(
      url,
      {
        devId : devId,
        value : value,
        
      },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" ,"Authorization":"Bearer " + Cookies.get("token")},
      }
    );
    return res;
  } catch (error) {
    console.log("error", error);
    return error
  }
}
export async function ChangeControleHeater (devId,value) {
  try {
    let url = process.env.NEXT_PUBLIC_APP_URL + `/api/device-management/iot/heater/control`;
    let res = await axios.post(
      url,
      {
        devId : devId,
        value : value,
      },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" ,"Authorization":"Bearer " + Cookies.get("token")},
      }
    );
    return res;
  } catch (error) {
    console.log("error", error);
    return error
  }
}

//Detail
export async function getindoortemphumidDetail(devId) {
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/iot/indoor-temp-humid/detail/'+devId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}
export async function getoutndoortemphumidDetail(devId) {
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/iot/outdoor-temp-humid/detail/'+devId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}
export async function getpressuregaugeDetail(devId) {
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/iot/pressure-gauge/detail/'+devId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}
export async function getpowermeterDetail(devId) {
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/iot/power-meter/detail/'+devId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}
export async function getinverterDetail(devId) {
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/iot/inverter/detail/'+devId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}
export async function getflowmeterDetail(devId) {
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/iot/flow-meter/detail/'+devId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}
export async function getmotionsensorDetail(devId) {
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/iot/motion-sensor/detail/'+devId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}
export async function getlightingDetail(devId) {
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/iot/lighting/detail/'+devId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}
export async function getcounterDetail(devId) {
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/iot/counter/detail/'+devId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}
export async function getsmartirDetail(devId) {
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/iot/smart-ir/detail/'+devId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}
export async function getefficiencyDetail(devId) {
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/iot/efficiency/detail/'+devId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}
export async function getCCTVDetail(devId) {
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/iot/cctv/detail/'+devId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}
export async function getco2Detail(devId) {
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/iot/co2/detail/'+devId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}
export async function getwatermeterDetail(devId) {
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/iot/water-meter/detail/'+devId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}
export async function getheaterDetail(devId) {
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/iot/heater/detail/'+devId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}
export async function getheaterwaterDetail(devId) {
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/iot/heater-water/detail/'+devId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}

//Overview-----------------------------------------------
export async function getHistoricalChart(req) {
  
  const floorId = req.floorId;
  const dateFrom = req.dateFrom
  const dateTo = req.dateTo
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + `/api/device-management/cpms/overview/historical?floorId=${floorId}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",},
    });
    return res;
  } catch (error) {
    return error;
  }
}
export async function getEnergyConsumptionChart(req) {
  
  const floorId = req.floorId;
  const date = req.date
  const period = req.period
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + `/api/device-management/cpms/overview/consumption/graph?floorId=${floorId}&date=${date}&period=${period}`;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",},
    });
    return res;
  } catch (error) {
    return error;
  }
}
export async function getSummary(floorId) {
  try {     
    const url =
      process.env.NEXT_PUBLIC_APP_URL + '/api/device-management/cpms/overview/summary/'+floorId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
    
  } catch (error) {
    return error;
  }
}


