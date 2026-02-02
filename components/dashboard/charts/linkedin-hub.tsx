// components/dashboard/widgets/linkedin-hub.tsx
"use client";

import { on } from "events";
import { Share2, Sparkles, FileText } from "lucide-react";
import { useRouter } from "next/navigation";

export function LinkedInHub({ data, onViewContent }: { data: any , onViewContent: () => void; }) {
  const router = useRouter();

  return (
    <div className="bg-gradient-to-br from-[#9dd187] to-[#8bc175] text-white p-6 rounded-3xl shadow-lg relative overflow-hidden group hover:shadow-xl transition-all">
      {/* Background decoration */}
      <div className="absolute -top-10 -right-10 opacity-10 group-hover:opacity-20 transition-opacity">
        <Share2 size={150} className="rotate-12" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Share2 size={18} className="text-white" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">
            Comunicación
          </span>
        </div>

        {/* Title */}
        <h4 className="text-xl font-bold mb-2 text-white">
          Comunicamos tu sostenibilidad
        </h4>
        
        <p className="text-sm font-semibold text-white/90 mb-1">
          Presume de impacto
        </p>

        <p className="text-sm text-white/80 mb-6 leading-relaxed">
          Genera contenido automático con todos tus datos de movilidad sostenible 
          gracias al coche compartido.
        </p>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button 
            onClick={() => onViewContent()}
            className="w-full bg-white text-[#5A9642] font-bold py-3 px-4 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            <Sparkles size={18} />
              Ver o generar contenido
          </button>
        </div>
      </div>
    </div>
  );
}

