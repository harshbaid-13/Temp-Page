import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Check, AlertCircle } from "lucide-react";
import clsx from "clsx";
import { useNavigate } from "react-router";

type FormData = {
  projectName: string;
  projectType: string;
  description: string;
  priority: "low" | "medium" | "high";
  budget: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
};

const steps = [
  { id: 1, title: "Project Info" },
  { id: 2, title: "Details" },
  { id: 3, title: "Client Info" },
];

export function RaiseRequest() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
  });

  const nextStep = async () => {
    let isValid = false;
    if (currentStep === 1) {
      isValid = await trigger(["projectName", "projectType", "description"]);
    } else if (currentStep === 2) {
      isValid = await trigger(["priority", "budget"]);
    }
    
    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate API
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(data);
    setIsSubmitting(false);
    navigate("/app/track");
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 pb-32 flex flex-col">
      <header className="mb-8">
        <button onClick={() => navigate(-1)} className="mb-4 p-2 -ml-2 text-gray-400 hover:text-gray-900">
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

      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-6 flex-1"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                <input
                  {...register("projectName", { required: "Project name is required" })}
                  className={clsx(
                    "w-full px-4 py-3 rounded-xl bg-white border focus:ring-2 focus:ring-black outline-none transition-all",
                    errors.projectName ? "border-red-500 ring-red-100" : "border-gray-200 focus:border-black"
                  )}
                  placeholder="e.g. Mobile App Redesign"
                />
                {errors.projectName && (
                  <p className="mt-1 text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle size={14} /> {errors.projectName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
                <select
                  {...register("projectType", { required: "Please select a type" })}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-black focus:ring-2 focus:ring-black outline-none appearance-none"
                >
                  <option value="">Select type...</option>
                  <option value="web">Web Development</option>
                  <option value="mobile">Mobile App</option>
                  <option value="design">UI/UX Design</option>
                  <option value="consulting">Consulting</option>
                </select>
                {errors.projectType && (
                    <p className="mt-1 text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle size={14} /> {errors.projectType.message}
                    </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  {...register("description", { required: "Description is required" })}
                  rows={4}
                  className={clsx(
                    "w-full px-4 py-3 rounded-xl bg-white border focus:ring-2 focus:ring-black outline-none transition-all resize-none",
                    errors.description ? "border-red-500 ring-red-100" : "border-gray-200 focus:border-black"
                  )}
                  placeholder="Briefly describe your requirements..."
                />
                {errors.description && (
                  <p className="mt-1 text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle size={14} /> {errors.description.message}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-6 flex-1"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Priority Level</label>
                <div className="grid grid-cols-3 gap-3">
                  {["low", "medium", "high"].map((p) => (
                    <label key={p} className="cursor-pointer">
                      <input
                        type="radio"
                        value={p}
                        {...register("priority", { required: "Select priority" })}
                        className="peer sr-only"
                      />
                      <div className="h-24 rounded-2xl border-2 border-gray-200 bg-white peer-checked:border-black peer-checked:bg-black peer-checked:text-white flex flex-col items-center justify-center transition-all">
                        <span className="capitalize font-bold text-lg">{p}</span>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.priority && (
                    <p className="mt-1 text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle size={14} /> {errors.priority.message}
                    </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Budget</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                  <input
                    type="number"
                    {...register("budget", { required: "Budget is required" })}
                    className={clsx(
                        "w-full pl-8 pr-4 py-3 rounded-xl bg-white border focus:ring-2 focus:ring-black outline-none transition-all",
                        errors.budget ? "border-red-500 ring-red-100" : "border-gray-200 focus:border-black"
                      )}
                    placeholder="5000"
                  />
                </div>
                {errors.budget && (
                    <p className="mt-1 text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle size={14} /> {errors.budget.message}
                    </p>
                )}
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="space-y-6 flex-1"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  {...register("clientName", { required: "Name is required" })}
                  className={clsx(
                    "w-full px-4 py-3 rounded-xl bg-white border focus:ring-2 focus:ring-black outline-none transition-all",
                    errors.clientName ? "border-red-500 ring-red-100" : "border-gray-200 focus:border-black"
                  )}
                  placeholder="John Doe"
                />
                 {errors.clientName && (
                    <p className="mt-1 text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle size={14} /> {errors.clientName.message}
                    </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  {...register("clientEmail", { 
                    required: "Email is required",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                    }
                  })}
                  className={clsx(
                    "w-full px-4 py-3 rounded-xl bg-white border focus:ring-2 focus:ring-black outline-none transition-all",
                    errors.clientEmail ? "border-red-500 ring-red-100" : "border-gray-200 focus:border-black"
                  )}
                  placeholder="john@company.com"
                />
                 {errors.clientEmail && (
                    <p className="mt-1 text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle size={14} /> {errors.clientEmail.message}
                    </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  {...register("clientPhone", { required: "Phone is required" })}
                  className={clsx(
                    "w-full px-4 py-3 rounded-xl bg-white border focus:ring-2 focus:ring-black outline-none transition-all",
                    errors.clientPhone ? "border-red-500 ring-red-100" : "border-gray-200 focus:border-black"
                  )}
                  placeholder="+1 (555) 000-0000"
                />
                 {errors.clientPhone && (
                    <p className="mt-1 text-red-500 text-sm flex items-center gap-1">
                        <AlertCircle size={14} /> {errors.clientPhone.message}
                    </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
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
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-4 rounded-xl bg-black text-white font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-black/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Submit Request <Check size={20} /></>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
