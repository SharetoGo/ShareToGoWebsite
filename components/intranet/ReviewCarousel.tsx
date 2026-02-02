import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

type Review = {
  authorName?: string;
  rating?: number;
  comment?: string;
};

function ReviewCarousel({ reviews }: { reviews: Review[] }) {
  const [index, setIndex] = useState(0);

  if (!reviews || reviews.length === 0) return null;

  const next = () => setIndex((i) => (i + 1) % reviews.length);
  const prev = () => setIndex((i) => (i - 1 + reviews.length) % reviews.length);

  const rev = reviews[index];

  return (
    <div className="relative w-full bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
      {/* Flecha izquierda */}
      {reviews.length > 1 && (
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition"
          aria-label="Reseña anterior"
        >
          <svg width="18" height="18" viewBox="0 0 20 20">
            <path d="M12 5l-5 5 5 5" stroke="#2A2C38" strokeWidth="2" fill="none" />
          </svg>
        </button>
      )}

      {/* Contenido de la review */}
      <motion.div
        key={index}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="text-[#2A2C38]"
      >
        <div className="flex items-center gap-1 font-semibold mb-1">
          <span>{rev.authorName || "Usuario"}</span>
          <Star size={16} className="text-yellow-500 fill-yellow-500" />
          <span>{rev.rating ?? "-"}</span>
        </div>
        <p className="text-gray-600 text-sm">
          {rev.comment && rev.comment.trim() !== "" ? rev.comment : "Sin comentario"}
        </p>
      </motion.div>

      {/* Flecha derecha */}
      {reviews.length > 1 && (
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition"
          aria-label="Siguiente reseña"
        >
          <svg width="18" height="18" viewBox="0 0 20 20">
            <path d="M8 5l5 5-5 5" stroke="#2A2C38" strokeWidth="2" fill="none" />
          </svg>
        </button>
      )}

      {/* Indicadores */}
      {reviews.length > 1 && (
        <div className="flex justify-center gap-2 mt-3">
          {reviews.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full transition-all ${
                i === index ? "bg-[#9DD187]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ReviewCarousel;
