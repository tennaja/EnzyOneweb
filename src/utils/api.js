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

export async function getFloorplan(floorId) {
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

export async function ChangeControlSplittypeIsOff (devId,value) {
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