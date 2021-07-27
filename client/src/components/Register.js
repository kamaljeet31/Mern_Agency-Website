import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Register = () => {
  const history = useHistory()
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    work: '',
    password: '',
    cpassword: '',
  })

  let name, value
  const handleInputs = (e) => {
    console.log(e)
    name = e.target.name
    value = e.target.value

    setUser({ ...user, [name]: value })
  }

  const PostData = async (e) => {
    e.preventDefault()
    const { name, email, phone, work, password, cpassword } = user

    const res = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        work: work,
        password: password,
        cpassword: cpassword,
      }),
    })
    const data = await res.json()
    console.log(data)
    if (res.status === 422 || !data) {
      window.alert('Invalid Registration')
      console.log('Invalid Registration')
    } else {
      window.alert(' Registration successful')
      console.log(' Registration successful')

      history.push('/login')
    }
  }
  return (
    <>
      <section>
        <img
          src='images/sign-up.svg
'
          className='home-img'
          alt=''
        />
        <form method='POST'>
          <h1>SIGN UP</h1>
          <div className='form-row'>
            <div className='form-group col-md-6'>
              <label htmlFor='inputEmail4'>Name</label>
              <input
                type='text'
                className='form-control'
                id='inputname'
                placeholder='Name'
                name='name'
                value={user.name}
                onChange={handleInputs}
              />
            </div>
            <div className='form-group col-md-6'>
              <label htmlFor='inputEmail4'>Email</label>
              <input
                type='email'
                className='form-control'
                id='inputEmail4'
                placeholder='Email'
                name='email'
                value={user.email}
                onChange={handleInputs}
              />
            </div>
          </div>

          <div className='form-row'>
            <div className='form-group col-md-6'>
              <label htmlFor='inputEmail4'>Phone</label>
              <input
                type='number'
                className='form-control'
                id='inputPhone'
                placeholder='Phone'
                name='phone'
                value={user.phone}
                onChange={handleInputs}
              />
            </div>
            <div className='form-group col-md-6'>
              <label htmlFor='inputPassword4'>Work</label>
              <input
                type='text'
                className='form-control'
                // id='inputPassword4'
                placeholder='Work'
                name='work'
                value={user.work}
                onChange={handleInputs}
              />
            </div>
          </div>
          <div className='form-row'>
            <div className='form-group col-md-6'>
              <label htmlFor='inputPassword4'>Password</label>
              <input
                type='password'
                className='form-control'
                // id='inputPassword4'
                placeholder='Password'
                name='password'
                value={user.password}
                onChange={handleInputs}
              />
            </div>
            <div className='form-group col-md-6'>
              <label htmlFor='inputPassword4'>Confirm Password</label>
              <input
                type='password'
                className='form-control'
                // id='inputPassword4'
                placeholder='Confirm Password'
                name='cpassword'
                value={user.cpassword}
                onChange={handleInputs}
              />
            </div>
          </div>

          <div className='form-group'>
            <div className='form-check'>
              <input
                className='form-check-input'
                type='checkbox'
                id='gridCheck'
              />
              <label className='form-check-label' htmlFor='gridCheck'>
                Check me out
              </label>
            </div>
          </div>
          <div className='form-group'>
            <input
              type='submit'
              name='register'
              value='Register'
              className='btn btn-primary'
              onClick={PostData}
            />
          </div>
        </form>
      </section>
    </>
  )
}

export default Register
