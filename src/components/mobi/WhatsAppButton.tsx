import { Phone } from "lucide-react";
import { useState, useEffect } from "react";

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const phoneNumber = "5541997539084";
  const message = encodeURIComponent(
    "Olá! Gostaria de saber mais sobre os serviços da Rorschach Motion."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 left-6 z-50 group transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      aria-label="Fale conosco pelo WhatsApp"
    >
      {/* Button - Pill shape */}
      <div className="relative flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 shadow-lg group-hover:scale-105 group-hover:shadow-xl transition-all duration-300">
        <Phone className="text-white" size={20} />
        <span className="text-white font-medium text-sm hidden sm:inline">WhatsApp</span>
      </div>
    </a>
  );
};

export default WhatsAppButton;
