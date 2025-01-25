import React from 'react'

const Navbar = () => {
  return (
    <div className="container py-2 bg-gray-700 text-white flex justify-between w-[100vw]">
        <span className=" pl-8 md:pl-30 text-xl font-bold">TO-DO</span>
        <div className="list">
            <ul className="text-[15px] md:test-[18px] flex gap-8 md:gap-15 pr-8 md:pr-30">
                <li className="cursor-pointer px-2 hover:font-bold w-8 hover:underline transition-all">Home</li>
                <li className="cursor-pointer px-2 hover:font-bold w-8 hover:underline transition-all">Tasks</li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar
