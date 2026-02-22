import { Home, ListChecks, Info, Phone, Plus, User, CreditCard, MessageCircle, BarChart2 } from "lucide-react";
import { Link, useLocation } from "react-router";
import clsx from "clsx";
import { motion, AnimatePresence } from "motion/react";

const navItems = [
  { path: "/app", icon: Home, label: "Home" },
  { path: "/app/track", icon: BarChart2, label: "Track" },
  { path: "/app/request", icon: Plus, label: "New" },
  { path: "/app/about", icon: User, label: "Profile" },
  { path: "/app/contact", icon: MessageCircle, label: "Chat" },
];

export function BottomNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="absolute bottom-6 inset-x-0 z-50 flex justify-center pointer-events-none">
      <div className="bg-[#1C1C1E]/90 backdrop-blur-xl p-1.5 rounded-[2rem] flex items-center gap-1 shadow-2xl shadow-black/40 border border-white/10 pointer-events-auto transition-transform duration-300">
        {navItems.map((item) => {
          const isActive = currentPath === item.path || (item.path === "/app" && currentPath === "/");
          
          return (
            <Link key={item.path} to={item.path} className="relative block h-12 flex items-center">
              <motion.div
                initial={false}
                animate={{
                  width: isActive ? "auto" : 48,
                  backgroundColor: isActive ? "#FFFFFF" : "transparent",
                  color: isActive ? "#000000" : "#9CA3AF"
                }}
                transition={{
                  type: "tween",
                  ease: "easeInOut",
                  duration: 0.3
                }}
                className={clsx(
                  "flex items-center justify-center h-12 rounded-[1.5rem] cursor-pointer relative overflow-hidden shrink-0",
                  isActive ? "px-5" : "hover:bg-white/5"
                )}
              >
                <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} className="shrink-0" />
                
                <AnimatePresence mode="popLayout" initial={false}>
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                      animate={{ 
                        opacity: 1, 
                        width: "auto",
                        marginLeft: 8 
                      }}
                      exit={{ 
                        opacity: 0, 
                        width: 0,
                        marginLeft: 0
                      }}
                      transition={{ 
                        opacity: { duration: 0.2, delay: 0.1 },
                        width: { duration: 0.25, ease: "easeInOut" },
                        marginLeft: { duration: 0.25, ease: "easeInOut" }
                      }}
                      className="font-bold text-sm whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
