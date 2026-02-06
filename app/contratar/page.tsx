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
import {
  CheckCircle,
  Users,
  Building,
  Calendar,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Contratar() {
  const { t } = useTranslation();

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    empresa: "",
    telefono: "",
    empleados: "",
    mensaje: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <main className="scroll-smooth">
      {/* Hero section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 md:py-24 bg-linear-to-br from-[#2a2c38] to-[#1a1c24]"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t("ct_hero_title")}
          </h1>
          <p className="text-xl text-gray-300 mb-8 text-balance">
            {t("ct_hero_sub")}
          </p>
          <div className="flex flex-wrap md:flex-nowrap justify-center gap-6 text-white">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <CheckCircle className="text-[#9dd187]" size={20} />
              <span>{t("ct_hero_b1")}</span>
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <CheckCircle className="text-[#9dd187]" size={20} />
              <span>{t("ct_hero_b2")}</span>
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <CheckCircle className="text-[#9dd187]" size={20} />
              <span>{t("ct_hero_b3")}</span>
            </div>
            <div className="flex items-center gap-2 whitespace-nowrap">
              <CheckCircle className="text-[#9dd187]" size={20} />
              <span>{t("ct_hero_b4")}</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Main content */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4, delay: 0.2 }}
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 md:py-24 bg-background"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <Card className="p-8">
                <CardContent className="pt-6">
                  {submitted ? (
                    <div className="py-10 text-center">
                      <p className="text-lg text-gray-700">
                        {t("ct_form_done")}
                      </p>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold text-[#2a2c38] mb-6">
                        {t("ct_form_title")}
                      </h2>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="mb-2 pl-2" htmlFor="nombre">
                              {t("ct_name_label")}
                            </Label>
                            <Input
                              id="nombre"
                              value={formData.nombre}
                              onChange={(e) =>
                                handleInputChange("nombre", e.target.value)
                              }
                              placeholder={t("ct_name_ph")}
                              required
                            />
                          </div>
                          <div>
                            <Label className="mb-2 pl-2" htmlFor="email">
                              {t("ct_email_label")}
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) =>
                                handleInputChange("email", e.target.value)
                              }
                              placeholder={t("ct_email_ph")}
                              required
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="mb-2 pl-2" htmlFor="empresa">
                              {t("ct_company_label")}
                            </Label>
                            <Input
                              id="empresa"
                              value={formData.empresa}
                              onChange={(e) =>
                                handleInputChange("empresa", e.target.value)
                              }
                              placeholder={t("ct_company_ph")}
                              required
                            />
                          </div>
                          <div>
                            <Label className="mb-2 pl-2" htmlFor="telefono">
                              {t("ct_phone_label")}
                            </Label>
                            <Input
                              id="telefono"
                              type="tel"
                              value={formData.telefono}
                              onChange={(e) =>
                                handleInputChange("telefono", e.target.value)
                              }
                              placeholder={t("ct_phone_ph")}
                            />
                          </div>
                        </div>

                        <div>
                          <Label className="mb-2 pl-2" htmlFor="empleados">
                            {t("ct_emp_label")}
                          </Label>
                          <Select
                            onValueChange={(value) =>
                              handleInputChange("empleados", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={t("ct_emp_ph")} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="10-50">
                                {t("ct_emp_opt1")}
                              </SelectItem>
                              <SelectItem value="51-100">
                                {t("ct_emp_opt2")}
                              </SelectItem>
                              <SelectItem value="101-250">
                                {t("ct_emp_opt3")}
                              </SelectItem>
                              <SelectItem value="250+">
                                {t("ct_emp_opt4")}
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="mb-2 pl-2" htmlFor="mensaje">
                            {t("ct_msg_label")}
                          </Label>
                          <Textarea
                            id="mensaje"
                            value={formData.mensaje}
                            onChange={(e) =>
                              handleInputChange("mensaje", e.target.value)
                            }
                            placeholder={t("ct_msg_ph")}
                            rows={4}
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full bg-[#9dd187] hover:bg-[#8bc475] text-white py-3 text-lg"
                        >
                          {t("ct_submit")}
                        </Button>

                        <p className="text-sm text-gray-500 text-center">
                          {t("ct_consent")}
                        </p>
                      </form>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Benefits */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-[#2a2c38] mb-6">
                  {t("ct_demo_title")}
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="shrink-0">
                      <div className="w-10 h-10 bg-[#9dd187] rounded-full flex items-center justify-center">
                        <Users className="text-white" size={20} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#2a2c38] mb-1">
                        {t("ct_demo_b1_title")}
                      </h3>
                      <p className="text-gray-600">{t("ct_demo_b1_text")}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="shrink-0">
                      <div className="w-10 h-10 bg-[#2a2c38] rounded-full flex items-center justify-center">
                        <Building className="text-white" size={20} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#2a2c38] mb-1">
                        {t("ct_demo_b2_title")}
                      </h3>
                      <p className="text-gray-600">{t("ct_demo_b2_text")}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="shrink-0">
                      <div className="w-10 h-10 bg-[#9dd187] rounded-full flex items-center justify-center">
                        <Calendar className="text-white" size={20} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#2a2c38] mb-1">
                        {t("ct_demo_b3_title")}
                      </h3>
                      <p className="text-gray-600">{t("ct_demo_b3_text")}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact info */}
              <Card className="p-4 bg-[#2a2c38] text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    {t("ct_contact_title")}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone size={20} className="text-[#9dd187]" />
                      <span>{t("ct_contact_phone")}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail size={20} className="text-[#9dd187]" />
                      <span>{t("ct_contact_email")}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin size={20} className="text-[#9dd187]" />
                      <span>{t("ct_contact_location")}</span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mt-4">
                    {t("ct_contact_hours")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </motion.section>

      {/* FAQ section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        variants={fadeInUp}
        transition={{ duration: 0.4, delay: 0.3 }}
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 md:py-24 bg-gray-50"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#2a2c38] text-center mb-12">
            {t("ct_faq_title")}
          </h2>
          <div className="space-y-6">
            <Card className="p-6">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-[#2a2c38] mb-2">
                  {t("ct_faq1_q")}
                </h3>
                <p className="text-gray-600">{t("ct_faq1_a")}</p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-[#2a2c38] mb-2">
                  {t("ct_faq2_q")}
                </h3>
                <p className="text-gray-600">{t("ct_faq2_a")}</p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-[#2a2c38] mb-2">
                  {t("ct_faq3_q")}
                </h3>
                <p className="text-gray-600">{t("ct_faq3_a")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
