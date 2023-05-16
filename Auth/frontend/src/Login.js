import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './LoginValidation';
import axios from 'axios';





function Login() {

    const [values, setValues] = useState({ 
        email: '', 
        password: '' 
    })

    const navigate = useNavigate();
    const [backendError, setBackendError] = useState([])

    const[errors, setErrors] = useState([])
    const handleInput = (event) => { 
        setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] })) 
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const err = Validation(values);
        setErrors(err);
        if (err.email === "" && err.password === "") {
            axios.post('http://localhost:8082/login', values)
		.then(res => {
                    if (res.data.errors) { setBackendError(res.data.errors); }
                    else {
                        setBackendError([]);
                        if (res.data === "Success") { navigate('/home'); }
                        else { alert("No record existed"); }
                    }
                })
                .catch(err => console.log(err));
        }
}
  return (
    <>
    <h2 className='p-3'><strong>Login</strong></h2>
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <form action="" onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='name'>Email:</label>
                    <input type='text' placeholder='Enter Email' name='email'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.email && <span className='text-danger'> {errors.email}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'>Password:</label>
                    <input type='password' placeholder='Enter Password' name='password'
                    onChange={handleInput} className='form-control rounded-0'/>
                    {errors.password && <span className='text-danger'> {errors.password}</span>}
                </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'><strong>Log in</strong></button>
                    <p>By logging in, you agree to our terms and policies</p>
                    <Link to="/signup" className='btn btn-success w-100 rounded-0 text-decoration-none'>Register</Link>
            </form>
        </div>
    </div>
    </>)
}

export default Login