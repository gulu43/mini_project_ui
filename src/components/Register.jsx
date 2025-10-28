import { useState, useEffect } from 'react'
import axios from 'axios'
import '../Register.css'
// const { name, age, usersname, password, address, city, country, phone_no } = req.body

export function Register({ navigate }) {
    const [theme, setTheme] = useState('dark');
    const [data, setData] = useState({})

    useEffect(() => {
        document.body.className = theme;
    }, [theme])

    useEffect(() => {
        console.log('data: ', data)
    }, [data])

    async function registerFn() {

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value)
        })
        formData.forEach((ele) => {
            console.log(ele)
        })

        try {
            const result = await axios.post("http://localhost:3700/api/v1/user/register", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            console.log(result.data, result.status)

            if (result.status == 201) {
                navigate('/login')
            }

        } catch (err) {
            console.log("Registration failed:", err)
            alert("Registration failed")
        }

    }
    return (
        <>

            <span className='div_parent'>

                <span className='header_and_theam'>
                    <span className='heading'>Register</span>
                    <button className='switch'
                        onClick={
                            () => { setTheme(theme === 'dark' ? 'light' : 'dark') }
                        }><img src="/contrast.png" className='img' height="25px" width="25px" alt="Theam" /></button>

                </span>

                <span className='main_body'>
                    <span className='cont gap'>
                        <label htmlFor="username_inp">Username</label>
                        <input type="text" required className={theme} id='username_inp' onChange={(e) => {
                            setData((prev) => ({
                                ...prev,
                                usersname: e.target.value
                            }))
                        }} />
                    </span>

                    <span className='cont gap'>
                        <label htmlFor="name_inp">Name</label>
                        <input type="text" required className={theme} id='name_inp' onChange={(e) => {
                            setData((prev) => ({
                                ...prev,
                                name: e.target.value
                            }))
                        }} />
                    </span>

                    <span className='cont gap'>
                        <label htmlFor="age_inp">Age</label>
                        <input type="text" required className={theme} id='age_inp' onChange={(e) => {
                            setData((prev) => ({
                                ...prev,
                                age: e.target.value
                            }))
                        }} />
                    </span>

                    <span className='cont gap'>
                        <label htmlFor="password_inp">Password</label>
                        <input type="text" required className={theme} id='password_inp' onChange={(e) => {
                            setData((prev) => ({
                                ...prev,
                                password: e.target.value
                            }))
                        }} />
                    </span>

                    <span className='cont gap'>
                        <label htmlFor="phone_no_inp">Phone no.</label>
                        <input type="text" required className={theme} id='phone_no_inp' onChange={(e) => {
                            setData((prev) => ({
                                ...prev,
                                phone_no: e.target.value
                            }))
                        }} />
                    </span>

                    <span className='cont gap'>
                        <label htmlFor="address_inp">Address</label>
                        <input type="text" required className={theme} id='address_inp' onChange={(e) => {
                            setData((prev) => ({
                                ...prev,
                                address: e.target.value
                            }))
                        }} />
                    </span>

                    <span className='cont gap'>
                        <label htmlFor="city_inp">City</label>
                        <input type="text" required className={theme} id='city_inp' onChange={(e) => {
                            setData((prev) => ({
                                ...prev,
                                city: e.target.value
                            }))
                        }} />
                    </span>

                    <span className='cont gap'>
                        <label htmlFor="country_inp">Country</label>
                        <input type="text" required className={theme} id='country_inp' onChange={(e) => {
                            setData((prev) => ({
                                ...prev,
                                country: e.target.value
                            }))
                        }} />
                    </span>

                    <span className='cont gap'>
                        <label htmlFor="profile_photo">Profile</label>
                        <input type="file" className={theme} id='profile_photo' onChange={(e) => {
                            let file = e.target.files[0]
                            console.log("file: ", file)

                            setData((prev) => ({
                                ...prev,
                                profile_photo: file
                            }))
                        }} />
                    </span>
                </span>

                <span className='div_btn'>
                    <button className={theme} onClick={registerFn} >Register</button>
                    <span className='register_txt' onClick={() => { navigate('login') }}>Login</span>
                </span>

            </span>

        </>
    )
}