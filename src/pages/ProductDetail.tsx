import { useParams, Link, Navigate } from 'react-router-dom';
import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { OptimizedImage } from '@/components/OptimizedImage';
import { 
  ArrowLeft, 
  MessageCircle, 
  CheckCircle2, 
  Box, 
  Globe2, 
  Scale 
} from 'lucide-react';

interface ProductDetails {
  Origin?: string;
  "Minimum Order"?: string;
  "Order Type"?: string;
  [key: string]: string | string[] | object | undefined;
}

interface Product {
  id: string;
  category: string;
  name: string;
  description: string;
  image?: string;
  details?: ProductDetails;
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = productsData.find(p => p.id === id) as Product | undefined;

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const getCategoryName = (id: string) => {
    const category = categoriesData.find(c => c.id === id);
    return category ? category.name : id;
  };

  // Helper to render detail items safely
  const renderDetailItem = (key: string, value: string | string[] | object) => {
    if (key === 'Uses' && Array.isArray(value)) {
      return (
        <div key={key} className="bg-slate-50 p-4 rounded-xl">
          <h4 className="font-semibold text-slate-900 mb-2">{key}</h4>
          <ul className="space-y-1">
            {value.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      return (
        <div key={key} className="bg-slate-50 p-4 rounded-xl col-span-1 md:col-span-2">
          <h4 className="font-semibold text-slate-900 mb-2">{key}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(value).map(([subKey, subValue]) => (
              <div key={subKey} className="flex justify-between border-b border-slate-200 pb-2 last:border-0">
                <span className="text-sm font-medium text-slate-500">{subKey}</span>
                <span className="text-sm font-semibold text-slate-900">{String(subValue)}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div key={key} className="bg-slate-50 p-4 rounded-xl flex flex-col">
        <span className="text-sm font-medium text-slate-500 mb-1">{key}</span>
        <span className="font-semibold text-slate-900">{String(value)}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header / Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="container-custom py-8">
          <Link to="/products" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-primary mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Products
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="default" className="shadow-sm">
                  {getCategoryName(product.category)}
                </Badge>
                {product.details?.Origin && (
                  <Badge variant="outline" className="gap-1 text-slate-600 bg-white">
                    <Globe2 className="h-3 w-3" />
                    {product.details.Origin}
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-heading text-slate-900">{product.name}</h1>
            </div>
            
            <div className="flex gap-3">
              <Link to={`/contact?product=${encodeURIComponent(product.name)}`}>
                <Button size="lg" className="rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Request Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Image */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <div className="rounded-3xl overflow-hidden bg-slate-100 border border-slate-100 shadow-sm aspect-[4/3] relative group">
                {product.image ? (
                  <OptimizedImage
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    loading="eager"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-slate-300">
                    <Box className="h-20 w-20" />
                  </div>
                )}
              </div>
              
              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                 {product.details?.["Minimum Order"] && (
                   <div className="bg-blue-50 p-4 rounded-2xl flex items-center gap-3">
                     <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                       <Scale className="h-5 w-5" />
                     </div>
                     <div>
                       <div className="text-xs text-blue-600 font-medium uppercase tracking-wider">Min Order</div>
                       <div className="font-bold text-slate-900">{product.details["Minimum Order"]}</div>
                     </div>
                   </div>
                 )}
                 {product.details?.["Order Type"] && (
                   <div className="bg-emerald-50 p-4 rounded-2xl flex items-center gap-3">
                     <div className="bg-emerald-100 p-2 rounded-full text-emerald-600">
                       <Box className="h-5 w-5" />
                     </div>
                     <div>
                       <div className="text-xs text-emerald-600 font-medium uppercase tracking-wider">Type</div>
                       <div className="font-bold text-slate-900">{product.details["Order Type"]}</div>
                     </div>
                   </div>
                 )}
              </div>
            </div>
          </div>

          {/* Details Content */}
          <div className="lg:col-span-7">
            <div className="prose prose-slate max-w-none mb-10">
              <h3 className="text-2xl font-bold font-heading mb-4">Product Description</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="border-t border-slate-100 pt-10">
              <h3 className="text-2xl font-bold font-heading mb-6">Specifications & Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.details && Object.entries(product.details).map(([key, value]) => {
                  // Skip keys we've already displayed prominently
                  if (['Origin', 'Minimum Order', 'Order Type'].includes(key)) return null;
                  return renderDetailItem(key, value);
                })}
              </div>
            </div>
            
            <div className="mt-12 bg-secondary/5 border border-secondary/10 rounded-3xl p-8 text-center">
               <h3 className="text-2xl font-bold font-heading text-secondary mb-2">Interested in this product?</h3>
               <p className="text-slate-600 mb-6 max-w-lg mx-auto">
                 We offer competitive pricing and handle all export documentation. Contact us today for a custom quote.
               </p>
               <Link to={`/contact?product=${encodeURIComponent(product.name)}`}>
                <Button size="lg" variant="secondary" className="rounded-full px-8 gap-2">
                  Contact Sales Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
