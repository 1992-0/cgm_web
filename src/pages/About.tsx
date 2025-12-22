import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export default function About() {
  return (
    <div className="flex flex-col">
      <section className="bg-primary/5 py-16 lg:py-24 text-center">
        <div className="container-custom">
          <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-6 text-primary">About Chad Global Market</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A general goods trading company dedicated to supplying reliable and affordable products locally and internationally.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-heading text-foreground">Who We Are</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Chad Global Market is a premier general goods trading company committed to excellence. We specialize in sourcing and distributing a variety of everyday products, ensuring quality, consistency, and timely delivery.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our goal is to build long-term relationships with our customers by offering trusted products and responsive customer service. Whether you are an individual shopper, a retailer, or a business looking for bulk supplies, we are here to serve you.
              </p>
              <div className="pt-4">
                <Link to="/contact">
                  <Button size="lg">Contact Us Today</Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop" 
                alt="Warehouse and logistics" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold font-heading mb-4 text-primary">Our Mission</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To connect markets and deliver quality general goods with honesty, efficiency, and professionalism.
              </p>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold font-heading mb-4 text-secondary">Our Vision</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To become a trusted global market partner for general goods supply.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
