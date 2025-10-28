import { useState, useEffect } from 'react'
import axios from 'axios'
import '../Login.css'
import { Navigate, useNavigate } from 'react-router-dom';

function Login() {
  const [theme, setTheme] = useState('dark');
  const [data, setData] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    document.body.className = theme;
  }, [theme])

  useEffect(() => {
    console.log('data: ', data)
  }, [data])

  useEffect(() => {
    // console.log('data: ', data)
    setData((prev) => ({
      ...prev,
      status: 'Active'
    }))
    console.log('data: ', data)

  }, [])


  async function loginFn() {
    if (!data.usersname || !data.pass || !data.id || !data.status) {
      console.log("Please enter all feilds")

    }

    try {
      const result = await axios.post("http://localhost:3700/api/v1/user/login", data);
      console.log(result.data, result.status)

      if (result.status === 200 && result.data.status === 'Active') {
        // header with isLoggedIn with true value is created
        localStorage.setItem('isLoggedIn', true)

        alert(result.data.message)
        navigate('/home')
      } else if (result.data.status === 'Inactive') {
        alert('User not active')
      } else {
        console.log('login failed')
      }

    } catch (err) {
      console.log("Login failed:", err)
      alert("Login failed — check username or password");
    }

  }
  return (
    <>

      <span className='div_parent'>

        <span className='header_and_theam'>
          <span className='heading'>Login</span>
          <button className='switch'
            onClick={
              () => { setTheme(theme === 'dark' ? 'light' : 'dark') }
            }><img src="/contrast.png" className='img' height="25px" width="25px" alt="Theam" /></button>

        </span>

        <span className='main_body'>
          {/* <label htmlFor="id_inp">ID</label>
          <input type="number" className={theme} id='id_inp'
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                id: e.target.value,
              }))
            }}
          /> */}
          <span className='cont gap'>
            <label htmlFor="username_inp">Username</label>
            <input type="text" className={theme} id='username_inp' onChange={(e) => {
              setData((prev) => ({
                ...prev,
                usersname: e.target.value
              }))
            }} />
          </span>

          <span className='cont gap'>
            <label htmlFor="password_inp">Password</label>
            <input type="text" className={theme} id='password_inp' onChange={(e) => {
              setData((prev) => ({
                ...prev,
                pass: e.target.value
              }))
            }} />
          </span>
        </span>

        <span className='div_btn'>
          <button className={theme} onClick={loginFn} >Login</button>
          <span className='register_txt' onClick={() => { navigate('/register') }}>Register</span>
        </span>

      </span>

    </>
  )
}

export default Login
