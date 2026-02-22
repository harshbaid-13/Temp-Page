// ──────────────────────── Product Data ────────────────────────
export type Product = {
    id: number;
    title: string;
    subtitle: string;
    category: string;
    icon: string;
    color: string;
    textColor: string;
    description: string;
    features: string[];
    labels: string[];
};

export const FILTER_CATEGORIES = [
    "All",
    "Healthcare",
    "Education",
    "Finance",
    "Marketing",
    "Real Estate",
    "E-Commerce",
    "Logistics",
    "Enterprise",
    "Services",
    "Media",
    "Blockchain",
];

// Helper: generate carousel gradient images from a base hex color
export function generateImages(hex: string, labels: string[]) {
    const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    return labels.map((label, i) => {
        const f = 1 - i * 0.15;
        const c = (v: number) => Math.round(v * f).toString(16).padStart(2, "0");
        const dark = `#${c(r)}${c(g)}${c(b)}`;
        return { gradient: `linear-gradient(135deg, ${i === 0 ? hex : dark} 0%, ${dark} 100%)`, label };
    });
}

export const PRODUCTS: Product[] = [
    // ── Healthcare ──
    {
        id: 1, title: "Hospital Management Software", subtitle: "Complete HMS for hospitals & diagnostic centers",
        category: "Healthcare", icon: "Stethoscope", color: "#FDE047", textColor: "#422006",
        description: "A state-of-the-art platform to digitalize hospital operations — patient records, billing, scheduling, OPD/IPD management, lab integration, telemedicine, and regulatory compliance (HIPAA/GDPR).",
        features: ["Patient Records", "OPD/IPD Management", "Billing & Payments", "Lab Integration", "Telemedicine", "Pharmacy & Inventory", "Custom Reports"],
        labels: ["Dashboard", "Patient Records", "Billing Module"]
    },

    {
        id: 2, title: "Clinic Management Software", subtitle: "Tailored for private practice & small clinics",
        category: "Healthcare", icon: "HeartPulse", color: "#F9A8D4", textColor: "#831843",
        description: "Designed for small to medium-sized clinics — digital patient records, appointment booking, billing automation, inventory tracking, teleconsultation, and a patient communication portal.",
        features: ["Digital Patient Records", "Appointment Booking", "Billing Automation", "Inventory Tracking", "Teleconsultation", "Analytics Dashboard"],
        labels: ["Overview", "Appointments", "Billing"]
    },

    {
        id: 3, title: "Pharmacy Ordering & POS Software", subtitle: "Prescription management & medicine ordering",
        category: "Healthcare", icon: "Cross", color: "#38BDF8", textColor: "#0c4a6e",
        description: "Manage prescriptions, online medicine ordering, stock tracking with expiry alerts, regulatory compliance for controlled substances, and automated billing with loyalty programs.",
        features: ["Prescription Upload", "Online Ordering", "Stock & Expiry Tracking", "Regulatory Compliance", "Loyalty Programs", "Automated Billing"],
        labels: ["Store", "Prescriptions", "Inventory"]
    },

    // ── Education ──
    {
        id: 4, title: "School Management Software", subtitle: "Academic, admin & financial management for schools",
        category: "Education", icon: "GraduationCap", color: "#86EFAC", textColor: "#14532D",
        description: "Manage admissions, attendance, academics, parent-teacher communication, fee collection, library, hostel, and transport for schools, colleges, and multi-branch institutions.",
        features: ["Admission Management", "Attendance Monitoring", "Fee Collection", "Parent-Teacher Portal", "Library Management", "Transport Management"],
        labels: ["Admin Panel", "Student Portal", "Reports"]
    },

    {
        id: 5, title: "Learning Management Software", subtitle: "LMS for institutions & corporate training",
        category: "Education", icon: "BookOpen", color: "#60A5FA", textColor: "#1e3a5f",
        description: "Deliver interactive courses with videos, quizzes, and assignments. Track learner progress, issue certifications, host live classes, and boost engagement with gamification and mobile learning.",
        features: ["Course Creation", "Progress Tracking", "Certification", "Live Classes", "Gamification", "Mobile Learning"],
        labels: ["Courses", "Classroom", "Analytics"]
    },

    // ── Finance ──
    {
        id: 6, title: "Stock Trading Software", subtitle: "Advanced tools for brokers & investors",
        category: "Finance", icon: "TrendingUp", color: "#93C5FD", textColor: "#1e3a5f",
        description: "Real-time market data, portfolio management, customizable dashboards, algorithmic trading support, risk management tools, and secure transactions for traders and financial institutions.",
        features: ["Real-Time Market Data", "Portfolio Management", "Algorithmic Trading", "Risk Management", "Customizable Dashboards"],
        labels: ["Trading View", "Portfolio", "Analytics"]
    },

    {
        id: 7, title: "Fin-Tech Software Solutions", subtitle: "Innovative digital tools for financial services",
        category: "Finance", icon: "Wallet", color: "#D8B4FE", textColor: "#3b0764",
        description: "Loan management, digital wallets, AI-powered fraud detection, payment gateways, compliance tools, wealth management, and blockchain integration for banks, NBFCs, and payment providers.",
        features: ["Loan Management", "Digital Wallet", "AI Fraud Detection", "Payment Gateway", "Compliance Tools", "Blockchain Integration"],
        labels: ["Dashboard", "Payments", "Analytics"]
    },

    {
        id: 8, title: "HYIP Investment Software", subtitle: "Fund management & investor dashboards",
        category: "Finance", icon: "CircleDollarSign", color: "#5EEAD4", textColor: "#134e4a",
        description: "Investor dashboards, customizable investment plans, automated payouts, referral program integration, risk assessment tools, and secure multi-factor authentication.",
        features: ["Investor Dashboard", "Plan Customization", "Automated Payouts", "Referral Programs", "Risk Assessment"],
        labels: ["Dashboard", "Plans", "Payouts"]
    },

    // ── Marketing ──
    {
        id: 9, title: "Email Marketing Software", subtitle: "Create, manage & track email campaigns",
        category: "Marketing", icon: "Mail", color: "#FCA5A5", textColor: "#7f1d1d",
        description: "Drag-and-drop email builder, template library, audience segmentation, automated campaigns, A/B testing, deliverability optimization, and detailed performance analytics.",
        features: ["Drag-and-Drop Builder", "Template Library", "Segmentation", "Automated Campaigns", "A/B Testing", "Performance Analytics"],
        labels: ["Editor", "Campaigns", "Analytics"]
    },

    {
        id: 10, title: "Influencer Marketing Platform", subtitle: "Connect brands with influencers at scale",
        category: "Marketing", icon: "Users", color: "#FDBA74", textColor: "#7c2d12",
        description: "Discover influencers by niche and demographics, manage campaigns, streamline brand-influencer collaboration, track ROI with real-time analytics, and manage budgets and payments.",
        features: ["Influencer Discovery", "Campaign Management", "Collaboration Tools", "Performance Analytics", "Budget Management", "Content Approval"],
        labels: ["Discovery", "Campaigns", "Analytics"]
    },

    {
        id: 11, title: "Social Media Software", subtitle: "Manage & grow your social media presence",
        category: "Marketing", icon: "Share2", color: "#2DD4BF", textColor: "#134e4a",
        description: "Schedule content across platforms, manage engagement from a centralized dashboard, access analytics, track brand mentions via social listening, and run optimized ad campaigns.",
        features: ["Content Scheduling", "Engagement Management", "Social Listening", "Campaign Management", "Hashtag Recommendations", "Team Collaboration"],
        labels: ["Dashboard", "Schedule", "Insights"]
    },

    // ── Real Estate ──
    {
        id: 12, title: "Real Estate Software", subtitle: "Property management, CRM & marketing",
        category: "Real Estate", icon: "Building", color: "#6EE7B7", textColor: "#064e3b",
        description: "Property listing management with virtual tours, CRM for leads, online booking and payments, rental/lease management, market insights, and integrated marketing tools.",
        features: ["Property Listings", "CRM", "Online Booking", "Lease Management", "Market Insights", "Document Management"],
        labels: ["Listings", "CRM", "Analytics"]
    },

    {
        id: 13, title: "Construction Management Software", subtitle: "Oversee projects, teams & resources",
        category: "Real Estate", icon: "HardHat", color: "#FCD34D", textColor: "#78350f",
        description: "Project planning, resource allocation, team collaboration, budget tracking, on-site IoT monitoring, compliance management, and detailed project reporting.",
        features: ["Project Planning", "Resource Allocation", "Budget Tracking", "On-Site Monitoring", "Compliance Management", "Reporting"],
        labels: ["Projects", "Resources", "Reports"]
    },

    {
        id: 14, title: "Interior Design Management", subtitle: "Design projects, sourcing & client management",
        category: "Real Estate", icon: "Paintbrush", color: "#C4B5FD", textColor: "#4c1d95",
        description: "Design portfolio management, client scheduling, material sourcing, 3D design visualization, task management, budgeting, and client feedback tools.",
        features: ["Portfolio Management", "3D Visualization", "Material Sourcing", "Task Management", "Budget & Invoicing", "Client Feedback"],
        labels: ["Portfolio", "3D View", "Projects"]
    },

    // ── Blockchain ──
    {
        id: 15, title: "NFT Blockchain Marketplace", subtitle: "Buy, sell & trade NFTs securely",
        category: "Blockchain", icon: "Hexagon", color: "#67E8F9", textColor: "#164e63",
        description: "NFT minting with smart contracts, marketplace for listing, bidding, and trading, wallet integration (MetaMask), automated royalties, cross-chain compatibility, and analytics.",
        features: ["NFT Minting", "Marketplace", "Wallet Integration", "Royalty Management", "Cross-Chain", "Analytics Dashboard"],
        labels: ["Marketplace", "Mint", "Wallet"]
    },

    {
        id: 16, title: "Crypto P2P Software", subtitle: "Decentralized peer-to-peer crypto exchange",
        category: "Blockchain", icon: "Coins", color: "#F0ABFC", textColor: "#701a75",
        description: "Peer-to-peer cryptocurrency trading without intermediaries, escrow protection, multi-currency support, integrated wallets, KYC/AML compliance, and real-time notifications.",
        features: ["P2P Trading", "Escrow Protection", "Multi-Currency", "Integrated Wallets", "KYC/AML Compliance", "Data Encryption"],
        labels: ["Exchange", "Wallet", "Compliance"]
    },

    // ── Enterprise ──
    {
        id: 17, title: "CRM Software", subtitle: "Manage customers, sales & marketing",
        category: "Enterprise", icon: "UserCheck", color: "#7DD3FC", textColor: "#0c4a6e",
        description: "Lead management, contact database, email/SMS marketing, sales pipeline tracking, task management, analytics, and integrations with third-party tools.",
        features: ["Lead Management", "Contact Database", "Email/SMS Marketing", "Sales Pipeline", "Task Management", "Analytics"],
        labels: ["Pipeline", "Contacts", "Reports"]
    },

    {
        id: 18, title: "ERP Software", subtitle: "Centralized business operations management",
        category: "Enterprise", icon: "Layers", color: "#BEF264", textColor: "#365314",
        description: "Finance, HR, procurement, inventory, supply chain, project management, and business intelligence — all centralized with cloud accessibility.",
        features: ["Financial Management", "HR Management", "Inventory & Supply Chain", "Procurement", "Project Management", "Business Intelligence"],
        labels: ["Dashboard", "Finance", "HR"]
    },

    {
        id: 19, title: "Inventory & POS Software", subtitle: "Retail operations, billing & stock tracking",
        category: "Enterprise", icon: "BarChart2", color: "#FBBF24", textColor: "#78350f",
        description: "Inventory tracking, barcode scanning, multi-store management, customer loyalty programs, real-time reporting, offline mode, and e-commerce platform integration.",
        features: ["Inventory Tracking", "Barcode Scanning", "Multi-Store", "Loyalty Programs", "Offline Mode", "E-commerce Sync"],
        labels: ["Stock View", "POS", "Analytics"]
    },

    // ── E-Commerce ──
    {
        id: 20, title: "E-Commerce Software", subtitle: "Launch & manage online stores",
        category: "E-Commerce", icon: "ShoppingCart", color: "#818CF8", textColor: "#312e81",
        description: "Customizable storefronts, product management, multiple payment gateways, order tracking, multi-currency support, SEO and marketing tools, reviews, and analytics.",
        features: ["Customizable Storefronts", "Product Management", "Payment Gateways", "Order Tracking", "Marketing Tools", "Analytics"],
        labels: ["Store", "Products", "Orders"]
    },

    {
        id: 21, title: "Digital Product Marketplace", subtitle: "Marketplace for eBooks, software & media",
        category: "E-Commerce", icon: "Store", color: "#A5B4FC", textColor: "#312e81",
        description: "Seller onboarding, secure download management with anti-piracy, global payment gateways, product reviews, marketing tools with affiliate programs, and analytics.",
        features: ["Seller Onboarding", "Secure Downloads", "Global Payments", "Reviews & Ratings", "Affiliate Programs", "Analytics"],
        labels: ["Marketplace", "Products", "Sellers"]
    },

    {
        id: 22, title: "Freelancer Marketplace", subtitle: "Connect freelancers with clients globally",
        category: "E-Commerce", icon: "Briefcase", color: "#FDA4AF", textColor: "#881337",
        description: "Freelancer/client profiles, project bidding, payment escrow, skill verification, collaboration tools, review systems, and project analytics.",
        features: ["Profiles & Portfolios", "Project Bidding", "Payment Escrow", "Skill Verification", "Collaboration Tools", "Reviews & Ratings"],
        labels: ["Projects", "Profiles", "Payments"]
    },

    {
        id: 23, title: "Grocery Ordering & POS", subtitle: "Online ordering + in-store POS for groceries",
        category: "E-Commerce", icon: "ShoppingBasket", color: "#4ADE80", textColor: "#14532d",
        description: "Online grocery ordering with delivery/pickup, real-time inventory sync, barcode scanning, loyalty programs, dynamic pricing, and delivery route optimization.",
        features: ["Online Ordering", "Real-Time Inventory", "Barcode Scanning", "Loyalty Programs", "Dynamic Pricing", "Delivery Management"],
        labels: ["Store", "Inventory", "Delivery"]
    },

    // ── Logistics ──
    {
        id: 24, title: "Fleet Management Software", subtitle: "GPS tracking, driver & fuel management",
        category: "Logistics", icon: "Truck", color: "#A78BFA", textColor: "#4c1d95",
        description: "Real-time GPS tracking, driver performance monitoring, fuel management, maintenance scheduling, route optimization, accident reporting, and compliance management.",
        features: ["GPS Tracking", "Driver Monitoring", "Fuel Management", "Maintenance Alerts", "Route Optimization", "Compliance"],
        labels: ["Fleet Map", "Drivers", "Analytics"]
    },

    {
        id: 25, title: "Courier & Logistics Software", subtitle: "End-to-end delivery & shipping management",
        category: "Logistics", icon: "Package", color: "#34D399", textColor: "#064e3b",
        description: "Order management, real-time package tracking, AI-driven route optimization, delivery scheduling, driver management, barcode integration, and customer notifications.",
        features: ["Order Management", "Package Tracking", "Route Optimization", "Delivery Scheduling", "Barcode Integration", "Customer Notifications"],
        labels: ["Orders", "Tracking", "Routes"]
    },

    {
        id: 26, title: "Cab Booking Software", subtitle: "Ride-hailing platform for taxi operators",
        category: "Logistics", icon: "Car", color: "#FACC15", textColor: "#713f12",
        description: "Real-time ride bookings, driver app, route optimization, cashless payments, live tracking, ride history, surge pricing, and integrated customer support.",
        features: ["Real-Time Bookings", "Driver App", "Route Optimization", "Live Tracking", "Surge Pricing", "Payment Integration"],
        labels: ["Booking", "Map", "Rides"]
    },

    {
        id: 27, title: "Bike Booking Software", subtitle: "Bike rental & ride-sharing platform",
        category: "Logistics", icon: "Gauge", color: "#F87171", textColor: "#7f1d1d",
        description: "Online bike booking, flexible rental durations, real-time availability tracking, GPS tracking, maintenance alerts, customer reviews, and fleet admin dashboard.",
        features: ["Online Booking", "Flexible Rentals", "GPS Tracking", "Maintenance Alerts", "Customer Reviews", "Admin Dashboard"],
        labels: ["Booking", "Fleet", "Tracking"]
    },

    {
        id: 28, title: "Bus Ticketing & Reservation", subtitle: "Online bus ticketing & route management",
        category: "Logistics", icon: "MapPin", color: "#A3E635", textColor: "#365314",
        description: "Online ticket booking, interactive seat selection, real-time availability, mobile e-tickets with QR, route management, cancellations/refunds, and driver management.",
        features: ["Online Booking", "Seat Selection", "Mobile E-Tickets", "Route Management", "Cancellations & Refunds", "Driver Management"],
        labels: ["Routes", "Booking", "Tickets"]
    },

    // ── Services ──
    {
        id: 29, title: "Restaurant Food Ordering & POS", subtitle: "Orders, billing & kitchen management",
        category: "Services", icon: "UtensilsCrossed", color: "#FB923C", textColor: "#7c2d12",
        description: "Online ordering, table management, inventory tracking, dynamic menus, integrated billing, kitchen display system (KDS), loyalty programs, and sales analytics.",
        features: ["Online Ordering", "Table Management", "Kitchen Display", "Menu Customization", "Loyalty Programs", "Sales Analytics"],
        labels: ["Orders", "Kitchen", "Menu"]
    },

    {
        id: 30, title: "On-Demand Home Service", subtitle: "Connect customers with service providers",
        category: "Services", icon: "Wrench", color: "#FB7185", textColor: "#881337",
        description: "Service booking platform for cleaning, plumbing, beauty services & more. Flexible scheduling, geo-location tracking, provider management, reviews, and promotional tools.",
        features: ["Service Booking", "Geo-Location Tracking", "Provider Management", "Secure Payments", "Customer Reviews", "Promotional Tools"],
        labels: ["Services", "Booking", "Providers"]
    },

    {
        id: 31, title: "Appointments Booking Software", subtitle: "Scheduling for salons, clinics & consultants",
        category: "Services", icon: "Calendar", color: "#C084FC", textColor: "#581c87",
        description: "Online booking, calendar integration (Google Calendar), automated SMS/email reminders, flexible payment options, staff scheduling, and analytics dashboard.",
        features: ["Online Booking", "Calendar Integration", "Automated Reminders", "Staff Scheduling", "Payment Options", "Analytics"],
        labels: ["Calendar", "Bookings", "Staff"]
    },

    {
        id: 32, title: "Event Management & Tickets", subtitle: "Organize events & sell tickets online",
        category: "Services", icon: "Ticket", color: "#F472B6", textColor: "#831843",
        description: "Event creation, online ticket sales, dynamic seating charts, promotional tools, QR code check-in, real-time sales insights, multi-event support, and post-event analytics.",
        features: ["Online Ticket Sales", "Seating Charts", "QR Check-In", "Promotional Tools", "Multi-Event Support", "Post-Event Analytics"],
        labels: ["Events", "Tickets", "Analytics"]
    },

    // ── Media ──
    {
        id: 33, title: "OTT Software Solutions", subtitle: "Video streaming & content monetization",
        category: "Media", icon: "Play", color: "#E879F9", textColor: "#701a75",
        description: "High-quality video streaming with adaptive bitrate, content management, subscription plans with payment integration, multi-device support, analytics, and ad monetization.",
        features: ["Video Streaming", "Content Management", "Subscription Plans", "Multi-Device", "Analytics", "Ad Monetization"],
        labels: ["Player", "Content", "Analytics"]
    },
];
