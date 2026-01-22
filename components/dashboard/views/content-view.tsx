// components/dashboard/views/content-view.tsx
'use client'

import { useState } from "react";
import { useAuth } from "@/app/intranet-empresas/auth/AuthContext";
import { formatStats } from "@/lib/utils/format";
import { 
  Copy, CheckCircle, Share2, Mail, Linkedin, 
  FileText, TrendingUp, Trophy, ExternalLink 
} from "lucide-react";

export function ContentView() {
  const { companyData } = useAuth();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("linkedin");

  if (!companyData) return null;

  // --- LOGIC: DYNAMIC DATA CALCULATION ---
  const period = "Enero 2026";
  const co2 = companyData.totalCo2 || 0;
  const km = companyData.totalKm || 0;
  const trips = companyData.totalTrips || 0;
  const trees = Math.floor(co2 / 50); // Standard metric: ~50kg CO2 per tree per year
  const savings = km * 0.25; // Estimated €0.25/km

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // --- CONTENT GENERATION ---
  const linkedinContent = `🌱 ¡Orgullosos de nuestro impacto sostenible en ${period}!

En ${companyData.name} estamos transformando nuestra movilidad corporativa con SharetoGo:

🚗 ${trips.toLocaleString()} trayectos compartidos
📏 ${km.toLocaleString()} km ahorrados
🌍 ${co2.toLocaleString()} kg de CO2e evitados

Esto equivale a haber plantado ${trees} árboles 🌳. Juntos construimos un futuro más verde. 💚

#SustainableMobility #ESG #Sostenibilidad #SharetoGo`;

 // Blog Post
  const blogContent = `Nuestro Impacto Sostenible en ${period}

En SharetoGo, creemos que cada viaje compartido es un paso hacia un futuro más sostenible. Este mes, hemos alcanzado hitos extraordinarios que queremos celebrar con toda nuestra comunidad.

📊 Resultados Destacados

Trayectos Compartidos
Con ${trips.toLocaleString()} trayectos compartidos durante ${period}, hemos superado nuestras expectativas. Esto representa un crecimiento sostenido en la participación de nuestros empleados en iniciativas de movilidad sostenible.

Ahorro de Kilómetros
Hemos ahorrado un total de **${km.toLocaleString()} kilómetros**, lo que equivale a dar la vuelta al mundo más de una vez. Cada kilómetro no recorrido de forma individual es un paso hacia la reducción de nuestra huella de carbono.

Impacto Económico
El ahorro económico orientativo alcanzó los €${savings.toLocaleString()}, beneficiando directamente a nuestros empleados que optan por compartir sus desplazamientos diarios.

Reducción de Emisiones
Lo más importante: hemos evitado la emisión de ${co2.toLocaleString()} kg de CO2e a la atmósfera. Para ponerlo en perspectiva, esto es equivalente a plantar **${trees} árboles**.

🏆 Reconocimiento a Nuestros Líderes

Queremos destacar a nuestros Top Conductores del Mes, quienes han demostrado un compromiso excepcional:

<!-- Aquí iría la lista de los Top Carpoolers, si estuviera disponible en companyData -->

💚 Mirando Hacia el Futuro

Estos resultados son solo el comienzo. Seguiremos trabajando para mejorar nuestra plataforma y hacer que compartir trayectos sea aún más fácil y beneficioso para todos.

Gracias a cada uno de ustedes por ser parte de este cambio positivo.

---
SharetoGo - Juntos hacia una movilidad más sostenible`;

  const socialShort = `✨ Resultados ${period} - ${companyData.name} ✨

✅ ${trips.toLocaleString()} viajes compartidos
✅ ${co2.toLocaleString()} kg CO2e evitados 
✅ ${trees} árboles equivalentes 🌳

💚 ¡Gracias equipo por elegir moveros de forma sostenible! 

#SharetoGo #NetZero`;

  const tabs = [
    { id: "linkedin", label: "LinkedIn", icon: Linkedin, content: linkedinContent },
    { id: "newsletter", label: "Newsletter", icon: Mail, content: blogContent },
    { id: "blog", label: "Blog Post", icon: FileText, content: socialShort },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#2a2c38]">Contenido Sostenible</h1>
        <p className="text-gray-500">Transformamos tus datos en historias para compartir con el mundo.</p>
      </div>

      {/* Stats Summary Card */}
      <div className="bg-linear-to-br from-[#9dd187]/20 to-white p-8 rounded-3xl border border-[#9dd187]/20 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-[#9dd187] p-3 rounded-2xl shadow-lg shadow-[#9dd187]/20">
            <TrendingUp className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#2a2c38]">Métricas del Período</h3>
            <p className="text-sm text-gray-500">Datos consolidados para {period}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatMini label="CO2e Evitado" value={`${formatStats(co2)} kg`} sub={`${trees} Árboles`} />
          <StatMini label="Km Ahorrados" value={`${formatStats(km)} km`} sub="Trayectos compartidos" />
          <StatMini label="Viajes" value={trips} sub="Participación activa" />
          <StatMini label="Ahorro Est." value={`€${formatStats(savings)}`} sub="Impacto económico" />
        </div>
      </div>

      {/* Tabs / Content Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Tab Selection */}
        <div className="lg:col-span-4 space-y-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all border ${
                activeTab === tab.id 
                ? "bg-[#2a2c38] text-white border-[#2a2c38] shadow-xl" 
                : "bg-white text-gray-500 border-gray-100 hover:border-[#9dd187]"
              }`}
            >
              <tab.icon size={20} className={activeTab === tab.id ? "text-[#9dd187]" : ""} />
              <span className="font-bold">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Right: Content Preview */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Vista Previa</span>
              <div className="flex gap-2">
                 <button 
                  onClick={() => handleCopy(tabs.find(t => t.id === activeTab)?.content || "", activeTab)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#9dd187] text-[#2a2c38] rounded-xl font-bold text-sm hover:scale-105 transition-transform"
                >
                  {copiedId === activeTab ? <CheckCircle size={16} /> : <Copy size={16} />}
                  {copiedId === activeTab ? "¡Copiado!" : "Copiar texto"}
                </button>
              </div>
            </div>
            
            <div className="p-8 bg-[#f8fafc]">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-inner min-h-[200px]">
                <pre className="whitespace-pre-wrap font-sans text-[#2a2c38] text-sm leading-relaxed italic">
                  {tabs.find(t => t.id === activeTab)?.content}
                </pre>
              </div>
              <p className="mt-4 text-[10px] text-gray-400 text-center font-medium uppercase tracking-widest">
                💡 Tip: Acompaña este texto con una foto del equipo o tu logo para mayor impacto.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatMini({ label, value, sub }: { label: string, value: any, sub: string }) {
  return (
    <div>
      <p className="text-xs font-bold text-gray-400 uppercase mb-1 tracking-tight">{label}</p>
      <p className="text-2xl font-bold text-[#2a2c38]">{value}</p>
      <p className="text-[10px] font-bold text-[#9dd187] uppercase tracking-wide">{sub}</p>
    </div>
  );
}