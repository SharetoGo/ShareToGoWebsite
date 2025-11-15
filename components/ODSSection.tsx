"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, HeartPulse, Building2, Landmark, Recycle } from "lucide-react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

type ODSItem = {
  code: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  key: string;
};

export function ODSSection({ dark = false }: { dark?: boolean }) {
  const { t } = useTranslation();

  const ODS: ODSItem[] = [
    {
      code: t("od3_codigo"),
      title: t("od3_titulo"),
      desc: t("od3_desc"),
      icon: <HeartPulse className="w-5 h-5" />,
      key: "od3",
    },
    {
      code: t("od9_codigo"),
      title: t("od9_titulo"),
      desc: t("od9_desc"),
      icon: <Building2 className="w-5 h-5" />,
      key: "od9",
    },
    {
      code: t("od11_codigo"),
      title: t("od11_titulo"),
      desc: t("od11_desc"),
      icon: <Landmark className="w-5 h-5" />,
      key: "od11",
    },
    {
      code: t("od12_codigo"),
      title: t("od12_titulo"),
      desc: t("od12_desc"),
      icon: <Recycle className="w-5 h-5" />,
      key: "od12",
    },
    {
      code: t("od13_codigo"),
      title: t("od13_titulo"),
      desc: t("od13_desc"),
      icon: <Leaf className="w-5 h-5" />,
      key: "od13",
    },
  ];

  return (
    <section
      className={clsx(
        "py-12 md:py-16",
        dark ? "bg-[#1a1c24]" : "bg-white"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <Badge className="bg-[#9dd187] text-white">
            {t("od_badge")}
          </Badge>
          <h2
            className={clsx(
              "mt-3 text-3xl md:text-4xl font-bold",
              dark ? "text-white" : "text-[#2a2c38]"
            )}
          >
            {t("od_titulo")}
          </h2>
          <p
            className={clsx(
              "mt-2 max-w-2xl mx-auto",
              dark ? "text-gray-300" : "text-gray-600"
            )}
          >
            {t("od_texto")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {ODS.map((o) => {
            const isKey = o.code === t("od11_codigo");
            return (
              <Card
                key={o.key}
                className={clsx(
                  "p-0 relative transition-shadow",
                  dark
                    ? "bg-white/10 backdrop-blur border-white/20"
                    : "bg-white border border-gray-200 shadow-sm",
                  isKey &&
                    (dark
                      ? "ring-2 ring-[#9dd187] shadow-[0_0_0_4px_rgba(157,209,135,0.15)]"
                      : "ring-2 ring-[#9dd187] shadow-[0_0_0_6px_rgba(157,209,135,0.10)] bg-gradient-to-br from-white to-[#f6fbf1]")
                )}
              >
                {/* Badge "Clave" en esquina */}
                {isKey && (
                  <span
                    className={clsx(
                      "absolute -top-2 -right-2 rounded-md px-2 py-1 text-[10px] font-bold",
                      dark
                        ? "bg-[#9dd187] text-[#1a1c24]"
                        : "bg-[#9dd187] text-white"
                    )}
                    aria-label="ODS prioritario"
                  >
                    {t("od_label_clave")}
                  </span>
                )}

                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={clsx(
                        "w-8 h-8 rounded-md flex items-center justify-center",
                        "bg-[#9dd187]"
                      )}
                    >
                      {o.icon}
                    </div>
                    <span
                      className={clsx(
                        "text-xs font-semibold tracking-wide",
                        dark ? "text-white" : "text-[#2a2c38]"
                      )}
                    >
                      {o.code}
                    </span>
                  </div>
                  <p
                    className={clsx(
                      "font-semibold",
                      dark ? "text-white" : "text-[#2a2c38]"
                    )}
                  >
                    {o.title}
                  </p>
                  <p
                    className={clsx(
                      "text-sm mt-1",
                      dark ? "text-gray-300" : "text-gray-600"
                    )}
                  >
                    {o.desc}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
