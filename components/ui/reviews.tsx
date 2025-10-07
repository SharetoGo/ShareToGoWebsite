"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Quote, Building2, MessageSquarePlus, Users } from "lucide-react";
import { db } from "@/lib/firebase"; // Adjust this path if necessary
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Review = {
  user: string;
  review: string;
  stars: number;
};

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ user: "", review: "", stars: 5 });
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      const querySnapshot = await getDocs(collection(db, "reviews"));
      const data: Review[] = querySnapshot.docs.map((doc) => doc.data() as Review);
      setReviews(data);
    };

    fetchReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.user || !newReview.review) return;

    await addDoc(collection(db, "reviews"), newReview);
    setReviews((prev) => [...prev, newReview]);
    setNewReview({ user: "", review: "", stars: 5 });
    setIsFormOpen(false);
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#9dd187]/10 text-[#2a2c38] px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            Testimonios de clientes
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2a2c38] mb-4">Lo que dicen nuestros usuarios</h2>
          <p className="text-lg text-gray-600">
            Descubre por qué las empresas y los empleados eligen SharetoGo.
          </p>
        </div>

        <div className="mb-10 text-center">
          <Button onClick={() => setIsFormOpen(!isFormOpen)} className="bg-[#2a2c38] hover:bg-[#1a1c28] text-white">
            <MessageSquarePlus className="mr-2 h-4 w-4" />
            {isFormOpen ? "Cerrar formulario" : "Escribir una reseña"}
          </Button>
        </div>

        {isFormOpen && (
          <Card className="mb-12 bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-[#2a2c38]">Comparte tu experiencia</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Tu nombre"
                  value={newReview.user}
                  onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
                  required
                />
                <Textarea
                  placeholder="Escribe tu reseña..."
                  value={newReview.review}
                  onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                  rows={4}
                  required
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Tu valoración:</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`cursor-pointer transition-colors ${
                          newReview.stars >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                        onClick={() => setNewReview({ ...newReview, stars: star })}
                      />
                    ))}
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#9dd187] hover:bg-[#8bc475] text-[#2a2c38] font-semibold"
                >
                  Enviar reseña
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-8">
          {reviews.map((r, i) => (
            <UserReview key={i} user={r.user} stars={r.stars} review={r.review} />
          ))}
        </div>
      </div>
    </section>
  );
}

function UserReview({ user, stars, review }: Review) {
  return (
    <Card className="group bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#9dd187]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <CardContent className="p-8 lg:p-10 relative">
        <div className="flex items-start justify-between mb-8">
          <div className="bg-[#9dd187]/10 p-3 rounded-2xl">
            <Quote className="text-[#9dd187] w-6 h-6" />
          </div>
          <div className="flex gap-1">
            {[...Array(stars)].map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 fill-[#9dd187] text-[#9dd187] transform group-hover:scale-110 transition-transform duration-300"
                style={{ transitionDelay: `${i * 50}ms` }}
              />
            ))}
          </div>
        </div>
        <blockquote className="text-gray-700 mb-8 leading-relaxed text-lg font-medium relative">
          <span className="text-[#9dd187] text-6xl absolute -top-4 -left-2 opacity-20 font-serif">"</span>
          {review}
        </blockquote>
        <div className="border-t border-gray-100 pt-6">
          <div className="flex items-start gap-4">
            <div className="bg-gradient-to-br from-[#2a2c38] to-[#9dd187] p-3 rounded-full flex-shrink-0">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-[#2a2c38] text-lg mb-1">{user}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
