import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { scaleIn, containerVariants, fadeSlideUp } from "@/utils/animations";
import { LucideIcon } from "lucide-react";

const SectionHeader = ({
  badge,
  title,
  sub,
  className = "",
  icon: Icon,
}: {
  badge: string;
  title: string;
  sub?: string;
  className?: string;
  icon?: LucideIcon;
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-60px" }}
    variants={containerVariants}
    className={`text-center max-w-3xl mx-auto mb-16 ${className}`}
  >
    <motion.div variants={scaleIn}>
      <Badge
        variant="outline"
        className="bg-[#9dd187]/10 text-[#4d7c41] border-[#9dd187]/20 pl-3 pr-4 py-1.5 mb-6 rounded-full text-sm font-semibold tracking-wide uppercase flex w-fit mx-auto items-center gap-2 shadow-sm"
      >
        {Icon && <Icon className="w-4 h-4" />}
        {badge}
      </Badge>
    </motion.div>
    <motion.h2
      variants={fadeSlideUp}
      className="text-3xl md:text-5xl font-bold text-[#1a1c24] tracking-tight mb-6 leading-tight"
    >
      {title}
    </motion.h2>
    {sub && (
      <motion.p variants={fadeSlideUp} className="text-gray-500 text-lg leading-relaxed">
        {sub}
      </motion.p>
    )}
  </motion.div>
);

export default SectionHeader;