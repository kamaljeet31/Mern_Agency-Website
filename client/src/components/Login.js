import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../App'

const Login = () => {
  const { dispatch } = useContext(UserContext)

  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = async (e) => {
    e.preventDefault()

    const res = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })

    const data = res.json()
    if (res.status === 400 || !data) {
      window.alert('Invalid Credential')
      console.log('Invalid Credential')
    } else {
      dispatch({ type: 'USER', payload: true })
      window.alert('Credential Successful')
      console.log('Credential Successful')

      history.push('/')
    }
  }

  return (
    <>
      <section>
        <img src='images/login.svg' className='home-img' alt='' />
        <div>
          <h1 className='container'>LOGIN</h1>
          <form method='POST'>
            <div className='form-group'>
              <label htmlFor='inputEmail'>Email</label>
              <input
                type='email'
                className='form-control'
                id='inputEmail'
                placeholder='Email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='inputPassword'>Password</label>
              <input
                type='password'
                className='form-control'
                id='inputPassword'
                placeholder='Password'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label className='form-check-label'>
                <input type='checkbox' /> Remember me
              </label>
            </div>
            <div className='form-group'>
              <input
                type='submit'
                name='register'
                value='Log in'
                onClick={loginUser}
                className='btn btn-primary'
              />
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Login
