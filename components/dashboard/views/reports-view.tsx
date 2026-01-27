// components/dashboard/views/reports-view.tsx
import { FileText, Download, Clock } from "lucide-react";

export function ReportsView() {
  const reports = [
    { title: "Reporte Mensual ESG", date: "Dic 2025", type: "PDF", status: "Disponible", url: "/pdf/pdf-test.pdf" },
    { title: "Certificado de Huella de Carbono", date: "Anual 2025", type: "PDF", status: "Procesando" },
    { title: "Detalle de Subvenciones", date: "Trimestre 4", type: "XLSX", status: "Disponible", url: "/pdf/pdf-test.pdf" },
  ];

  const handleDownload = (url: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#2a2c38]">Informes y Certificados</h2>
      
      <div className="grid grid-cols-1 gap-4">
        {reports.map((report, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center justify-between hover:border-[#9dd187] transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-50 rounded-xl text-[#2a2c38] group-hover:bg-[#9dd187]/10 group-hover:text-[#9dd187] transition-colors">
                <FileText size={24} />
              </div>
              <div>
                <h4 className="font-bold text-[#2a2c38]">{report.title}</h4>
                <p className="text-xs text-gray-500">{report.date} • {report.type}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {report.status === "Disponible" ? (
                <button 
                  onClick={() => report.url && handleDownload(report.url, `${report.title}.${report.type.toLowerCase()}`)}
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
    </div>
  );
}