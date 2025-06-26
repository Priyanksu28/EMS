import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OtpVerify = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/auth/verify-otp', {
        token,
        resetOtp: otp,
      });

      if (res.data.success) {
        setMessage(res.data.message);
        sessionStorage.setItem("resetOtp", otp);
        // Wait 1 second then redirect
        setTimeout(() => {
          navigate(`/reset-password/${token}`);
        }, 1000);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Verification failed');
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Verify OTP</h2>
      {message && <p className="text-green-600 mb-2">{message}</p>}
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleVerify}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          className="w-full border p-2 mb-4"
        />
        <button type="submit" className="w-full bg-teal-600 text-white py-2 rounded">
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default OtpVerify;
