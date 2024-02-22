"use client";
import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";
import { NavItems } from "./NavItem";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
  QuestionMarkCircleIcon,
  HomeIcon,
  BoltIcon,
  AdjustmentsVerticalIcon,
  HandThumbUpIcon,
  PresentationChartLineIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";
import { Disclosure, Listbox, Popover } from "@headlessui/react";
import { ToggleSwitch } from "./ToggleSwitch";
import { useDispatch, useSelector } from "react-redux";
import { setCompany, setListCompany } from "@/redux/slicer/companySlice";
import { usePathname, useRouter } from "next/navigation";
import { clearData, setNavigationItems } from "@/redux/slicer/userSlice";
import Cookies from "js-cookie";
import { HiOutlineLightBulb } from "react-icons/hi";
import { LuBatteryCharging } from "react-icons/lu";
import { getNavigationItems } from "@/utils/api";

// add NavItem prop to component prop

const Sidebar = ({ collapsed, shown, setCollapsed }) => {
  const company = useSelector((state) => state.companyData.listCompany);
  const companyData = useSelector((state) => state.companyData.company);

  const [selectedCompany, setSelectedCompany] = useState(companyData);
  const Icon = collapsed ? ChevronDoubleRightIcon : ChevronDoubleLeftIcon;

  const name = useSelector((state) => state.userData.name);
  const email = useSelector((state) => state.userData.email);
  const groupId = useSelector((state) => state.userData.groupId);

  const navItems = useSelector((state) => state.userData.navigationItems);
  const userModule = useSelector((state) => state.userData.userModules);

  const pathname = usePathname();

  const NavigationIcon = ({ icon }) => {
    switch (icon) {
      case "Overview":
        return <HomeIcon className="w-6 h-6" />;

      case "EnergyConsumption":
        return <HiOutlineLightBulb className="w-6 h-6" />;

      case "PowerGeneration":
        return <BoltIcon className="w-6 h-6" />;

      case "DeviceManagement":
        return <AdjustmentsVerticalIcon className="w-6 h-6" />;

      case "Battery":
        return <LuBatteryCharging className="w-6 h-6" />;

      case "Recommend":
        return <HandThumbUpIcon className="w-6 h-6" />;

      case "Report":
        return <PresentationChartLineIcon className="w-6 h-6" />;

      default:
        return <RectangleGroupIcon className="w-6 h-6" />;
    }
  };

  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCompany(selectedCompany));

    prepareNavigationItems(selectedCompany.Id);

    return () => {};
  }, [selectedCompany]);

  async function prepareNavigationItems(companyId) {
    const paramsNav = {
      companyId: companyId,
    };
    const responseNavigationItems = await getNavigationItems(paramsNav);
    if (responseNavigationItems.status === 200) {
      dispatch(setNavigationItems(responseNavigationItems.data));
    }
  }

  async function logout() {
    dispatch(setCompany(""));
    dispatch(setListCompany([]));
    dispatch(clearData());
    Cookies.remove("token");
    router.push("/");
  }
  return (
    <div
      className={classNames({
        "bg-[#1A2A39] shadow-lg text-[#D8D9DC]   md:translate-x-0 z-20": true,
        "transition-all duration-300 ease-in-out": true,
        "w-[300px]": !collapsed,
        "w-20": collapsed,
        "-translate-x-full": !shown,
      })}
    >
      <div
        className={classNames({
          "flex flex-col justify-between sticky md:fixed overflow-visible overflow-y-auto inset-0": true,
        })}
      >
        {/* logo and collapse button */}
        <div
          className={classNames({
            "flex flex-col border-b border-b-[#444B52] transition-none gap-4  ": true,
            "p-4 ": !collapsed,
            "py-4 items-center": collapsed,
          })}
        >
          <div className="flex items-center justify-center">
            <Image
              src={"/images/enzy_logo_w.png"}
              alt=""
              height={100}
              width={150}
            />
          </div>

          <div className="flex items-center gap-4 overflow-hidden">
            <Image
              src={"/images/profile.png"}
              height={36}
              width={36}
              alt="profile image"
              className="rounded-full bg-red-200"
            />
            {!collapsed && (
              <div className="flex flex-col">
                <span className="">{name}</span>
                {/* <span className="text-xs">FRONT-END Squad</span> */}
              </div>
            )}
          </div>
        </div>

        {/* ปุ่มลอย กรณีที่ Collapse */}
        <button
          className={classNames({
            " flex items-center justify-center bg-primary rounded-full opacity-100 w-8 h-8 text-white": true,
            "  -translate-y-24 translate-x-[285px]": !collapsed,
            "-translate-y-5 translate-x-16 ": collapsed,
          })}
          onClick={() => setCollapsed(!collapsed)}
        >
          <Icon className="w-4 h-4" />
        </button>

        {/* เลือก site */}
        {!collapsed &&
          (company.length > 1 ? (
            <div className="mx-5 mb-4">
              {/* <div className="text-sm mb-2 text-white/50">Select Site ...</div> */}

              <Listbox value={selectedCompany} onChange={setSelectedCompany}>
                <Listbox.Button className="flex w-full justify-between items-center rounded-lg bg-[#21424E] px-4 py-2 text-left">
                  <span className="block truncate">{selectedCompany.Name}</span>
                  <span className="pointer-events-none  inset-y-0 right-0 flex items-center pr-2">
                    <ChevronDownIcon
                      className="h-5 w-5 text-enzy-dark"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>

                <Listbox.Options className="mt-1 w-full overflow-auto rounded-md bg-[#21424E] text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {company.map((item) => (
                    <Listbox.Option
                      key={item.Id}
                      value={item}
                      className="p-4 cursor-pointer hover:text-primary"
                    >
                      {item.Name}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>
          ) : (
            <div className="mx-5 mb-4">
              <h4 className="  font-semibold  ">{selectedCompany?.Name}</h4>
            </div>
          ))}

        {/* Menu */}
        <nav className="flex-grow">
          <ul
            className={classNames({
              "my-2 flex flex-col gap-2 items-stretch": true,
              "gap-4": collapsed,
              "gap-2": !collapsed,
            })}
          >
            {navItems.map((item, index) => {
              return (
                <li
                  key={index}
                  className={classNames({
                    "text-[#D8D9DC] flex justify-center": true, //colors
                  })}
                >
                  {!item.sub ? (
                    item.isActive &&
                    userModule.find((user) => user.Module === item.name) ? (
                      <Link
                        href={item.href}
                        className={classNames({
                          "flex gap-2  hover:text-[#33BFBF] items-center  transition-colors duration-300": true,
                          "rounded-md p-2 mx-3 gap-4 w-full": !collapsed,
                          "p-2 mx-3 w-10 h-10 justify-center": collapsed,
                          "text-[#33BFBF]": item.href.includes(pathname),
                        })}
                      >
                        <div className="rounded-full p-2 bg-[#21424E] text-[#33BFBF] ">
                          <NavigationIcon icon={item.icon} />
                        </div>
                        {!collapsed && (
                          <span className="text-sm">{item.label}</span>
                        )}
                      </Link>
                    ) : (
                      <div
                        className={classNames({
                          "flex gap-2    items-center": true,
                          "rounded-md p-2 mx-3 gap-4 w-full": !collapsed,
                          "p-2 mx-3 w-10 h-10 justify-center": collapsed,
                        })}
                      >
                        <div className="rounded-full p-2 bg-[#21424E] text-gray-500 ">
                          <NavigationIcon icon={item.icon} />
                        </div>
                        {!collapsed && (
                          <span className="text-sm text-gray-500">
                            {item.label}
                          </span>
                        )}
                      </div>
                    )
                  ) : item.isActive ? (
                    !collapsed ? (
                      <div className="flex flex-col  w-full  rounded-md  mx-3 gap-4 ">
                        <Disclosure defaultOpen={pathname.includes(item.href)}>
                          {({ open }) => (
                            /* Use the `open` state to conditionally change the direction of an icon. */
                            <>
                              <Disclosure.Button className="flex gap-4  hover:text-[#33BFBF] rounded-md p-2 transition-colors duration-300 items-center">
                                <div className="rounded-full p-2 bg-[#21424E] text-[#33BFBF] ">
                                  <NavigationIcon icon={item.icon} />
                                </div>

                                {!collapsed && (
                                  <span className="flex-1 text-start text-sm">
                                    {item.label}
                                  </span>
                                )}

                                <ChevronDownIcon
                                  className={classNames({
                                    "w-3 h-3": true,
                                    "rotate-180 transform": open,
                                  })}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel>
                                <ul className="flex flex-col gap-2 items-stretch indent-12">
                                  {item.sub.map((sub, i) => {
                                    return (
                                      <li key={i}>
                                        {sub.isActive &&
                                        userModule.find(
                                          (user) => user.Module === sub.name
                                        ) ? (
                                          <Link
                                            href={sub.href}
                                            className={classNames({
                                              "flex w-full text-sm hover:text-[#33BFBF] transition-colors duration-300 rounded-md p-2   gap-4 ": true,
                                              "text-[#33BFBF]":
                                                sub.href.includes(pathname),
                                            })}
                                          >
                                            {sub.label}
                                          </Link>
                                        ) : (
                                          <div
                                            className={classNames({
                                              "flex w-full text-sm text-gray-500 rounded-md p-2   gap-4 ": true,
                                            })}
                                          >
                                            {sub.label}
                                          </div>
                                        )}
                                      </li>
                                    );
                                  })}
                                </ul>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      </div>
                    ) : (
                      <Popover>
                        {({ open }) => (
                          /* Use the `open` state to conditionally change the direction of the chevron icon. */
                          <>
                            <Popover.Button className="flex gap-2 rounded-full mx-3 transition-colors duration-300 ">
                              <div className="rounded-full p-2 bg-[#21424E] text-[#33BFBF] ">
                                <NavigationIcon icon={item.icon} />
                              </div>
                            </Popover.Button>
                            <Popover.Panel className="absolute translate-x-16 -translate-y-10 z-10 mt-3 w-screen max-w-sm   first-line:transform px-4 sm:px-0">
                              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="flex flex-col gap-2 bg-[#1A2A39] p-4">
                                  {item.sub.map((sub, i) => (
                                    <Link
                                      key={i}
                                      href={sub.href}
                                      className={classNames({
                                        "flex   w-full   hover:text-[#33BFBF]    transition-colors duration-300 rounded-md p-2   gap-4": true,
                                      })}
                                    >
                                      {sub.label}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </Popover.Panel>
                          </>
                        )}
                      </Popover>
                    )
                  ) : (
                    <div
                      className={classNames({
                        "flex gap-2    items-center": true,
                        "rounded-md p-2 mx-3 gap-4 w-full": !collapsed,
                        "p-2 mx-3 w-10 h-10 justify-center": collapsed,
                      })}
                    >
                      <div className="rounded-full p-2 bg-[#21424E] text-gray-500 ">
                        <NavigationIcon icon={item.icon} />
                      </div>
                      {!collapsed && (
                        <span className="text-sm  text-gray-500">
                          {item.label}
                        </span>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div
          className={classNames({
            "grid place-content-stretch p-4 gap-4": true,
            "justify-center": collapsed,
          })}
        >
          <ToggleSwitch collapsed={collapsed} />
          <Link
            href="/overview"
            className={classNames({
              "flex gap-4 items-center": true,
              "justify-center": collapsed,
            })}
          >
            <div className="rounded-full p-2 bg-[#21424E] text-[#33BFBF] ">
              <QuestionMarkCircleIcon className="w-6 h-6" />
            </div>
            {!collapsed && <>Help</>}
          </Link>
          <div
            className={classNames({
              "flex gap-4 text-red-400 items-center cursor-pointer": true,
              "justify-center": collapsed,
            })}
            onClick={() => logout()}
          >
            <div className="rounded-full p-2 bg-[#21424E] text-[#33BFBF] ">
              <ArrowRightOnRectangleIcon className="w-6 h-6" />
            </div>
            {!collapsed && <>Logout</>}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
