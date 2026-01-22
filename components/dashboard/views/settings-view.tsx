// components/dashboard/views/settings-view.tsx
'use client'

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/app/intranet-empresas/auth/AuthContext";
import { db, storage } from "@/lib/firebase"; // Ensure storage is exported from your firebase config
import { doc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { 
  Settings, Globe, Users, 
  Camera, Save, Loader2, CheckCircle2, Plus, X 
} from "lucide-react";

export function SettingsView() {
  const { companyData } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    industry: "technology",
    employeeCount: 0,
    headquarters: [] as string[],
    co2Target: 0,
    logoUrl: ""
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (companyData) {
      setFormData({
        name: companyData.name || "",
        industry: companyData.industry || "technology",
        employeeCount: companyData.employeeCount || 0,
        headquarters: Array.isArray(companyData.headquarters) ? companyData.headquarters : [],
        co2Target: companyData.co2Target || 3000,
        logoUrl: companyData.logoUrl || ""
      });
    }
  }, [companyData]);

  // --- LOGO UPLOAD LOGIC ---
  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !companyData) return;

    setIsUploading(true);
    try {
      const storageRef = ref(storage, `logos/${companyData.name}_${Date.now()}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      
      setFormData(prev => ({ ...prev, logoUrl: url }));
      // We update the local state immediately; it will be saved to Firestore when clicking "Save Changes"
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error al subir la imagen.");
    } finally {
      setIsUploading(false);
    }
  };

  // --- HEADQUARTERS ARRAY LOGIC ---
  const updateHQ = (index: number, value: string) => {
    const newHQs = [...formData.headquarters];
    newHQs[index] = value;
    setFormData({ ...formData, headquarters: newHQs });
  };

  const addHQ = () => setFormData({ ...formData, headquarters: [...formData.headquarters, ""] });
  
  const removeHQ = (index: number) => {
    setFormData({ ...formData, headquarters: formData.headquarters.filter((_, i) => i !== index) });
  };

  // --- SAVE TO FIRESTORE ---
  const handleSave = async () => {
    if (!companyData) return;
    setIsSaving(true);
    
    try {
      const q = query(collection(db, "companies"), where("adminIds", "array-contains", companyData.adminIds[0]));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const docRef = doc(db, "companies", querySnapshot.docs[0].id);
        
        await updateDoc(docRef, {
          ...formData,
          employeeCount: Number(formData.employeeCount),
          co2Target: Number(formData.co2Target),
        });

        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (error) {
      alert("Error al guardar los cambios.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!companyData) return null;

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-[#2a2c38]">Configuración</h1>
          <p className="text-gray-500">Actualiza el perfil y sedes de {formData.name}</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving || isUploading}
          className="flex items-center gap-2 bg-[#9dd187] text-[#2a2c38] px-6 py-3 rounded-2xl font-bold hover:scale-105 transition-all disabled:opacity-50 shadow-lg shadow-[#9dd187]/20"
        >
          {isSaving ? <Loader2 className="animate-spin" size={20} /> : saveSuccess ? <CheckCircle2 size={20} /> : <Save size={20} />}
          {isSaving ? "Guardando..." : saveSuccess ? "¡Guardado!" : "Guardar Cambios"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
            <div className="relative w-32 h-32 mx-auto mb-4 group">
              <div className="w-full h-full rounded-3xl bg-gray-50 border-2 border-gray-100 flex items-center justify-center overflow-hidden">
                {isUploading ? (
                  <Loader2 className="animate-spin text-[#9dd187]" size={30} />
                ) : formData.logoUrl ? (
                   <img src={formData.logoUrl} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <Users size={40} className="text-gray-300" />
                )}
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleLogoChange} 
                className="hidden" 
                accept="image/*" 
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 p-3 bg-[#2a2c38] text-white rounded-2xl hover:bg-[#9dd187] transition-colors shadow-lg"
              >
                <Camera size={18} />
              </button>
            </div>
            <h3 className="font-bold text-[#2a2c38]">{formData.name}</h3>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-1">Logo Corporativo</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="md:col-span-2 space-y-6">
          <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
              <Settings className="text-[#9dd187]" />
              <h3 className="font-bold text-[#2a2c38]">Información General</h3>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">Nombre</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#9dd187]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">Sector</label>
                  <select 
                    value={formData.industry}
                    onChange={(e) => setFormData({...formData, industry: e.target.value})}
                    className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#9dd187]"
                  >
                    <option value="technology">Tecnología</option>
                    <option value="finance">Finanzas</option>
                    <option value="healthcare">Salud</option>
                  </select>
                </div>
              </div>

              {/* SEDES (ARRAY DISPLAY) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Sedes / Headquarters</label>
                <div className="space-y-3">
                  {formData.headquarters.map((hq, index) => (
                    <div key={index} className="flex gap-2">
                      <input 
                        type="text" 
                        value={hq}
                        onChange={(e) => updateHQ(index, e.target.value)}
                        placeholder="Dirección de la sede..."
                        className="flex-1 bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#9dd187]"
                      />
                      <button 
                        onClick={() => removeHQ(index)}
                        className="p-4 bg-red-50 text-red-400 rounded-2xl hover:bg-red-100 transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                  <button 
                    onClick={addHQ}
                    className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-gray-100 rounded-2xl text-gray-400 hover:border-[#9dd187] hover:text-[#9dd187] transition-all font-bold text-sm"
                  >
                    <Plus size={18} /> Añadir Sede
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
              <Globe className="text-[#9dd187]" />
              <h3 className="font-bold text-[#2a2c38]">Objetivos ESG</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Meta CO2e (kg)</label>
                <input 
                  type="number" 
                  value={formData.co2Target}
                  onChange={(e) => setFormData({...formData, co2Target: Number(e.target.value)})}
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#9dd187]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Empleados</label>
                <input 
                  type="number" 
                  value={formData.employeeCount}
                  onChange={(e) => setFormData({...formData, employeeCount: Number(e.target.value)})}
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#9dd187]"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}