import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ArrowRight, ShoppingBag, ShieldCheck, Globe } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-[#f0fdf4] py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578916171728-56685ff8d4cd?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-5"></div>
        <div className="container-custom relative">
          <div className="max-w-3xl">
            <h1 className="mb-6 text-4xl font-bold font-heading leading-tight sm:text-5xl lg:text-6xl text-foreground">
              Your Reliable Source for <span className="text-primary">Quality Export Goods</span>
            </h1>
            <p className="mb-8 text-xl text-muted-foreground sm:max-w-xl">
              We supply premium agricultural products, livestock, and raw materials from Chad to the world.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products">
                <Button size="lg" className="gap-2 h-12 px-8 text-base">
                  Browse Our Products
                  <ShoppingBag className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="gap-2 h-12 px-8 text-base">
                  Contact Us Today
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold font-heading mb-3 text-foreground">Reliability</h3>
              <p className="text-muted-foreground leading-relaxed">
                We focus on consistent quality and timely delivery you can trust.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/10 text-secondary mb-6">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold font-heading mb-3 text-foreground">Fair Pricing</h3>
              <p className="text-muted-foreground leading-relaxed">
                Competitive prices for individuals, retailers, and businesses.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all duration-300">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold font-heading mb-3 text-foreground">Customer Satisfaction</h3>
              <p className="text-muted-foreground leading-relaxed">
                Building long-term relationships through responsive service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
        <div className="container-custom relative text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">Ready to Order?</h2>
          <p className="text-lg text-white/90 mb-10 max-w-2xl mx-auto">
            Contact us today for pricing and availability. We are ready to assist you with your general goods needs.
          </p>
          <Link to="/contact">
            <Button size="lg" variant="default" className="bg-white text-secondary hover:bg-white/90 h-12 px-8 text-base font-bold shadow-xl">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
