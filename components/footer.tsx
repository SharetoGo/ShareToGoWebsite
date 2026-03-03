"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import WhiteLogo from "./ui/whiteLogo";
import TreeNationWidget from "./TreeNationWidget";

// Sub-component for Social Links to keep the main JSX clean
const SocialLink = ({ href, ariaLabel, iconPath }: { href: string; ariaLabel: string; iconPath: string }) => (
  <li>
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="hover:text-[#9dd187] transition-colors opacity-80 hover:opacity-100"
    >
      <svg className="w-6 h-6 fill-current" viewBox="0 0 32 32">
        <path d={iconPath} />
      </svg>
    </a>
  </li>
);

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useTranslation();

  const partners = [
    { name: "Tech Barcelona", href: "https://techbarcelona.com/", logo: "/images/TECH-BARCELONA_logo.webp" },
    { name: "EAE Emprende Barcelona", href: "https://www.eae.es/carreras-profesionales/eae-emprendedores", logo: "/images/EAEemprende-logo.png" },
    { name: "European Sustainability Consulting", href: "https://www.linkedin.com/company/esc-eu/", logo: "/images/ESC-Logo-White.png" },
    { name: "Ayuntament de Castelldefels", href: "https://www.castelldefels.org/", logo: "/images/aytoCastefa.png" },
  ];

  const sections = [
    {
      title: t("nombre_sharetogo"),
      links: [
        { name: t("nav_inicio"), href: "/" },
        { name: t("nav_quienes"), href: "/quienes-somos" },
        { name: t("nav_funcionamiento"), href: "/funcionamiento" },
        { name: t("nav_contratar"), href: "/contratar" },
      ],
    },
    {
      title: t("footer_espacios"),
      links: [
        { name: t("nav_empresas_simple"), href: "/espacio-empresas" },
        { name: t("nav_consultoria_sostenibilidad"), href: "/consultoria-de-sostenibilidad" },
        { name: t("nav_eventos_simple"), href: "/espacio-eventos" },
      ],
    },
    {
      title: t("footer_ayuda"),
      links: [
        { name: t("nav_faqs"), href: "/faqs" },
        { name: t("nav_contacto"), href: "/contacto" },
        { name: t("footer_privacidad"), href: "/privacidad" },
      ],
    },
  ];

  return (
    <footer className="bg-linear-to-br from-[#2a2c38] to-[#1a1c24] text-white rounded-t-[40px] mt-10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-3 space-y-6">
            <WhiteLogo />
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              {t("footer_siguenos")}
            </p>
            <ul className="flex items-center gap-5">
              <SocialLink ariaLabel="Instagram" href="https://www.instagram.com/sharetogo_/" iconPath="M12.001 9a3 3 0 1 0 0 6a3 3 0 0 0 0-6Zm0-2a5 5 0 1 1 0 10a5 5 0 0 1 0-10Zm6.5-.25a1.25 1.25 0 0 1-2.5 0a1.25 1.25 0 0 1 2.5 0ZM12.001 4c-2.474 0-2.878.007-4.029.058c-.784.037-1.31.142-1.798.332a2.886 2.886 0 0 0-1.08.703a2.89 2.89 0 0 0-.704 1.08c-.19.49-.295 1.015-.331 1.798C4.007 9.075 4 9.461 4 12c0 2.475.007 2.878.058 4.029c.037.783.142 1.31.331 1.797c.17.435.37.748.702 1.08c.337.336.65.537 1.08.703c.494.191 1.02.297 1.8.333C9.075 19.994 9.461 20 12 20c2.475 0 2.878-.007 4.029-.058c.782-.037 1.308-.142 1.797-.331a2.91 2.91 0 0 0 1.08-.703c.337-.336.538-.649.704-1.08c.19-.492.296-1.018.332-1.8c.052-1.103.058-1.49.058-4.028c0-2.474-.007-2.878-.058-4.029c-.037-.782-.143-1.31-.332-1.798a2.912 2.912 0 0 0-.703-1.08a2.884 2.884 0 0 0-1.08-.704c-.49-.19-1.016-.295-1.798-.331C14.926 4.006 14.54 4 12 4Zm0-2c2.717 0 3.056.01 4.123.06c1.064.05 1.79.217 2.427.465c.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428c.047 1.066.06 1.405.06 4.122c0 2.717-.01 3.056-.06 4.122c-.05 1.065-.218 1.79-.465 2.428a4.884 4.884 0 0 1-1.153 1.772a4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.427.465c-1.067.047-1.406.06-4.123.06c-2.717 0-3.056-.01-4.123-.06c-1.064-.05-1.789-.218-2.427-.465a4.89 4.89 0 0 1-1.772-1.153a4.905 4.905 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428c-.048-1.066-.06-1.405-.06-4.122c0-2.717.01-3.056.06-4.122c.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772a4.897 4.897 0 0 1 1.772-1.153c.637-.248 1.362-.415 2.427-.465C8.945 2.013 9.284 2 12.001 2Z" />
              <SocialLink ariaLabel="LinkedIn" href="https://www.linkedin.com/company/share-to-go" iconPath="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM0 22h5V7H0v15Zm7.5 0h5v-8.2c0-2.18 2.85-2.36 2.85 0V22h5v-9.77c0-6.07-6.62-5.85-7.85-2.86V7h-5V22Z" />
              <SocialLink ariaLabel="X" href="https://x.com/Sharetogo_" iconPath="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              <SocialLink ariaLabel="TikTok" href="https://www.tiktok.com/@share2go" iconPath="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" />
            </ul>
          </div>

          {/* Navigation Links Mapping */}
          {sections.map((section) => (
            <nav key={section.title} className="lg:col-span-2">
              <h6 className="text-[#9dd187] font-bold uppercase tracking-wider text-xs mb-5">
                {section.title}
              </h6>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-white/80 hover:text-[#9dd187] transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Utility / Partners Column */}
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h6 className="text-[#9dd187] font-bold uppercase tracking-wider text-xs mb-5">
                {t("footer_tree")}
              </h6>
              <TreeNationWidget />
            </div>
            
            <div className="flex flex-col gap-3">
              <h6 className="text-[#9dd187] font-bold uppercase tracking-wider text-xs mb-2">Partners</h6>
              <div className="grid grid-cols-2 gap-3">
                {partners.map((p) => (
                  <a
                    key={p.name}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/30 transition-all group"
                  >
                    <Image
                      src={p.logo}
                      alt={p.name}
                      width={100}
                      height={40}
                      className="h-6 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 w-full mb-8" />

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center gap-6 text-xs text-white/50">
            <Link href="/privacidad#derechos" className="hover:text-white transition-colors">{t("footer_derechos")}</Link>
            <Link href="/privacidad" className="hover:text-white transition-colors">{t("footer_privacidad")}</Link>
            <Link href="/privacidad#términos" className="hover:text-white transition-colors">{t("footer_terminos")}</Link>
            <Link href="/privacidad#cookies" className="hover:text-white transition-colors">{t("footer_cookies")}</Link>
          </div>
          
          <p className="text-xs text-white/40">
            © {year} SharetoGo. {t("footer_copyright", { year: "" })}
          </p>
        </div>
      </div>
    </footer>
  );
}