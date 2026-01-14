import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts, useCategories, useCategoryOverview } from '@/hooks/useContent';
import { Product } from '@/services/content/types';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Checkbox } from '@/components/ui/Checkbox';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { OptimizedImage } from '@/components/OptimizedImage';
import { 
  Package, 
  Search,
  Loader2
} from 'lucide-react';

export default function Products() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: productsData = [], isLoading: isProductsLoading } = useProducts();
  const { data: categoriesData = [], isLoading: isCategoriesLoading } = useCategories();
  
  // Only fetch overview if exactly one category is selected
  const selectedCategoryId = selectedCategories.length === 1 ? selectedCategories[0] : '';
  const { data: selectedCategoryOverview } = useCategoryOverview(selectedCategoryId);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filteredProducts = productsData.filter(p => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryName = (id: string) => {
    const category = categoriesData.find(c => c.id === id);
    return category ? category.name : id;
  };

  if (isProductsLoading || isCategoriesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="relative bg-slate-900 py-20 lg:py-28 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] opacity-[0.03] mix-blend-overlay bg-cover bg-center pointer-events-none" />

        <div className="container-custom relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
            <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20 border-white/10 px-4 py-1.5 backdrop-blur-md transition-colors">
              Global Trade Catalog
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading text-white tracking-tight leading-[1.1]">
              World-Class <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Products</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl">
              Discover our premium selection of Chadian exports and essential imports. Quality assured, logistics handled.
            </p>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Modernized */}
          <aside className="lg:w-64 shrink-0 space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-900">Filters</h3>
                {selectedCategories.length > 0 && (
                  <button
                    onClick={() => setSelectedCategories([])}
                    className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Categories</h4>
                  <div className="space-y-3">
                    {categoriesData.map((category) => (
                      <label
                        key={category.id}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <div className="relative flex items-center">
                          <Checkbox
                            id={category.id}
                            checked={selectedCategories.includes(category.id)}
                            onChange={() => toggleCategory(category.id)}
                            className="border-slate-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                        </div>
                        <span className={`text-sm transition-colors ${selectedCategories.includes(category.id) ? 'text-slate-900 font-medium' : 'text-slate-600 group-hover:text-slate-900'}`}>
                          {category.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search products..."
                  className="pl-10 bg-slate-50 border-transparent focus:bg-white focus:border-primary/20 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <p className="text-sm text-slate-500 whitespace-nowrap">
                Showing <span className="font-bold text-slate-900">{filteredProducts.length}</span> results
              </p>
            </div>

          {selectedCategoryOverview && (
            <section className="mb-6 rounded-3xl border border-slate-100 bg-white shadow-sm p-6 md:p-8">
              <h2 className="text-2xl font-bold font-heading text-foreground mb-4">
                {selectedCategoryOverview.title}
              </h2>
              {Array.isArray(selectedCategoryOverview.summary) && (
                <div className="space-y-3">
                  {selectedCategoryOverview.summary.map((text: string, index: number) => (
                    <p key={index} className="text-muted-foreground leading-relaxed">
                      {text}
                    </p>
                  ))}
                </div>
              )}

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.isArray(selectedCategoryOverview.productsToList) && (
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <h3 className="text-lg font-bold font-heading mb-3">Products to List</h3>
                    <ul className="space-y-2">
                      {selectedCategoryOverview.productsToList.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {Array.isArray(selectedCategoryOverview.brandsToFocus) && (
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <h3 className="text-lg font-bold font-heading mb-3">Brands to Focus On</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategoryOverview.brandsToFocus.map((brand: string, index: number) => (
                        <Badge key={index} variant="secondary" className="px-3 py-1">
                          {brand}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {Array.isArray(selectedCategoryOverview.brandsToConsider) && (
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <h3 className="text-lg font-bold font-heading mb-3">Brands to Consider</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategoryOverview.brandsToConsider.map((brand: string, index: number) => (
                        <Badge key={index} variant="secondary" className="px-3 py-1">
                          {brand}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedCategoryOverview.rules && (
                  <div className="md:col-span-2 bg-primary/5 rounded-2xl p-6 border border-primary/10">
                    <h3 className="text-lg font-bold font-heading mb-4 text-foreground">Important Rules</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Array.isArray(selectedCategoryOverview.rules.dont) && (
                        <div>
                          <div className="text-sm font-bold text-slate-900 mb-2">Don’t</div>
                          <ul className="space-y-2">
                            {selectedCategoryOverview.rules.dont.map((item: string, index: number) => (
                              <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {Array.isArray(selectedCategoryOverview.rules.do) && (
                        <div>
                          <div className="text-sm font-bold text-slate-900 mb-2">Do</div>
                          <ul className="space-y-2">
                            {selectedCategoryOverview.rules.do.map((item: string, index: number) => (
                              <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Filter Tags */}
          {selectedCategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => setSelectedCategories([])}
              >
                Clear all
              </Button>
              {selectedCategories.map(catId => (
                <Badge key={catId} variant="secondary" className="flex items-center gap-1 cursor-pointer" onClick={() => toggleCategory(catId)}>
                  {getCategoryName(catId)} <span className="text-[10px]">✕</span>
                </Badge>
              ))}
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col">
                  {/* Image Container */}
                  <div className="p-3 pb-0">
                    <Link to={`/products/${product.id}`} className="block relative aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-slate-100">
                      {product.image ? (
                        <OptimizedImage
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full text-slate-300">
                          <Package className="h-16 w-16 opacity-30" />
                        </div>
                      )}

                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/95 text-slate-900 shadow-sm backdrop-blur-md px-3 py-1.5 text-xs font-bold border-0">
                          {getCategoryName(product.category)}
                        </Badge>
                      </div>
                    </Link>
                  </div>

                  <CardContent className="p-6 flex-1 flex flex-col">
                    <Link to={`/products/${product.id}`} className="group-hover:text-blue-600 transition-colors">
                      <h3 className="font-bold font-heading text-xl leading-tight mb-3">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-slate-500 text-sm line-clamp-3 mb-6 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between gap-4">
                      <Link to={`/products/${product.id}`} className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors">
                        View Details
                      </Link>
                      <Link to={`/contact?product=${encodeURIComponent(product.name)}`}>
                        <Button size="sm" className="rounded-full h-10 px-5 bg-slate-900 text-white hover:bg-blue-600 shadow-md transition-all hover:-translate-y-0.5">
                          Get Quote
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="bg-muted/50 p-6 rounded-full mb-4">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold">No products found</h3>
              <p className="text-muted-foreground mt-2 max-w-md">
                We couldn't find any products matching your filters. Try adjusting your search or categories.
              </p>
              <Button
                variant="link"
                onClick={() => {
                  setSelectedCategories([]);
                  setSearchQuery('');
                }}
                className="mt-4"
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
