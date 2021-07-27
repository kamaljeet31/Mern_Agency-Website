import React, { useEffect, useState } from 'react'
// import Header from './Header'

const Home = () => {
  const [userName, setUserName] = useState()
  const [show, setShow] = useState(false)

  const userHome = async () => {
    try {
      const res = await fetch('/getdata', {
        method: 'GET',
        headers: {
          // Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        // credentials: 'include',
      })

      const data = await res.json()
      console.log(data)
      setUserName(data.name)
      setShow(true)

      if (!res.status === 200) {
        const error = new Error(res.error)
        throw error
      }
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    userHome()
  }, [])
  return (
    <>
      <section className='home'>
        {/* <Header /> */}
        <img src='images/Development.svg' className='home-img' alt='' />
        <div className='home-content'>
          <h3>
            WELCOME
            <br />
          </h3>
          <h1>{userName}</h1>

          <h2>{show ? 'Happy to see you Back' : 'WE ARE MERN DEVELOPER'}</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo itaque
            nam saepe vero voluptatem vel fuga a eaque earum alias ipsam
            aspernatur culpa maxime laboriosam, impedit quae officiis
            consectetur
          </p>
          <a href='/contact' className='btn'>
            Get Started
          </a>
        </div>
      </section>

      <script src='js/script.js'></script>
    </>
  )
}

export default Home
