import { motion } from "motion/react";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";

interface BentoItemProps {
  title: string;
  subtitle?: string;
  className?: string;
  icon?: React.ReactNode;
  color: "yellow" | "pink" | "green" | "blue" | "purple";
  size?: "sm" | "md" | "lg";
}

const colors = {
  yellow: "bg-[#FDE047] text-yellow-950",
  pink: "bg-[#F9A8D4] text-pink-950",
  green: "bg-[#86EFAC] text-green-950",
  blue: "bg-[#93C5FD] text-blue-950",
  purple: "bg-[#D8B4FE] text-purple-950",
};

export function BentoItem({ title, subtitle, className, icon, color, size = "md" }: BentoItemProps) {
  return (
    <motion.div
      whileHover={{ scale: 0.98 }}
      whileTap={{ scale: 0.95 }}
      className={clsx(
        "rounded-[2rem] p-6 flex flex-col justify-between shadow-sm relative overflow-hidden group cursor-pointer transition-all hover:shadow-md",
        colors[color],
        size === "lg" ? "col-span-2 row-span-2 aspect-square" : 
        size === "md" ? "col-span-2 aspect-[2/1]" : 
        "aspect-square",
        className
      )}
    >
      <div className="flex justify-between items-start z-10">
        {icon && <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">{icon}</div>}
        <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity -rotate-45 group-hover:rotate-0" />
      </div>
      
      <div className="z-10 mt-auto">
        <h3 className="text-2xl font-bold leading-tight tracking-tight">{title}</h3>
        {subtitle && <p className="text-sm font-medium opacity-80 mt-1">{subtitle}</p>}
      </div>

      {/* Decorative Blobs */}
      <div className="absolute top-1/2 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-black/5 rounded-full blur-xl" />
    </motion.div>
  );
}

export function BentoGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {children}
    </div>
  );
}
