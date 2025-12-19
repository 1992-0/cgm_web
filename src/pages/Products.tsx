import { useState } from 'react';
import categoriesData from '@/data/categories.json';
import productsData from '@/data/products.json';
import { Button } from '@/components/Button';
import { cn } from '@/lib/utils';
import { MessageCircle, Package, Home, Shirt, Coffee, Zap } from 'lucide-react';

// Map icon strings to components
const iconMap: Record<string, any> = {
  Home,
  Shirt,
  Coffee,
  Zap,
  Package
};

export default function Products() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredProducts = activeCategory === 'all' 
    ? productsData 
    : productsData.filter(p => p.category === activeCategory);

  const getCategoryName = (id: string) => {
    const category = categoriesData.find(c => c.id === id);
    return category ? category.name : id;
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <section className="bg-primary py-12 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold font-heading mb-4">Our Products</h1>
          <p className="text-xl text-slate-100 max-w-2xl">
            Browse our wide range of quality general goods.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar / Category Filter */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-bold font-heading mb-4 text-primary">Categories</h3>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => setActiveCategory('all')}
                  className={cn(
                    "text-left px-4 py-2 rounded-md transition-colors text-sm font-medium",
                    activeCategory === 'all' 
                      ? "bg-primary text-white" 
                      : "text-slate-600 hover:bg-slate-100"
                  )}
                >
                  All Products
                </button>
                {categoriesData.map((category) => {
                  const Icon = iconMap[category.icon] || Package;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={cn(
                        "flex items-center space-x-3 text-left px-4 py-2 rounded-md transition-colors text-sm font-medium",
                        activeCategory === category.id 
                          ? "bg-primary text-white" 
                          : "text-slate-600 hover:bg-slate-100"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:w-3/4">
            <div className="mb-6">
              <h2 className="text-2xl font-bold font-heading text-slate-800">
                {activeCategory === 'all' ? 'All Products' : getCategoryName(activeCategory)}
              </h2>
              <p className="text-slate-500 mt-1">
                Showing {filteredProducts.length} result{filteredProducts.length !== 1 && 's'}
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full">
                    <div className="h-48 bg-slate-100 flex items-center justify-center text-slate-300">
                      {/* Placeholder for product image */}
                      <Package className="h-16 w-16" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="mb-2">
                        <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
                          {getCategoryName(product.category)}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold font-heading text-slate-800 mb-2">{product.name}</h3>
                      <p className="text-slate-600 text-sm mb-6 flex-1">
                        {product.description}
                      </p>
                      <Button href="/contact" variant="secondary" size="sm" className="w-full gap-2">
                        <MessageCircle className="h-4 w-4" />
                        Contact for Price
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <Package className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900">No products found</h3>
                <p className="text-slate-500 mt-2">Try selecting a different category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
