import React from "react";
import { FaTasks, FaUserCircle, FaFileExport } from "react-icons/fa";

const NavbarUI = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-lg border-b border-gray-200 animate-pulse">
      {/* Skeleton for Logo/Title */}
      <div className="flex items-center gap-3">
        <FaTasks className="text-gray-300 text-2xl" />
        <div className="w-32 h-6 bg-gray-200 rounded-full" />
      </div>

      <div className="flex items-center gap-6">
        {/* Skeleton for Select */}
        <div className="flex items-center gap-2 w-[180px] h-10 bg-gray-200 rounded-lg px-3">
          <FaUserCircle className="text-gray-300 text-lg" />
          <div className="w-full h-3 bg-gray-300 rounded-md" />
        </div>

        {/* Skeleton for Export Button */}
        <div className="flex items-center gap-2 w-20 h-10 bg-gray-200 rounded-lg px-3">
          <FaFileExport className="text-gray-300 text-lg" />
          <div className="w-8 h-3 bg-gray-300 rounded-md" />
        </div>

        {/* Skeleton for Current User Display */}
        <div className="flex items-center gap-3">
          <FaUserCircle className="text-gray-300 text-xl" />
          <div className="w-24 h-3 bg-gray-300 rounded-md" />
        </div>
      </div>
    </header>
  );
};

export default NavbarUI;