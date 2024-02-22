"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import {
  getNavigationItems,
  getUserCompany,
  getUserModule,
  getVariableData,
  login,
} from "@/utils/api";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "@/redux/slicer/loadingSlice";
import { BeatLoader } from "react-spinners";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import {
  setUsername as setReduxUsername,
  setPassword as setReduxPassword,
  setGroupId,
  setEmail,
  setName,
  setNavigationItems,
  setUserModules,
} from "@/redux/slicer/userSlice";
import { setCompany, setListCompany } from "@/redux/slicer/companySlice";
import dayjs from "dayjs";
import {
  setFTCost,
  setOffPeakCost,
  setOnPeakCost,
  setPeakDemandCost,
  setServiceCost,
  setSolarHourCost,
  setSolarServiceCost,
} from "@/redux/slicer/variableSlice";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  const router = useRouter();

  const isLoading = useSelector((state) => state.isLoading.isLoading);
  const isDarkMode = useSelector((state) => state.appConfig.isDarkMode);
  const dispatch = useDispatch();
  // console.log("isDarkMode", isDarkMode);
  if (isDarkMode) document.body.classList.add("dark");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    dispatch(showLoading());
    const loginParam = {
      username: username,
      password: password,
    };
    const res = await login(loginParam);

    if (res.status === 200) {
      dispatch(hideLoading());

      await setToken(res?.data?.accessToken);

      await prepareData(res?.data?.accessToken);

      router.push("/device/air-compressor");
    } else {
      dispatch(hideLoading());
      setErrorMsg("Invalid username or password");
    }

    // Reset the form
    setUsername("");
    setPassword("");

    //
  };

  async function setToken(token) {
    Cookies.set("token", token);
    const decoded = jwtDecode(token);

    dispatch(setReduxUsername(decoded?.data?.username));
    dispatch(setReduxPassword(password));
    dispatch(setName(decoded?.data?.name));
    dispatch(setEmail(decoded?.data?.email));
    dispatch(setGroupId(decoded?.data?.user_group_id));
    return true;
  }

  async function prepareData(token) {
    const responseUserCompany = await getUserCompany(token);
    if (responseUserCompany.status === 200) {
      if (responseUserCompany.data?.length > 0) {
        // console.log("responseUserCompany", responseUserCompany.data);
        dispatch(setListCompany(responseUserCompany.data));
        dispatch(setCompany(responseUserCompany.data[0]));

        /**
         * Set NavigationsItem
         */
        const paramsNav = {
          companyId: responseUserCompany.data[0].Id,
        };
        const responseNavigationItems = await getNavigationItems(paramsNav);
        if (responseNavigationItems.status === 200) {
          dispatch(setNavigationItems(responseNavigationItems.data));
        }

        const responseUserModule = await getUserModule(token);
        console.log("responseUserModule", responseUserModule);
        if (responseUserModule.status === 200) {
          if (responseUserModule.data?.length > 0) {
            dispatch(setUserModules(responseUserModule.data));
          }
        }

        const now = dayjs();
        const paramsVariable = {
          month: now.get("month") + 1,
          year: now.get("year"),
        };
        const responseVariable = await getVariableData(paramsVariable);
        console.log("responseUserModule", responseVariable);
        if (responseVariable.status === 200) {
          if (responseVariable.data?.length > 0) {
            for (const variable of responseVariable.data) {
              if (variable.Data?.toLowerCase() == "ft")
                dispatch(setFTCost(variable.Value));
              else if (variable.Data?.toLowerCase() == "onpeak_cost")
                dispatch(setOnPeakCost(variable.Value));
              else if (variable.Data?.toLowerCase() == "offpeak_cost")
                dispatch(setOffPeakCost(variable.Value));
              else if (variable.Data?.toLowerCase() == "peakdemand_cost")
                dispatch(setPeakDemandCost(variable.Value));
              else if (variable.Data?.toLowerCase() == "service_cost")
                dispatch(setServiceCost(variable.Value));
              else if (variable.Data?.toLowerCase() == "solarhour")
                dispatch(setSolarHourCost(variable.Value));
              else if (variable.Data?.toLowerCase() == "solarservice_cost")
                dispatch(setSolarServiceCost(variable.Value));
            }
            /*  dispatch(setUserModules(responseVariable.data)); */
          }
        }
      }
    } else {
      // TODO : API ERROR
    }
  }
  /* 
  async function loginEnzyenergy(username, password) {
    const res = await axios.post(
      "https://enzyenergy-dev.egat.co.th/api/v1/users/login",
      {
        user: username,
        pass: password,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return res;
  }
  async function loginEnzyapp(username, password) {
    const res = await axios.post(
      "https://enzyapp-dev.egat.co.th/api/user/Login",
      {
        Username: username,
        Password: password,
      }
    );

    return res;
  }
   */
  useEffect(() => {
    // router.push("/Overview");
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24  bg-white   ">
      <div className="rounded-sm justify-center  bg-white shadow-default flex flex-1 dark:border-strokedark ">
        <div className="flex flex-wrap items-center   ">
          <div className="hidden w-full  xl:block xl:w-1/2">
            <div className="py-16 px-24 text-center">
              {/* <Link className="mb-5.5 inline-block" to="/">
              <img className="hidden dark:block" src={Logo} alt="Logo" />
              <img className="dark:hidden" src={LogoDark} alt="Logo" />
            </Link> */}

              <span className="mt-15 inline-block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 140 60"
                  width="350"
                  height="350"
                  className="d-flex mx-auto w-100"
                >
                  <g id="enzy_icon">
                    <path
                      fill="#F5EC63"
                      d="M22.302,23.663c-2.452,2.736-5.189,5.362-7.654,8.15c-3.484,7.712-7.056,16.092-10.371,24.076c-0.941-0.279-1.941,0.241-2.244,1.18c-0.287,0.889,0.156,1.832,0.988,2.206c0.022,0.016,0.043,0.024,0.07,0.031c0.039,0.015,0.073,0.036,0.113,0.049c0.953,0.307,1.978-0.219,2.285-1.173c0.239-0.742-0.031-1.523-0.611-1.98c2.553-4.838,5.721-10.549,8.109-14.855C15.788,36.118,19.496,28.949,22.302,23.663zM3.689,56.803c0.107-0.009,0.218,0.003,0.326,0.037c0.434,0.141,0.673,0.606,0.533,1.039c-0.14,0.434-0.607,0.672-1.041,0.532s-0.671-0.606-0.531-1.04C3.081,57.047,3.368,56.832,3.689,56.803z"
                    ></path>
                    <path
                      fill="#F9CA13"
                      d="M22.308,23.667c-5.273,3.932-11.511,8.154-16.73,12.199c-1.871,1.424-3.705,2.867-5.496,4.299c-0.083,0.059-0.106,0.172-0.053,0.26c0.056,0.094,0.175,0.123,0.268,0.066c2.412-1.467,4.849-2.896,7.326-4.25c2.191-1.168,5.319-2.825,7.441-4.043C17.563,29.486,19.915,26.381,22.308,23.667z"
                    ></path>
                    <path
                      fill="#38549B"
                      d="M21.734,0.567c-0.704,0.069-1.333,0.55-1.557,1.268c-0.232,0.747,0.047,1.528,0.635,1.979c-2.525,4.88-5.676,10.667-8.049,15.023c-2.76,5.25-6.414,12.449-9.18,17.755c2.431-2.754,5.147-5.402,7.592-8.208c3.441-7.774,6.968-16.223,10.234-24.266c0.945,0.272,1.942-0.259,2.236-1.203c0.297-0.956-0.239-1.976-1.195-2.273C22.211,0.566,21.969,0.543,21.734,0.567z M21.832,1.553c0.107-0.011,0.217-0.001,0.326,0.033c0.435,0.135,0.678,0.599,0.543,1.033c-0.135,0.435-0.6,0.678-1.035,0.543s-0.678-0.599-0.543-1.033C21.224,1.803,21.511,1.585,21.832,1.553z"
                    ></path>
                    <path
                      fill="#273460"
                      d="M25.609,19.573c-0.049-0.011-0.103-0.005-0.148,0.023c-2.402,1.485-4.826,2.933-7.293,4.305c-2.183,1.186-5.299,2.866-7.412,4.1c-2.479,2.73-4.805,5.854-7.178,8.585c5.243-3.971,11.449-8.239,16.637-12.326c1.861-1.437,3.682-2.894,5.463-4.34c0.082-0.059,0.107-0.174,0.053-0.262C25.702,19.613,25.658,19.584,25.609,19.573z"
                    ></path>
                  </g>
                  <g id="enzy_text" fill="#28345F">
                    <g id="enzy_label">
                      <path d="M29.221,37l3.968-18.79H45.88l-0.379,1.897h-10.3l-1.4,6.564h9.249l-0.408,1.867h-9.249l-1.4,6.594h10.298L41.912,37H29.221z"></path>
                      <path d="M45.442,37l3.967-18.79h2.159l7.498,15.113l3.21-15.113h2.393L60.701,37h-2.188l-7.498-15.084L47.834,37H45.442z"></path>
                      <path d="M64.23,37l0.263-1.343l14.063-15.55h-10.24l0.38-1.897H81.97l-0.292,1.488L67.732,35.133h10.794L78.147,37H64.23z"></path>
                      <path d="M86.93,37l1.488-7.002l-4.23-11.788h2.363l3.354,9.745l7.498-9.745H100l-9.19,11.788L89.321,37H86.93z"></path>
                    </g>
                    <g id="enzy_des">
                      <path d="M29.263,44.238V41.9h1.533v0.236h-1.244v0.817h1.117v0.232h-1.117v0.819h1.244v0.232H29.263z"></path>
                      <path d="M32.547,43.36h0.884l-0.444-1.202L32.547,43.36z M31.959,44.239l0.863-2.339h0.338l0.86,2.339h-0.296l-0.24-0.644h-0.987l-0.239,0.644H31.959z"></path>
                      <path d="M35.726,44.275c-0.282,0-0.51-0.036-0.684-0.109v-0.265c0.099,0.039,0.204,0.068,0.315,0.089c0.112,0.021,0.226,0.031,0.344,0.031c0.202,0,0.353-0.029,0.455-0.086c0.1-0.057,0.151-0.158,0.151-0.307c0-0.092-0.021-0.166-0.062-0.22c-0.041-0.054-0.109-0.101-0.203-0.138c-0.094-0.037-0.219-0.076-0.377-0.114c-0.249-0.063-0.424-0.146-0.525-0.245c-0.101-0.101-0.151-0.236-0.151-0.406c0-0.197,0.069-0.354,0.208-0.469c0.138-0.115,0.35-0.173,0.634-0.173c0.132,0,0.254,0.009,0.366,0.028c0.113,0.02,0.2,0.041,0.261,0.063v0.262c-0.084-0.032-0.176-0.056-0.275-0.073c-0.099-0.017-0.201-0.025-0.307-0.025c-0.193,0-0.341,0.029-0.444,0.087c-0.104,0.059-0.155,0.159-0.155,0.301c0,0.081,0.019,0.146,0.055,0.195c0.036,0.05,0.098,0.092,0.185,0.127s0.208,0.072,0.363,0.111c0.186,0.045,0.33,0.102,0.434,0.164c0.104,0.064,0.177,0.141,0.218,0.229c0.042,0.086,0.063,0.186,0.063,0.297c0,0.205-0.072,0.365-0.218,0.478S36.015,44.275,35.726,44.275"></path>
                      <path d="M38.306,44.238v-0.871L37.495,41.9h0.299l0.656,1.213l0.655-1.213h0.299l-0.81,1.467v0.871H38.306z"></path>
                      <path d="M44.338,44.238L43.81,41.9h0.286l0.426,1.925l0.49-1.667V41.9h0.236l0.529,1.925L46.21,41.9h0.282l-0.525,2.338H45.66l-0.494-1.779l-0.518,1.779H44.338z"></path>
                      <path d="M47.908,43.36h0.885l-0.444-1.202L47.908,43.36z M47.32,44.239l0.864-2.339h0.338l0.86,2.339h-0.296l-0.239-0.644h-0.987l-0.24,0.644H47.32z"></path>
                      <path d="M50.844,44.238v-0.871L50.033,41.9h0.3l0.655,1.213l0.655-1.213h0.3l-0.811,1.467v0.871H50.844z"></path>
                      <path d="M53.613,44.275c-0.281,0-0.509-0.036-0.684-0.109v-0.265c0.1,0.039,0.205,0.068,0.315,0.089c0.112,0.021,0.226,0.031,0.345,0.031c0.201,0,0.353-0.029,0.454-0.086c0.101-0.057,0.151-0.158,0.151-0.307c0-0.092-0.021-0.166-0.062-0.22c-0.041-0.054-0.108-0.101-0.203-0.138c-0.094-0.037-0.22-0.076-0.377-0.114c-0.249-0.063-0.424-0.146-0.524-0.245c-0.102-0.101-0.152-0.236-0.152-0.406c0-0.197,0.069-0.354,0.209-0.469c0.138-0.115,0.35-0.173,0.633-0.173c0.133,0,0.254,0.009,0.367,0.028s0.199,0.041,0.261,0.063v0.262c-0.085-0.032-0.176-0.056-0.274-0.073c-0.1-0.017-0.201-0.025-0.307-0.025c-0.193,0-0.341,0.029-0.444,0.087c-0.104,0.059-0.155,0.159-0.155,0.301c0,0.081,0.019,0.146,0.055,0.195c0.036,0.05,0.099,0.092,0.186,0.127s0.207,0.072,0.362,0.111c0.186,0.045,0.33,0.102,0.434,0.164c0.104,0.064,0.176,0.141,0.219,0.229c0.042,0.086,0.063,0.186,0.063,0.297c0,0.205-0.072,0.365-0.219,0.478S53.902,44.275,53.613,44.275"></path>
                      <path d="M59.572,44.238v-2.102h-0.754V41.9h1.797v0.236h-0.754v2.102H59.572z"></path>
                      <path d="M62.614,44.021c0.172,0,0.313-0.031,0.425-0.092c0.111-0.061,0.194-0.16,0.25-0.299c0.055-0.14,0.082-0.326,0.082-0.561c0-0.235-0.027-0.422-0.082-0.563c-0.056-0.139-0.139-0.238-0.25-0.299c-0.112-0.061-0.253-0.091-0.425-0.091s-0.313,0.03-0.425,0.091s-0.195,0.16-0.25,0.299c-0.056,0.141-0.084,0.327-0.084,0.563c0,0.234,0.028,0.421,0.084,0.561c0.055,0.139,0.139,0.238,0.25,0.299S62.442,44.021,62.614,44.021 M62.614,44.275c-0.354,0-0.618-0.096-0.79-0.289c-0.172-0.191-0.257-0.498-0.257-0.916c0-0.42,0.085-0.725,0.257-0.917s0.436-0.289,0.79-0.289c0.356,0,0.62,0.097,0.791,0.289c0.17,0.192,0.255,0.497,0.255,0.917c0,0.418-0.085,0.725-0.255,0.916C63.234,44.18,62.971,44.275,62.614,44.275"></path>
                      <path d="M68.803,44.275c-0.283,0-0.51-0.036-0.684-0.109v-0.265c0.098,0.039,0.203,0.068,0.314,0.089s0.227,0.031,0.344,0.031c0.202,0,0.354-0.029,0.455-0.086c0.101-0.057,0.151-0.158,0.151-0.307c0-0.092-0.021-0.166-0.062-0.22s-0.109-0.101-0.203-0.138s-0.219-0.076-0.377-0.114c-0.249-0.063-0.424-0.146-0.525-0.245c-0.101-0.101-0.15-0.236-0.15-0.406c0-0.197,0.068-0.354,0.207-0.469s0.35-0.173,0.635-0.173c0.131,0,0.254,0.009,0.365,0.028c0.113,0.02,0.2,0.041,0.262,0.063v0.262c-0.084-0.032-0.176-0.056-0.275-0.073c-0.098-0.017-0.201-0.025-0.307-0.025c-0.192,0-0.34,0.029-0.443,0.087c-0.104,0.059-0.155,0.159-0.155,0.301c0,0.081,0.019,0.146,0.055,0.195c0.036,0.05,0.099,0.092,0.185,0.127c0.088,0.035,0.209,0.072,0.363,0.111c0.186,0.045,0.33,0.102,0.434,0.164c0.104,0.064,0.176,0.141,0.219,0.229c0.042,0.086,0.063,0.186,0.063,0.297c0,0.205-0.073,0.365-0.219,0.478S69.091,44.275,68.803,44.275"></path>
                      <path d="M71.23,43.36h0.885l-0.444-1.202L71.23,43.36z M70.642,44.239l0.864-2.339h0.338l0.859,2.339h-0.296l-0.239-0.644h-0.987l-0.239,0.644H70.642z"></path>
                      <path d="M74.324,44.238L73.461,41.9h0.299l0.73,2.037l0.732-2.037h0.301l-0.86,2.338H74.324z"></path>
                      <path d="M76.703,44.238V41.9h1.533v0.236h-1.244v0.817h1.117v0.232h-1.117v0.819h1.244v0.232H76.703z"></path>
                      <path d="M82.711,44.238V41.9h1.533v0.236H83v0.817h1.117v0.232H83v0.819h1.244v0.232H82.711z"></path>
                      <path d="M85.478,44.238V41.9h0.261l1.293,1.881V41.9h0.289v2.338h-0.264l-1.29-1.877v1.877H85.478z"></path>
                      <path d="M88.625,44.238V41.9h1.533v0.236h-1.244v0.817h1.116v0.232h-1.116v0.819h1.244v0.232H88.625z"></path>
                      <path d="M91.68,43.124h0.628c0.152,0,0.272-0.039,0.36-0.118c0.088-0.078,0.133-0.205,0.133-0.379c0-0.327-0.152-0.49-0.455-0.49H91.68V43.124z M91.391,44.238V41.9h0.998c0.244,0,0.422,0.065,0.533,0.196c0.111,0.13,0.168,0.308,0.168,0.53c0,0.172-0.041,0.314-0.122,0.428c-0.081,0.115-0.201,0.191-0.36,0.229c0.047,0.029,0.082,0.063,0.107,0.101c0.023,0.038,0.049,0.088,0.075,0.151l0.296,0.703H92.79l-0.289-0.678c-0.03-0.072-0.067-0.125-0.11-0.156c-0.044-0.031-0.121-0.048-0.231-0.048H91.68v0.882H91.391z"></path>
                      <path d="M95.289,44.275c-0.244,0-0.447-0.049-0.608-0.145c-0.161-0.095-0.281-0.229-0.36-0.402c-0.081-0.173-0.121-0.375-0.121-0.607c0-0.254,0.038-0.477,0.113-0.665c0.074-0.188,0.192-0.334,0.352-0.438c0.16-0.103,0.367-0.154,0.621-0.154c0.131,0,0.25,0.009,0.357,0.028c0.106,0.02,0.207,0.047,0.301,0.08v0.262c-0.094-0.037-0.193-0.064-0.299-0.086c-0.106-0.02-0.218-0.03-0.335-0.03c-0.204,0-0.366,0.04-0.487,0.12c-0.119,0.08-0.205,0.195-0.256,0.346c-0.052,0.149-0.078,0.328-0.078,0.537c0,0.287,0.065,0.51,0.194,0.666c0.13,0.156,0.337,0.234,0.624,0.234c0.101,0,0.198-0.008,0.292-0.025c0.095-0.018,0.177-0.041,0.251-0.07v-0.744h-0.607v-0.203h0.856v1.111c-0.068,0.046-0.167,0.088-0.298,0.127C95.671,44.256,95.5,44.275,95.289,44.275"></path>
                      <path d="M97.914,44.238v-0.871L97.104,41.9h0.3l0.655,1.213l0.655-1.213h0.3l-0.811,1.467v0.871H97.914z"></path>
                    </g>
                  </g>
                </svg>
              </span>
            </div>
          </div>

          <div className="w-full border-stroke border-primary dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12 xl:p-16">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-dark-base sm:text-title-xl2">
                Login to your account 2
              </h2>

              {errorMsg != "" && (
                <div>
                  <label className="mb-2.5 p-2 rounded block font-medium text-red-400 bg-red-100 dark:text-dark-base">
                    {errorMsg}
                  </label>
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-dark-base">
                    Username <label className="text-sm text-gray-400"></label>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full rounded-lg border border-stroke text-black bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none "
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-dark-base">
                    Password <label className="text-sm text-gray-400"></label>
                  </label>
                  <div className="flex border  border-stroke bg-transparent  rounded-lg items-center    w-full   focus-within:border-primary px-3  ">
                    <input
                      id="password"
                      type={isShowPassword ? "text" : "password"}
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full py-4  px-3  outline-none bg-transparent "
                    />
                    <div
                      onClick={toggleShowPassword}
                      className="flex mr-2 w-6 h-6 items-center justify-center hover:bg-"
                    >
                      {isShowPassword ? (
                        <EyeSlashIcon className="w-4 h-4" />
                      ) : (
                        <EyeIcon className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  {isLoading ? (
                    <button
                      className="w-full bg-primary text-white rounded-lg p-4  focus:outline-none focus:shadow-outline flex justify-center items-center"
                      disabled
                    >
                      Siging in
                      <BeatLoader color="white" size={5} className="ml-3" />
                    </button>
                  ) : (
                    <input
                      type="submit"
                      value="Sign In"
                      className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                    />
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
