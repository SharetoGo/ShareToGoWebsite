// components/dashboard/widgets/compliance-tracker.tsx

import { ShieldCheck } from "lucide-react";

export function ComplianceTracker() {
  const goals = [
    { name: "Ley de Movilidad Sostenible", progress: 85 },
    { name: "Reporte No Financiero", progress: 40 },
  ];

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-2 mb-6 text-[#2a2c38]">
        <ShieldCheck className="text-[#9dd187]" />
        <h4 className="font-bold">Estado de Cumplimiento</h4>
      </div>
      <div className="space-y-6">
        {goals.map((goal, i) => (
          <div key={i}>
            <div className="flex justify-between text-xs font-bold mb-2 uppercase text-gray-400">
              <span>{goal.name}</span>
              <span>{goal.progress}%</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#9dd187] rounded-full transition-all duration-1000"
                style={{ width: `${goal.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
