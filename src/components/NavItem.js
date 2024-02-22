import React from "react";
import {
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  UserGroupIcon,
  AdjustmentsVerticalIcon,
  BoltIcon,
  Battery100Icon,
  PresentationChartLineIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { LuBatteryCharging } from "react-icons/lu";
import { HiOutlineLightBulb } from "react-icons/hi";
// define a NavItem prop

export const NavItems = [
  {
    label: "Overview",
    href: "/Overview",
    icon: <HomeIcon className="w-6 h-6" />,
  },
  {
    label: "Energy Consumption",
    href: "/Energy",
    icon: <HiOutlineLightBulb className="w-6 h-6" />,
  },
  {
    label: "Power Generation",
    href: "/Powergen/Overview",
    icon: <BoltIcon className="w-6 h-6" />,
    sub: [
      {
        label: "Overview",
        href: "/Powergen/Overview",
      },
      {
        label: "Solar",
        href: "/Powergen/Solar",
      },
      {
        label: "Battery",
        href: "/Powergen/Battery",
      },
      {
        label: "Biogas",
        href: "/Powergen/Biogas",
      },
    ],
  },

  {
    label: "Device Mananagement",
    href: "/",
    icon: <AdjustmentsVerticalIcon className="w-6 h-6" />,
    sub: [
      {
        label: "IoT Devices",
        href: "/Device/IoT",
      },
      {
        label: "HVAC",
        href: "/Device/HVAC",
      },
      {
        label: "Air Conditioning System",
        href: "/Device/Aircond",
      },
    ],
  },
  {
    label: "Battery",
    href: "/Battery",
    icon: <LuBatteryCharging className="w-6 h-6" />,
    sub: [
      {
        label: "IoT / Machine",
        href: "/",
      },
    ],
  },
  {
    label: "Recommend",
    href: "/Recommend",
    icon: <HandThumbUpIcon className="w-6 h-6" />,
  },
  {
    label: "Report",
    href: "/Report",
    icon: <PresentationChartLineIcon className="w-6 h-6" />,
    sub: [
      {
        label: "Invoice",
        href: "/Report/Invoice",
      },
      {
        label: "Usage Summary",
        href: "/Report/Summary",
      },
    ],
  },
];
