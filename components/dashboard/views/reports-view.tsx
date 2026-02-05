// components/dashboard/views/reports-view.tsx
import { FileText, Download, Clock, ShieldCheck, Mail } from "lucide-react";

export function ReportsView() {
  const reports = [
    {
      title: "Reporte mensual de sostenibilidad",
      date: "Dic 2025",
      type: "PDF",
      status: "Procesando",
      url: "/pdf/pdf-test.pdf",
    },
    {
      title: "Informe de huella de carbono mensual",
      date: "Anual 2025",
      type: "PDF",
      status: "Procesando",
    },
    {
      title: "Informes Anuales",
      date: "Trimestre 4",
      type: "XLSX",
      status: "Procesando",
      url: "/pdf/pdf-test.pdf",
    },
  ];

  const handleDownload = (url: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#2a2c38]">Informes y Certificados</h2>

      <div className="grid grid-cols-1 gap-4">
        {reports.map((report, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center justify-between hover:border-[#9dd187] transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-50 rounded-xl text-[#2a2c38] group-hover:bg-[#9dd187]/10 group-hover:text-[#9dd187] transition-colors">
                <FileText size={24} />
              </div>
              <div>
                <h4 className="font-bold text-[#2a2c38]">{report.title}</h4>
                <p className="text-xs text-gray-500">
                  {report.date} • {report.type}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {report.status === "Disponible" ? (
                <button
                  onClick={() =>
                    report.url &&
                    handleDownload(report.url, `${report.title}.${report.type.toLowerCase()}`)
                  }
                  className="flex items-center gap-2 text-sm font-bold bg-[#9dd187] text-[#2a2c38] px-4 py-2 rounded-lg hover:shadow-md transition-all"
                >
                  <Download size={16} /> Descargar
                </button>
              ) : (
                <span className="flex items-center gap-2 text-xs text-orange-500 font-semibold bg-orange-50 px-3 py-1.5 rounded-full">
                  <Clock size={14} /> {report.status}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Audit Services Info */}
      <div className="bg-[#2a2c38] p-8 rounded-4xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl text-white mt-4">
        <div className="relative z-10">
          <div className="flex items-center gap-3 text-[#9dd187] mb-2">
            <ShieldCheck size={28} />
            <h3 className="text-xl font-bold">Servicios de auditoría y certificación</h3>
          </div>
          <p className="text-gray-400 font-medium ml-1">Disponibles bajo consulta.</p>
        </div>

        <a
          href="mailto:contactosharetogo@gmail.com"
          className="relative z-10 flex items-center gap-2 bg-[#9dd187] text-[#2a2c38] px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-lg shadow-[#9dd187]/20 whitespace-nowrap"
        >
          <Mail size={20} />
          Contacta con nosotros
        </a>

        <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none rotate-12">
          <ShieldCheck size={200} />
        </div>
      </div>
    </div>
  );
}
