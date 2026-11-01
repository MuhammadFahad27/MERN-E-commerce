import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiUserPlus } from 'react-icons/fi';
import Spinner from '../Components/Spinner';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    }
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'}/auth/sign-up`,
        data
      );
      const resData = response.data;

      if (resData.success) {
        toast.success(resData.message || 'Account created successfully! Please sign in.');
        navigate('/sign-in');
      }
    } catch (error) {
      const errorMsg = error?.response?.data?.message || 'Failed to sign up. Please try again.';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className={`min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12 transition-colors duration-300 ${
        darkMode ? 'bg-zinc-950 text-zinc-100' : 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 text-slate-800'
      }`}
    >
      <div className="w-full max-w-md">
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
              <FiUserPlus className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">
              Create Account
            </h1>
            <p className={`text-sm mt-1.5 ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
              Join thousands of shoppers and get exclusive perks
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                  darkMode ? 'text-zinc-300' : 'text-slate-700'
                }`}
              >
                Full Name / Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FiUser className="w-4 h-4" />
                </div>
                <input
                  id="username"
                  type="text"
                  placeholder="John Doe"
                  {...register("username", {
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters",
                    },
                  })}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border transition-all duration-200 outline-none ${
                    darkMode
                      ? 'bg-zinc-800/80 border-zinc-700 text-white placeholder-zinc-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                      : 'bg-slate-50/50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20'
                  }`}
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-xs text-rose-500 font-medium">{errors.username.message}</p>
              )}
            </div>

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
                      message: "Please enter a valid email address",
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
              <label
                htmlFor="password"
                className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
                  darkMode ? 'text-zinc-300' : 'text-slate-700'
                }`}
              >
                Password
              </label>
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
                  <span>Create Account</span>
                  <FiArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Sign In Link */}
            <div className="text-center pt-2">
              <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                Already have an account?{' '}
                <Link
                  to="/sign-in"
                  className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
