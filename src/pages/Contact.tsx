import { Button } from '@/components/Button';
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const whatsappMessage = encodeURIComponent("Hello ChadGlobal Market, I'm interested in your general goods. Please share more details and pricing.");
  const whatsappLink = `https://wa.me/1234567890?text=${whatsappMessage}`;

  return (
    <div className="flex flex-col">
      <section className="bg-primary py-12 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold font-heading mb-4">Contact Us</h1>
          <p className="text-xl text-slate-100 max-w-2xl">
            We are ready to assist you with orders, pricing, and inquiries.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold font-heading mb-8 text-primary">Get in Touch</h2>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold font-heading mb-1">Email Us</h3>
                  <p className="text-slate-600 mb-1">Send us an email anytime.</p>
                  <a href="mailto:info@chadglobalmarket.com" className="text-secondary font-medium hover:underline">
                    info@chadglobalmarket.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold font-heading mb-1">Call Us</h3>
                  <p className="text-slate-600 mb-1">Mon-Sat from 8am to 6pm.</p>
                  <a href="tel:+1234567890" className="text-secondary font-medium hover:underline">
                    +123 456 7890
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold font-heading mb-1">WhatsApp</h3>
                  <p className="text-slate-600 mb-1">Chat with us directly.</p>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-secondary font-medium hover:underline">
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold font-heading mb-1">Business Hours</h3>
                  <p className="text-slate-600">Monday – Saturday</p>
                  <p className="text-slate-600">8:00 AM – 6:00 PM</p>
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 bg-slate-50 rounded-lg border border-slate-100">
              <h3 className="text-lg font-bold font-heading mb-2">Ready to start?</h3>
              <p className="text-slate-600 mb-4">
                Contact us via WhatsApp for the fastest response regarding pricing and availability.
              </p>
              <Button href={whatsappLink} target="_blank" rel="noopener noreferrer" variant="secondary" className="w-full gap-2 justify-center">
                <MessageCircle className="h-5 w-5" />
                WhatsApp Us Now
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-slate-100">
            <h2 className="text-2xl font-bold font-heading mb-6 text-primary">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
