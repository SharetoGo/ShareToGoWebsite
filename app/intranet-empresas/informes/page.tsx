"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/intranet-empresas/providers/AuthContext";
import { storage } from "@/lib/firebase";
import { ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";
import { 
  FileText, 
  Download, 
  Clock, 
  ShieldCheck, 
  Mail, 
  Loader2, 
  FileSearch 
} from "lucide-react";

interface FirebaseReport {
  title: string;
  date: string;
  type: string;
  url: string;
  fullPath: string;
  createdAt: number; // For sorting
}

export default function ReportsPage() {
  const { companyData } = useAuth();
  const [reports, setReports] = useState<FirebaseReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      if (!companyData?.id) return;

      try {
        setLoading(true);
        // Path: companies/{id}/informes
        const reportsRef = ref(storage, `companies/${companyData.id}/informes`);
        const result = await listAll(reportsRef);

        const fetchedReports = await Promise.all(
          result.items.map(async (item) => {
            const [url, metadata] = await Promise.all([
              getDownloadURL(item),
              getMetadata(item)
            ]);

            // Format the date (e.g., "Feb 2026") from file metadata
            const date = new Date(metadata.timeCreated).toLocaleDateString('es-ES', {
              month: 'short',
              year: 'numeric'
            });

            return {
              title: item.name.replace(/\.[^/.]+$/, ""), // Remove extension from title
              date: date.charAt(0).toUpperCase() + date.slice(1),
              type: metadata.contentType?.split('/')[1]?.toUpperCase() || "PDF",
              url: url,
              fullPath: item.fullPath,
              createdAt: new Date(metadata.timeCreated).getTime()
            };
          })
        );

        // Sort by most recent first
        setReports(fetchedReports.sort((a, b) => b.createdAt - a.createdAt));
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchReports();
  }, [companyData?.id]);

  const handleDownload = (url: string) => {
    // Opening in a new tab is the most reliable way for browser PDF viewers
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-[#2a2c38]">
            Informes y Certificados
          </h2>
          <p className="text-gray-500 font-medium italic">
            Documentación oficial y métricas de impacto.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border border-gray-100">
            <Loader2 className="w-10 h-10 animate-spin text-[#9dd187] mb-4" />
            <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Buscando documentos...</p>
          </div>
        ) : reports.length > 0 ? (
          reports.map((report, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-4xl border border-gray-100 flex flex-col md:flex-row md:items-center justify-between hover:border-[#9dd187] hover:shadow-xl hover:shadow-[#2a2c38]/5 transition-all group gap-4"
            >
              <div className="flex items-center gap-5">
                <div className="p-4 bg-gray-50 rounded-2xl text-[#2a2c38] group-hover:bg-[#9dd187]/10 group-hover:text-[#9dd187] transition-colors">
                  <FileText size={28} />
                </div>
                <div>
                  <h4 className="font-black text-[#2a2c38] text-lg">{report.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-black uppercase text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">
                      {report.type}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">
                      Publicado en {report.date}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDownload(report.url)}
                className="flex items-center justify-center gap-2 text-sm font-black bg-[#9dd187] text-[#2a2c38] px-8 py-4 rounded-2xl hover:scale-105 transition-all shadow-lg shadow-[#9dd187]/10"
              >
                <Download size={18} /> Descargar PDF
              </button>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-gray-50/50 rounded-[3rem] border-2 border-dashed border-gray-200">
            <FileSearch size={48} className="text-gray-300 mb-4" />
            <h3 className="text-gray-400 font-bold uppercase text-xs tracking-widest">No hay informes disponibles</h3>
            <p className="text-gray-400 text-sm mt-1">Los informes de {new Date().getFullYear()} aparecerán aquí una vez procesados.</p>
          </div>
        )}
      </div>

      {/* Audit Services Info */}
      <div className="bg-[#2a2c38] p-10 rounded-[3rem] relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl text-white mt-6">
        <div className="relative z-10 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-3 text-[#9dd187] mb-3">
            <ShieldCheck size={32} />
            <h3 className="text-2xl font-black">
              Auditoría y Certificación ESG
            </h3>
          </div>
          <p className="text-gray-400 font-medium max-w-xl">
            ¿Necesitas un certificado oficial de reducción de huella de carbono para tu auditoría anual? Nuestro equipo prepara informes personalizados bajo normativa ISO.
          </p>
        </div>

        <a
          href="mailto:contactosharetogo@gmail.com"
          className="relative z-10 flex items-center gap-3 bg-[#9dd187] text-[#2a2c38] px-10 py-5 rounded-2xl font-black uppercase text-sm hover:scale-105 transition-all shadow-lg shadow-[#9dd187]/20 whitespace-nowrap"
        >
          <Mail size={20} />
          Solicitar Auditoría
        </a>

        <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none rotate-12">
          <ShieldCheck size={250} />
        </div>
      </div>
    </div>
  );
}