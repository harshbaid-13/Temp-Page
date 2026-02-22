import { motion } from "motion/react";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";

export function Contact() {
  const ContactButton = ({ 
    icon: Icon, 
    label, 
    value, 
    action, 
    color, 
    delay = 0 
  }: { 
    icon: any; 
    label: string; 
    value: string; 
    action: string; 
    color: string; 
    delay?: number; 
  }) => (
    <motion.a
      href={action}
      target={action.startsWith("http") ? "_blank" : "_self"}
      rel={action.startsWith("http") ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ delay }}
      className={`flex items-center gap-4 p-6 rounded-3xl mb-4 shadow-sm border ${color} cursor-pointer hover:shadow-md transition-shadow`}
    >
      <div className={`p-4 rounded-2xl ${color.replace("border-", "bg-").replace("200", "100")}`}>
        <Icon size={24} className="text-gray-900" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
        <p className="text-lg font-bold text-gray-900">{value}</p>
      </div>
    </motion.a>
  );

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 pb-32">
      <header className="mb-8 pt-6">
        <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
        <p className="text-gray-500">We're here to help</p>
      </header>

      <div className="space-y-2">
        <ContactButton
          icon={Phone}
          label="Call Us"
          value="+1 (555) 123-4567"
          action="tel:+15551234567"
          color="border-blue-200 bg-blue-50"
        />
        <ContactButton
          icon={Mail}
          label="Email Us"
          value="hello@techhub.com"
          action="mailto:hello@techhub.com"
          color="border-purple-200 bg-purple-50"
          delay={0.1}
        />
        <ContactButton
          icon={MessageCircle}
          label="WhatsApp"
          value="Chat with Support"
          action="https://wa.me/15551234567"
          color="border-green-200 bg-green-50"
          delay={0.2}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 p-6 bg-black text-white rounded-3xl shadow-xl shadow-black/10"
      >
        <div className="flex items-center gap-3 mb-4">
            <MapPin className="text-white/80" />
            <h3 className="font-bold text-lg">Visit Our Office</h3>
        </div>
        <p className="text-gray-400 mb-4">
            123 Innovation Drive<br/>
            Tech Valley, CA 94043
        </p>
        <div className="h-32 w-full bg-gray-800 rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-gray-500 text-sm">
                [Map View Placeholder]
            </div>
        </div>
      </motion.div>
    </div>
  );
}
