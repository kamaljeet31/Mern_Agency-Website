import React from 'react'

const Header = () => {
  return (
    <>
      <header>
        <div className='logo'>Creative Agency</div>
        <div className='toggle'></div>
        <div className='navigation'>
          <ul>
            <li>
              <a href='index.html'>Home</a>
            </li>
            <li>
              <a href='services.html'>Services</a>
            </li>
            <li>
              <a href='work.html'>Work</a>
            </li>
            <li>
              <a href='contact.html'>Contact</a>
            </li>
          </ul>
          <div className='social-bar'>
            <ul>
              <li>
                <a href='https://facebook.com'>
                  <img src='images/facebook.png' target='_blank' alt='' />
                </a>
              </li>
              <li>
                <a href='https://twitter.com'>
                  <img src='images/twitter.png' target='_blank' alt='' />
                </a>
              </li>
              <li>
                <a href='https://instagram.com'>
                  <img src='images/instagram.png' target='_blank' alt='' />
                </a>
              </li>
            </ul>
            <a href='mailto:you@email.com' className='email-icon'>
              <img src='images/email.png' alt='' />
            </a>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
