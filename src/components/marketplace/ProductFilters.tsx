import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  Filter, 
  X,
  SlidersHorizontal,
  Star,
  Truck,
  Shield
} from "lucide-react";

interface FilterOptions {
  searchTerm: string;
  category: string;
  priceRange: [number, number];
  rating: number;
  brands: string[];
  availability: string[];
  features: string[];
  sortBy: string;
}

interface ProductFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  isOpen,
  onToggle
}) => {
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'skincare', label: 'Skincare' },
    { value: 'haircare', label: 'Hair Care' },
    { value: 'supplements', label: 'Supplements' },
    { value: 'wellness', label: 'Wellness' },
    { value: 'tools', label: 'Tools & Devices' }
  ];

  const brands = [
    'SkinGlow',
    'HairVital',
    'WellnessPro',
    'NatureCare',
    'PureHealth',
    'VitalityPlus',
    'GlowEssence',
    'HealthFirst'
  ];

  const availabilityOptions = [
    { value: 'in-stock', label: 'In Stock' },
    { value: 'free-shipping', label: 'Free Shipping' },
    { value: 'same-day', label: 'Same Day Delivery' }
  ];

  const features = [
    { value: 'organic', label: 'Organic' },
    { value: 'cruelty-free', label: 'Cruelty Free' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'fragrance-free', label: 'Fragrance Free' },
    { value: 'dermatologist-tested', label: 'Dermatologist Tested' }
  ];

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Customer Rating' },
    { value: 'newest', label: 'Newest' },
    { value: 'best-selling', label: 'Best Selling' }
  ];

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleBrandToggle = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    handleFilterChange('brands', newBrands);
  };

  const handleAvailabilityToggle = (option: string) => {
    const newAvailability = filters.availability.includes(option)
      ? filters.availability.filter(a => a !== option)
      : [...filters.availability, option];
    handleFilterChange('availability', newAvailability);
  };

  const handleFeatureToggle = (feature: string) => {
    const newFeatures = filters.features.includes(feature)
      ? filters.features.filter(f => f !== feature)
      : [...filters.features, feature];
    handleFilterChange('features', newFeatures);
  };

  const activeFiltersCount = [
    filters.category !== 'all' ? 1 : 0,
    filters.priceRange[0] > 0 || filters.priceRange[1] < 1000 ? 1 : 0,
    filters.rating > 0 ? 1 : 0,
    filters.brands.length,
    filters.availability.length,
    filters.features.length
  ].reduce((sum, count) => sum + count, 0);

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          onClick={onToggle}
          variant="outline"
          className="w-full justify-between"
        >
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </div>
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Filter Sidebar */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block`}>
        <Card className="sticky top-4">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Filters</CardTitle>
              <div className="flex items-center gap-2">
                {activeFiltersCount > 0 && (
                  <Button
                    onClick={onClearFilters}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Clear
                  </Button>
                )}
                <Button
                  onClick={onToggle}
                  variant="outline"
                  size="sm"
                  className="lg:hidden"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Search */}
            <div className="space-y-2">
              <Label htmlFor="search">Search Products</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="search"
                  placeholder="Search products..."
                  value={filters.searchTerm}
                  onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div className="space-y-3">
              <Label>Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}</Label>
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => handleFilterChange('priceRange', value)}
                max={1000}
                min={0}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>$0</span>
                <span>$1000+</span>
              </div>
            </div>

            {/* Rating */}
            <div className="space-y-3">
              <Label>Minimum Rating</Label>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{filters.rating}+ stars</span>
              </div>
              <Slider
                value={[filters.rating]}
                onValueChange={(value) => handleFilterChange('rating', value[0])}
                max={5}
                min={0}
                step={0.5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0 stars</span>
                <span>5 stars</span>
              </div>
            </div>

            {/* Brands */}
            <div className="space-y-3">
              <Label>Brands</Label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={filters.brands.includes(brand)}
                      onCheckedChange={() => handleBrandToggle(brand)}
                    />
                    <Label htmlFor={`brand-${brand}`} className="text-sm">
                      {brand}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="space-y-3">
              <Label>Availability</Label>
              <div className="space-y-2">
                {availabilityOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`availability-${option.value}`}
                      checked={filters.availability.includes(option.value)}
                      onCheckedChange={() => handleAvailabilityToggle(option.value)}
                    />
                    <Label htmlFor={`availability-${option.value}`} className="text-sm">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <Label>Features</Label>
              <div className="space-y-2">
                {features.map((feature) => (
                  <div key={feature.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`feature-${feature.value}`}
                      checked={filters.features.includes(feature.value)}
                      onCheckedChange={() => handleFeatureToggle(feature.value)}
                    />
                    <Label htmlFor={`feature-${feature.value}`} className="text-sm">
                      {feature.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Sort By */}
            <div className="space-y-2">
              <Label>Sort By</Label>
              <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 border-t">
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <Shield className="w-3 h-3" />
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-3 h-3" />
                  <span>Free Shipping on $50+</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProductFilters;

