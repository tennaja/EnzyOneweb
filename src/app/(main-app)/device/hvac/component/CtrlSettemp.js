import React from 'react'

export default function CtrlSettemp() {
  return (
    <div className="fixed inset-0 overflow-y-auto h-full w-full flex items-center justify-center">
    <div className="p-8 border w-auto shadow-lg rounded-md bg-white">
      <h5 className="mt-5">Set Temp. (°C) : {DeviceName}</h5>

      <h5 className="mt-5">Temperature</h5>
      <input
        type="number"
        placeholder="Enter your username"
        className="border border-slate-300 rounded-md h-9 px-2 mt-2 w-80"
        min={10}
        max={40}
        value={Values}
        onChange={(e) => {
          onChangeValue(e.target.value);
        }}
      />

      <div className="flex justify-center mt-10 gap-5">
        <button
          className="px-4 py-2 bg-white text-[#14b8a6] border border-teal-300 font-medium rounded-md  focus:outline-none"
          onClick={() => closeModal()}
        >
          cancel
        </button>
        <button
          className="px-4 py-2 bg-[#14b8a6] text-white font-medium rounded-md  focus:outline-none"
          onClick={() => handleChangeValueSettemp()}
        >
          confirm
        </button>
      </div>
    </div>
  </div>
  )
}
