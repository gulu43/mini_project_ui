import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import '../Register.css'
import { toast } from 'react-toastify';

export function Register() {
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

    useEffect(() => {
        console.log('errData: ', errData)
    }, [errData])

    function valid_Data() {
        const newErrors = {}

        if (!data.usersname) newErrors.umErr = 'Username should not be empty'
        if (!data.name) newErrors.nameErr = 'Name should not be empty'
        if (!data.age || data.age < 16 || data.age > 40) newErrors.ageErr = 'Age should be between 16 and 40'
        if (!data.password || data.password.length < 4) newErrors.passErr = 'Password length should be at least 4 characters'

        const phoneRegex = /^(\+91)?\s?[6-9][0-9]{9}$/
        if (!phoneRegex.test(data.phone_no || '')) newErrors.phoneErr = 'Phone number must be 10 digits (+91 optional)'

        if (!data.address || data.address.trim() === '') newErrors.addressErr = 'Address should not be empty'
        if (!data.city || data.city.trim() === '') newErrors.cityErr = 'City should not be empty'
        if (!data.country || data.country.trim() === '') newErrors.countryErr = 'Country should not be empty'
        if (!data.profile_photo) newErrors.profileErr = 'Profile photo is required'

        setErrData(newErrors)

        // return true if no errors
        return Object.keys(newErrors).length === 0
    }

    async function registerFn(e) {

        e.preventDefault()
        
        console.log('valid_Data clled')        
        // Clear old errors before validating
        setErrData({})

        const isValid = valid_Data()
        if (!isValid) {
            console.log('Validation failed, stopping...')
            return
        }

        const formData = new FormData()
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value)
        })
        // formData.forEach((ele) => {
        //     console.log(ele)
        // })

        try {
            const result = await axios.post("http://localhost:3700/api/v1/user/register", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            console.log(result.data, result.status)

            if (result.status == 201) {
                navigate('/login')
            }



        } catch (err) {
            if (err.status === 403) {
                alert(`${err.response.data.message}`)
                return
            }
            console.log("Registration failed:", err?.response?.data?.message || err)
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
                    {errData.umErr && <span className="error">{errData.umErr}</span>}
                    <span className='cont gap'>
                        <label htmlFor="username_inp">Username</label>
                        <input type="text" required className={theme} id='username_inp' onChange={(e) => {
                            setData((prev) => ({
                                ...prev,
                                usersname: e.target.value
                            }))
                            // valid_Data()
                        }} />
                    </span>

                    {errData.nameErr && <span className="error">{errData.nameErr}</span>}
                    <span className='cont gap'>
                        <label htmlFor="name_inp">Name</label>
                        <input type="text" required className={theme} id='name_inp' onChange={(e) => {
                            setData((prev) => ({
                                ...prev,
                                name: e.target.value
                            }))
                        }} />
                    </span>

                    {errData.ageErr && <span className="error">{errData.ageErr}</span>}
                    <span className='cont gap'>
                        <label htmlFor="age_inp">Age</label>
                        <input type="text" required className={theme} id='age_inp' onChange={(e) => {
                            setData((prev) => ({
                                ...prev,
                                age: e.target.value
                            }))
                        }} />
                    </span>

                    {errData.passErr && <span className="error">{errData.passErr}</span>}
                    <span className='cont gap'>
                        <label htmlFor="password_inp">Password</label>
                        <input type="text" required className={theme} id='password_inp' onChange={(e) => {
                            setData((prev) => ({
                                ...prev,
                                password: e.target.value
                            }))
                        }} />
                    </span>

                    {errData.phoneErr && <span className="error">{errData.phoneErr}</span>}
                    <span className='cont gap'>
                        <label htmlFor="phone_no_inp">Phone no.</label>
                        <input type="text" required className={theme} id='phone_no_inp' onChange={(e) => {
                            setData((prev) => ({
                                ...prev,
                                phone_no: e.target.value
                            }))
                        }} />
                    </span>

                    {errData.addressErr && <span className="error">{errData.addressErr}</span>}
                    <span className='cont gap'>
                        <label htmlFor="address_inp">Address</label>
                        <input type="text" required className={theme} id='address_inp' onChange={(e) => {
                            setData((prev) => ({
                                ...prev,
                                address: e.target.value
                            }))
                        }} />
                    </span>

                    {errData.cityErr && <span className="error">{errData.cityErr}</span>}
                    <span className='cont gap'>
                        <label htmlFor="city_inp">City</label>
                        <input type="text" required className={theme} id='city_inp' onChange={(e) => {
                            setData((prev) => ({
                                ...prev,
                                city: e.target.value
                            }))
                        }} />
                    </span>

                    {errData.countryErr && <span className="error">{errData.countryErr}</span>}
                    <span className='cont gap'>
                        <label htmlFor="country_inp">Country</label>
                        <input type="text" required className={theme} id='country_inp' onChange={(e) => {
                            setData((prev) => ({
                                ...prev,
                                country: e.target.value
                            }))
                        }} />
                    </span>

                    {errData.profileErr && <span className="error">{errData.profileErr}</span>}
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
                    <button className={theme} onClick={(e) => { registerFn(e) }} >Register</button>
                    <span className='register_txt' onClick={() => { navigate('/login') }}>Login</span>
                </span>

            </span>

        </>
    )
}