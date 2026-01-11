import Image from "next/image";
import AppPreview1 from "@/public/images/movil1.png";
import AppPreview2 from "@/public/images/movil2.png";
import LogoApple from "@/public/images/logo-apple.png";
import LogoGooglePlay from "@/public/images/logo-google-play.png";
import { Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative bg-background py-16 md:py-24 lg:py-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="mr-2" />
              {t("Movilidad")}
            </div>

            {/* Main heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground text-balance leading-tight">
                <span className="text-primary">{t("nombre_sharetogo")}</span>
              </h1>
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-foreground text-balance leading-tight">
                {t("Aplicacion")}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl">
                {t("empresa_unica")}
              </p>
            </div>
            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start w-full sm:w-auto">
              {/* App Store */}
              <a
                href="/downloads"
                className="inline-flex w-full sm:w-64 items-center gap-3 rounded-sm bg-black px-5 py-3 text-white shadow-sm transition-colors hover:bg-primary"
              >
                <Image
                  src={LogoApple}
                  alt="App Store"
                  className="h-7 w-7 object-contain"
                />
                <div className="flex flex-col leading-tight text-left">
                  <span className="text-[11px] uppercase tracking-[0.12em]">
                    {t("boton_app_store_download")}
                  </span>
                  <span className="text-base font-semibold">
                    {t("boton_app_store")}
                  </span>
                </div>
              </a>

              {/* Google Play */}
              <a
                href="/downloads"
                className="inline-flex w-full sm:w-64 items-center gap-3 rounded-sm bg-black px-5 py-3 text-white shadow-sm transition-colors hover:bg-primary"
              >
                <Image
                  src={LogoGooglePlay}
                  alt="Google Play"
                  className="h-7 w-7 object-contain"
                />
                <div className="flex flex-col leading-tight text-left">
                  <span className="text-[11px] uppercase tracking-[0.12em]">
                    {t("boton_play_store_download")}
                  </span>
                  <span className="text-base font-semibold">
                    {t("boton_play_store")}
                  </span>
                </div>
              </a>
            </div>
          </div>

          <div className="text-center md:text-right">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Image
                  src={AppPreview1}
                  priority={true}
                  width={600}
                  height={574}
                  alt="App preview 1"
                  data-aos="zoom-y-out"
                  data-aos-delay="180"
                />
              </div>
              <div>
                <Image
                  src={AppPreview2}
                  priority={true}
                  width={600}
                  height={574}
                  alt="App preview 2"
                  data-aos="zoom-y-out"
                  data-aos-delay="180"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
