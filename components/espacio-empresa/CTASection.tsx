import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { containerVariants, fadeSlideUp } from "@/utils/animations";


const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_SPRING: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

export function CTASection({ t }: { t: any }) {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, ease: EASE_OUT }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-[#1a1c24] rounded-[3rem] p-8 md:p-20"
        >
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, ease: EASE_OUT }}
            viewport={{ once: true }}
            className="absolute top-0 right-0 w-1/3 h-full skew-x-12 transform translate-x-20 pointer-events-none"
          />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#9dd187]/5 rounded-full blur-3xl pointer-events-none" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true }}
            className="relative z-10 grid lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeSlideUp}>
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.7 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.5, ease: EASE_SPRING },
                  },
                }}
              >
                <Badge className="bg-[#9dd187] text-[#1a1c24] mb-6 px-4 py-1 font-bold">
                  {t("cta_contact_badge") || "Hablemos de movilidad"}
                </Badge>
              </motion.div>
              <motion.h2
                variants={fadeSlideUp}
                className="text-4xl md:text-2xl font-bold text-white mb-6 leading-tight"
              >
                {t("cta_contact_title") ||
                  "¿Listo para transformar la movilidad de tu empresa?"}
              </motion.h2>
            </motion.div>
            <motion.div
              variants={fadeSlideUp}
              className="flex flex-col sm:flex-row gap-4 lg:justify-end"
            >
              <Link href="/contacto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-[#9dd187] text-[#1a1c24] hover:bg-[#8bc475] font-bold py-7 px-10 rounded-2xl text-lg"
                >
                  {t("cta_contact_button") || "Contactar ahora"}
                </Button>
              </Link>
              <Link href="/contratar">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white/20 text-white bg-transparent hover:bg-white/10 font-bold py-7 px-10 rounded-2xl text-lg"
                >
                  {t("cta_demo_button") || "Solicitar Demo"}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
