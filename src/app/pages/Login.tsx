import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Mail, Lock, LogIn } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    const returnTo = (location.state as any)?.returnTo || "/app";

    const handleLogin = async () => {
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        login();
        setIsLoading(false);
        navigate(returnTo, { replace: true });
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
            <div className="max-w-md mx-auto w-full flex-1 flex flex-col bg-white sm:rounded-[3rem] sm:my-8 sm:border-8 sm:border-gray-900 sm:shadow-2xl overflow-hidden">
                <div className="flex-1 p-6 flex flex-col">
                    {/* Header */}
                    <header className="mb-10 pt-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="mb-6 p-2 -ml-2 text-gray-400 hover:text-gray-900"
                        >
                            <ArrowLeft size={24} />
                        </button>
                        <div className="flex items-center gap-3 mb-4">
                            <img
                                src="/idea2code.png"
                                alt="Idea2Code"
                                className="w-12 h-12 rounded-xl object-contain"
                            />
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Welcome Back
                                </h1>
                                <p className="text-gray-500 text-sm">
                                    Sign in to submit your request
                                </p>
                            </div>
                        </div>
                    </header>

                    {/* Form */}
                    <div className="space-y-5 flex-1">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-black focus:ring-2 focus:ring-black outline-none transition-all"
                                    placeholder="you@company.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <Lock
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 focus:border-black focus:ring-2 focus:ring-black outline-none transition-all"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-gray-300 accent-black"
                                />
                                <span className="text-sm text-gray-600">Remember me</span>
                            </label>
                            <button className="text-sm font-semibold text-black hover:underline">
                                Forgot password?
                            </button>
                        </div>
                    </div>

                    {/* Login Button */}
                    <div className="mt-8 pb-6">
                        <motion.button
                            whileTap={{ scale: 0.97 }}
                            onClick={handleLogin}
                            disabled={isLoading}
                            className="w-full py-4 rounded-xl bg-black text-white font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-black/20 disabled:opacity-70"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <LogIn size={20} />
                                    Login
                                </>
                            )}
                        </motion.button>
                        <p className="text-center text-sm text-gray-500 mt-4">
                            Don't have an account?{" "}
                            <button className="font-semibold text-black hover:underline">
                                Sign Up
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
