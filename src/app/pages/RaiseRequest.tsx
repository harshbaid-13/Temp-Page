import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  AlertCircle,
  Sparkles,
  FolderOpen,
  User,
  Building2,
  Phone,
  Video,
  MapPin,
  Upload,
  FileText,
  Image,
  X,
} from "lucide-react";
import clsx from "clsx";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

// ──────────────────────── Types ────────────────────────
type ClientType = "individual" | "organisation";
type CommunicationPref = "call" | "gmeet" | "offline";

type FormState = {
  // Step 1
  projectStage: "new" | "existing" | "";
  softwareCategories: string[];
  // Step 2
  priority: "low" | "medium" | "high" | "";
  summary: string;
  uploadedFiles: { name: string; size: string; type: string }[];
  // Step 3
  clientType: ClientType | "";
  // Individual fields
  fullName: string;
  phoneNumber: string;
  emailId: string;
  address: string;
  state: string;
  pincode: string;
  preferredCommunication: CommunicationPref | "";
  // Organisation fields
  organizationName: string;
  contactPerson: string;
  contactNumber: string;
  orgEmailId: string;
  organizationAddress: string;
  orgState: string;
  orgPincode: string;
  orgPreferredCommunication: CommunicationPref | "";
};

const initialFormState: FormState = {
  projectStage: "",
  softwareCategories: [],
  priority: "",
  summary: "",
  uploadedFiles: [],
  clientType: "",
  fullName: "",
  phoneNumber: "",
  emailId: "",
  address: "",
  state: "",
  pincode: "",
  preferredCommunication: "",
  organizationName: "",
  contactPerson: "",
  contactNumber: "",
  orgEmailId: "",
  organizationAddress: "",
  orgState: "",
  orgPincode: "",
  orgPreferredCommunication: "",
};

const DRAFT_KEY = "idea2code_request_draft";
const DRAFT_STEP_KEY = "idea2code_request_step";

// ──────────────────────── Constants ────────────────────────
const SOFTWARE_CATEGORIES = [
  "Website",
  "Web-App",
  "Mobile App",
  "Desktop Software",
  "AI/ML App",
  "Blockchain & Crypto",
  "Cloud Solution",
  "Game Development",
  "Cyber Security Solution",
  "Custom Bots",
  "Browser Plugins",
  "Data Analytics & Visualization",
  "Others",
];

const steps = [
  { id: 1, title: "Project Type" },
  { id: 2, title: "Priority & Summary" },
  { id: 3, title: "Contact Info" },
];

// ──────────────────────── Helpers ────────────────────────
function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(
          "w-full px-4 py-3 rounded-xl bg-white border focus:ring-2 focus:ring-black outline-none transition-all",
          error
            ? "border-red-500 ring-red-100"
            : "border-gray-200 focus:border-black"
        )}
        placeholder={placeholder}
      />
      {error && (
        <p className="mt-1 text-red-500 text-sm flex items-center gap-1">
          <AlertCircle size={14} /> {error}
        </p>
      )}
    </div>
  );
}

// ──────────────────────── Main Component ────────────────────────
export function RaiseRequest() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Hydrate from localStorage draft
  const [form, setForm] = useState<FormState>(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) return JSON.parse(saved);
    } catch { }
    return initialFormState;
  });

  // Restore step (especially after login redirect)
  const [currentStep, setCurrentStep] = useState(() => {
    try {
      const savedStep = localStorage.getItem(DRAFT_STEP_KEY);
      if (savedStep) return parseInt(savedStep, 10);
    } catch { }
    return 1;
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Save draft to localStorage whenever form changes
  useEffect(() => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
  }, [form]);

  // Save current step
  useEffect(() => {
    localStorage.setItem(DRAFT_STEP_KEY, String(currentStep));
  }, [currentStep]);

  const updateField = <K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const toggleCategory = (cat: string) => {
    setForm((prev) => {
      const cats = prev.softwareCategories.includes(cat)
        ? prev.softwareCategories.filter((c) => c !== cat)
        : [...prev.softwareCategories, cat];
      return { ...prev, softwareCategories: cats };
    });
    setErrors((prev) => {
      const next = { ...prev };
      delete next["softwareCategories"];
      return next;
    });
  };

  // ── File upload mock ──
  const handleMockFileSelect = () => {
    // Simulate picking a file
    const mockFiles = [
      { name: "requirements.pdf", size: "2.4 MB", type: "pdf" },
      { name: "wireframes.png", size: "1.8 MB", type: "image" },
    ];
    const randomFile = mockFiles[Math.floor(Math.random() * mockFiles.length)];
    setForm((prev) => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, { ...randomFile, name: `${randomFile.name.split('.')[0]}_${Date.now()}.${randomFile.name.split('.')[1]}` }],
    }));
  };

  const removeFile = (index: number) => {
    setForm((prev) => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((_, i) => i !== index),
    }));
  };

  // ── Validation ──
  const validateStep = (step: number): boolean => {
    const errs: Record<string, string> = {};

    if (step === 1) {
      if (!form.projectStage) errs.projectStage = "Select a project stage";
      if (form.softwareCategories.length === 0)
        errs.softwareCategories = "Select at least one category";
    }

    if (step === 2) {
      if (!form.priority) errs.priority = "Select a priority";
      if (!form.summary.trim()) errs.summary = "Please enter a summary";
    }

    if (step === 3) {
      if (!form.clientType)
        errs.clientType = "Select Individual or Organisation";

      if (form.clientType === "individual") {
        if (!form.fullName.trim()) errs.fullName = "Required";
        if (!form.phoneNumber.trim()) errs.phoneNumber = "Required";
        if (!form.emailId.trim()) errs.emailId = "Required";
        if (!form.address.trim()) errs.address = "Required";
        if (!form.state.trim()) errs.state = "Required";
        if (!form.pincode.trim()) errs.pincode = "Required";
        if (!form.preferredCommunication)
          errs.preferredCommunication = "Select one";
      }

      if (form.clientType === "organisation") {
        if (!form.organizationName.trim()) errs.organizationName = "Required";
        if (!form.contactPerson.trim()) errs.contactPerson = "Required";
        if (!form.contactNumber.trim()) errs.contactNumber = "Required";
        if (!form.orgEmailId.trim()) errs.orgEmailId = "Required";
        if (!form.organizationAddress.trim())
          errs.organizationAddress = "Required";
        if (!form.orgState.trim()) errs.orgState = "Required";
        if (!form.orgPincode.trim()) errs.orgPincode = "Required";
        if (!form.orgPreferredCommunication)
          errs.orgPreferredCommunication = "Select one";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const onSubmit = async () => {
    if (!validateStep(3)) return;

    // Check auth — if not logged in, redirect to login
    if (!isLoggedIn) {
      // Save step so we return to step 3
      localStorage.setItem(DRAFT_STEP_KEY, "3");
      navigate("/login", { state: { returnTo: "/app/request" } });
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Submitted:", form);

    // Clear draft
    localStorage.removeItem(DRAFT_KEY);
    localStorage.removeItem(DRAFT_STEP_KEY);

    setIsSubmitting(false);
    navigate("/app/track");
  };

  // ──────────────────────── Render ────────────────────────
  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 pb-32 flex flex-col">
      <header className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 p-2 -ml-2 text-gray-400 hover:text-gray-900"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-bold text-gray-900">New Request</h1>
        <p className="text-gray-500">Let's get your project started</p>
      </header>

      {/* Progress Bar */}
      <div className="flex gap-2 mb-8">
        {steps.map((step) => (
          <div
            key={step.id}
            className={clsx(
              "h-2 flex-1 rounded-full transition-colors duration-300",
              step.id <= currentStep ? "bg-black" : "bg-gray-200"
            )}
          />
        ))}
      </div>

      {/* Step label */}
      <div className="mb-6 flex items-center gap-2">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Step {currentStep} of {steps.length}
        </span>
        <span className="text-xs text-gray-300">·</span>
        <span className="text-xs font-bold text-gray-900 uppercase tracking-wider">
          {steps[currentStep - 1].title}
        </span>
      </div>

      {/* Steps */}
      <div className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {/* ───────── STEP 1: Project Type ───────── */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-8 flex-1"
            >
              {/* Project Stage */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Project Stage
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      value: "new" as const,
                      label: "New",
                      icon: <Sparkles size={28} />,
                      desc: "Start from scratch",
                    },
                    {
                      value: "existing" as const,
                      label: "Existing",
                      icon: <FolderOpen size={28} />,
                      desc: "Upgrade or fix",
                    },
                  ].map((opt) => (
                    <motion.button
                      key={opt.value}
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => updateField("projectStage", opt.value)}
                      className={clsx(
                        "relative p-5 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all",
                        form.projectStage === opt.value
                          ? "border-black bg-black text-white shadow-lg shadow-black/20"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      )}
                    >
                      {opt.icon}
                      <span className="font-bold text-lg">{opt.label}</span>
                      <span
                        className={clsx(
                          "text-xs",
                          form.projectStage === opt.value
                            ? "text-white/70"
                            : "text-gray-400"
                        )}
                      >
                        {opt.desc}
                      </span>
                      {form.projectStage === opt.value && (
                        <motion.div
                          layoutId="stage-check"
                          className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                        >
                          <Check size={14} className="text-black" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
                {errors.projectStage && (
                  <p className="mt-2 text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle size={14} /> {errors.projectStage}
                  </p>
                )}
              </div>

              {/* Software Categories */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Software Categories
                </label>
                <div className="flex flex-wrap gap-2">
                  {SOFTWARE_CATEGORIES.map((cat) => {
                    const isSelected = form.softwareCategories.includes(cat);
                    return (
                      <motion.button
                        key={cat}
                        type="button"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleCategory(cat)}
                        className={clsx(
                          "px-4 py-2.5 rounded-full text-sm font-semibold border transition-all",
                          isSelected
                            ? "bg-black text-white border-black shadow-md shadow-black/10"
                            : "bg-white text-gray-700 border-gray-200 hover:border-gray-400"
                        )}
                      >
                        {isSelected && (
                          <Check size={14} className="inline mr-1.5 -mt-0.5" />
                        )}
                        {cat}
                      </motion.button>
                    );
                  })}
                </div>
                {errors.softwareCategories && (
                  <p className="mt-2 text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle size={14} /> {errors.softwareCategories}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* ───────── STEP 2: Priority & Summary ───────── */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-6 flex-1"
            >
              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Priority Level
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(
                    [
                      { value: "low", emoji: "🟢", color: "bg-emerald-50 border-emerald-200" },
                      { value: "medium", emoji: "🟡", color: "bg-amber-50 border-amber-200" },
                      { value: "high", emoji: "🔴", color: "bg-red-50 border-red-200" },
                    ] as const
                  ).map((p) => (
                    <motion.button
                      key={p.value}
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateField("priority", p.value)}
                      className={clsx(
                        "h-24 rounded-2xl border-2 flex flex-col items-center justify-center transition-all",
                        form.priority === p.value
                          ? "border-black bg-black text-white shadow-lg shadow-black/20"
                          : `${p.color} text-gray-700`
                      )}
                    >
                      <span className="text-2xl mb-1">{p.emoji}</span>
                      <span className="capitalize font-bold text-sm">
                        {p.value}
                      </span>
                    </motion.button>
                  ))}
                </div>
                {errors.priority && (
                  <p className="mt-2 text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle size={14} /> {errors.priority}
                  </p>
                )}
              </div>

              {/* Summary */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Summary
                </label>
                <textarea
                  value={form.summary}
                  onChange={(e) => updateField("summary", e.target.value)}
                  rows={4}
                  className={clsx(
                    "w-full px-4 py-3 rounded-xl bg-white border focus:ring-2 focus:ring-black outline-none transition-all resize-none",
                    errors.summary
                      ? "border-red-500 ring-red-100"
                      : "border-gray-200 focus:border-black"
                  )}
                  placeholder="Briefly describe your project, goals, and any specific requirements..."
                />
                {errors.summary && (
                  <p className="mt-1 text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle size={14} /> {errors.summary}
                  </p>
                )}
              </div>

              {/* ── Upload Resources ── */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Resources
                </label>
                {/* Drop zone */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    handleMockFileSelect();
                  }}
                  onClick={() => handleMockFileSelect()}
                  className={clsx(
                    "relative border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all",
                    isDragging
                      ? "border-black bg-gray-50"
                      : "border-gray-300 hover:border-gray-400 bg-white"
                  )}
                >
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    <Upload size={22} className="text-gray-500" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-gray-700">
                      Drag & drop or{" "}
                      <span className="text-black underline">browse files</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PDFs & Photos accepted · Max size 100MB per file
                    </p>
                  </div>
                  <div className="flex gap-2 mt-1">
                    <span className="px-2.5 py-1 rounded-lg bg-red-50 text-red-600 text-xs font-medium flex items-center gap-1">
                      <FileText size={12} /> PDF
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 text-xs font-medium flex items-center gap-1">
                      <Image size={12} /> Photos
                    </span>
                  </div>
                </div>

                {/* Uploaded files list */}
                {form.uploadedFiles.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {form.uploadedFiles.map((file, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200"
                      >
                        <div
                          className={clsx(
                            "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
                            file.type === "pdf"
                              ? "bg-red-100 text-red-600"
                              : "bg-blue-100 text-blue-600"
                          )}
                        >
                          {file.type === "pdf" ? (
                            <FileText size={18} />
                          ) : (
                            <Image size={18} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-400">{file.size}</p>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(index);
                          }}
                          className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 hover:bg-red-100 hover:text-red-500 transition-colors shrink-0"
                        >
                          <X size={14} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ───────── STEP 3: Contact Info ───────── */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-6 flex-1"
            >
              {/* Client Type selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  You are
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      value: "individual" as ClientType,
                      label: "Individual",
                      icon: <User size={28} />,
                    },
                    {
                      value: "organisation" as ClientType,
                      label: "Organisation",
                      icon: <Building2 size={28} />,
                    },
                  ].map((opt) => (
                    <motion.button
                      key={opt.value}
                      type="button"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => updateField("clientType", opt.value)}
                      className={clsx(
                        "relative p-5 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all",
                        form.clientType === opt.value
                          ? "border-black bg-black text-white shadow-lg shadow-black/20"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      )}
                    >
                      {opt.icon}
                      <span className="font-bold">{opt.label}</span>
                      {form.clientType === opt.value && (
                        <motion.div
                          layoutId="client-check"
                          className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                        >
                          <Check size={14} className="text-black" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
                {errors.clientType && (
                  <p className="mt-2 text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle size={14} /> {errors.clientType}
                  </p>
                )}
              </div>

              {/* ── Individual Form ── */}
              <AnimatePresence mode="wait">
                {form.clientType === "individual" && (
                  <motion.div
                    key="individual"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 overflow-hidden"
                  >
                    <InputField label="Full Name" value={form.fullName} onChange={(v) => updateField("fullName", v)} placeholder="John Doe" error={errors.fullName} />
                    <InputField label="Phone Number" value={form.phoneNumber} onChange={(v) => updateField("phoneNumber", v)} placeholder="+91 98765 43210" type="tel" error={errors.phoneNumber} />
                    <InputField label="Email ID" value={form.emailId} onChange={(v) => updateField("emailId", v)} placeholder="john@email.com" type="email" error={errors.emailId} />
                    <InputField label="Address" value={form.address} onChange={(v) => updateField("address", v)} placeholder="123 Main Street" error={errors.address} />
                    <div className="grid grid-cols-2 gap-3">
                      <InputField label="State" value={form.state} onChange={(v) => updateField("state", v)} placeholder="State" error={errors.state} />
                      <InputField label="Pincode" value={form.pincode} onChange={(v) => updateField("pincode", v)} placeholder="560001" error={errors.pincode} />
                    </div>

                    {/* Preferred Communication */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Communication
                      </label>
                      <div className="flex gap-2">
                        {([
                          { value: "call" as CommunicationPref, label: "Call", icon: <Phone size={18} /> },
                          { value: "gmeet" as CommunicationPref, label: "GMeet", icon: <Video size={18} /> },
                          { value: "offline" as CommunicationPref, label: "Offline", icon: <MapPin size={18} /> },
                        ]).map((c) => (
                          <motion.button
                            key={c.value}
                            type="button"
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateField("preferredCommunication", c.value)}
                            className={clsx(
                              "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-sm font-semibold transition-all",
                              form.preferredCommunication === c.value
                                ? "border-black bg-black text-white shadow-md"
                                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                            )}
                          >
                            {c.icon}
                            {c.label}
                          </motion.button>
                        ))}
                      </div>
                      {errors.preferredCommunication && (
                        <p className="mt-1 text-red-500 text-sm flex items-center gap-1">
                          <AlertCircle size={14} /> {errors.preferredCommunication}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* ── Organisation Form ── */}
                {form.clientType === "organisation" && (
                  <motion.div
                    key="organisation"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 overflow-hidden"
                  >
                    <InputField label="Organization Name" value={form.organizationName} onChange={(v) => updateField("organizationName", v)} placeholder="Acme Corp" error={errors.organizationName} />
                    <InputField label="Contact Person" value={form.contactPerson} onChange={(v) => updateField("contactPerson", v)} placeholder="Jane Smith" error={errors.contactPerson} />
                    <InputField label="Contact Number" value={form.contactNumber} onChange={(v) => updateField("contactNumber", v)} placeholder="+91 98765 43210" type="tel" error={errors.contactNumber} />
                    <InputField label="Email ID" value={form.orgEmailId} onChange={(v) => updateField("orgEmailId", v)} placeholder="contact@acme.com" type="email" error={errors.orgEmailId} />
                    <InputField label="Organization Address" value={form.organizationAddress} onChange={(v) => updateField("organizationAddress", v)} placeholder="456 Business Park" error={errors.organizationAddress} />
                    <div className="grid grid-cols-2 gap-3">
                      <InputField label="State" value={form.orgState} onChange={(v) => updateField("orgState", v)} placeholder="State" error={errors.orgState} />
                      <InputField label="Pincode" value={form.orgPincode} onChange={(v) => updateField("orgPincode", v)} placeholder="560001" error={errors.orgPincode} />
                    </div>

                    {/* Preferred Communication */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Communication
                      </label>
                      <div className="flex gap-2">
                        {([
                          { value: "call" as CommunicationPref, label: "Call", icon: <Phone size={18} /> },
                          { value: "gmeet" as CommunicationPref, label: "GMeet", icon: <Video size={18} /> },
                          { value: "offline" as CommunicationPref, label: "Offline", icon: <MapPin size={18} /> },
                        ]).map((c) => (
                          <motion.button
                            key={c.value}
                            type="button"
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateField("orgPreferredCommunication", c.value)}
                            className={clsx(
                              "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 text-sm font-semibold transition-all",
                              form.orgPreferredCommunication === c.value
                                ? "border-black bg-black text-white shadow-md"
                                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                            )}
                          >
                            {c.icon}
                            {c.label}
                          </motion.button>
                        ))}
                      </div>
                      {errors.orgPreferredCommunication && (
                        <p className="mt-1 text-red-500 text-sm flex items-center gap-1">
                          <AlertCircle size={14} /> {errors.orgPreferredCommunication}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ───────── Navigation Buttons ───────── */}
        <div className="mt-8 flex gap-4">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="flex-1 py-4 rounded-xl bg-gray-100 text-gray-900 font-bold hover:bg-gray-200 transition-colors"
            >
              Back
            </button>
          )}
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex-1 py-4 rounded-xl bg-black text-white font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-black/20"
            >
              Next <ArrowRight size={20} />
            </button>
          ) : (
            <button
              type="button"
              onClick={onSubmit}
              disabled={isSubmitting}
              className="flex-1 py-4 rounded-xl bg-black text-white font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-black/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Submit Request <Check size={20} />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
