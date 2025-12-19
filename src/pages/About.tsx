import { Button } from '@/components/Button';

export default function About() {
  return (
    <div className="flex flex-col">
      <section className="bg-primary py-12 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold font-heading mb-4">About ChadGlobal Market</h1>
          <p className="text-xl text-slate-100 max-w-2xl">
            A general goods trading company dedicated to supplying reliable and affordable products locally and internationally.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold font-heading mb-6 text-primary">Who We Are</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                ChadGlobal Market is a premier general goods trading company committed to excellence. We specialize in sourcing and distributing a variety of everyday products, ensuring quality, consistency, and timely delivery.
              </p>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Our goal is to build long-term relationships with our customers by offering trusted products and responsive customer service. Whether you are an individual shopper, a retailer, or a business looking for bulk supplies, we are here to serve you.
              </p>
              <Button href="/contact">Contact Us Today</Button>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop" 
                alt="Warehouse and logistics" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-primary">
              <h3 className="text-2xl font-bold font-heading mb-4 text-primary">Our Mission</h3>
              <p className="text-slate-600 text-lg">
                To connect markets and deliver quality general goods with honesty, efficiency, and professionalism.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-secondary">
              <h3 className="text-2xl font-bold font-heading mb-4 text-secondary">Our Vision</h3>
              <p className="text-slate-600 text-lg">
                To become a trusted global market partner for general goods supply.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
