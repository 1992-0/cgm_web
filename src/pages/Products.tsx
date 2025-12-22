import { useState } from 'react';
import categoriesData from '@/data/categories.json';
import productsData from '@/data/products.json';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Checkbox } from '@/components/ui/Checkbox';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import {
  Package,
  ShoppingCart,
  Heart,
  ChevronDown,
  Search
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

          {/* Price Range (Visual Only) */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Price</h3>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Input type="number" placeholder="Min" className="h-9" />
                <span className="text-muted-foreground">-</span>
                <Input type="number" placeholder="Max" className="h-9" />
              </div>
              <Button className="w-full bg-secondary/10 text-secondary hover:bg-secondary/20" variant="ghost">Apply</Button>
            </div>
          </div>

          {/* Dummy Filters for Visual Completeness */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">Availability</h3>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input type="radio" name="availability" id="all" className="accent-primary" defaultChecked />
                <label htmlFor="all" className="text-sm">All</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" name="availability" id="instock" className="accent-primary" />
                <label htmlFor="instock" className="text-sm">In Stock</label>
              </div>
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
                <Card key={product.id} className="overflow-hidden group border-0 shadow-none hover:shadow-xl transition-all duration-300 bg-white">
                  {/* Image Container */}
                  <div className="relative aspect-square bg-muted/30 overflow-hidden rounded-2xl m-2">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-muted-foreground">
                        <Package className="h-12 w-12 opacity-20" />
                      </div>
                    )}

                    {/* Floating Actions */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
                      <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full shadow-sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Badge */}
                    <Badge className="absolute top-3 left-3 bg-white/90 text-foreground hover:bg-white shadow-sm backdrop-blur-sm pointer-events-none">
                      {getCategoryName(product.category)}
                    </Badge>
                  </div>

                  <CardContent className="p-4 pt-2">
                    <h3 className="font-bold font-heading text-lg leading-tight mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3 h-10">
                      {product.description}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-bold text-primary">RFQ</span>
                      {/* <span className="text-sm text-muted-foreground line-through">$20.00</span> */}
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full rounded-xl gap-2 group-hover:bg-primary group-hover:text-white transition-colors">
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </Button>
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