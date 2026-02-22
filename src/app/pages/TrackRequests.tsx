import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Check, Clock, AlertCircle, ChevronDown, ChevronUp, Calendar } from "lucide-react";
import clsx from "clsx";

type RequestStatus = "Pending" | "Accepted" | "In Progress" | "Completed";

interface Request {
  id: string;
  title: string;
  date: string;
  status: RequestStatus;
  cost: string;
  duration: string;
  timeline: {
    state: string;
    date: string;
    completed: boolean;
  }[];
}

const requests: Request[] = [
  {
    id: "REQ-001",
    title: "Mobile App Redesign",
    date: "Feb 20, 2026",
    status: "In Progress",
    cost: "$8,500",
    duration: "4 Weeks",
    timeline: [
      { state: "Request Received", date: "Feb 20", completed: true },
      { state: "Proposal Accepted", date: "Feb 21", completed: true },
      { state: "In Progress", date: "Feb 22", completed: true },
      { state: "Quality Assurance", date: "Pending", completed: false },
      { state: "Final Delivery", date: "Est. Mar 20", completed: false },
    ],
  },
  {
    id: "REQ-002",
    title: "Corporate Website",
    date: "Jan 15, 2026",
    status: "Completed",
    cost: "$4,200",
    duration: "2 Weeks",
    timeline: [
      { state: "Request Received", date: "Jan 15", completed: true },
      { state: "Proposal Accepted", date: "Jan 16", completed: true },
      { state: "In Progress", date: "Jan 18", completed: true },
      { state: "Quality Assurance", date: "Jan 28", completed: true },
      { state: "Final Delivery", date: "Jan 30", completed: true },
    ],
  },
  {
    id: "REQ-003",
    title: "CRM Integration",
    date: "Feb 22, 2026",
    status: "Pending",
    cost: "Pending",
    duration: "TBD",
    timeline: [
      { state: "Request Received", date: "Feb 22", completed: true },
      { state: "Reviewing", date: "Today", completed: false },
      { state: "Proposal Sent", date: "Pending", completed: false },
    ],
  },
];

const statusColors = {
  "Pending": "bg-yellow-100 text-yellow-700 border-yellow-200",
  "Accepted": "bg-blue-100 text-blue-700 border-blue-200",
  "In Progress": "bg-purple-100 text-purple-700 border-purple-200",
  "Completed": "bg-green-100 text-green-700 border-green-200",
};

export function TrackRequests() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 pb-32">
      <header className="mb-8 pt-6">
        <h1 className="text-3xl font-bold text-gray-900">Track Requests</h1>
        <p className="text-gray-500">Monitor your project status</p>
      </header>

      <div className="space-y-4">
        {requests.map((req) => (
          <motion.div
            key={req.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 overflow-hidden"
          >
            <div 
              className="flex justify-between items-start cursor-pointer"
              onClick={() => setExpandedId(expandedId === req.id ? null : req.id)}
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={clsx("text-xs font-bold px-2 py-1 rounded-full border", statusColors[req.status])}>
                    {req.status}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">#{req.id}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900">{req.title}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {req.date}</span>
                </div>
              </div>
              <div className="p-2 bg-gray-50 rounded-full text-gray-400">
                {expandedId === req.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>

            <AnimatePresence>
              {expandedId === req.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 border-t border-gray-100 pt-6"
                >
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <p className="text-xs text-gray-500 mb-1">Est. Cost</p>
                      <p className="font-bold text-gray-900">{req.cost}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <p className="text-xs text-gray-500 mb-1">Duration</p>
                      <p className="font-bold text-gray-900">{req.duration}</p>
                    </div>
                  </div>

                  <div className="relative pl-4 space-y-6 before:absolute before:left-[21px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                    {req.timeline.map((step, idx) => (
                      <div key={idx} className="relative flex items-start gap-4">
                        <div className={clsx(
                          "relative z-10 w-4 h-4 rounded-full border-2 mt-1 bg-white transition-colors duration-300",
                          step.completed ? "border-green-500 bg-green-500" : "border-gray-200"
                        )}>
                            {step.completed && <Check size={10} className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
                        </div>
                        <div>
                          <p className={clsx("font-bold text-sm", step.completed ? "text-gray-900" : "text-gray-400")}>
                            {step.state}
                          </p>
                          <p className="text-xs text-gray-400">{step.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
