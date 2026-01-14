import { Button } from '@/components/ui/Button';
import { Mail, Phone, Clock, MessageCircle, Send, ArrowRight, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const productName = searchParams.get('product');
    if (productName) {
      setFormData(prev => ({
        ...prev,
        message: `I am interested in getting a quote for ${productName}. Please provide more details regarding pricing and availability.`
      }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

    if (!endpoint) {
      // Fallback simulation
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      // Reset status after a few seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const whatsappMessage = encodeURIComponent("Hello Chad Global Market, I'm interested in your general goods. Please share more details and pricing.");
  const whatsappLink = `https://wa.me/23569030405?text=${whatsappMessage}`;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-white border-b border-slate-200 py-16 lg:py-20 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-50 rounded-full blur-3xl opacity-50 translate-y-1/2" />
        
        <div className="container-custom relative z-10">
          <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-4 text-slate-900">Get in Touch</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We are ready to assist you with orders, pricing, and inquiries. Reach out to our team today.
          </p>
        </div>
      </section>

      <div className="container-custom py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Information */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold font-heading mb-8 text-slate-900">Contact Details</h2>

              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="bg-blue-50 p-4 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-heading mb-1 text-slate-900">Email Us</h3>
                    <p className="text-slate-500 mb-2 text-sm">For general inquiries and quotes</p>
                    <a href="mailto:info@chadglobalmarket.com" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors text-lg">
                      info@chadglobalmarket.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="bg-emerald-50 p-4 rounded-2xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-heading mb-1 text-slate-900">Call Us</h3>
                    <p className="text-slate-500 mb-2 text-sm">Mon-Sat from 8am to 6pm</p>
                    <a href="tel:+23569030405" className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors text-lg">
                      +235 69 03 04 05
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="bg-green-50 p-4 rounded-2xl text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-heading mb-1 text-slate-900">WhatsApp</h3>
                    <p className="text-slate-500 mb-2 text-sm">Chat with us directly for quick responses</p>
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-green-600 font-semibold hover:text-green-700 transition-colors text-lg inline-flex items-center gap-2">
                      Start Chat <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="bg-amber-50 p-4 rounded-2xl text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-heading mb-1 text-slate-900">Office Hours</h3>
                    <p className="text-slate-500 text-sm">
                      Monday – Saturday<br/>
                      8:00 AM – 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
            <h3 className="text-2xl font-bold font-heading mb-6 text-slate-900">Send us a Message</h3>
            
            {submitStatus === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-300">
                <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h4>
                <p className="text-slate-600">Thank you for contacting us. We will get back to you shortly.</p>
                <Button 
                  onClick={() => setSubmitStatus('idle')}
                  variant="outline" 
                  className="mt-6"
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-slate-700 ml-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your requirements..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:bg-white transition-all resize-none"
                  />
                </div>

                {submitStatus === 'error' && (
                  <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>Something went wrong. Please try again or contact us directly via email or WhatsApp.</span>
                  </div>
                )}

                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isSubmitting}
                  className="w-full h-14 rounded-xl text-lg font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5 gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send className="h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
