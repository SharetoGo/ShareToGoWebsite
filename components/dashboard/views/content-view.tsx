// components/dashboard/views/content-view.tsx
'use client'

import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/app/intranet-empresas/auth/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, onSnapshot, orderBy, Timestamp, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { formatStats } from "@/lib/utils/format";
import { 
  Copy, CheckCircle, Mail, Linkedin, Globe, 
  Send, Plus, Instagram, MoreHorizontal, 
  Trash2, MessageSquare, X, ChevronRight, Sparkles
} from "lucide-react";

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
  const [selectedMonth, setSelectedMonth] = useState(new Date().toLocaleString('es-ES', { month: 'long', year: 'numeric' }));
  const [activeTab, setActiveTab] = useState<string>("linkedin-auto");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formState, setFormState] = useState({ title: "", content: "", type: "linkedin" as PostType });

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
      setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as SavedPost[]);
    });
  }, [companyData?.id]);

  // --- Logic for Sugerencias (Admin Content) ---
  const suggestionsConfig = [
    { type: 'linkedin' as PostType, label: 'LinkedIn', icon: Linkedin },
    { type: 'instagram' as PostType, label: 'Instagram', icon: Instagram },
    { type: 'mail' as PostType, label: 'Newsletter', icon: Mail },
    { type: 'website' as PostType, label: 'Web / Blog', icon: Globe },
  ];

  const suggestedItems = suggestionsConfig.map(config => {
    // Find if you (the admin) have uploaded content for this type/month
    const uploadedVersion = posts.find(p => p.isAuto && p.type === config.type && p.month === selectedMonth);
    return {
      id: `${config.type}-auto`,
      type: config.type,
      label: `${config.label} ${selectedMonth}`,
      content: uploadedVersion?.content || `Estamos preparando el contenido de ${config.label} para ${selectedMonth}. Estará disponible muy pronto.`,
      isPlaceholder: !uploadedVersion,
      icon: config.icon
    };
  });

  // --- Logic for Library (Company Content) ---
  const libraryPosts = posts.filter(p => !p.isAuto && p.month === selectedMonth);

  const activeContent = [...suggestedItems, ...posts].find(i => i.id === activeTab);

  const handleSave = async () => {
    if (!companyData?.id || !formState.title || !formState.content) return;
    try {
      if (editingId) {
        await updateDoc(doc(db, "companies", companyData.id, "contentPosts", editingId), formState);
        setEditingId(null);
      } else {
        const docRef = await addDoc(collection(db, "companies", companyData.id, "contentPosts"), {
          ...formState,
          month: selectedMonth,
          isAuto: false,
          createdAt: Timestamp.now()
        });
        setActiveTab(docRef.id);
      }
      setFormState({ title: "", content: "", type: "linkedin" });
      setIsCreating(false);
    } catch (e) { console.error(e); }
  };

  if (!companyData) return null;

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
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
          <StatMiniWhite label="CO2e EVITADO" value={`${formatStats(stats.co2)} kg`} sub={`${stats.trees} Árboles`} />
          <StatMiniWhite label="DISTANCIA" value={`${formatStats(stats.km)} km`} sub="Ahorrados" />
          <StatMiniWhite label="VIAJES" value={stats.trips} sub="Registrados" />
          <StatMiniWhite label="PERIODO" value={selectedMonth.split(' ')[0]} sub="Mes actual" />
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

      {/* 3. Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-4 space-y-6">
          <div className="space-y-2">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2 mb-4">Sugerencias Automáticas</p>
            {suggestedItems.map((item) => (
              <TabButton 
                key={item.id} 
                active={activeTab === item.id} 
                onClick={() => {setActiveTab(item.id); setIsCreating(false);}}
                icon={<item.icon size={18} />}
                label={item.label}
                isPlaceholder={item.isPlaceholder}
              />
            ))}
          </div>

          <div className="space-y-2 pt-4">
            <div className="flex justify-between items-center ml-2 mb-4">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Tu Biblioteca</p>
              <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full text-gray-400 font-bold">{libraryPosts.length}</span>
            </div>
            
            <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2 no-scrollbar">
              {libraryPosts.map((post) => (
                <div key={post.id} className="group relative">
                  <TabButton 
                    active={activeTab === post.id} 
                    onClick={() => {setActiveTab(post.id); setIsCreating(false);}}
                    icon={post.type === 'instagram' ? <Instagram size={18}/> : <MessageSquare size={18}/>}
                    label={post.title}
                  />
                  <button onClick={(e) => { e.stopPropagation(); deleteDoc(doc(db, "companies", companyData.id, "contentPosts", post.id)); }} className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-2 text-gray-300 hover:text-red-500 transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            <button 
              onClick={() => {setIsCreating(true); setActiveTab('new'); setEditingId(null);}}
              className={`w-full flex items-center justify-center gap-2 p-5 rounded-3xl border-2 border-dashed transition-all font-bold text-sm mt-4 ${isCreating ? "border-[#9dd187] text-[#9dd187] bg-[#9dd187]/5" : "border-gray-100 text-gray-300 hover:border-[#9dd187] hover:text-[#9dd187]"}`}
            >
              <Plus size={18} /> Crear Post Propio
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-8">
          {isCreating || editingId ? (
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl overflow-hidden animate-in slide-in-from-right-4">
              <div className="p-8 space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-[#2a2c38]">Nuevo Contenido</h2>
                  <button onClick={() => setIsCreating(false)} className="p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-red-500"><X size={20}/></button>
                </div>
                <div className="flex gap-2">
                  {(['linkedin', 'instagram', 'mail', 'website'] as PostType[]).map(t => (
                    <button key={t} onClick={() => setFormState({...formState, type: t})} className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase border transition-all ${formState.type === t ? "bg-[#2a2c38] text-[#9dd187] border-[#2a2c38]" : "text-gray-400 border-gray-50"}`}>
                      {t}
                    </button>
                  ))}
                </div>
                <input placeholder="Título del post..." value={formState.title} onChange={e => setFormState({...formState, title: e.target.value})} className="w-full text-2xl font-bold border-none focus:ring-0 placeholder:text-gray-200" />
                <textarea placeholder="Tu mensaje..." rows={10} value={formState.content} onChange={e => setFormState({...formState, content: e.target.value})} className="w-full border-none focus:ring-0 text-gray-600 leading-relaxed resize-none bg-gray-50/50 rounded-3xl p-6" />
                <button onClick={handleSave} className="w-full bg-[#9dd187] text-[#2a2c38] py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.01] transition-all shadow-lg shadow-[#9dd187]/20">
                  <Send size={18} /> Guardar en Mi Biblioteca
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
              <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-white/50 backdrop-blur-sm">
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest ml-4">Preview del Canal</span>
                <button onClick={() => handleCopy(activeContent?.content || "", activeTab)} className="flex items-center gap-2 px-8 py-3 bg-[#9dd187] text-[#2a2c38] rounded-2xl font-bold text-sm hover:scale-105 transition-all shadow-md">
                   {copiedId === activeTab ? <CheckCircle size={18} /> : <Copy size={18} />}
                   {copiedId === activeTab ? "¡Copiado!" : "Copiar Contenido"}
                </button>
              </div>
              
              <div className="flex-1 p-12 flex items-center justify-center bg-[#fcfdfe]">
                <div className="w-full max-w-xl">
                  <div className="bg-white p-12 rounded-[3rem] border border-gray-200 shadow-inner relative">
                    <div className="absolute -top-5 -left-5 bg-[#2a2c38] text-[#9dd187] p-4 rounded-2xl shadow-xl">
                      {activeContent && 'icon' in activeContent ? <activeContent.icon size={24}/> : <MoreHorizontal size={24}/>}
                    </div>
                    <h3 className="font-bold text-[#2a2c38] mb-8 text-2xl leading-tight">
                      {activeContent && 'title' in activeContent ? (activeContent as any).title : (activeContent as any).label}
                    </h3>
                    <div className="w-16 h-1.5 bg-[#9dd187] rounded-full mb-8 opacity-40" />
                    <pre className="whitespace-pre-wrap font-sans text-gray-500 text-lg leading-relaxed italic">
                      {activeContent?.content}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label, isPlaceholder }: { active: boolean, onClick: () => void, icon: any, label: string, isPlaceholder?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-5 rounded-3xl transition-all border ${
        active 
          ? "bg-[#2a2c38] text-white border-[#2a2c38] shadow-xl translate-x-2" 
          : "bg-white text-gray-500 border-gray-50 hover:border-[#9dd187]/30"
      } ${isPlaceholder && !active ? "opacity-50 grayscale" : ""}`}
    >
      <div className="flex items-center gap-4">
        <span className={active ? "text-[#9dd187]" : "text-gray-300"}>{icon}</span>
        <div className="text-left">
          <span className="font-bold text-sm block truncate max-w-40">{label}</span>
        </div>
      </div>
      <ChevronRight size={14} className={active ? "text-[#9dd187]" : "text-gray-200"} />
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