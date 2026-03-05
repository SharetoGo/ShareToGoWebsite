import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { containerVariants } from "@/utils/animations";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_SPRING: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

export function HeroSection({ t }: { t: any }) {
  return (
    <section className="py-16 md:py-24 bg-linear-to-br from-[#2a2c38] via-[#2a2c38] to-[#1a1c24] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
        className="absolute top-0 right-0 w-1/2 h-full skew-x-12 transform translate-x-32 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-white"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.7, y: -10 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: EASE_SPRING },
                },
              }}
            >
              <Badge className="bg-[#9dd187] text-[#1a1c24] mb-6 px-4 py-1.5 text-sm font-bold flex w-fit items-center gap-2 hover:bg-[#8bc374] transition-colors">
                <Sparkles className="w-4 h-4" />
                {t("ee_hero_badge")}
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.45, delay: 0.1, ease: EASE_OUT }}
              className="text-4xl md:text-5xl font-bold mb-6 text-balance"
            >
              {t("ee_hero_title")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.4, delay: 0.18, ease: EASE_OUT }}
              className="text-xl text-gray-300 mb-8 text-pretty"
            >
              {t("ee_hero_sub")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.25, ease: EASE_OUT }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/contratar">
                <Button
                  size="lg"
                  className="bg-[#9dd187] text-[#1a1c24] hover:bg-[#8bc374] rounded-full px-8 h-12"
                >
                  {t("ee_hero_cta_demo")}
                </Button>
              </Link>
              <Link href="/contacto">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-white hover:bg-[#9dd187] hover:text-[#1a1c24] rounded-full px-8 h-12 transition-all"
                >
                  {t("ee_hero_cta_contact")}
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: EASE_OUT }}
          >
            <Image
              src="/images/empresas/hero-image.jpg"
              alt="Espacio Empresas Hero"
              width={320}
              height={640}
              className="w-full h-auto rounded-3xl shadow-xl shadow-black/20"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
