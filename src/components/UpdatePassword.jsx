import { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function UpdatePassword() {
    const [theme, setTheme] = useState('dark');
    const [data, setData] = useState({})
    const [errData, setErrData] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        document.body.className = theme;
    }, [theme])

    useEffect(() => {
        console.log('data: ', data)
    }, [data])

    const validationFn = () => {
        let warVar = {}
        if (!data.usersname) warVar.usersname = 'Usersname can not be empty.'
        if (!data.currentPass) warVar.currentPass = 'Current Password can not be empty.'
        if (!data.newPassword) warVar.newPassword = 'New Password can not be empty.'
        setErrData(warVar)

        return Object.entries(warVar).length === 0
    }
    async function updateFn() {

        const isValid = validationFn()
        if (!isValid) {
            console.log('Validation failed, stopping...')
            return;
        }

        if (!data.usersname || !data.currentPass || !data.newPassword) {
            console.log("Please enter all feilds")
        }

        try {
            const formData = new FormData()
            formData.append("usersname", data.usersname)
            formData.append("currentPass", data.currentPass)
            formData.append("newPassword", data.newPassword)

            const result = await axios.patch("http://localhost:3700/api/v1/user/resetpassword", formData)
            toast.success(result?.data?.message || "Password updated successfully!")

            console.log(result.data, result.status)
            setData({})
        } catch (err) {
            console.log("Password update fail:", err.response.data.message || '.')
            alert(`Password update fail ${err.response.data.message}`)

            // toast.error("Password update fail", err.response.data.message || '.');

        }

    }
    return (
        <>

            <span className='div_parent'>

                <span className='header_and_theam'>
                    <span className='heading'>Update Pass</span>
                    <button className='switch'
                        onClick={
                            () => { setTheme(theme === 'dark' ? 'light' : 'dark') }
                        }><img src="/contrast.png" className='img' height="25px" width="25px" alt="Theam" /></button>

                </span>

                <span className='main_body'>

                    {errData.usersname && <span className="error">{errData.usersname}</span>}
                    <span className='cont gap'>
                        <label htmlFor="username_inp">Username</label>
                        <input type="text" className={theme} id='username_inp' onChange={(e) => {
                            setData((prev) => ({
                                ...prev,
                                usersname: e.target.value
                            }))
                        }} />
                    </span>

                    {errData.currentPass && <span className="error">{errData.currentPass}</span>}
                    <span className='cont gap'>
                        <label htmlFor="password_inp">Password</label>
                        <input type="text" className={theme} id='password_inp' onChange={(e) => {
                            setData((prev) => ({
                                ...prev,
                                currentPass: e.target.value
                            }))
                        }} />
                    </span>

                    {errData.newPassword && <span className="error">{errData.newPassword}</span>}
                    <span className='cont gap'>
                        <label htmlFor="new_password_inp">New Pass</label>
                        <input type="text" className={theme} id='new_password_inp' onChange={(e) => {
                            setData((prev) => ({
                                ...prev,
                                newPassword: e.target.value
                            }))
                        }} />
                    </span>
                </span>

                <span className='div_btn'>
                    <button className={theme} onClick={updateFn} >Change</button>
                    <span className='register_txt' onClick={() => { navigate('/home') }}>home</span>
                </span>

            </span>

        </>
    )
}

export default UpdatePassword
