export const StatCard = ({ label, value, icon: Icon, description }: any) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <div className="p-2 bg-[#9dd187]/20 rounded-lg">
        <Icon className="w-6 h-6 text-[#2a2c38]" />
      </div>
      <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
        +12% vs last month
      </span>
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <h3 className="text-2xl font-bold text-[#2a2c38]">{value}</h3>
      {description && <p className="text-xs text-gray-400 mt-1">{description}</p>}
    </div>
  </div>
);