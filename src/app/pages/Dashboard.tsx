import { motion } from "motion/react";
import {
  Stethoscope,
  HeartPulse,
  GraduationCap,
  Package,
  User,
  ArrowRight,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import clsx from "clsx";

// ──────────────────────── Carousel component ────────────────────────
function PhotoCarousel({ images }: { images: { gradient: string; label: string }[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-t-[1.5rem]" ref={emblaRef}>
        <div className="flex">
          {images.map((img, i) => (
            <div
              key={i}
              className="flex-[0_0_100%] min-w-0 aspect-[16/10] relative"
              style={{ background: img.gradient }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/60 text-xs font-semibold tracking-widest uppercase">
                  {img.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5">
          {images.map((_, i) => (
            <div
              key={i}
              className={clsx(
                "w-1.5 h-1.5 rounded-full transition-all duration-300",
                i === selectedIndex
                  ? "bg-white w-4"
                  : "bg-white/40"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ──────────────────────── Mock data ────────────────────────
const fetchProducts = async () => {
  return new Promise<any[]>((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Hospital Management",
          subtitle: "Complete HMS Suite — patient records, billing, scheduling",
          color: "#FDE047",
          textColor: "#422006",
          icon: <Stethoscope className="w-5 h-5" />,
          images: [
            { gradient: "linear-gradient(135deg, #fde047 0%, #facc15 100%)", label: "Dashboard" },
            { gradient: "linear-gradient(135deg, #facc15 0%, #eab308 100%)", label: "Patient Records" },
            { gradient: "linear-gradient(135deg, #eab308 0%, #ca8a04 100%)", label: "Billing Module" },
          ],
        },
        {
          id: 2,
          title: "Clinic Portal",
          subtitle: "For private practice — appointments, EMR, analytics",
          color: "#F9A8D4",
          textColor: "#831843",
          icon: <HeartPulse className="w-5 h-5" />,
          images: [
            { gradient: "linear-gradient(135deg, #f9a8d4 0%, #f472b6 100%)", label: "Overview" },
            { gradient: "linear-gradient(135deg, #f472b6 0%, #ec4899 100%)", label: "Appointments" },
          ],
        },
        {
          id: 3,
          title: "School ERP",
          subtitle: "Manage students, staff, exams & attendance",
          color: "#86EFAC",
          textColor: "#14532D",
          icon: <GraduationCap className="w-5 h-5" />,
          images: [
            { gradient: "linear-gradient(135deg, #86efac 0%, #4ade80 100%)", label: "Admin Panel" },
            { gradient: "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)", label: "Student Portal" },
            { gradient: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)", label: "Reports" },
          ],
        },
        {
          id: 4,
          title: "Inventory System",
          subtitle: "Track stock, suppliers & purchase orders",
          color: "#93C5FD",
          textColor: "#1e3a5f",
          icon: <Package className="w-5 h-5" />,
          images: [
            { gradient: "linear-gradient(135deg, #93c5fd 0%, #60a5fa 100%)", label: "Stock View" },
            { gradient: "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)", label: "Analytics" },
          ],
        },
        {
          id: 5,
          title: "HR Portal",
          subtitle: "Employee management, payroll & leave tracking",
          color: "#D8B4FE",
          textColor: "#3b0764",
          icon: <User className="w-5 h-5" />,
          images: [
            { gradient: "linear-gradient(135deg, #d8b4fe 0%, #c084fc 100%)", label: "HR Dashboard" },
            { gradient: "linear-gradient(135deg, #c084fc 0%, #a855f7 100%)", label: "Payroll" },
            { gradient: "linear-gradient(135deg, #a855f7 0%, #9333ea 100%)", label: "Leave Manager" },
          ],
        },
      ]);
    }, 800);
  });
};

// ──────────────────────── Dashboard ────────────────────────
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
            Software<br />Products
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

      {/* Product list */}
      <div className="px-4 py-5 space-y-5">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black" />
            <p className="text-gray-400 text-sm">Loading catalog...</p>
          </div>
        ) : (
          products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: idx * 0.08,
                type: "spring",
                stiffness: 260,
                damping: 24,
              }}
              whileTap={{ scale: 0.98 }}
              className="rounded-[1.5rem] bg-white shadow-[0_2px_20px_-4px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden cursor-pointer group"
            >
              {/* Scrollable Photos */}
              <PhotoCarousel images={product.images} />

              {/* Info section */}
              <div className="p-5 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: product.color, color: product.textColor }}
                  >
                    {product.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight truncate">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">
                      {product.subtitle}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
                  <ArrowRight size={16} />
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
