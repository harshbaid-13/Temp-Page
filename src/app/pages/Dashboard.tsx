import { motion, AnimatePresence } from "motion/react";
import {
  Stethoscope, HeartPulse, GraduationCap, TrendingUp, Wallet, Mail, Users,
  CircleDollarSign, Store, Briefcase, Building, HardHat, Paintbrush, Hexagon,
  Coins, UserCheck, Layers, BarChart2, Truck, Package, UtensilsCrossed, BookOpen,
  Ticket, ShoppingCart, ShoppingBasket, Wrench, Calendar, Play, Share2, Car,
  Gauge, MapPin, Cross, ArrowRight, Bell, Search, ChevronDown, ChevronUp,
} from "lucide-react";
import { useState, useEffect, useCallback, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import clsx from "clsx";
import { useNavigate } from "react-router";
import { PRODUCTS, FILTER_CATEGORIES, generateImages, type Product } from "../data/products";

// ── Icon map ──
const ICON_MAP: Record<string, ReactNode> = {
  Stethoscope: <Stethoscope className="w-5 h-5" />, HeartPulse: <HeartPulse className="w-5 h-5" />,
  GraduationCap: <GraduationCap className="w-5 h-5" />, TrendingUp: <TrendingUp className="w-5 h-5" />,
  Wallet: <Wallet className="w-5 h-5" />, Mail: <Mail className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />, CircleDollarSign: <CircleDollarSign className="w-5 h-5" />,
  Store: <Store className="w-5 h-5" />, Briefcase: <Briefcase className="w-5 h-5" />,
  Building: <Building className="w-5 h-5" />, HardHat: <HardHat className="w-5 h-5" />,
  Paintbrush: <Paintbrush className="w-5 h-5" />, Hexagon: <Hexagon className="w-5 h-5" />,
  Coins: <Coins className="w-5 h-5" />, UserCheck: <UserCheck className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />, BarChart2: <BarChart2 className="w-5 h-5" />,
  Truck: <Truck className="w-5 h-5" />, Package: <Package className="w-5 h-5" />,
  UtensilsCrossed: <UtensilsCrossed className="w-5 h-5" />, BookOpen: <BookOpen className="w-5 h-5" />,
  Ticket: <Ticket className="w-5 h-5" />, ShoppingCart: <ShoppingCart className="w-5 h-5" />,
  ShoppingBasket: <ShoppingBasket className="w-5 h-5" />, Cross: <Cross className="w-5 h-5" />,
  Wrench: <Wrench className="w-5 h-5" />, Calendar: <Calendar className="w-5 h-5" />,
  Play: <Play className="w-5 h-5" />, Share2: <Share2 className="w-5 h-5" />,
  Car: <Car className="w-5 h-5" />, Gauge: <Gauge className="w-5 h-5" />,
  MapPin: <MapPin className="w-5 h-5" />,
};

// ── Carousel ──
function PhotoCarousel({ images }: { images: { gradient: string; label: string }[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const onSelect = useCallback(() => { if (emblaApi) setSelectedIndex(emblaApi.selectedScrollSnap()); }, [emblaApi]);
  useEffect(() => { if (!emblaApi) return; emblaApi.on("select", onSelect); onSelect(); }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-t-[1.5rem]" ref={emblaRef}>
        <div className="flex">
          {images.map((img, i) => (
            <div key={i} className="flex-[0_0_100%] min-w-0 aspect-[16/10] relative" style={{ background: img.gradient }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/60 text-xs font-semibold tracking-widest uppercase">{img.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {images.length > 1 && (
        <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5">
          {images.map((_, i) => (
            <div key={i} className={clsx("w-1.5 h-1.5 rounded-full transition-all duration-300", i === selectedIndex ? "bg-white w-4" : "bg-white/40")} />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Dashboard ──
export function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => { const t = setTimeout(() => { setProducts(PRODUCTS); setLoading(false); }, 500); return () => clearTimeout(t); }, []);

  const filtered = products.filter((p) => {
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q);
    const matchFilter = activeFilter === "All" || p.category === activeFilter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="bg-[#FDFBF7] min-h-screen pb-32">
      {/* Header */}
      <header className="px-6 pt-12 pb-5 bg-white/50 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100">
        <div className="flex justify-between items-center mb-5">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <img src="/idea2code.png" alt="Idea2Code" className="w-10 h-10 rounded-xl object-contain shadow-lg shadow-black/5" />
          </motion.div>
          <button className="relative w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border-2 border-white shadow-sm hover:bg-gray-200 transition-colors">
            <Bell size={20} className="text-gray-700" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-sm">3</span>
          </button>
        </div>
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl font-extrabold text-gray-900 tracking-tight leading-none mb-1">
          Software<br />Products
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-gray-500 font-medium">
          Discover scalable solutions
        </motion.p>
      </header>

      {/* Search & Filters */}
      <div className="px-4 pt-4 pb-2 space-y-3">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-black focus:ring-2 focus:ring-black outline-none transition-all shadow-sm text-sm"
            placeholder="Search products..." />
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {FILTER_CATEGORIES.map((cat) => (
            <motion.button key={cat} whileTap={{ scale: 0.95 }} onClick={() => setActiveFilter(cat)}
              className={clsx("px-4 py-2 rounded-full text-sm font-semibold border whitespace-nowrap transition-all shrink-0",
                activeFilter === cat ? "bg-black text-white border-black shadow-md shadow-black/10" : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
              )}>{cat}</motion.button>
          ))}
        </div>
      </div>

      {/* Product list */}
      <div className="px-4 py-3 space-y-5">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black" />
            <p className="text-gray-400 text-sm">Loading catalog...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 space-y-3">
            <Search size={40} className="text-gray-300" />
            <p className="text-gray-400 text-sm font-medium">No products match your search</p>
          </div>
        ) : (
          filtered.map((product, idx) => {
            const isExpanded = expandedId === product.id;
            const images = generateImages(product.color, product.labels);
            return (
              <motion.div key={product.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, type: "spring", stiffness: 260, damping: 24 }}
                className="rounded-[1.5rem] bg-white shadow-[0_2px_20px_-4px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden">
                <PhotoCarousel images={images} />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : product.id)}>
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: product.color, color: product.textColor }}>
                        {ICON_MAP[product.icon] || <ArrowRight className="w-5 h-5" />}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-bold text-gray-900 leading-tight truncate">{product.title}</h3>
                        <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">{product.subtitle}</p>
                      </div>
                    </div>
                    <div className="shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                        <div className="pt-4 mt-4 border-t border-gray-100 space-y-4">
                          <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
                          <div>
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Key Features</h4>
                            <div className="flex flex-wrap gap-1.5">
                              {product.features.map((f) => (<span key={f} className="px-3 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-700">{f}</span>))}
                            </div>
                          </div>
                          <motion.button whileTap={{ scale: 0.97 }} onClick={() => navigate("/app/request")}
                            className="w-full py-3.5 rounded-xl bg-black text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-black/20 hover:bg-gray-800 transition-colors">
                            <ShoppingCart size={18} /> Get Quotation
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
