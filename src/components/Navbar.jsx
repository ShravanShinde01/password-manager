import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-lime-300 flex items-center justify-around px-4 h-15' >
        <div className='font-bold text-2xl'>
            <span className='text-green-800'>&lt;</span>
            Pass
            <span className='text-green-800'>OP/&gt;</span>
            </div>
        <ul className='' >
            <li className='flex gap-5'>
            <a href="/">Home</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
            </li>
        </ul>
    </nav>
  )
}
export default Navbar

