// components/dashboard/charts/peak-usage-heatmap.tsx
export function PeakUsageHeatmap() {
  const hours = ["08h", "09h", "14h", "15h", "18h", "19h"];
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
      <h4 className="font-bold text-[#2a2c38] mb-4">Picos de Uso (Horas)</h4>
      <div className="flex items-end justify-between h-32 gap-2">
        {[40, 90, 30, 45, 100, 60].map((height, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <div 
              className="w-full bg-[#f8fafc] rounded-lg relative overflow-hidden group hover:bg-[#9dd187]/20 transition-colors"
              style={{ height: '100%' }}
            >
              <div 
                className="absolute bottom-0 w-full bg-[#9dd187] opacity-60 rounded-t-lg transition-all"
                style={{ height: `${height}%` }}
              />
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase">{hours[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}