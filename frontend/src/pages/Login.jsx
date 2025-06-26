import React, { useState } from "react";
import axios from 'axios'
import ReCAPTCHA from "react-google-recaptcha";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";



const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [captchaToken, setCaptchaToken] = useState('');
    const [error, setError] = useState(null)
    const {login} = useAuth()
    const navigate = useNavigate()

    // const handleCaptcha = (value) => {
    // setCaptchaToken(value);
    // };

    const handlesubmit = async (e) => {
        e.preventDefault()

        if (!captchaToken) {
          alert("Please verify the captcha.");
          return;
        }

        try {
            const response = await axios.post(
              "http://localhost:3000/api/auth/login", 
              {email, captchaToken, password})
            if(response.data.success) {

              login(response.data.user)
              localStorage.setItem("token", response.data.token)
              console.log(response.data);
              
              if (response.data.user.role === "admin") {
                navigate('/admin-dashboard')
              }
              else {
                navigate('/employee-dashboard')
              }
            }
            
        } catch (error) {
            if(error.response && !error.response.data.success) {
              setError(error.response.data.error)
            }
            else {
              setError("Server Error")
            }
        }
    }

  return (
    <div className="relative h-screen">
      
      <div className="absolute top-0 left-0 w-full h-1/2 bg-teal-600"></div>

      
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white"></div>

      
      <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-6">
        <h2 className="font-sevillana text-3xl text-white">
          Asset Management System
        </h2>
        <div className="border shadow p-6 w-80 bg-white rounded">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handlesubmit}>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="email">Email</label>
              <input 
              className="w-full px-3 py-2 border rounded" 
              type="email" placeholder="Enter email" 
              onChange={(e) => setEmail(e.target.value)}
              required/>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="password">Password</label>
              <input 
              className="w-full px-3 py-2 border rounded" 
              type="password" 
              placeholder="**********" 
              onChange={(e) => setPassword(e.target.value)}
              required/>
            </div>
            <div className="mb-4 flex items-center justify-between">
              {/* <label className="inline-flex items-center">
                <input className="form-checkbox" type="checkbox" />
                <span className="ml-2 text-gray-700">Remember Me</span>
              </label> */}
              <Link className="text-teal-600" to="/forgot-password">Forgot Password</Link>
              
            </div>
            <ReCAPTCHA
              sitekey="6LfbIWwrAAAAACRG1IZ0yZbI1PX5r0rzDfQYd7il"  
              onChange={(value) => setCaptchaToken(value)}
              className="mb-4"
            />

            <div className="mb-4">
              <button className="w-full bg-teal-600 text-white py-2 rounded" type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
