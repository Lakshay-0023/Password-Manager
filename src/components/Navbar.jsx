import React from 'react'

const Navbar = () => {
  return (
    <nav className=' bg-slate-800 text-white '>
      <div className="mycontainer flex justify-around items-center h-14 px-4 py-5 ">

        <div className=" font-bold logo text-2xl">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span>
          <span className='text-green-500'>OP/&gt;</span>
          
          </div>
        <button className=' ring-1 ring-white flex text-white justify-between items-center bg-green-700 my-5 rounded-full '>
          <img className='invert w-10 p-1 ' src="/icons/github.svg" alt="github" />
          <span className='font-bold px-2 '>Github</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
