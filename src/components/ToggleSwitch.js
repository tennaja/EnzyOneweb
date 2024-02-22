"use client";
import React from "react";
import { useState, Fragment } from "react";
import { Switch } from "@headlessui/react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "@/redux/slicer/appConfigSlice";
import { useTheme } from "next-themes";

export function ToggleSwitch({ collapsed }) {
  // const isDarkMode = useSelector((state) => state.appConfig.isDarkMode);
  const dispatch = useDispatch();

  const { theme, setTheme } = useTheme();

  // const [enabled, setEnabled] = useState(isDarkMode);

  // if (isDarkMode) document.body.classList.add("dark");
  const handleChanged = (value) => {
    // setEnabled((value) => !value);
    // dispatch(toggleDarkMode());

    if (value === "dark") setTheme("dark");
    else setTheme("light");
    // if (value === true) {
    //   document.body.classList.add("dark");
    // } else {
    //   document.body.classList.remove("dark");
    // }
  };

  return (
    <Switch.Group>
      <div
        className={classNames({
          "flex items-center ": true,
          "justify-center": collapsed,
        })}
      >
        {!collapsed && (
          <Switch.Label className="mr-4 p-2">
            {theme === "light" ? (
              <div className="flex items-center gap-2">
                <SunIcon className="w-6 h-6" />
                Light Mode
              </div>
            ) : (
              <div className="flex items-center gap-2 text-slate-400">
                <MoonIcon className="w-6 h-6" />
                Dark Mode
              </div>
            )}
          </Switch.Label>
        )}

        <Switch
          checked={theme === "dark"}
          onChange={() => {
            if (theme === "dark") {
              return setTheme("light");
            }
            return setTheme("dark");
          }}
          as={Fragment}
        >
          {({ checked }) =>
            /* Use the `checked` state to conditionally style the button. */
            !collapsed ? (
              <button
                className={`${
                  checked ? "bg-blue-600" : "bg-gray-200"
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Enable notifications</span>
                <span
                  className={`${
                    checked ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </button>
            ) : (
              <button
                className={`flex justify-center  w-8 h-8 items-center rounded-full`}
              >
                {!checked ? (
                  <SunIcon className="w-6 h-6" />
                ) : (
                  <MoonIcon className="w-6 h-6 text-slate-400" />
                )}
              </button>
            )
          }
        </Switch>
      </div>
    </Switch.Group>
  );
}
