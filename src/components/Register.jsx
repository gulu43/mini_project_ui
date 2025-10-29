import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import '../Register.css'
import { toast } from 'react-toastify';

export function Register() {
    const [theme, setTheme] = useState('dark');
    const [data, setData] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        document.body.className = theme;
    }, [theme])

    useEffect(() => {
        console.log('data: ', data)
    }, [data])

    const valid_Data = () => {
        if (!data.usersname) {
            toast.warn('Username should not be empty');
            return false;
        }

        if (!data.name) {
            toast.warn('Name should not be empty');
            return false;
        }

        if (!data.age || data.age < 16 || data.age > 40) {
            toast.warn('Age should be between 16 and 40');
            return false;
        }

        if (!data.password || data.password.length < 4) {
            toast.warn('Password length should be at least 4 characters');
            return false;
        }

        const phoneRegex = /^(\+91)?\s?[6-9][0-9]{9}$/;
        if (!phoneRegex.test(data.phone_no)) {
            toast.warn('Phone number must be 10 digits (+91 optional)');
            return false;
        }

        if (!data.address || data.address.trim() === '') {
            toast.warn('Address should not be empty');
            return false;
        }

        if (!data.city || data.city.trim() === '') {
            toast.warn('City should not be empty');
            return false;
        }

        if (!data.country || data.country.trim() === '') {
            toast.warn('Country should not be empty');
            return false;
        }

        if (!data.profile_photo) {
            toast.warn('Profile photo is required');
            return false;
        }

        return true;
    };

    async function registerFn() {

        if (!valid_Data()) {
            return;
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
            console.log("Registration failed:", err.response.data.message)
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
                    <span className='register_txt' onClick={() => { navigate('/login') }}>Login</span>
                </span>

            </span>

        </>
    )
}