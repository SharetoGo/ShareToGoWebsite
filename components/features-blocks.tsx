import { Sprout, BadgeEuro, Users } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function FeaturesBlocks() {
  const { t } = useTranslation();
  const headingParts = t("motivo_sharetogo").split("SharetoGo");

  return (
    <section className="relative bg-white py-16 md:py-24 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* App preview */}
          <div className="relative order-2 lg:order-1">
            <Image
              src="/images/captura_inicio.png"
              priority={true}
              width={100}
              height={100}
              alt={t("preview_alt")}
              className="w-xs h-xs border-10 border-white object-cover"
            />
          </div>

          {/* Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
                {headingParts[0]}
                <span className="text-primary">{t("nombre_sharetogo")}</span>
                {headingParts[1] ?? ""}
              </h2>
              <p className="text-lg text-muted-foreground text-pretty">
                {t("transforma_movilidad")}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-6">
              <div className="flex gap-4 p-6 bg-card rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <Sprout className="text-primary-foreground text-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">{t("reduccion_emisiones")}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {t("coche_privado")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-6 bg-card rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                    <Users className="text-accent-foreground text-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">{t("beneficios_sociales")}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {t("coche_compartido")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-6 bg-card rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <BadgeEuro className="text-primary-foreground text-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">{t("ahorro_economico")}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {t("ahorro_infraestructuras")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
