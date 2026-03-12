"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone, Mail, MailCheck, X, Send, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";

export default function Contacto() {
  const { t } = useTranslation();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({ nombre: "", email: "", telefono: "", asunto: "", mensaje: "" });
      } else {
        toast({ variant: "destructive", title: "Error", description: "Error al enviar." });
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Ocurrió un error." });
    }
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -z-10 w-125 h-125 bg-[#9dd187]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 w-75 h-75 bg-blue-50 rounded-full blur-3xl" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 md:pt-28">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9dd187]/10 text-[#7bb463] text-sm font-bold uppercase tracking-wider">
              <Sparkles size={14} />
              {t("co_hero_badge")}
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-[#2a2c38] leading-tight">
              {t("co_hero_title")}
            </h1>
            <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
              {t("co_hero_sub")}
            </p>

            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#9dd187]">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Email</p>
                  <p className="text-[#2a2c38] font-medium text-sm">{t("co_info_email_value")}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#9dd187]">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter">WhatsApp</p>
                  <p className="text-[#2a2c38] font-medium">{t("co_info_phone_number")}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side: Visual/Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200"
                alt="SharetoGo Team"
                width={600}
                height={700}
                className="object-cover h-125"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#2a2c38]/60 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-2xl font-bold">{t("co_hero_unido")}</p>
                <p className="opacity-80">{t("co_hero_sub_unido")}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-12 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12">

            {/* Left: Extra Info */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-[#2a2c38] text-white p-10 rounded-[2.5rem] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <MapPin size={120} />
                </div>
                <h2 className="text-2xl font-bold mb-6">{t("co_info_office_label")}</h2>
                <p className="text-white/70 leading-relaxed mb-8 text-lg">
                  {t("co_info_office_value")}
                </p>
                <div className="flex items-center gap-2 text-[#9dd187] font-bold">
                  <div className="w-2 h-2 rounded-full bg-[#9dd187] animate-pulse" />
                  Barcelona, España
                </div>
              </div>

              <div className="p-8 rounded-[2.5rem] border-2 border-dashed border-gray-200 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center">
                  <MailCheck size={32} />
                </div>
                <h3 className="font-bold text-[#2a2c38]">{t("co_info_response_time")}</h3>
                <p className="text-sm text-gray-500">Nuestro equipo de soporte suele responder en menos de 24 horas laborables.</p>
              </div>
            </div>

            {/* Right: The Form */}
            <div className="lg:col-span-8">
              <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
                <CardContent className="p-8 md:p-12">
                  <h2 className="text-3xl font-bold text-[#2a2c38] mb-8 flex items-center gap-3">
                    {t("co_form_title")}
                    <span className="w-12 h-0.5 bg-[#9dd187]" />
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="nombre" className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">
                          {t("co_form_name_label")}
                        </Label>
                        <Input
                          id="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          className="h-14 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all text-lg"
                          placeholder={t("co_form_name_placeholder")}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">
                          {t("co_form_email_label")}
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="h-14 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all text-lg"
                          placeholder={t("co_form_email_placeholder")}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="telefono" className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">
                          {t("co_form_phone_label")}
                        </Label>
                        <Input
                          id="telefono"
                          type="tel"
                          value={formData.telefono}
                          onChange={handleChange}
                          className="h-14 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all text-lg"
                          placeholder="+34 000 000 000"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="asunto" className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">
                          {t("co_form_subject_label")}
                        </Label>
                        <Select value={formData.asunto} onValueChange={(val) => handleSelectChange("asunto", val)}>
                          <SelectTrigger className="h-14 rounded-xl border-gray-100 bg-gray-50/50">
                            <SelectValue placeholder={t("co_form_subject_placeholder")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="demo">Solicitar Demo</SelectItem>
                            <SelectItem value="pricing">Tarifas y Planes</SelectItem>
                            <SelectItem value="support">Soporte Técnico</SelectItem>
                            <SelectItem value="partnership">Alianzas</SelectItem>
                            <SelectItem value="other">Otros</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mensaje" className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">
                        {t("co_form_message_label")}
                      </Label>
                      <Textarea
                        id="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        className="min-h-37.5 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all text-lg p-4"
                        placeholder={t("co_form_message_placeholder")}
                        required
                      />
                    </div>

                    <Button
                      disabled={isSubmitting}
                      className="group w-full h-16 bg-[#9dd187] hover:bg-[#2a2c38] text-white rounded-2xl text-xl font-bold transition-all shadow-lg hover:shadow-[#9dd187]/20 flex gap-3"
                    >
                      {isSubmitting ? "Enviando..." : (
                        <>
                          {t("co_form_submit")}
                          <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </Button>
                    <p className="text-center text-xs text-gray-400">{t("co_form_privacy")}</p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-[#2a2c38]/90 backdrop-blur-xl z-150 flex items-center justify-center p-6">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white max-w-sm w-full rounded-[3rem] p-10 text-center shadow-2xl relative">
            <button onClick={() => setShowSuccess(false)} className="absolute top-6 right-6 text-gray-400 hover:text-red-500"><X /></button>
            <div className="w-24 h-24 bg-[#9dd187]/10 text-[#9dd187] rounded-full flex items-center justify-center mx-auto mb-6">
              <MailCheck size={48} />
            </div>
            <h3 className="text-3xl font-black text-[#2a2c38] mb-4">{t("co_toast_success_title")}</h3>
            <p className="text-gray-500 mb-8">{t("co_toast_success_desc")}</p>
            <Button onClick={() => setShowSuccess(false)} className="w-full h-14 bg-[#2a2c38] rounded-2xl">Genial</Button>
          </motion.div>
        </div>
      )}
    </main>
  );
}