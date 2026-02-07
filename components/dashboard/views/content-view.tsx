'use client'

import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/app/intranet-empresas/auth/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, onSnapshot, orderBy, Timestamp, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { formatStats } from "@/lib/utils/format";
import {
  Copy, CheckCircle, Mail, Linkedin, Globe,
  Send, Plus, Instagram, Trash2, MessageSquare, X, ChevronRight, Sparkles
} from "lucide-react";
import { getNextPublicationDay, getCurrentMonthPublicationDates } from "@/lib/utils/nextPublicationDays";

type PostType = 'linkedin' | 'instagram' | 'mail' | 'website' | 'other';

interface SavedPost {
  id: string;
  month: string;
  title: string;
  content: string;
  type: PostType;
  isAuto: boolean;
  createdAt: any;
}

export function ContentView() {
  const { companyData } = useAuth();
  const [posts, setPosts] = useState<SavedPost[]>([]);
  const [selectedMonth, setSelectedMonth] = useState("febrero 2026");
  const [activeTab, setActiveTab] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formState, setFormState] = useState({ title: "", content: "", type: "linkedin" as PostType });

  // Calcular información de publicación
  const daysUntilPublication = useMemo(() => getNextPublicationDay(), []);
  const nextPublicationDate = useMemo(() => getCurrentMonthPublicationDates(), []);

  const stats = {
    co2: companyData?.totalCo2 || 0,
    km: companyData?.totalKm || 0,
    trips: companyData?.totalTrips || 0,
    trees: Math.floor((companyData?.totalCo2 || 0) / 50)
  };

  useEffect(() => {
    if (!companyData?.id) return;
    const q = query(collection(db, "companies", companyData.id, "contentPosts"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
      const fetchedPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as SavedPost[];
      setPosts(fetchedPosts);

      if (fetchedPosts.length > 0 && !activeTab) {
        setActiveTab(fetchedPosts[0].id);
      }
    });
  }, [companyData?.id, activeTab]);

  // --- LOGIC: ORGANIZE CONTENT ---
  const { suggestedItems, libraryPosts } = useMemo(() => {
    const types: { type: PostType, label: string, icon: any }[] = [
      { type: 'linkedin', label: 'LinkedIn', icon: Linkedin },
      { type: 'instagram', label: 'Instagram', icon: Instagram },
      { type: 'mail', label: 'Newsletter', icon: Mail },
      { type: 'website', label: 'Web / Blog', icon: Globe },
    ];

    const suggestions = types.map(config => {
      const realDoc = posts.find(p =>
        p.isAuto === true &&
        p.type === config.type &&
        p.month.toLowerCase().includes(selectedMonth.split(' ')[0].toLowerCase())
      );

      return {
        id: realDoc?.id || `${config.type}-placeholder`,
        type: config.type,
        label: config.label,
        title: realDoc?.title || `${config.label} - ${selectedMonth}`,
        content: realDoc?.content || `Estamos preparando el contenido de ${config.label} para ${selectedMonth}. Estará disponible muy pronto.`,
        icon: config.icon,
        exists: !!realDoc
      };
    });

    const library = posts.filter(p => p.isAuto === false && p.month.toLowerCase().includes(selectedMonth.split(' ')[0].toLowerCase()));

    return { suggestedItems: suggestions, libraryPosts: library };
  }, [posts, selectedMonth]);

  const activeContent = useMemo(() => {
    return [...suggestedItems, ...libraryPosts].find(i => i.id === activeTab) || suggestedItems[0];
  }, [activeTab, suggestedItems, libraryPosts]);

  const handleSave = async () => {
    if (!formState.title.trim() || !formState.content.trim()) {
      setError("Por favor, rellena el título y el contenido del post.");
      return;
    }
    if (!companyData?.id) return;
    try {
      const docRef = await addDoc(collection(db, "companies", companyData.id, "contentPosts"), {
        ...formState,
        month: selectedMonth,
        isAuto: false,
        createdAt: Timestamp.now()
      });
      setError(null);
      setActiveTab(docRef.id);
      setFormState({ title: "", content: "", type: "linkedin" });
      setIsCreating(false);
    } catch (e) { console.error(e); }
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
          <h1 className="text-3xl font-bold text-[#2a2c38]">Content Studio</h1>
          <p className="text-gray-500 font-medium italic">Genera impacto con tu comunicación ESG.</p>
        </div>
      </div>

      <div className="bg-[#2a2c38] p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5"><Sparkles size={120} /></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
          {/* Posts creados */}
          <StatMiniWhite 
            label="Posts Creados" 
            value={libraryPosts.length} 
            sub="En tu biblioteca" 
          />
          {/* Próxima Publicación */}
          <StatMiniWhite 
            label="Próxima Publicación" 
            value={daysUntilPublication} 
            sub={`el ${nextPublicationDate}`}
          />
          {/* Canales Activos */}
          <StatMiniWhite 
            label="Canales Activos" 
            value={suggestedItems.filter(i => i.exists).length} 
            sub="de 4 disponibles" 
          />
          {/* Período */}
          <StatMiniWhite 
            label="PERIODO" 
            value={selectedMonth.split(' ')[0]} 
            sub="Mes seleccionado" 
          />
        </div>
      </div>

      {/* 2. Month Selector */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
        {["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"].map(m => {
          const monthLabel = `${m.charAt(0).toUpperCase() + m.slice(1)} 2026`;
          return (
            <button
              key={m}
              onClick={() => setSelectedMonth(monthLabel)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${selectedMonth === monthLabel ? "bg-[#9dd187] text-[#2a2c38] border-[#9dd187] shadow-md" : "bg-white text-gray-400 border-gray-100 hover:border-gray-200"}`}
            >
              {monthLabel}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-2">Sugerencias Automáticas</p>
            <div className="space-y-2">
              {suggestedItems.map((item) => (
                <TabButton
                  key={item.id}
                  active={activeTab === item.id}
                  onClick={() => { setActiveTab(item.id); setIsCreating(false); }}
                  icon={<item.icon size={18} />}
                  label={item.label}
                  disabled={!item.exists}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-2">Tu Biblioteca ({libraryPosts.length})</p>
            <div className="space-y-2">
              {libraryPosts.map((post) => (
                <div key={post.id} className="group relative">
                  <TabButton
                    active={activeTab === post.id}
                    onClick={() => { setActiveTab(post.id); setIsCreating(false); }}
                    icon={<MessageSquare size={18} />}
                    label={post.title}
                  />
                  <button onClick={(e) => { e.stopPropagation(); deleteDoc(doc(db, "companies", companyData.id, "contentPosts", post.id)); }} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-2 text-gray-300 hover:text-red-500 transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <button
                onClick={() => { setIsCreating(true); setActiveTab('new'); }}
                className="w-full flex items-center justify-center gap-2 p-5 rounded-3xl border-2 border-dashed border-gray-100 text-gray-400 font-bold text-xs uppercase hover:border-[#9dd187] hover:text-[#9dd187] transition-all mt-4"
              >
                <Plus size={16} /> Crear nuevo post
              </button>
            </div>
          </div>
        </div>

        {/* Content Preview / Editor */}
        <div className="lg:col-span-8">
          {isCreating ? (
            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl p-10 space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-black text-[#2a2c38]">Nuevo Post</h2>
                <button onClick={() => { setIsCreating(false); setError(null); }} className="p-2 bg-gray-50 rounded-xl"><X /></button>
              </div>
              {error && (
                <p className="text-red-500 text-sm font-bold bg-red-50 p-4 rounded-2xl animate-in fade-in slide-in-from-top-1">{error}</p>
              )}
              <input
                placeholder="Título del post..."
                className="w-full text-2xl font-bold border-none focus:ring-0"
                value={formState.title}
                onChange={e => { setFormState({ ...formState, title: e.target.value }); if(error) setError(null); }}
              />
              <textarea
                placeholder="Contenido..."
                rows={10}
                className="w-full border-none focus:ring-0 bg-gray-50 rounded-4xl p-8 text-gray-600 leading-relaxed"
                value={formState.content}
                onChange={e => { setFormState({ ...formState, content: e.target.value }); if(error) setError(null); }}
              />
              <button onClick={handleSave} className="w-full bg-[#9dd187] text-[#2a2c38] py-5 rounded-2xl font-black uppercase shadow-lg shadow-[#9dd187]/20">
                Guardar en Biblioteca
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-150">
              <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Vista Previa</span>
                <button
                  onClick={() => handleCopy(activeContent?.content || "", activeTab)}
                  className="bg-[#2a2c38] text-[#9dd187] px-8 py-3 rounded-2xl font-black text-xs uppercase flex items-center gap-2 hover:scale-105 transition-all"
                >
                  {copiedId === activeTab ? <CheckCircle size={16} /> : <Copy size={16} />}
                  {copiedId === activeTab ? "Copiado" : "Copiar Texto"}
                </button>
              </div>
              <div className="flex-1 p-12 bg-[#fcfdfe] flex items-center justify-center">
                <div className="max-w-xl w-full bg-white p-12 rounded-[3rem] shadow-inner border border-gray-100">
                  <h3 className="text-2xl font-black text-[#2a2c38] mb-6 leading-tight">{activeContent?.title}</h3>
                  <div className="w-12 h-1 bg-[#9dd187] mb-8 rounded-full" />
                  <pre className="whitespace-pre-wrap font-sans text-gray-600 text-lg leading-relaxed">
                    {activeContent?.content}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label, disabled }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex item  s-center justify-between p-5 rounded-3xl transition-all border ${active
          ? "bg-[#2a2c38] text-white border-[#2a2c38] shadow-xl translate-x-2"
          : "bg-white text-black border-gray-50 hover:border-[#9dd187]/30"
        } ${disabled && !active ? "opacity-50 italic" : ""}`}
    >
      <div className="flex items-center gap-4">
        <span className={active ? "text-[#9dd187]" : "text-black"}>{icon}</span>
        <span className="font-black text-xs uppercase tracking-tighter">{label}</span>
      </div>
      {disabled && !active && <span className="text-[8px] font-bold text-gray-300 uppercase">Vacío</span>}
    </button>
  );
}

function StatMiniWhite({ label, value, sub }: { label: string, value: any, sub: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-[#9dd187] tracking-[0.2em]">{label}</p>
      <p className="text-3xl font-black tracking-tight">{value}</p>
      <p className="text-[10px] font-medium text-gray-400">{sub}</p>
    </div>
  );
}