import React from "react";

export const TopBar = () => {
  return (
    <div className="bg-[url('/assets/topBarBg.png')] bg-cover bg-center bg-no-repeat h-40 rounded-3xl flex justify-between">
      <div className="flex flex-col  gap-2 p-6">
        <div className="flex items-center gap-3">
          <img src="/assets/user.svg" alt="user" className="size-12" />
          <p className="text-white font-medium">John Doe</p>
          <img
            src="/assets/cart.svg"
            alt="logout"
            className="size-5 cursor-pointer"
          />
        </div>
        <div className="flex items-end gap-8">
          <div className="">
            <p className="text-white font-[400] text-lg">Balance</p>
            <p className="text-white font-medium text-2xl whitespace-nowrap">
              R$ 123.52
            </p>
          </div>
          <button className="bg-white rounded px-3 py-0.5 text-[#194D9A] font-medium mb-1 whitespace-nowrap">
            Buy Consultations
          </button>
        </div>
      </div>
      <div className="lg:w-[390px] lg:max-w-[50%] flex items-end ">
        <img src="/assets/carVector.svg" alt="top bar logo" className="" />
      </div>
    </div>
  );
};
