"use client"

import Link from "next/link";
import WhiteLogo from "./ui/whiteLogo";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-br from-[#2a2c38] to-[#1a1c24] text-white rounded-t-[28px]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Top */}
        <div className="grid gap-10 lg:grid-cols-12 py-12">
          {/* Marca + social */}
          <div className="lg:col-span-3">
            <div className="mb-6 pl-2 sm:pl-14">
              <WhiteLogo />
            </div>

            <p className="text-white/80 mb-4">{t("footer_siguenos")}</p>
            <ul className="flex items-center gap-4">
              {/* Instagram */}
              <li>
                <a
                  href="https://www.instagram.com/sharetogo_/?igshid=MjEwN2IyYWYwYw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="hover:text-[#9dd187] transition"
                >
                  <svg className="w-7 h-7 fill-current" viewBox="0 0 32 32">
                    <path d="M12.001 9a3 3 0 1 0 0 6a3 3 0 0 0 0-6Zm0-2a5 5 0 1 1 0 10a5 5 0 0 1 0-10Zm6.5-.25a1.25 1.25 0 0 1-2.5 0a1.25 1.25 0 0 1 2.5 0ZM12.001 4c-2.474 0-2.878.007-4.029.058c-.784.037-1.31.142-1.798.332a2.886 2.886 0 0 0-1.08.703a2.89 2.89 0 0 0-.704 1.08c-.19.49-.295 1.015-.331 1.798C4.007 9.075 4 9.461 4 12c0 2.475.007 2.878.058 4.029c.037.783.142 1.31.331 1.797c.17.435.37.748.702 1.08c.337.336.65.537 1.08.703c.494.191 1.02.297 1.8.333C9.075 19.994 9.461 20 12 20c2.475 0 2.878-.007 4.029-.058c.782-.037 1.308-.142 1.797-.331a2.91 2.91 0 0 0 1.08-.703c.337-.336.538-.649.704-1.08c.19-.492.296-1.018.332-1.8c.052-1.103.058-1.49.058-4.028c0-2.474-.007-2.878-.058-4.029c-.037-.782-.143-1.31-.332-1.798a2.912 2.912 0 0 0-.703-1.08a2.884 2.884 0 0 0-1.08-.704c-.49-.19-1.016-.295-1.798-.331C14.926 4.006 14.54 4 12 4Zm0-2c2.717 0 3.056.01 4.123.06c1.064.05 1.79.217 2.427.465c.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428c.047 1.066.06 1.405.06 4.122c0 2.717-.01 3.056-.06 4.122c-.05 1.065-.218 1.79-.465 2.428a4.884 4.884 0 0 1-1.153 1.772a4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.427.465c-1.067.047-1.406.06-4.123.06c-2.717 0-3.056-.01-4.123-.06c-1.064-.05-1.789-.218-2.427-.465a4.89 4.89 0 0 1-1.772-1.153a4.905 4.905 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428c-.048-1.066-.06-1.405-.06-4.122c0-2.717.01-3.056.06-4.122c.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772a4.897 4.897 0 0 1 1.772-1.153c.637-.248 1.362-.415 2.427-.465C8.945 2.013 9.284 2 12.001 2Z" />
                  </svg>
                </a>
              </li>
              {/* TikTok */}
              <li>
                <a
                  href="https://www.tiktok.com/@share2go"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="hover:text-[#9dd187] transition"
                >
                  <svg className="w-7 h-7 fill-current" viewBox="0 0 32 32">
                    <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" />
                  </svg>
                </a>
              </li>
              {/* X (Twitter) */}
              <li>
                <a
                  href="https://twitter.com/Sharetogo_"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X"
                  className="hover:text-[#9dd187] transition"
                >
                  <svg className="w-7 h-7 fill-current" viewBox="0 0 32 32">
                    <path d="M18.244 2H21l-6.54 7.48L22.5 22h-6.87l-4.78-6.06L4.5 22H2l7.02-8.03L1.5 2h6.87l4.3 5.45L18.244 2Zm-1.2 18h1.58L7.2 4h-1.6l11.444 16Z"/>
                  </svg>
                </a>
              </li>
              {/* LinkedIn */}
              <li>
                <a
                  href="https://www.linkedin.com/company/share-to-go"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="hover:text-[#9dd187] transition"
                >
                  <svg className="w-7 h-7 fill-current" viewBox="0 0 32 32">
                    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM0 22h5V7H0v15Zm7.5 0h5v-8.2c0-2.18 2.85-2.36 2.85 0V22h5v-9.77c0-6.07-6.62-5.85-7.85-2.86V7h-5V22Z"/>
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          {/* SharetoGo */}
          <nav className="lg:col-span-2" aria-label="SharetoGo">
            <h6 className="text-[#9dd187] font-semibold mb-3">{t("nombre_sharetogo")}</h6>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-[#9dd187] transition">{t("nav_inicio")}</Link></li>
              <li><Link href="/quienes-somos" className="hover:text-[#9dd187] transition">{t("nav_quienes")}</Link></li>
              <li><Link href="/funcionamiento" className="hover:text-[#9dd187] transition">{t("nav_funcionamiento")}</Link></li>
              <li><Link href="/contratar" className="hover:text-[#9dd187] transition">{t("nav_contratar")}</Link></li>
            </ul>
          </nav>

          {/* Espacios */}
          <nav className="lg:col-span-2" aria-label="Espacios">
            <h6 className="text-[#9dd187] font-semibold mb-3">{t("footer_espacios")}</h6>
            <ul className="space-y-2 text-sm">
              <li><Link href="/espacio-empresas" className="hover:text-[#9dd187] transition">{t("nav_empresas_simple")}</Link></li>
              <li><Link href="/espacio-eventos" className="hover:text-[#9dd187] transition">{t("nav_eventos_simple")}</Link></li>
            </ul>
          </nav>

          {/* Ayuda */}
          <nav className="lg:col-span-2" aria-label="Ayuda">
            <h6 className="text-[#9dd187] font-semibold mb-3">{t("footer_ayuda")}</h6>
            <ul className="space-y-2 text-sm">
              <li><Link href="/faqs" className="hover:text-[#9dd187] transition">{t("nav_faqs")}</Link></li>
              <li><Link href="/contacto" className="hover:text-[#9dd187] transition">{t("nav_contacto")}</Link></li>
              <li><Link href="/privacidad" className="hover:text-[#9dd187] transition">{t("footer_privacidad")}</Link></li>
            </ul>
          </nav>

          {/* CTAs */}
          <div className="lg:col-span-3 flex flex-col items-start gap-4">
            <a
              href="https://apps.apple.com/us/app/sharetogo-carpooling/id6746420222"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-3 rounded-lg border border-white/60 hover:border-white hover:bg-[#E8F6DF] hover:text-[#2a2c38] transition"
            >
              {/* Apple icon */}
              <svg className="w-5 h-5" viewBox="0 0 384 512"><path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
              {t("footer_descargar_app")}
            </a>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-t border-white/20" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-6 gap-6">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80 underline decoration-white/30 underline-offset-4">
            <li><Link href="/privacidad#derechos" className="hover:text-[#9dd187]">{t("footer_derechos")}</Link></li>
            <li><Link href="/privacidad" className="hover:text-[#9dd187]">{t("footer_privacidad")}</Link></li>
            <li><Link href="/privacidad#términos" className="hover:text-[#9dd187]">{t("footer_terminos")}</Link></li>
            <li><Link href="/privacidad#cookies" className="hover:text-[#9dd187]">{t("footer_cookies")}</Link></li>

          </ul>

          <div className="text-sm text-white/70">
            {t("footer_copyright", { year })}
          </div>
        </div>
      </div>
    </footer>
  );
}
