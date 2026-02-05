"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Search } from "lucide-react";
import ReviewCarousel from "@/components/intranet/ReviewCarousel";

function MetricCard({ label, value }: { label: string; value: any }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 text-center">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-3xl font-bold text-[#2A2C38] mt-1">{value}</p>
    </div>
  );
}

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  // 🔹 Cargar usuarios
  useEffect(() => {
    const loadUsers = async () => {
      const snap = await getDocs(collection(db, "users"));
      const list = snap.docs.map((d) => ({ ...d.data(), id: d.id }));
      setUsers(list);
      setLoading(false);
    };

    loadUsers();
  }, []);

  // 🔍 FILTRO
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return users.filter(
      (u) =>
        (u.name + " " + u.lastName).toLowerCase().includes(q) ||
        (u.emailAdress || "").toLowerCase().includes(q) ||
        (u.company || "").toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q), // 🔥 Ahora puedes buscar por ID
    );
  }, [query, users]);

  // 📊 MÉTRICAS
  const totalUsers = users.length;
  const totalDrivers = users.filter((u) => (u.driverTravels || 0) > 0).length;
  const totalPassengers = users.filter((u) => (u.passengerTravels || 0) > 0).length;

  const usersWithProfilePic = users.filter(
    (u) => u.profilePicture && u.profilePicture.trim() !== "",
  ).length;

  const inactiveUsers = users.filter(
    (u) =>
      (u.driverTravels || 0) === 0 &&
      (u.passengerTravels || 0) === 0 &&
      (!u.reviews || u.reviews.length === 0),
  ).length;

  const allReviews = users.flatMap((u) => u.reviews || []);
  const totalReviews = allReviews.length;

  const avgRating =
    totalReviews > 0
      ? (allReviews.reduce((s, r) => s + (r.rating || 0), 0) / totalReviews).toFixed(2)
      : 0;

  if (loading) {
    return (
      <div className="flex justify-center py-20 text-xl font-semibold text-[#2A2C38]">
        Cargando usuarios...
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-10 py-16 space-y-12">
      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-center text-[#2A2C38]"
      >
        Usuarios activos
      </motion.h1>

      {/* DASHBOARD DE MÉTRICAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        <MetricCard label="Usuarios totales" value={totalUsers} />
        <MetricCard label="Conductores activos" value={totalDrivers} />
        <MetricCard label="Pasajeros activos" value={totalPassengers} />
        <MetricCard label="Usuarios con foto" value={usersWithProfilePic} />
        <MetricCard label="Usuarios inactivos" value={inactiveUsers} />
        <MetricCard label="Valoraciones totales" value={totalReviews} />
        <MetricCard label="Valoración media global" value={avgRating} />
      </div>

      {/* SEARCH BAR */}
      <div className="max-w-xl mx-auto flex items-center gap-3 bg-white px-4 py-3 rounded-xl shadow-md border border-gray-200 mt-10">
        <Search size={20} className="text-[#2A2C38]" />
        <input
          type="text"
          placeholder="Buscar por nombre, email, empresa o ID..."
          className="w-full outline-none text-[#2A2C38]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* GRID USUARIOS */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.05 } },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-12"
      >
        {filtered.map((user) => (
          <motion.div
            key={user.id}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 flex flex-col gap-5 border border-gray-100"
          >
            {/* AVATAR */}
            <Image
              src={
                user.profilePicture ||
                "https://firebasestorage.googleapis.com/v0/b/share-to-go-db.appspot.com/o/profile_images%2FsharetoGo_greenBG.png?alt=media"
              }
              alt="avatar"
              width={96}
              height={96}
              className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-[#9DD187]"
            />

            {/* NAME + EMAIL + ID */}
            <div className="text-center space-y-1">
              <h2 className="text-xl font-bold text-[#2A2C38]">
                {(user.name || "—") + " " + (user.lastName || "")}
              </h2>

              <p className="text-gray-600 text-sm">{user.emailAdress || "Sin email"}</p>

              {/* 🔥 USER ID REAL */}
              {user.userId && (
                <p className="text-gray-400 text-xs break-all mt-1">UserID: {user.userId}</p>
              )}
            </div>

            {/* COMPANY */}
            {user.company && (
              <p className="text-center text-[#2A2C38] font-medium">🏢 {user.company}</p>
            )}

            {/* STATS */}
            <div className="bg-gray-50 p-4 rounded-lg text-sm text-[#2A2C38] space-y-1">
              <p>🚗 Conductor: {user.driverTravels || 0}</p>
              <p>🧍 Pasajero: {user.passengerTravels || 0}</p>
              <p>📍 KM recorridos: {user.kmTravelled || 0}</p>
              <p>🌱 CO₂ ahorrado: {user.co2SavedKg || 0} kg</p>
            </div>

            {/* REVIEWS */}
            <div className="border-t pt-3">
              <h3 className="text-[#2A2C38] font-semibold mb-2">Valoraciones</h3>

              {Array.isArray(user.reviews) && user.reviews.length > 0 ? (
                <ReviewCarousel reviews={user.reviews} />
              ) : (
                <p className="text-gray-500 text-sm mt-2">
                  Este usuario aún no tiene valoraciones.
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}
