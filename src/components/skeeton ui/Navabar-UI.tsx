import React from 'react'

const NavbarUI = () => {
  return (
    <header className="flex justify-between p-2 bg-white shadow-md animate-pulse">
    <h1></h1>
    <div className="flex gap-4">
      {/* Skeleton for Select */}
      <div className="w-[150px] h-8 bg-gray-300 animate-pulse rounded-md"></div>
  
      <div className="flex gap-5 items-center">
        {/* Skeleton for User Name */}
        <div className="w-[120px] h-6 bg-gray-300 animate-pulse rounded-md"></div>
      </div>
    </div>
  </header>
  
  )
}

export default NavbarUI