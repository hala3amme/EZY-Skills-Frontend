import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { authService } from '../services';
import { getApiErrorMessage } from '../api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = (() => {
    const state = location.state as { from?: string } | null;
    return state?.from ?? '/courses';
  })();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      await authService.login(
        {
          email,
          password,
          device_name: 'web',
        },
        { remember: rememberMe }
      );
      navigate(redirectTo);
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfdfd]">
      <Header variant="light" />

      {/* Main Content */}
      <section className="pt-[120px] md:pt-[160px] lg:pt-[200px] pb-12 md:pb-16 lg:pb-20 px-4 md:px-8 lg:px-[82px]">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Form Card */}
          <div className="bg-white rounded-[30px] md:rounded-[36px] lg:rounded-[43px] shadow-[3px_4px_7px_6px_rgba(0,0,0,0.09)] p-6 md:p-8 lg:p-12 max-w-[558px] mx-auto lg:mx-0 w-full">
            <h1 className="font-poppins font-semibold text-[28px] md:text-[36px] lg:text-[45px] text-[#003f7d] text-center mb-6 md:mb-8">
              Log In
            </h1>

            {errorMessage && (
              <div className="mb-4 md:mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                <p className="font-poppins text-[13px] md:text-[14px] text-red-700">{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-b border-gray-300 pb-3 font-poppins text-[16px] md:text-[18px] lg:text-[20px] text-[#b1b1b1] placeholder:text-[#b1b1b1] focus:outline-none focus:border-[#f98149]"
                />
              </div>

              {/* Password */}
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-b border-gray-300 pb-3 font-poppins text-[16px] md:text-[18px] lg:text-[20px] text-[#b1b1b1] placeholder:text-[#b1b1b1] focus:outline-none focus:border-[#f98149]"
                />
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-[17px] md:w-[19px] h-[18px] md:h-[20px] border-2 border-[#b1b1b1] rounded-[4px] accent-[#003f7d]"
                />
                <label htmlFor="rememberMe" className="font-poppins font-medium text-[12px] md:text-[14px] text-[#b1b1b1]">
                  Remember Me
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-2 md:pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-12 md:px-16 py-2.5 md:py-3 bg-[#003f7d] text-white font-poppins font-semibold text-[16px] md:text-[18px] rounded-lg hover:bg-[#002f5d] transition-colors"
                >
                  {isSubmitting ? 'Logging in…' : 'Login'}
                </button>
              </div>

              {/* Already have account */}
              <p className="text-center font-poppins font-medium text-[11px] md:text-[12px] text-[#b1b1b1]">
                Don't have an account?{' '}
                <Link to="/register" className="text-[#787878] hover:text-[#f98149]">
                  Sign Up Here
                </Link>
              </p>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6 md:my-8">
              <div className="flex-1 h-px bg-gray-300" />
              <span className="font-poppins font-medium text-[12px] md:text-[13px] text-[#b1b1b1]">or</span>
              <div className="flex-1 h-px bg-gray-300" />
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-2 md:space-y-3">
              <button className="w-full flex items-center justify-center gap-3 px-4 md:px-6 py-2.5 md:py-3 bg-[#f3f3f3] rounded-lg hover:bg-gray-200 transition-colors">
                <img src="/images/google-icon.svg" alt="Google" className="w-[20px] md:w-[25px] h-[20px] md:h-[25px]" />
                <span className="font-poppins font-medium text-[14px] md:text-[16px] text-[#8a8a8a]">Login with Google</span>
              </button>
              <button className="w-full flex items-center justify-center gap-3 px-4 md:px-6 py-2.5 md:py-3 bg-[#3575dc] rounded-lg hover:bg-[#2a5fb3] transition-colors">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                </svg>
                <span className="font-poppins font-medium text-[14px] md:text-[16px] text-white">Login with Facebook</span>
              </button>
              <button className="w-full flex items-center justify-center gap-3 px-4 md:px-6 py-2.5 md:py-3 bg-[#404040] rounded-lg hover:bg-[#333] transition-colors">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <span className="font-poppins font-medium text-[14px] md:text-[16px] text-white">Login with Apple</span>
              </button>
            </div>

            {/* Terms */}
            <p className="text-center font-poppins font-medium text-[11px] md:text-[12px] text-[#b1b1b1] mt-6 md:mt-8">
              By continuing, you agree to the{' '}
              <Link to="/terms" className="text-[#ff8b36] hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-[#ff914c] hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>

          {/* Illustration */}
          <div className="hidden lg:flex justify-center items-center">
            <img
              src="/images/auth-illustration.png"
              alt="Login"
              className="max-w-[500px] xl:max-w-[700px] w-full"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
