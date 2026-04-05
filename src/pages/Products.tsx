import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { useWishlist } from '@/hooks/useWishlist';
import products from '@/data/products.json';

const categories = ['All', 'Oud', 'Fresh', 'Sweet', 'Luxury'];
const sortOptions = [
  { label: 'Default', value: 'default' },
  { label: 'Price: Low → High', value: 'low' },
  { label: 'Price: High → Low', value: 'high' },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState('default');
  const [showFilters, setShowFilters] = useState(false);
  const { toggleWishlist, isWishlisted } = useWishlist();

  const filtered = useMemo(() => {
    let result = [...products];

    if (search) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== 'All') {
      result = result.filter(p => p.category === category);
    }

    if (sort === 'low') {
      result.sort((a, b) => a.prices['20ml'] - b.prices['20ml']);
    } else if (sort === 'high') {
      result.sort((a, b) => b.prices['20ml'] - a.prices['20ml']);
    }

    return result;
  }, [search, category, sort]);

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen pt-24 pb-24 md:pb-12 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-primary/60 mb-4 font-body font-light">Discover</p>
          <h1 className="font-heading text-3xl md:text-5xl gradient-gold-text mb-3">Our Collection</h1>
          <p className="text-sm text-muted-foreground font-body">Over 100 premium fragrances to explore</p>
        </motion.div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search fragrances..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-10 py-3 rounded-full bg-card border border-border/20 text-foreground placeholder:text-muted-foreground/50 font-body text-sm focus:outline-none focus:border-primary/40 transition-colors"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-[10px] tracking-[0.15em] uppercase font-body transition-all duration-300 ${
                  category === cat
                    ? 'gradient-gold-btn text-primary-foreground'
                    : 'bg-card border border-border/20 text-foreground/50 hover:border-primary/30 hover:text-primary'
                }`}
              >
                {cat}
                {cat !== 'All' && (
                  <span className="ml-1.5 opacity-50">
                    {products.filter(p => cat === 'All' || p.category === cat).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="appearance-none bg-card border border-border/20 rounded-full pl-4 pr-10 py-2 text-xs font-body text-foreground/60 focus:outline-none focus:border-primary/40 cursor-pointer"
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown size={12} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Results count */}
        <p className="text-[10px] text-muted-foreground/60 mb-6 font-body tracking-wider uppercase">
          {filtered.length} fragrance{filtered.length !== 1 ? 's' : ''} found
        </p>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          <AnimatePresence>
            {filtered.map(p => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                category={p.category}
                price={p.prices['20ml']}
                isWishlisted={isWishlisted(p.id)}
                onToggleWishlist={toggleWishlist}
              />
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="text-muted-foreground font-body text-sm">No fragrances found matching your criteria.</p>
            <button
              onClick={() => { setSearch(''); handleCategoryChange('All'); }}
              className="mt-4 text-primary text-xs font-body hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
