import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { OptimizedImage } from '@/components/OptimizedImage';
import { ArrowRight, ShoppingBag, Truck, FileText, Handshake, CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20 lg:py-32">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-amber-50 rounded-full blur-3xl opacity-50" />

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left Content */}
            <div className="text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold shadow-sm animate-fade-in-up">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                Connecting Chad to the World
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-slate-900 leading-[1.1] tracking-tight">
                  Your Trusted Partner for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Global Trade</span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  We bridge the gap between Chad's premium agricultural resources and the global market, ensuring quality, reliability, and seamless logistics.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                <Link to="/products" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full h-14 rounded-2xl text-lg gap-2 shadow-xl shadow-blue-900/10 hover:shadow-blue-900/20 transition-all hover:-translate-y-0.5">
                    Explore Products
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/contact" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full h-14 rounded-2xl text-lg gap-2 border-slate-200 bg-white/50 backdrop-blur-sm hover:bg-white transition-all">
                    Get a Quote
                    <FileText className="h-5 w-5" />
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators / Stats */}
              <div className="pt-8 border-t border-slate-200/60 flex flex-wrap gap-8 justify-center lg:justify-start text-sm font-medium text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <span>Verified Suppliers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <span>Export-Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>

            {/* Right Image / Visual */}
            <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/10 border border-white/50 bg-white">
                <OptimizedImage
                  src="/container_transport.jpeg"
                  alt="Global Logistics and Transport"
                  className="w-full h-auto object-cover aspect-[4/3] scale-105 hover:scale-110 transition-transform duration-[1.5s]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  loading="eager"
                />

                {/* Floating Glass Cards */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-white/50 flex items-center gap-3 animate-fade-in-left">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-semibold uppercase">Logistics</div>
                    <div className="text-sm font-bold text-slate-900">Fast Delivery</div>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-white/50 flex items-center gap-3 animate-fade-in-right">
                  <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                    <Handshake className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-semibold uppercase">Partners</div>
                    <div className="text-sm font-bold text-slate-900">Trusted Network</div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements behind image */}
              <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full rounded-[2.5rem] border-2 border-slate-200/60 bg-transparent" />
            </div>

          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-heading mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive trade solutions connecting Chad to the world.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: "Agro-commodity Export", desc: "Sourcing and exporting premium Chadian agricultural products." },
              { icon: ShoppingBag, title: "Import & Supply", desc: "Wholesale supply of essential goods, solar systems, and electronics." },
              { icon: FileText, title: "Documentation Support", desc: "Full assistance with export/import paperwork and compliance." },
              { icon: Handshake, title: "Buyer Matchmaking", desc: "Connecting international buyers with trusted local suppliers." }
            ].map((service, index) => (
              <div key={index} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all duration-300 text-center group">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-bold font-heading mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Products Highlights */}
      <section className="py-20 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-heading mb-4">Our Products</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From premium agricultural exports to essential modern goods.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              "Sesame Seeds (White & Brown)",
              "Gum Arabic",
              "Groundnuts (Peanuts)",
              "Dried Hibiscus (Karkadé)",
              "Solar Lamps & Systems",
              "Mobile Phones & Accessories"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  <CheckCircle className="h-5 w-5" />
                </div>
                 <span className="font-medium text-lg">{item}</span>
               </div>
             ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/products">
              <Button variant="outline" size="lg" className="rounded-full px-8">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="bg-primary rounded-[2.5rem] p-8 md:p-16 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">Why Choose Us?</h2>
                <p className="text-primary-foreground/90 text-lg mb-8 max-w-xl">
                  We build long-term partnerships based on trust, quality, and reliability.
                </p>
                <ul className="space-y-4">
                  {[
                    "Direct sourcing from Chad",
                    "Export-ready documentation",
                    "Reliable communication",
                    "Long-term partnership approach"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 w-full flex justify-center lg:justify-end">
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 max-w-md w-full text-center">
                  <h3 className="text-2xl font-bold mb-4">Ready to cooperate?</h3>
                  <p className="mb-8 opacity-90">Contact us today for quotations and cooperation.</p>
                  <Link to="/contact">
                    <Button size="lg" className="w-full bg-white text-primary hover:bg-white/90 font-bold h-12 rounded-xl">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
