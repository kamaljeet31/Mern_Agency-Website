import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../App'

const Navbar = () => {
  const { state } = useContext(UserContext)
  const RenderMenu = () => {
    if (state) {
      return (
        <>
          <NavLink className='nav-item nav-link active' to='/'>
            Home <span className='sr-only'>(current)</span>
          </NavLink>
          <NavLink className='nav-item nav-link ' to='/about'>
            About us
          </NavLink>
          <NavLink className='nav-item nav-link ' to='/contact'>
            Contact Us
          </NavLink>
          <NavLink className='nav-item nav-link ' to='/logout'>
            Logout
          </NavLink>
        </>
      )
    } else {
      return (
        <>
          <NavLink className='nav-item nav-link active' to='/'>
            Home <span className='sr-only'>(current)</span>
          </NavLink>

          <NavLink className='nav-item nav-link' to='/services'>
            Services
          </NavLink>
          <NavLink className='nav-item nav-link' to='/work'>
            Work
          </NavLink>
          <NavLink className='nav-item nav-link ' to='/login'>
            Login
          </NavLink>
          <NavLink className='nav-item nav-link ' to='/register'>
            Sign up
          </NavLink>
        </>
      )
    }
  }

  return (
    <>
      <nav className='navbar  navbar-expand-lg navbar-light bg-light'>
        <NavLink className='navbar-brand' to='/'>
          Navbar
        </NavLink>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNavAltMarkup'
          aria-controls='navbarNavAltMarkup'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
          <div className='navbar-nav  '>
            <RenderMenu />
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
