import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import { toast } from 'sonner';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiShield } from 'react-icons/fi';
import Spinner from '../Components/Spinner';
import { signInEnd, signInStart, signInSuccess } from '../Redux Toolkit/User/userSlice';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const loading = useSelector((state) => state.user.loading);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data) => {
    try {
      dispatch(signInStart());
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'}/auth/sign-in`,
        data,
        { withCredentials: true }
      );

      const result = response.data;

      if (result.success) {
        dispatch(signInSuccess(result.user));
        toast.success(result.message || 'Welcome back!');

        if (result.user?.role === 'admin') {
          navigate('/admin/dashboard', { replace: true });
        } else {
          navigate(from === '/sign-in' ? '/' : from, { replace: true });
        }
      }
    } catch (error) {
      dispatch(signInEnd());
      const errorMsg = error?.response?.data?.message || 'Failed to sign in. Check your credentials.';
      toast.error(errorMsg);
    } finally {
      dispatch(signInEnd());
    }
  };

  const handleDemoFill = (role) => {
    if (role === 'admin') {
      setValue('email', 'admin@ecommerce.com');
      setValue('password', 'admin123');
    } else {
      setValue('email', 'customer@ecommerce.com');
      setValue('password', 'customer123');
    }
    toast.info(`Filled ${role} demo credentials`);
  };

  return (
    <main
      className={`min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12 transition-colors duration-300 ${
        darkMode ? 'bg-zinc-950 text-zinc-100' : 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 text-slate-800'
      }`}
    >
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div
          className={`p-8 rounded-2xl shadow-xl transition-all duration-300 border ${
            darkMode
              ? 'bg-zinc-900/90 border-zinc-800 shadow-black/40 backdrop-blur-md'
              : 'bg-white/95 border-slate-200/80 shadow-slate-200/60 backdrop-blur-md'
          }`}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600/10 text-blue-600 mb-3 ring-8 ring-blue-500/5">
              <FiShield className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              Welcome Back
            </h1>
            <p className={`text-sm mt-1.5 ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
              Sign in to manage your orders and wishlist
            </p>
          </div>

          {/* Quick Demo Pill Helper */}
          <div
            className={`flex items-center justify-between text-xs px-3 py-2 rounded-lg mb-6 border ${
              darkMode ? 'bg-zinc-800/60 border-zinc-700/60 text-zinc-400' : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}
          >
            <span className="font-medium">Quick Demo:</span>
            <div className="space-x-2">
              <button
                type="button"
                onClick={() => handleDemoFill('customer')}
                className="px-2 py-1 rounded bg-blue-600/10 text-blue-600 hover:bg-blue-600/20 transition-colors font-medium cursor-pointer"
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => handleDemoFill('admin')}
                className="px-2 py-1 rounded bg-purple-600/10 text-purple-600 hover:bg-purple-600/20 transition-colors font-medium cursor-pointer"
              >
                Admin
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                  darkMode ? 'text-zinc-300' : 'text-slate-700'
                }`}
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FiMail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Please enter a valid email",
                    },
                  })}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border transition-all duration-200 outline-none ${
                    darkMode
                      ? 'bg-zinc-800/80 border-zinc-700 text-white placeholder-zinc-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                      : 'bg-slate-50/50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-rose-500 font-medium">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="password"
                  className={`block text-xs font-semibold uppercase tracking-wider ${
                    darkMode ? 'text-zinc-300' : 'text-slate-700'
                  }`}
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FiLock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className={`w-full pl-10 pr-11 py-2.5 rounded-xl text-sm border transition-all duration-200 outline-none ${
                    darkMode
                      ? 'bg-zinc-800/80 border-zinc-700 text-white placeholder-zinc-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                      : 'bg-slate-50/50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-rose-500 font-medium">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl font-medium text-sm text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-md shadow-blue-600/25 transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Spinner />
              ) : (
                <>
                  <span>Sign In</span>
                  <FiArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Sign Up Link */}
            <div className="text-center pt-2">
              <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                Don't have an account?{' '}
                <Link
                  to="/sign-up"
                  className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 transition-colors"
                >
                  Create one now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
