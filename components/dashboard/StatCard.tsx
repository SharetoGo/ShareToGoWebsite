// components/dashboard/StatCard.tsx
import { LucideIcon, HelpCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  helpText?: string;
}

export const StatCard = ({ label, value, icon: Icon, description, helpText }: StatCardProps) => (
  <Card className="hover:shadow-lg transition-all duration-300 border border-gray-100 rounded-2xl bg-white shadow-sm overflow-hidden group">
    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
      <div className="flex items-center gap-1.5">
        <CardTitle className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          {label}
        </CardTitle>
        {helpText && (
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-3.5 h-3.5 text-gray-300 hover:text-gray-500 transition-colors" />
              </TooltipTrigger>
              <TooltipContent className="bg-zinc-900 text-white border-none p-2 text-[10px] max-w-50">
                {helpText}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className="p-2 bg-gray-50 group-hover:bg-[#9dd187]/10 border border-gray-100 rounded-xl transition-colors">
        <Icon className="w-5 h-5 text-[#2a2c38] group-hover:text-[#5A9642]" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-black text-[#2a2c38] tracking-tight">
        {value}
      </div>
      {description && (
        <CardDescription className="text-[11px] text-gray-400 mt-1 font-medium italic">
          {description}
        </CardDescription>
      )}
    </CardContent>
  </Card>
);