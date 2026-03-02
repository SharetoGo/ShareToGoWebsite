import { useEffect, useRef } from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import {
  cardVariant,
  fadeSlideLeft,
  barReveal,
  containerVariants,
  fadeSlideUp,
} from "@/utils/animations";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Services({ t }: { t: any }) {
  const getTranslatedList = (key: string): string[] => {
    const list = t(key, { returnObjects: true });
    return Array.isArray(list) ? (list as string[]) : [];
  };

  function AnimatedNumber({ value }: { value: number }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });
    const motionVal = useMotionValue(0);
    const rounded = useTransform(motionVal, (v) =>
      String(Math.round(v)).padStart(2, "0"),
    );

    useEffect(() => {
      if (!inView) return;
      const controls = animate(motionVal, value, {
        duration: 1.4,
        ease: EASE_OUT,
        delay: 0.2,
      });
      return controls.stop;
    }, [inView, motionVal, value]);

    return <motion.span ref={ref}>{rounded}</motion.span>;
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 gap-12">
          {[1, 2, 3, 4].map((num) => (
            <motion.div
              key={num}
              id={`service-${num}`}
              initial="hidden"
              whileInView="visible"
              variants={cardVariant}
              viewport={{ once: true, margin: "-80px" }}
              whileHover={{ y: -4 }}
              className="bg-gray-50 rounded-[3rem] p-8 md:p-16 border border-gray-100"
            >
              <div className="grid lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4">
                  <span className="text-[#9dd187] font-black text-6xl opacity-20 block mb-4">
                    <AnimatedNumber value={num} />
                  </span>
                  <motion.h2
                    variants={fadeSlideLeft}
                    className="text-3xl font-bold text-[#2a2c38] mb-6"
                  >
                    {t(`cons_item${num}_title`)}
                  </motion.h2>
                  <motion.div
                    variants={barReveal}
                    className="w-20 h-1.5 bg-[#9dd187] rounded-full"
                  />
                </div>

                <motion.div
                  variants={containerVariants}
                  className="lg:col-span-8"
                >
                  <motion.p
                    variants={fadeSlideUp}
                    className="text-xl text-gray-600 mb-10 leading-relaxed"
                  >
                    {t(`cons_item${num}_text`)}
                  </motion.p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {getTranslatedList(`cons_item${num}_list`).map(
                      (item, i) => (
                        <motion.div
                          key={i}
                          variants={fadeSlideUp}
                          className="flex items-start gap-3 bg-white p-5 rounded-2xl border border-gray-100"
                        >
                          <CheckCircle
                            className="text-[#9dd187] mt-1 shrink-0"
                            size={18}
                          />
                          <span className="text-sm font-medium text-gray-700">
                            {item}
                          </span>
                        </motion.div>
                      ),
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
