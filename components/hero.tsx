import Image from "next/image";
import AppPreview1 from "@/public/images/movil1.png";
import AppPreview2 from "@/public/images/movil2.png";
import { Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-background py-16 md:py-24 lg:py-32 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="mr-2" />
              Movilidad corporativa inteligente
            </div>

            {/* Main heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground text-balance leading-tight">
                <span className="text-primary">SharetoGo</span>
              </h1>
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-foreground text-balance leading-tight">
                La aplicación de carpooling corporativo
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl">
                Cada empresa es única, por ello, gestionamos la movilidad diaria
                de los trabajadores según sus necesidades.
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="/contratar"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-colors shadow-lg hover:shadow-xl"
              >
                Solicita una demo gratuita
              </a>
              <a
                href="/funcionamiento"
                className="inline-flex items-center justify-center px-8 py-4 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold rounded-xl transition-colors"
              >
                Ver cómo funciona
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
