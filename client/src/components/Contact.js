import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const Contact = () => {
  const history = useHistory()
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const userContact = async () => {
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
      setUserData({
        ...userData,
        name: data.name,
        email: data.email,
        phone: data.phone,
      })

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
    userContact()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // we are storing data in states

  const handleInputs = (e) => {
    const name = e.target.name
    const value = e.target.value

    setUserData({
      ...userData,
      [name]: value,
    })
  }

  // send the data to backend
  const contactForm = async (e) => {
    e.preventDefault()
    const { name, email, phone, message } = userData
    const res = await fetch('/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
    })

    const data = await res.json()
    if (res.status === 422 || !data) {
      alert('Message not Send')
      console.log('message not send')
    } else {
      alert('Message Send')
      setUserData({ ...userData, message: '' })
    }
  }
  return (
    <>
      <section>
        <div>
          <h1>Contact us</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
            iusto molestias accusamus rem nobis est, et laborum harum doloremque
            nemo non, minima quos totam labore
          </p>
        </div>
        <div className='contact'>
          <div className='contact-form'>
            <form method='POST'>
              <h4>GET IN TOUCH</h4>
              <div className='row'>
                <div className='input50'>
                  <input
                    type='text'
                    placeholder='First Name'
                    onChange={handleInputs}
                    name='name'
                    value={userData.name}
                  />
                  <input
                    type='text'
                    placeholder='Email'
                    onChange={handleInputs}
                    name='email'
                    value={userData.email}
                  />
                  <input
                    type='text'
                    placeholder='Phone'
                    onChange={handleInputs}
                    name='phone'
                    value={userData.phone}
                  />
                </div>
              </div>
              <div className='row'>
                <div className='input100'>
                  <textarea
                    placeholder='Message'
                    onChange={handleInputs}
                    name='message'
                    value={userData.message}
                  ></textarea>
                </div>
              </div>
              <div className='form-group'>
                <input
                  className='btn btn-primary'
                  type='submit'
                  value='Send Message'
                  onClick={contactForm}
                />
              </div>
            </form>
          </div>

          <div className='contact-info'>
            <div className='info-box'>
              <img src='images/address.png' className='contact-icon' alt='' />
              <div className='details'>
                <h4>Address</h4>
                <p>28 Neon Tower, New York City, USA</p>
              </div>
            </div>
            <div className='info-box'>
              <img src='images/email.png' className='contact-icon' alt='' />
              <div className='details'>
                <h4>Email</h4>
                <a href='mailto:anyone@example.com'>anyone@example.com</a>
                <br />
                <a href='mailto:anyone@example.com'>anyone@example.com</a>
              </div>
            </div>
            <div className='info-box'>
              <img src='images/call.png' className='contact-icon' alt='' />
              <div className='details'>
                <h4>Call</h4>
                <a href='tel:+19785555555'>+1 978 555 5555</a>
                <a href='tel:+19784444444'>+1 978 555 4444</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <script src='js/script.js'></script> */}
    </>
  )
}

export default Contact
