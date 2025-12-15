import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/slices/authSlice';
import { handleLogin, handleVerifyOtp } from '../services/auth';

const Login = () => {
  const [step, setStep] = useState(1); // 1: Phone, 2: OTP
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [receivedOtp, setReceivedOtp] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    console.log('🟢 [LOGIN] handlePhoneSubmit called with phone:', phone);
    
    // Validate phone number (10 digits)
    if (!phone || phone.length !== 10 || !/^\d+$/.test(phone)) {
      console.log('❌ [LOGIN] Phone validation failed:', phone);
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    console.log('🟢 [LOGIN] Phone validation passed, calling API...');
    setLoading(true);
    try {
      console.log('🟢 [LOGIN] Calling handleLogin with phone:', phone);
      const response = await handleLogin(phone);
      console.log('✅ [LOGIN] API response received:', response);
      
      if (response && response.user) {
        console.log('✅ [LOGIN] Response has user data:', response.user);
        console.log('✅ [LOGIN] OTP received:', response.user.otp);
        setReceivedOtp(response.user.otp);
        setUserData(response.user);
        setStep(2);
      } else {
        console.log('❌ [LOGIN] Response missing user data:', response);
        setError(response?.message || 'Failed to send OTP');
      }
    } catch (err) {
      console.error('❌ [LOGIN] Error caught in handlePhoneSubmit:', err);
      console.error('❌ [LOGIN] Error response:', err?.response);
      console.error('❌ [LOGIN] Error response data:', err?.response?.data);
      console.error('❌ [LOGIN] Error message:', err?.message);
      console.error('❌ [LOGIN] Full error object:', JSON.stringify(err, null, 2));
      
      const errorMessage = err?.response?.data?.message || err?.message || 'Failed to send OTP. Please try again.';
      console.log('❌ [LOGIN] Setting error message:', errorMessage);
      setError(errorMessage);
    } finally {
      console.log('🟢 [LOGIN] Finally block - setting loading to false');
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');

    console.log('🟢 [LOGIN] handleOtpSubmit called with otp:', otp);

    if (!otp || otp.length !== 4) {
      console.log('❌ [LOGIN] OTP validation failed:', otp);
      setError('Please enter a valid 4-digit OTP');
      return;
    }

    setVerifyingOtp(true);
    try {
      console.log('🟢 [LOGIN] Calling handleVerifyOtp with phone:', phone, 'otp:', otp);
      const response = await handleVerifyOtp(phone, otp);
      console.log('✅ [LOGIN] Verify OTP response received:', response);

      // Check if response has data and status is success
      if (response?.data?.status === 'success' && response?.data?.user) {
        console.log('✅ [LOGIN] OTP verified successfully');
        console.log('✅ [LOGIN] User data:', response.data.user);
        
        // Login successful - dispatch user data
        dispatch(login({ 
          id: response.data.user.id, 
          phone: response.data.user.phone, 
          role: response.data.user.role 
        }));
        
        // Navigate to dashboard
        console.log('✅ [LOGIN] Navigating to dashboard');
        navigate('/');
      } else {
        console.log('❌ [LOGIN] Invalid response structure:', response);
        setError(response?.data?.message || 'OTP verification failed');
      }
    } catch (err) {
      console.error('❌ [LOGIN] Error caught in handleOtpSubmit:', err);
      console.error('❌ [LOGIN] Error response:', err?.response);
      console.error('❌ [LOGIN] Error response data:', err?.response?.data);
      console.error('❌ [LOGIN] Error message:', err?.message);
      console.error('❌ [LOGIN] Full error object:', JSON.stringify(err, null, 2));
      
      const errorMessage = err?.response?.data?.message || err?.response?.data?.data?.message || err?.message || 'Invalid OTP. Please try again.';
      console.log('❌ [LOGIN] Setting error message:', errorMessage);
      setError(errorMessage);
    } finally {
      console.log('🟢 [LOGIN] Finally block - setting verifyingOtp to false');
      setVerifyingOtp(false);
    }
  };

  const handleBackToPhone = () => {
    setStep(1);
    setOtp('');
    setError('');
    setReceivedOtp('');
    setUserData(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">JustStay Admin</h1>
            <p className="text-gray-600">
              {step === 1 ? 'Sign in to your account' : 'Enter OTP to continue'}
            </p>
          </div>

          {/* Step 1: Phone Number */}
          {step === 1 && (
            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="flex items-center w-full rounded-xl bg-[#F3F3F5] px-4 py-2.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setPhone(value);
                    }}
                    placeholder="Enter 10-digit phone number"
                    className="ml-3 w-full bg-transparent text-slate-700 placeholder-slate-400 outline-none"
                    maxLength="10"
                    required
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">Enter your 10-digit mobile number</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          )}

          {/* Step 2: OTP Verification */}
          {step === 2 && (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              {/* Display OTP for testing */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-xs text-blue-600 font-medium mb-1">OTP for testing:</p>
                <p className="text-2xl font-bold text-blue-700 text-center">{receivedOtp}</p>
                <p className="text-xs text-blue-500 text-center mt-1">Enter this OTP below</p>
              </div>

              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP
                </label>
                <div className="flex items-center w-full rounded-xl bg-[#F3F3F5] px-4 py-2.5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                      setOtp(value);
                    }}
                    placeholder="Enter 4-digit OTP"
                    className="ml-3 w-full bg-transparent text-slate-700 placeholder-slate-400 outline-none text-center text-2xl font-semibold tracking-widest"
                    maxLength="4"
                    required
                    autoFocus
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500 text-center">
                  OTP sent to {phone}
                </p>
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={verifyingOtp}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  {verifyingOtp ? 'Verifying OTP...' : 'Verify OTP'}
                </button>
                
                <button
                  type="button"
                  onClick={handleBackToPhone}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
                >
                  Change Phone Number
                </button>
              </div>
            </form>
          )}

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Admin Portal - JustStay</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
