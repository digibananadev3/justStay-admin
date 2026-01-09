import axios from "axios";

// const AUTH_BASE_URL = "http://13.203.230.175:4000";
const AUTH_BASE_URL = "https://qwiz15.in";
const AUTH_LOGIN = "/api/auth/login";
const AUTH_VERIFY_OTP = "/api/auth/verify-otp";

// Create a separate axios instance for auth endpoints
const authApiClient = axios.create({
  baseURL: AUTH_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export const handleLogin = async (phone) => {
  const fullUrl = AUTH_BASE_URL + AUTH_LOGIN;
  console.log('🔵 [AUTH SERVICE] handleLogin called with phone:', phone);
  console.log('🔵 [AUTH SERVICE] Full API URL:', fullUrl);
  console.log('🔵 [AUTH SERVICE] Request body:', { phone });
  
  try {
    const { data } = await authApiClient.post(AUTH_LOGIN, { phone });
    console.log('✅ [AUTH SERVICE] Login response:', data);
    return data;
  } catch (error) {
    console.error('❌ [AUTH SERVICE] Login error:', error);
    console.error('❌ [AUTH SERVICE] Error response:', error?.response);
    console.error('❌ [AUTH SERVICE] Error message:', error?.message);
    console.error('❌ [AUTH SERVICE] Error data:', error?.response?.data);
    throw error;
  }
};

export const handleVerifyOtp = async (phone, otp) => {
  const fullUrl = AUTH_BASE_URL + AUTH_VERIFY_OTP;
  console.log('🔵 [AUTH SERVICE] handleVerifyOtp called with phone:', phone, 'otp:', otp);
  console.log('🔵 [AUTH SERVICE] Full API URL:', fullUrl);
  console.log('🔵 [AUTH SERVICE] Request body:', { phone, otp });
  
  try {
    const { data } = await authApiClient.post(AUTH_VERIFY_OTP, { phone, otp });
    console.log('✅ [AUTH SERVICE] Verify OTP response:', data);
    return data;
  } catch (error) {
    console.error('❌ [AUTH SERVICE] Verify OTP error:', error);
    console.error('❌ [AUTH SERVICE] Error response:', error?.response);
    console.error('❌ [AUTH SERVICE] Error message:', error?.message);
    console.error('❌ [AUTH SERVICE] Error data:', error?.response?.data);
    throw error;
  }
};

