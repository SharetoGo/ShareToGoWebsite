"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/firebase"; // Adjust this path if necessary

type Review = {
  user: string;
  review: string;
  stars: number;
};

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ user: "", review: "", stars: 5 });

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
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Reseñas de usuarios</h1>

      <form onSubmit={handleSubmit} className="bg-[#9dd187] shadow p-6 rounded mb-10 space-y-4 md: pb-4">
        <input
          type="text"
          placeholder="Tu nombre"
          value={newReview.user}
          onChange={(e) => setNewReview({ ...newReview, user: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Escribe tu reseña"
          value={newReview.review}
          onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
          className="w-full border p-2 rounded"
          rows={4}
          required
        />
        <select
          value={newReview.stars}
          onChange={(e) => setNewReview({ ...newReview, stars: parseInt(e.target.value) })}
          className="w-full border p-2 rounded"
        >
          {[5, 4, 3, 2, 1].map((num) => (
            <option key={num} value={num}>
              {num} estrella{num > 1 && "s"}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-[#2a2c38] text-white px-4 py-2 rounded hover:bg-[#2a2c38] w-full"
        >
          Enviar
        </button>
      </form>

      <div className="space-y-4">
        {reviews.map((r, i) => (
          <UserReview key={i} user={r.user} stars={r.stars} review={r.review} />
        ))}
      </div>
    </div>
  );
}

function UserReview({ user, stars, review }: Review) {
  return (
    <div className="bg-[#9dd187] p-4 rounded shadow">
      <div className="flex items-center justify-between mb-2">
        <p className="font-semibold">{user}</p>
        <div className="text-yellow-500">
          {"★".repeat(stars)}
          {"☆".repeat(5 - stars)}
        </div>
      </div>
      <p className="text-[#2a2c38]">{review}</p>
    </div>
  );
}
