import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { useWishlist } from '@/hooks/useWishlist';
import products from '@/data/products.json';

const categories = ['All', 'Oud', 'Fresh', 'Sweet', 'Luxury'];
const sortOptions = [
  { label: 'Default', value: 'default' },
  { label: 'Price: Low to High', value: 'low' },
  { label: 'Price: High to Low', value: 'high' },
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
          className="text-center mb-10"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-primary/70 mb-3 font-body">Discover</p>
          <h1 className="font-heading text-3xl md:text-5xl gradient-gold-text">Our Collection</h1>
        </motion.div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search fragrances..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl glass border border-border/30 bg-card text-foreground placeholder:text-muted-foreground font-body text-sm focus:outline-none focus:border-primary/50 transition-colors"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X size={16} />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center justify-center gap-2 glass border border-border/30 rounded-xl px-4 py-3 text-sm text-foreground/70 font-body"
          >
            <SlidersHorizontal size={16} /> Filters
          </button>
        </div>

        {/* Filters */}
        <div className={`${showFilters ? 'block' : 'hidden'} md:block mb-8`}>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-full text-xs tracking-widest uppercase font-body transition-all duration-300 ${
                    category === cat
                      ? 'gradient-gold-btn text-primary-foreground gold-glow'
                      : 'glass border border-border/30 text-foreground/60 hover:border-primary/30 hover:text-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="ml-auto bg-card border border-border/30 rounded-xl px-4 py-2.5 text-sm font-body text-foreground/70 focus:outline-none focus:border-primary/50"
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-6 font-body">
          {filtered.length} fragrance{filtered.length !== 1 ? 's' : ''} found
        </p>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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
          <div className="text-center py-20">
            <p className="text-muted-foreground font-body">No fragrances found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
