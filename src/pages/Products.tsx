import { useState } from 'react';
import { Link } from 'react-router-dom';
import categoriesData from '@/data/categories.json';
import productsData from '@/data/products.json';
import categoryContent from '@/data/categoryContent.json';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Checkbox } from '@/components/ui/Checkbox';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { OptimizedImage } from '@/components/OptimizedImage';
import { 
  Package, 
  MessageCircle, 
  ChevronDown,
  Search
} from 'lucide-react';

type CategoryOverview = {
  title: string;
  summary?: string[];
  productsToList?: string[];
  brandsToFocus?: string[];
  brandsToConsider?: string[];
  rules?: {
    dont?: string[];
    do?: string[];
  };
};

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

export default function Products() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

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
  }) as Product[];

  const getCategoryName = (id: string) => {
    const category = categoriesData.find(c => c.id === id);
    return category ? category.name : id;
  };

  const selectedCategoryOverview =
    selectedCategories.length === 1
      ? (categoryContent as Record<string, CategoryOverview | undefined>)[selectedCategories[0]]
      : undefined;

  return (
    <div className="container-custom py-8">
      {/* Breadcrumb & Header */}
      <div className="mb-8">
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <span>Home</span>
          <span className="mx-2">/</span>
          <span className="font-medium text-foreground">Products</span>
        </div>
        <h1 className="text-3xl font-bold font-heading text-foreground">Our Products</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:w-1/4 space-y-8">

          {/* Categories */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Categories</h3>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="space-y-3">
              {categoriesData.map((category) => (
                <div key={category.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={category.id} 
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => toggleCategory(category.id)}
                  />
                  <label
                    htmlFor={category.id} 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filteredProducts.length}</span> items
            </p>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search in products..."
                  className="pl-9 h-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
                Sort by <ChevronDown className="h-3 w-3" />
              </Button>
            </div>
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
                <Card key={product.id} className="overflow-hidden group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white flex flex-col items-center text-center">
                  {/* Image Container - Full Bleed */}
                  <Link to={`/products/${product.id}`} className="w-full relative aspect-[4/3] bg-muted/20 overflow-hidden cursor-pointer">
                    {product.image ? (
                      <OptimizedImage
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                          <Package className="h-16 w-16 opacity-20" />
                      </div>
                    )}

                    {/* Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-foreground hover:bg-white shadow-sm backdrop-blur-sm px-3 py-1 text-xs uppercase tracking-wide">
                        {getCategoryName(product.category)}
                      </Badge>
                    </div>
                  </Link>

                  <CardContent className="p-6 flex-1 flex flex-col items-center">
                    <Link to={`/products/${product.id}`} className="hover:text-primary transition-colors">
                      <h3 className="font-bold font-heading text-xl leading-tight mb-3 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed max-w-xs mx-auto">
                      {product.description}
                    </p>
                    <div className="mt-auto pt-2">
                      <Link to={`/products/${product.id}`} className="inline-block px-3 py-1 bg-primary/5 text-primary text-sm font-semibold rounded-full hover:bg-primary/10 transition-colors">
                        View Details
                      </Link>
                    </div>
                  </CardContent>

                  <CardFooter className="p-6 pt-0 w-full">
                    <Link to={`/contact?product=${encodeURIComponent(product.name)}`} className="w-full">
                      <Button className="w-full rounded-full h-11 gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md transition-all hover:translate-y-[-2px]">
                        <MessageCircle className="h-4 w-4" />
                        Get Quote
                      </Button>
                    </Link>
                  </CardFooter>
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
  );
}
