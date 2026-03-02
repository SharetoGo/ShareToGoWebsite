import { motion } from "framer-motion";
import { Globe, Shield, Award, FileText, CheckCircle } from "lucide-react";
import { containerVariants, fadeSlideUp } from "@/utils/animations";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_SPRING: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

export function MethodologySection({ t }: { t: any }) {
    return (
        <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: "-60px" }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeSlideUp} className="text-3xl md:text-4xl font-bold text-[#1a1c24] mb-6">
              {t("methodology_title")}
            </motion.h2>
            <motion.p variants={fadeSlideUp} className="text-xl text-gray-600">
              {t("methodology_subtitle")}
            </motion.p>
          </motion.div>

          {/* Methodology cards — staggered fan entrance */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, margin: "-60px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {[
              { icon: Globe, label: "GHG Protocol", delay: 0 },
              { icon: Shield, label: "ISO 14064-1", delay: 0.08 },
              { icon: Award, label: "SBTi", delay: 0.16 },
              { icon: FileText, label: null, delay: 0.24 },
            ].map(({ icon: Icon, label, delay }, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 40, rotateX: 12 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    transition: { duration: 0.6, delay, ease: EASE_OUT },
                  },
                }}
                whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.25, ease: "easeOut" } }}
                className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-shadow group"
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.5 } }}
                  className="w-16 h-16 bg-[#f4f9eb] rounded-2xl flex items-center justify-center text-[#9dd187] mb-6"
                >
                  <Icon size={32} />
                </motion.div>
                {label ? (
                  <h3 className="text-xl font-bold text-[#1a1c24]">{label}</h3>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-[#1a1c24] mb-2">
                      {t("methodology_norm")}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {t("methodology_norm_sub")}
                    </p>
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Dark guarantee banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE_OUT }}
            viewport={{ once: true }}
            className="bg-[#1a1c24] rounded-[3rem] p-8 md:p-12 text-center relative overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: EASE_OUT }}
              viewport={{ once: true }}
              className="absolute top-0 right-0 w-1/2 h-full skew-x-12 transform translate-x-32"
            />
            <div className="relative z-10 flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.7, ease: EASE_SPRING, delay: 0.2 }}
                viewport={{ once: true }}
                className="w-16 h-16 rounded-full bg-[#9dd187]/20 flex items-center justify-center mb-6"
              >
                <CheckCircle className="text-[#9dd187]" size={32} />
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35, ease: EASE_OUT }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-bold text-white mb-4 max-w-2xl"
              >
                {t("methodology_guarantee") ||
                  "Garantizamos que cada dato es válido, auditable y comparable."}
              </motion.h3>
            </div>
          </motion.div>
        </div>
      </section>
    );
}