import { motion } from "motion/react";
import { ArrowRight, ShieldCheck, Zap, Users } from "lucide-react";

export function About() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 pb-32">
      <header className="mb-8 pt-6">
        <h1 className="text-3xl font-bold text-gray-900">About Us</h1>
        <p className="text-gray-500">Building trust through quality</p>
      </header>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
        >
          <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-4 text-white">
            <ShieldCheck size={24} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Our Mission</h2>
          <p className="text-gray-500 leading-relaxed">
            To empower enterprises with scalable, secure, and intuitive software solutions that drive growth and efficiency.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-black text-white p-8 rounded-3xl shadow-xl shadow-black/10"
        >
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-4 text-white">
            <Zap size={24} />
          </div>
          <h2 className="text-2xl font-bold mb-2">Our Vision</h2>
          <p className="text-gray-300 leading-relaxed">
            A world where technology seamlessly integrates with business processes, eliminating friction and maximizing potential.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#FDE047] p-8 rounded-3xl shadow-sm border border-yellow-200"
        >
          <div className="w-12 h-12 bg-yellow-900/10 rounded-xl flex items-center justify-center mb-4 text-yellow-900">
            <Users size={24} />
          </div>
          <h2 className="text-2xl font-bold text-yellow-900 mb-2">The Team</h2>
          <p className="text-yellow-800 leading-relaxed">
            We are a diverse group of engineers, designers, and strategists passionate about solving complex problems.
          </p>
          <div className="mt-4 flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200" />
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-white bg-white flex items-center justify-center text-xs font-bold text-gray-500">
                +20
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
