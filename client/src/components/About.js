import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
const photo = <img src='images/portfolio-item14.jpg' alt='kamal' />
const photos = <img src='images/portfolio-item13.jpg' alt='kamal' />

const About = () => {
  const history = useHistory()
  const [userData, setUserData] = useState({})
  const callAboutPage = async () => {
    try {
      const res = await fetch('/about', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      const data = await res.json()
      console.log(data)
      setUserData(data)

      if (!res.status === 200) {
        const error = new Error(res.error)
        throw error
      }
    } catch (err) {
      console.log(err)
      history.push('/login')
    }
  }
  useEffect(() => {
    callAboutPage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className='home-content'></div>
      <div className='container emp-profile'>
        <form method='GET'>
          <div className='row'>
            <div className='col-md-6'>
              <div className='profile-img'>
                <div>
                  {userData.name === 'Kamaljeet Singh' ? photo : photos}
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='profile-head'>
                <h5>{userData.name}</h5>
                <h6>{userData.work} </h6>
                <p className='profile-rating mt-3 mb-5'>
                  RANKING:<span>1/10</span>
                </p>

                <ul>
                  <div className='nav nav-tabs' role='tablist'>
                    <li className='nav-items'>
                      <a
                        href='#home'
                        id='home-tab'
                        data-toggle='tab'
                        className='nav-link active'
                        role='tab'
                      >
                        About
                      </a>
                    </li>
                    <li className='nav-items'>
                      <a
                        href='#profile'
                        id='profile-tab'
                        data-toggle='tab'
                        className='nav-link active'
                        role='tab'
                      >
                        Timeline
                      </a>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
            <div className='col-md-2'>
              <input
                type='submit'
                className='profile-edit-btn'
                name='btnAddMore'
                value='Edit Profile'
              />
            </div>
            <div className='row'>
              {/* left side url */}
              <div className='col-md-4'>
                <div className='profile-work'>
                  <p>Work Link</p>
                  <a href='/'>youtube</a> <br />
                  <a href='/'>instagram</a> <br />
                  <a href='/'>facebook</a> <br />
                  <a href='/'>twitter</a> <br />
                  <a href='/'>pintrest</a> <br />
                  <a href='/'>snapchat</a> <br />
                </div>
              </div>
              {/* right side data toggle */}
              <div className='col-md-8 pl-5 about-info'>
                <div className='tab-content profile-tab' id='myTabContent'>
                  <div
                    className='tab-pane fade show active'
                    id='home'
                    role='tabpanel'
                    aria-labelledby='home-tab'
                  >
                    <div className='row mt-3'>
                      <div className='col-md-6'>
                        <p>User ID</p>
                      </div>
                      <div className='col-md-6 mb-3'>
                        <p>5166945416654684</p>
                      </div>
                    </div>
                    <div className='row mt-3'>
                      <div className='col-md-6'>
                        <p>Name</p>
                      </div>
                      <div className='col-md-6'>
                        <p>{userData.name}</p>
                      </div>
                    </div>
                    <div className='row mt-3'>
                      <div className='col-md-6'>
                        <p>Email</p>
                      </div>
                      <div className='col-md-6 '>
                        <p>{userData.email}</p>
                      </div>
                    </div>
                    <div className='row mt-3'>
                      <div className='col-md-6'>
                        <p>Phone</p>
                      </div>
                      <div className='col-md-6'>
                        <p>{userData.phone}</p>
                      </div>
                    </div>
                    <div className='row mt-3'>
                      <div className='col-md-6'>
                        <p>Profession</p>
                      </div>
                      <div className='col-md-6'>
                        <p>{userData.work}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default About
