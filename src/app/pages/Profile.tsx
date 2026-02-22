import { motion } from "motion/react";
import { User, Mail, Phone, Settings, ChevronRight, Bell, Shield, HelpCircle, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

const menuItems = [
    { icon: Bell, label: "Notifications", badge: "3" },
    { icon: Settings, label: "App Settings" },
    { icon: Shield, label: "Privacy & Security" },
    { icon: HelpCircle, label: "Help & Support" },
];

export function Profile() {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#FDFBF7] pb-32">
            <header className="px-6 pt-12 pb-6">
                <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
                <p className="text-gray-500">Manage your account</p>
            </header>

            <div className="px-4 space-y-4">
                {/* Avatar Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4"
                >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white shadow-lg shadow-purple-200">
                        <User size={28} />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-bold text-gray-900">
                            {isLoggedIn ? "John Doe" : "Guest User"}
                        </h2>
                        <div className="flex items-center gap-1.5 text-sm text-gray-500">
                            <Mail size={14} />
                            <span className="truncate">
                                {isLoggedIn ? "john@company.com" : "Not signed in"}
                            </span>
                        </div>
                        {isLoggedIn && (
                            <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-0.5">
                                <Phone size={14} />
                                <span>+91 98765 43210</span>
                            </div>
                        )}
                    </div>
                    <ChevronRight size={20} className="text-gray-300" />
                </motion.div>

                {/* Menu Items */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
                >
                    {menuItems.map((item, idx) => (
                        <button
                            key={item.label}
                            className="w-full flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors"
                        >
                            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
                                <item.icon size={20} />
                            </div>
                            <span className="flex-1 text-left font-medium text-gray-800">
                                {item.label}
                            </span>
                            {item.badge && (
                                <span className="w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                                    {item.badge}
                                </span>
                            )}
                            <ChevronRight size={18} className="text-gray-300" />
                        </button>
                    ))}
                </motion.div>

                {/* Login/Logout Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    {isLoggedIn ? (
                        <button
                            onClick={() => {
                                logout();
                                navigate("/app");
                            }}
                            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-red-50 text-red-600 font-bold border border-red-100 hover:bg-red-100 transition-colors"
                        >
                            <LogOut size={20} />
                            Sign Out
                        </button>
                    ) : (
                        <button
                            onClick={() => navigate("/login")}
                            className="w-full py-4 rounded-2xl bg-black text-white font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-black/20"
                        >
                            Sign In
                        </button>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
