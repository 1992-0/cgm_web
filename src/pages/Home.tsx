import { Button } from '@/components/Button';
import { ArrowRight, ShoppingBag, ShieldCheck, Globe } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-primary py-20 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578916171728-56685ff8d4cd?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="mb-6 text-4xl font-bold font-heading leading-tight sm:text-5xl lg:text-6xl">
              Your Reliable Source for <span className="text-secondary">Quality General Goods</span>
            </h1>
            <p className="mb-8 text-xl text-slate-100 sm:max-w-xl">
              We supply a wide range of quality general goods to meet the needs of individuals, retailers, and businesses.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/products" size="lg" variant="secondary" className="gap-2">
                Browse Our Products
                <ShoppingBag className="h-5 w-5" />
              </Button>
              <Button href="/contact" size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary gap-2">
                Contact Us Today
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-lg bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold font-heading mb-2">Reliability</h3>
              <p className="text-slate-600">
                We focus on consistent quality and timely delivery you can trust.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10 text-secondary mb-4">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold font-heading mb-2">Fair Pricing</h3>
              <p className="text-slate-600">
                Competitive prices for individuals, retailers, and businesses.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold font-heading mb-2">Customer Satisfaction</h3>
              <p className="text-slate-600">
                Building long-term relationships through responsive service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold font-heading mb-4 text-primary">Ready to Order?</h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Contact us today for pricing and availability. We are ready to assist you with your general goods needs.
          </p>
          <Button href="/contact" size="lg" variant="primary">
            Get in Touch
          </Button>
        </div>
      </section>
    </div>
  );
}
