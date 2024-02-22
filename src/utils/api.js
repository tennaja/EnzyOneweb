import axios from "axios";
import Cookies from "js-cookie";

const authorizationHeader = {
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
        Authorization: `Bearer ${token}`,
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
      headers: { "Content-Type": "application/json", ...authorizationHeader },
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
      headers: { "Content-Type": "application/json", ...authorizationHeader },
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
      headers: { "Content-Type": "application/json", ...authorizationHeader },
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
        headers: { "Content-Type": "application/json" ,...authorizationHeader},
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
        headers: { "Content-Type": "application/json" ,...authorizationHeader},
      }
    );
    return res;
  } catch (error) {
    console.log("error", error);
    return error
  }
}

export async function getHistoricalGraph(req) {
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
  const companyId = req.companyId;
  try {
    const url =
      process.env.NEXT_PUBLIC_APP_URL + 'https://enzy.egat.co.th/api/branch-list/'+companyId;
      const res = await axios.get(url, {
      withCredentials: true,
      headers: { "Content-Type": "application/json",  },
    });
    return res;
  } catch (error) {
    return error;
  }
}