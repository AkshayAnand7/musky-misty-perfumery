import Hero from '@/components/Hero';
import CategorySection from '@/components/CategorySection';
import ProductCard from '@/components/ProductCard';
import { useWishlist } from '@/hooks/useWishlist';
import products from '@/data/products.json';
import { motion } from 'framer-motion';

const Index = () => {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const featured = products.slice(0, 8);

  return (
    <div>
      <Hero />

      {/* Featured Products */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-primary/70 mb-3 font-body">Curated Selection</p>
            <h2 className="font-heading text-3xl md:text-5xl gradient-gold-text">Featured Fragrances</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featured.map(p => (
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
          </div>
        </div>
      </section>

      <CategorySection />
    </div>
  );
};

export default Index;
