"use client";

import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/app/intranet-empresas/auth/AuthContext";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  Timestamp,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import {
  Copy,
  CheckCircle,
  Mail,
  Linkedin,
  Globe,
  Plus,
  Instagram,
  Trash2,
  MessageSquare,
  X,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import {
  getNextPublicationDay,
  getCurrentMonthPublicationDates,
} from "@/lib/utils/nextPublicationDays";

type PostType = "linkedin" | "instagram" | "mail" | "website" | "other";

interface SavedPost {
  id: string;
  month: string;
  title: string;
  content: string;
  type: PostType;
  isAuto: boolean;
  createdAt: any;
}

export default function ContentPage() {
  const { companyData } = useAuth();
  const [posts, setPosts] = useState<SavedPost[]>([]);
  const [selectedMonth, setSelectedMonth] = useState("febrero 2026");
  const [activeTab, setActiveTab] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formState, setFormState] = useState({
    title: "",
    content: "",
    type: "linkedin" as PostType,
  });

  // Utils for dates
  const daysUntilPublication = useMemo(() => getNextPublicationDay(), []);
  const nextPublicationDate = useMemo(
    () => getCurrentMonthPublicationDates(),
    [],
  );

  const monthKeys = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  useEffect(() => {
    if (!companyData?.id) return;
    const q = query(
      collection(db, "companies", companyData.id, "contentPosts"),
      orderBy("createdAt", "desc"),
    );
    return onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as SavedPost[];
      setPosts(fetchedPosts);

      if (fetchedPosts.length > 0 && !activeTab) {
        const firstOfMonth = fetchedPosts.find(
          (p) => p.month.toLowerCase() === selectedMonth.toLowerCase(),
        );
        setActiveTab(firstOfMonth?.id || fetchedPosts[0].id);
      }
    });
  }, [companyData?.id, selectedMonth]);

  const currentMonthContent = useMemo(() => {
    const typeConfigs: Record<PostType, { label: string; icon: any }> = {
      linkedin: { label: "LinkedIn", icon: Linkedin },
      instagram: { label: "Instagram", icon: Instagram },
      mail: { label: "Newsletter", icon: Mail },
      website: { label: "Web / Blog", icon: Globe },
      other: { label: "Otros", icon: MessageSquare },
    };

    const monthPosts = posts.filter(
      (p) => p.month.toLowerCase() === selectedMonth.toLowerCase(),
    );

    const grouped = (Object.keys(typeConfigs) as PostType[]).map((type) => ({
      ...typeConfigs[type],
      type,
      items: monthPosts.filter((p) => p.type === type),
    }));

    return grouped;
  }, [posts, selectedMonth]);

  const activeContent = useMemo(() => {
    return posts.find((p) => p.id === activeTab);
  }, [activeTab, posts]);

  const handleSave = async () => {
    if (!formState.title.trim() || !formState.content.trim()) {
      setError("Por favor, rellena el título y el contenido del post.");
      return;
    }
    if (!companyData?.id) return;
    try {
      const docRef = await addDoc(
        collection(db, "companies", companyData.id, "contentPosts"),
        {
          ...formState,
          month: selectedMonth,
          isAuto: false,
          createdAt: Timestamp.now(),
        },
      );
      setError(null);
      setActiveTab(docRef.id);
      setFormState({ title: "", content: "", type: "linkedin" });
      setIsCreating(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!companyData) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      {/* 1. Header & Stats */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-[#2a2c38]">Content Studio</h1>
          <p className="text-gray-500 font-medium italic">
            Gestión de contenidos por meses.
          </p>
        </div>
      </div>

      <div className="bg-[#2a2c38] p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Sparkles size={120} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
          <StatMiniWhite
            label="Posts del Mes"
            value={posts.filter((p) => p.month === selectedMonth).length}
            sub="Total en este periodo"
          />
          <StatMiniWhite
            label="Próxima Publicación"
            value={daysUntilPublication}
            sub={`el ${nextPublicationDate}`}
          />
          <StatMiniWhite
            label="Canales con Uso"
            value={currentMonthContent.filter((c) => c.items.length > 0).length}
            sub="de 5 canales"
          />
          <StatMiniWhite
            label="Mes Activo"
            value={selectedMonth.split(" ")[0].toUpperCase()}
            sub="Filtro temporal"
          />
        </div>
      </div>

      {/* 2. Month Selector (The "Month IDs") */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
        {monthKeys.map((m) => {
          const monthLabel = `${m.charAt(0).toUpperCase() + m.slice(1)} 2026`;
          return (
            <button
              key={m}
              onClick={() => setSelectedMonth(monthLabel)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all border ${selectedMonth === monthLabel ? "bg-[#9dd187] text-[#2a2c38] border-[#9dd187] shadow-md" : "bg-white text-gray-400 border-gray-100 hover:border-gray-200"}`}
            >
              {monthLabel}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar: Structured by Type within Month */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#2a2c38] p-4 rounded-[2.5rem] border border-gray-100 space-y-6">
            {currentMonthContent.map((group) => (
              <div key={group.type}>
                <div className="flex items-center gap-2 mb-3 px-2">
                  <group.icon size={14} className="text-gray-200" />
                  <p className="text-[10px] font-black text-gray-200 uppercase tracking-widest">
                    {group.label} ({group.items.length})
                  </p>
                </div>

                <div className="space-y-1">
                  {group.items.length > 0 ? (
                    group.items.map((post) => (
                      <div key={post.id} className="group relative">
                        <TabButton
                          active={activeTab === post.id}
                          onClick={() => {
                            setActiveTab(post.id);
                            setIsCreating(false);
                          }}
                          label={post.title}
                          isAuto={post.isAuto}
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteDoc(
                              doc(
                                db,
                                "companies",
                                companyData.id,
                                "contentPosts",
                                post.id,
                              ),
                            );
                          }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-2 text-gray-300 hover:text-red-500 transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-[12px] italic text-gray-300 px-4 py-2 border border-dashed border-gray-100 rounded-2xl">
                      Sin contenido este mes
                    </p>
                  )}
                </div>
              </div>
            ))}

            <button
              onClick={() => {
                setIsCreating(true);
                setActiveTab("new");
              }}
              className="w-full flex items-center justify-center gap-2 p-5 rounded-3xl border-2 border-dashed border-gray-100 text-gray-400 font-bold text-xs uppercase hover:border-[#9dd187] hover:text-[#9dd187] transition-all"
            >
              <Plus size={16} /> Nuevo Post para {selectedMonth.split(" ")[0]}
            </button>
          </div>
        </div>

        {/* Content Preview / Editor */}
        <div className="lg:col-span-8">
          {isCreating ? (
            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl p-10 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black text-[#2a2c38]">
                  Nuevo Post
                </h2>
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setError(null);
                  }}
                  className="p-2 bg-gray-50 rounded-xl"
                >
                  <X />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {(
                  ["linkedin", "instagram", "mail", "website"] as PostType[]
                ).map((t) => (
                  <button
                    key={t}
                    onClick={() => setFormState({ ...formState, type: t })}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase border transition-all ${formState.type === t ? "bg-[#2a2c38] text-white border-[#2a2c38]" : "bg-white text-gray-400 border-gray-100"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <input
                placeholder="Título del post..."
                className="w-full text-2xl font-bold border-none focus:ring-0"
                value={formState.title}
                onChange={(e) =>
                  setFormState({ ...formState, title: e.target.value })
                }
              />
              <textarea
                placeholder="Contenido..."
                rows={10}
                className="w-full border-none focus:ring-0 bg-gray-50 rounded-4xl p-8 text-gray-600 leading-relaxed"
                value={formState.content}
                onChange={(e) =>
                  setFormState({ ...formState, content: e.target.value })
                }
              />
              <button
                onClick={handleSave}
                className="w-full bg-[#9dd187] text-[#2a2c38] py-5 rounded-2xl font-black uppercase shadow-lg shadow-[#9dd187]/20"
              >
                Publicar en {selectedMonth.split(" ")[0]}
              </button>
            </div>
          ) : activeContent ? (
            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-150">
              <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {activeContent.isAuto && (
                    <span className="px-3 py-1 bg-[#9dd187]/10 text-[#9dd187] text-[9px] font-black rounded-full uppercase">
                      Generado por SharetoGo
                    </span>
                  )}
                  <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest italic">
                    {activeContent.type}
                  </span>
                </div>
                <button
                  onClick={() =>
                    handleCopy(activeContent.content, activeContent.id)
                  }
                  className="bg-[#2a2c38] text-[#9dd187] px-8 py-3 rounded-2xl font-black text-xs uppercase flex items-center gap-2 hover:scale-105 transition-all"
                >
                  {copiedId === activeContent.id ? (
                    <CheckCircle size={16} />
                  ) : (
                    <Copy size={16} />
                  )}
                  {copiedId === activeContent.id ? "Copiado" : "Copiar Texto"}
                </button>
              </div>
              <div className="flex-1 p-12 bg-[#fcfdfe] flex items-center justify-center">
                <div className="max-w-xl w-full bg-white p-12 rounded-[3rem] shadow-inner border border-gray-100">
                  <h3 className="text-2xl font-black text-[#2a2c38] mb-6 leading-tight">
                    {activeContent.title}
                  </h3>
                  <div className="w-12 h-1 bg-[#9dd187] mb-8 rounded-full" />
                  <pre className="whitespace-pre-wrap font-sans text-gray-600 text-lg leading-relaxed">
                    {activeContent.content}
                  </pre>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-300 italic font-medium p-20 border-2 border-dashed border-gray-50 rounded-[3rem]">
              Selecciona un contenido del lateral para previsualizarlo
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, label, isAuto }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all border ${
        active
          ? "bg-white text-[#2a2c38] border-gray-200 shadow-sm translate-x-1"
          : "bg-gray-200 text-[#2a2c38] border-transparent hover:bg-gray-100"
      }`}
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <ChevronRight
          size={14}
          className={active ? "text-[#9dd187]" : "text-[#a6de8e]"}
        />
        <span
          className={`font-bold text-[12px] truncate ${active ? "text-[#2a2c38]" : ""}`}
        >
          {label}
        </span>
      </div>
      {isAuto && (
        <div className="w-1.5 h-1.5 rounded-full bg-[#9dd187] shrink-0" />
      )}
    </button>
  );
}

function StatMiniWhite({
  label,
  value,
  sub,
}: {
  label: string;
  value: any;
  sub: string;
}) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-[#9dd187] tracking-[0.2em] uppercase">
        {label}
      </p>
      <p className="text-3xl font-black tracking-tight">{value}</p>
      <p className="text-[10px] font-medium text-gray-400">{sub}</p>
    </div>
  );
}
