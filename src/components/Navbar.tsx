import React from 'react'

const Navbar = () => {
  return (
   <header className='flex justify-between mx-4 p-2'>
    <h1>Todo List</h1>
    <div className='flex gap-4'>
        <button className='bg-blue-400 px-2 py-1 rounded-xl'>Export</button>
        <button className='bg-blue-50 px-2 py-1 rounded-xl'>Abhi</button>
    </div>
   </header>
  )
}

export default Navbar