// import react from 'react'
import { createContext, useReducer } from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Contact from './components/Contact'
import Services from './components/Services'
import Work from './components/Work'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import About from './components/About'
import ErrorPage from './components/ErrorPage'
import Logout from './components/Logout'
import { reducer, initialState } from '../src/reducer/UseReducer'

// contextAPI
export const UserContext = createContext()

const Routing = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/contact'>
        <Contact />
      </Route>
      <Route path='/services'>
        <Services />
      </Route>
      <Route path='/work'>
        <Work />
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/register'>
        <Register />
      </Route>
      <Route path='/about'>
        <About />
      </Route>
      <Route path='/logout'>
        <Logout />
      </Route>
      <Route>
        <ErrorPage />
      </Route>
    </Switch>
  )
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routing />
      </UserContext.Provider>
    </>
  )
}

export default App
