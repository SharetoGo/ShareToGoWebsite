// components/dashboard/widgets/linkedin-hub.tsx
"use client";

import { Share2, Sparkles, ArrowRight, Linkedin, Instagram, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

export function LinkedInHub({ data, onViewContent }: { data: any , onViewContent: () => void; }) {
  const router = useRouter();

  return (
    <div className="bg-white text-[#2a2c38] p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all flex flex-col h-full">
      {/* Background decoration */}
      <div className="absolute -top-12 -right-12 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity text-[#2a2c38]">
        <Share2 size={200} className="rotate-12" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#9dd187]/10 rounded-xl">
              <Sparkles size={20} className="text-[#5A9642]" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
              Content Studio
            </span>
          </div>
          <div className="flex -space-x-2">
            {[Linkedin, Instagram, Mail].map((Icon, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-gray-50 border-2 border-white flex items-center justify-center text-gray-400">
                <Icon size={12} />
              </div>
            ))}
          </div>
        </div>

        {/* Title */}
        <div className="mb-6">
          <h4 className="text-2xl font-black text-[#2a2c38] leading-tight mb-2">
            Impulsa tu marca <span className="text-[#9dd187]">ESG</span>
          </h4>
          <p className="text-sm text-gray-500 leading-relaxed font-medium">
            Generamos automáticamente copys y creatividades basadas en tus métricas reales de ahorro de CO₂ para tus redes sociales.
          </p>
        </div>
        
        <div className="mt-auto pt-4">
          <button 
            onClick={() => router.push("/intranet-empresas/contenido-sostenible")}
            className="w-full bg-[#2a2c38] text-white font-black py-4 px-6 rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-3 group/btn shadow-lg shadow-gray-200"
          >
            <span className="text-xs uppercase tracking-widest">Explorar Biblioteca</span>
            <ArrowRight 
              size={16} 
              className="text-[#9dd187] group-hover/btn:translate-x-1 transition-transform" 
            />
          </button>
        </div>
      </div>
    </div>
  );
}
