import { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";

export function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/app");
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Blobs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-[#FDE047] rounded-full blur-3xl opacity-50"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-[#F9A8D4] rounded-full blur-3xl opacity-50"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center"
      >
        <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-3xl shadow-xl flex items-center justify-center rotate-3">
          <span className="text-4xl font-bold text-gray-800">B2B</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">TechHub</h1>
        <p className="text-gray-500 mt-2">Enterprise Solutions</p>
      </motion.div>
    </div>
  );
}
