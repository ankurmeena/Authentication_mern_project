import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
      <div className="bg-slate-300">
        <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
            <Link to='/'><h1 className='font-bold'>Authentication App</h1></Link>
            <ul className='flex gap-3'>
            <Link to='/'><li>Home</li></Link>
            <Link to='/about'><li>About</li></Link>
            <Link to='/sign-in'><li>Sign in</li></Link>
            </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
