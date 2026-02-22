import { motion } from "motion/react";
import { BentoItem } from "../components/BentoGrid";
import { Stethoscope, HeartPulse, GraduationCap, Package, User } from "lucide-react";
import { useState, useEffect } from "react";
import clsx from "clsx";

// Mock API Call
const fetchProducts = async () => {
  return new Promise<any[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Hospital Management",
          subtitle: "Complete HMS Suite",
          color: "yellow",
          icon: <Stethoscope className="w-6 h-6" />,
          size: "lg"
        },
        {
          id: 2,
          title: "Clinic Portal",
          subtitle: "For private practice",
          color: "pink",
          icon: <HeartPulse className="w-6 h-6" />,
          size: "md"
        },
        {
          id: 3,
          title: "School ERP",
          subtitle: "Manage students & staff",
          color: "green",
          icon: <GraduationCap className="w-6 h-6" />,
          size: "md"
        },
        {
          id: 4,
          title: "Inventory",
          subtitle: "Track stock easily",
          color: "blue",
          icon: <Package className="w-6 h-6" />,
          size: "sm"
        },
        {
          id: 5,
          title: "HR Portal",
          subtitle: "Employees",
          color: "purple",
          icon: <User className="w-6 h-6" />,
          size: "sm"
        },
      ]);
    }, 800);
  });
};

export function Dashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="bg-[#FDFBF7] min-h-screen pb-32">
      {/* Header */}
      <header className="px-6 pt-12 pb-6 bg-white/50 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-lg shadow-black/10"
          >
            <span className="text-white font-bold text-lg">B2B</span>
          </motion.div>
          <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden border-2 border-white shadow-sm">
             {/* Using a placeholder avatar or could use Lucide User icon if image fails */}
             <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
               <User size={20} />
             </div>
          </div>
        </div>
        <div>
            <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-extrabold text-gray-900 tracking-tight leading-none mb-1"
            >
            Software<br/>Products
            </motion.h1>
            <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-500 font-medium"
            >
            Discover scalable solutions
            </motion.p>
        </div>
      </header>

      {/* Grid */}
      <div className="p-4 grid grid-cols-2 gap-4">
        {loading ? (
          <div className="col-span-2 flex flex-col items-center justify-center h-64 space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
            <p className="text-gray-400 text-sm">Loading catalog...</p>
          </div>
        ) : (
            products.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: idx * 0.1, type: "spring", stiffness: 200, damping: 20 }}
                className={clsx(
                    "rounded-3xl overflow-hidden",
                    product.size === "lg" ? "col-span-2 row-span-2" : 
                    product.size === "md" ? "col-span-2" : 
                    "col-span-1"
                )}
              >
                <BentoItem
                  title={product.title}
                  subtitle={product.subtitle}
                  color={product.color}
                  icon={product.icon}
                  size={product.size}
                  className="h-full w-full"
                />
              </motion.div>
            ))
        )}
      </div>
    </div>
  );
}
