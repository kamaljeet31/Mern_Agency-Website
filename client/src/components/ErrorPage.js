import React from 'react'
import { NavLink } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <>
      <div className='container'>
        <h1>404 page not found</h1>
        <NavLink to='/' className='navbar-brand btn btn-primary'>
          Back to Homepage
        </NavLink>
      </div>
    </>
  )
}

export default ErrorPage
