import { Button } from '@/components/ui/Button';
import { Mail, Phone, Clock, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/Input';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const productName = searchParams.get('product');
    if (productName) {
      setFormData(prev => ({
        ...prev,
        message: `I am interested in getting a quote for ${productName}. Please provide more details regarding pricing and availability.`
      }));
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const whatsappMessage = encodeURIComponent("Hello Chad Global Market, I'm interested in your general goods. Please share more details and pricing.");
  const whatsappLink = `https://wa.me/23569030405?text=${whatsappMessage}`;

  return (
    <div className="flex flex-col">
      <section className="bg-primary/5 py-16 text-center">
        <div className="container-custom">
          <h1 className="text-4xl font-bold font-heading mb-4 text-primary">Contact Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We are ready to assist you with orders, pricing, and inquiries.
          </p>
        </div>
      </section>

      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl font-bold font-heading mb-8 text-foreground">Get in Touch</h2>

              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="bg-primary/10 p-4 rounded-2xl text-primary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-heading mb-1">Email Us</h3>
                    <p className="text-muted-foreground mb-1">Send us an email anytime.</p>
                    <a href="mailto:info@chadglobalmarket.com" className="text-primary font-medium hover:underline text-lg">
                      info@chadglobalmarket.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="bg-primary/10 p-4 rounded-2xl text-primary">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-heading mb-1">Call Us</h3>
                    <p className="text-muted-foreground mb-1">Mon-Sat from 8am to 6pm.</p>
                    <a href="tel:+23569030405" className="text-primary font-medium hover:underline text-lg">
                      +235 69 03 04 05
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="bg-primary/10 p-4 rounded-2xl text-primary">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-heading mb-1">WhatsApp</h3>
                    <p className="text-muted-foreground mb-1">Chat with us directly.</p>
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline text-lg">
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-6">
                  <div className="bg-primary/10 p-4 rounded-2xl text-primary">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-heading mb-1">Business Hours</h3>
                    <p className="text-muted-foreground">Monday – Saturday</p>
                    <p className="text-muted-foreground">8:00 AM – 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-secondary/5 rounded-3xl border border-secondary/10">
              <h3 className="text-xl font-bold font-heading mb-2 text-secondary">Ready to start?</h3>
              <p className="text-muted-foreground mb-6">
                Contact us via WhatsApp for the fastest response regarding pricing and availability.
              </p>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" className="w-full gap-2 justify-center h-12 text-base">
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Us Now
                </Button>
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 h-fit">
            <h2 className="text-2xl font-bold font-heading mb-8 text-foreground">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Your Name
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-slate-50 border-slate-200 h-12"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-slate-50 border-slate-200 h-12"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow resize-none text-sm"
                  placeholder="How can we help you?"
                />
              </div>

              <Button type="submit" size="lg" className="w-full h-12 text-base">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
