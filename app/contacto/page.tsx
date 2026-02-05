"use client";

import { motion } from "framer-motion";
import type React from "react";

import { useState } from "react";
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

import { MapPin, Phone, Mail, MessageSquare, Users, Building } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";

export default function Contacto() {
  const { t } = useTranslation();
  const { toast } = useToast();

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: t("co_toast_success_title"),
          description: t("co_toast_success_desc"),
        });

        setFormData({
          nombre: "",
          apellido: "",
          email: "",
          telefono: "",
          asunto: "",
          mensaje: "",
        });
      } else {
        console.error("Failed to send email.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }

    setIsSubmitting(false);
  };

  return (
    <main className="scroll-smooth">
      {/* Hero section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="py-16 md:py-24 bg-gray-50"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2a2c38] mb-6">
            {t("co_hero_title")}
          </h1>
          <p className="text-xl text-gray-600 mb-8 text-balance">{t("co_hero_sub")}</p>
          <p className="text-xl text-gray-600 mb-2 text-balance">{t("co_hero_sub_payments")}</p>
        </div>
      </motion.section>

      {/* Contact content */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4, delay: 0.2 }}
        viewport={{ once: true, amount: 0.2 }}
        className="py-8 md:py-8 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact info */}
            <Card className="p-8 bg-white shadow-lg">
              <CardContent className="pt-0">
                <h2 className="text-2xl font-bold text-[#2a2c38] mb-6">{t("co_info_title")}</h2>
                <div className="space-y-6">
                  {/* phone */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#9dd187]/10 rounded-lg flex items-center justify-center">
                      <Phone className="text-[#9dd187]" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#2a2c38]">{t("co_info_phone_label")}</h3>
                      <p className="text-gray-600">{t("co_info_phone_number")}</p>
                      <p className="text-sm text-gray-500">{t("co_info_phone_hours")}</p>
                    </div>
                  </div>

                  {/* email */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#9dd187]/10 rounded-lg flex items-center justify-center">
                      <Mail className="text-[#9dd187]" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#2a2c38]">{t("co_info_email_label")}</h3>
                      <p className="text-gray-600">{t("co_info_email_value")}</p>
                    </div>
                  </div>

                  {/* office */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#9dd187]/10 rounded-lg flex items-center justify-center">
                      <MapPin className="text-[#9dd187]" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#2a2c38]">{t("co_info_office_label")}</h3>
                      <p className="text-gray-600">{t("co_info_office_value")}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <Card className="p-8">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold text-[#2a2c38] mb-6">{t("co_form_title")}</h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="mb-3 pl-2" htmlFor="nombre">
                          {t("co_form_name_label")}
                        </Label>
                        <Input
                          id="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          placeholder={t("co_form_name_placeholder")}
                          required
                        />
                      </div>

                      <div>
                        <Label className="mb-3 pl-2" htmlFor="email">
                          {t("co_form_email_label")}
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={t("co_form_email_placeholder")}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="mb-3 pl-2" htmlFor="telefono">
                          {t("co_form_phone_label")}
                        </Label>
                        <Input
                          id="telefono"
                          type="tel"
                          value={formData.telefono}
                          onChange={handleChange}
                          placeholder={t("co_form_phone_placeholder")}
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="mb-3 pl-2" htmlFor="asunto">
                        {t("co_form_subject_label")}
                      </Label>

                      <Select
                        value={formData.asunto}
                        onValueChange={(value) => handleSelectChange("asunto", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t("co_form_subject_placeholder")} />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="demo">{t("co_form_subject_demo")}</SelectItem>
                          <SelectItem value="pricing">{t("co_form_subject_pricing")}</SelectItem>
                          <SelectItem value="support">{t("co_form_subject_support")}</SelectItem>
                          <SelectItem value="partnership">
                            {t("co_form_subject_partner")}
                          </SelectItem>
                          <SelectItem value="payments">{t("co_form_subject_payments")}</SelectItem>
                          <SelectItem value="other">{t("co_form_subject_other")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="mb-3 pl-2" htmlFor="mensaje">
                        {t("co_form_message_label")}
                      </Label>
                      <Textarea
                        id="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        placeholder={t("co_form_message_placeholder")}
                        rows={5}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#9dd187] hover:bg-[#8bc475] text-white py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Enviando..." : t("co_form_submit")}
                    </Button>

                    <p className="text-sm text-gray-500 text-center">{t("co_form_privacy")}</p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
