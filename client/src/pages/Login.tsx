import { Mail, Lock, LogIn } from 'lucide-react';
import Navbar1 from '../components/Navbar1';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  return (
    <>
    <Navbar1 />
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 bg-blend-color-burn">
      <div className="w-full max-w-md p-8 space-y-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-green-200">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Login
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to report civic reports to <span className="font-semibold text-green-700">Govt. of Jharkhand</span>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={() => navigate('/dashboard_user')} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email address"
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-900"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-gray-900"
              />
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium shadow-md hover:shadow-lg transition-all"
          >
            <LogIn className="w-5 h-5" />
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="text-gray-500 text-sm">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Google Sign-In */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 py-2.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-all shadow-sm"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google Logo"
            className="w-5 h-5"
          />
          <span className="text-gray-700 font-medium">Sign in with Google</span>
        </button>
      </div>
    </div>
    </>
  );
};

export default Login;
