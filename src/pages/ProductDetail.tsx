import { useParams, Link, Navigate } from 'react-router-dom';
import { useProduct, useCategories } from '@/hooks/useContent';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { OptimizedImage } from '@/components/OptimizedImage';
import { 
  ArrowLeft, 
  MessageCircle, 
  CheckCircle2, 
  Box, 
  Globe2, 
  Scale,
  FileCheck,
  Loader2
} from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading: isProductLoading } = useProduct(id || '');
  const { data: categories = [] } = useCategories();

  if (isProductLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const getCategoryName = (id: string) => {
    const category = categories.find(c => c.id === id);
    return category ? category.name : id;
  };

  // Helper to render detail items safely
  const renderDetailItem = (key: string, value: string | string[] | object) => {
    if (key === 'Uses' && Array.isArray(value)) {
      return (
        <div key={key} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-slate-900">{key}</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {value.map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-sm font-medium text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      return (
        <div key={key} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileCheck className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-slate-900">{key}</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(value).map(([subKey, subValue]) => (
              <div key={subKey} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">{subKey}</div>
                <div className="text-sm font-bold text-slate-900">{String(subValue)}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div key={key} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{key}</span>
        <span className="font-bold text-slate-900 text-lg">{String(value)}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative bg-slate-900 py-16 lg:py-24 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] opacity-[0.03] mix-blend-overlay bg-cover bg-center pointer-events-none" />

        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-8 max-w-3xl">
              <Link to="/products" className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-white transition-colors group">
                <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center mr-3 group-hover:bg-white/20 transition-all backdrop-blur-sm">
                  <ArrowLeft className="h-4 w-4" />
                </div>
                Back to Catalog
              </Link>

              <div>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <Badge className="bg-blue-500/20 text-blue-200 border-blue-500/30 px-3 py-1 text-sm font-semibold backdrop-blur-md">
                    {getCategoryName(product.category)}
                  </Badge>
                  {product.details?.Origin && typeof product.details.Origin === 'string' && (
                    <Badge variant="outline" className="gap-1.5 text-slate-300 border-white/20 bg-white/5 px-3 py-1 backdrop-blur-md">
                      <Globe2 className="h-3.5 w-3.5" />
                      {product.details.Origin}
                    </Badge>
                  )}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-heading text-white tracking-tight leading-[1.1]">
                  {product.name}
                </h1>
              </div>
            </div>

            <div className="flex gap-3 shrink-0 pb-2">
              <Link to={`/contact?product=${encodeURIComponent(product.name)}`}>
                <Button size="lg" className="h-14 px-8 rounded-full bg-white text-slate-900 hover:bg-blue-50 shadow-xl shadow-black/10 gap-2 text-base font-bold transition-all hover:-translate-y-0.5 hover:scale-105">
                  <MessageCircle className="h-5 w-5" />
                  Request Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Main Image Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="sticky top-48 space-y-8">
              <div className="rounded-[2.5rem] overflow-hidden bg-white shadow-2xl shadow-slate-200 border-4 border-white aspect-[4/3] relative group">
                {product.image ? (
                  <OptimizedImage
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[1.5s]"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    loading="eager"
                  />
                ) : (
                    <div className="flex items-center justify-center w-full h-full text-slate-300 bg-slate-50">
                      <Box className="h-24 w-24 opacity-50" />
                  </div>
                )}

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
              
              {/* Quick Specs Cards */}
              <div className="grid grid-cols-2 gap-4">
                {product.details?.["Minimum Order"] && typeof product.details["Minimum Order"] === 'string' && (
                  <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow">
                    <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
                      <Scale className="h-6 w-6" />
                     </div>
                     <div>
                      <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Min Order</div>
                      <div className="font-bold text-slate-900 text-lg leading-tight">{product.details["Minimum Order"]}</div>
                     </div>
                   </div>
                 )}
                {product.details?.["Order Type"] && typeof product.details["Order Type"] === 'string' && (
                  <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow">
                    <div className="bg-emerald-50 p-3 rounded-2xl text-emerald-600">
                      <Box className="h-6 w-6" />
                     </div>
                     <div>
                      <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Order Type</div>
                      <div className="font-bold text-slate-900 text-lg leading-tight">{product.details["Order Type"]}</div>
                     </div>
                   </div>
                 )}
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-slate-100 mb-8">
              <h3 className="text-2xl font-bold font-heading mb-6 text-slate-900 flex items-center gap-3">
                Product Overview
                <div className="h-px flex-1 bg-slate-100" />
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <h3 className="text-2xl font-bold font-heading text-slate-900">Technical Specifications</h3>
                <div className="h-px flex-1 bg-slate-200" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.details && Object.entries(product.details).map(([key, value]) => {
                  // Skip keys we've already displayed prominently
                  if (['Origin', 'Minimum Order', 'Order Type'].includes(key)) return null;
                  return renderDetailItem(key, value);
                })}
              </div>
            </div>
            
            {/* CTA Box */}
            <div className="mt-16 relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-10 md:p-12 text-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[80px] opacity-20 -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600 rounded-full blur-[80px] opacity-20 translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10">
                <h3 className="text-3xl font-bold font-heading text-white mb-4">Ready to place an order?</h3>
                <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                  Get a competitive quote today. We handle all logistics and export documentation for a seamless experience.
                </p>
                <Link to={`/contact?product=${encodeURIComponent(product.name)}`}>
                  <Button size="lg" className="h-14 px-10 rounded-full bg-white text-slate-900 hover:bg-slate-50 font-bold text-lg shadow-lg hover:scale-105 transition-all">
                    Contact Sales Team
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
