import { Share2, TrendingUp } from "lucide-react";

export function LinkedInHub({ data }: { data: any }) {
  return (
    <div className="bg-[#9dd187] text-[#2a2c38] p-6 rounded-3xl shadow-sm relative overflow-hidden group">
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Share2 size={20} className="text-[#2a2c38]" />
          <span className="font-bold text-sm tracking-widest uppercase">LinkedIn Hub</span>
        </div>
        <h4 className="text-xl font-bold mb-2">Presume de impacto</h4>
        <p className="text-[#2a2c38] text-sm mb-6">Genera un post automático con los {data.totalCo2?.toFixed(0)}kg de CO2e evitados.</p>
        <button className="w-full bg-white text-[#2a2c38] font-bold py-3 rounded-xl hover:bg-[#2a2c38] hover:text-white transition-all">
          Preparar publicación
        </button>
      </div>
      <div className="absolute -bottom-4 -right-4 opacity-10 group-hover:scale-110 transition-transform">
        <TrendingUp size={120} />
      </div>
    </div>
  );
}