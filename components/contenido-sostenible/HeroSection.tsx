import { motion } from "framer-motion";
import { ArrowLeft, Sparkle } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_SPRING: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

export function HeroSection({ t }: { t: any }) {
  return (
    <section className="relative pt-24 pb-20 bg-[#1a1c24] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: EASE_OUT }}
        className="absolute top-0 right-0 w-1/2 h-full skew-x-12 transform translate-x-32"
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Link
            href="/espacio-empresas"
            className="inline-flex items-center text-[#9dd187] mb-12 hover:-translate-x-2 transition-all"
          >
            <ArrowLeft size={20} className="mr-2" /> {t("back_to_empresas")}
          </Link>
        </motion.div>

        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_SPRING }}
          >
            <Badge className="bg-[#9dd187] text-[#1a1c24] mb-6 px-4 py-1 font-bold text-sm">
              <Sparkle size={16} className="inline-block mr-1" />
              {t("consultancy_page_badge")}
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-8 leading-tight"
          >
            {t("consultancy_full_title")}
          </motion.h1>
        </div>
      </div>
    </section>
  );
}
