import Hero from '@/components/Hero';
import CategorySection from '@/components/CategorySection';
import ProductCard from '@/components/ProductCard';
import { useWishlist } from '@/hooks/useWishlist';
import products from '@/data/products.json';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Shield, Truck, Sparkles } from 'lucide-react';

const trustBadges = [
  { icon: Sparkles, label: '100% Authentic', desc: 'Premium quality oils' },
  { icon: Truck, label: 'Fast Delivery', desc: 'Across India' },
  { icon: Shield, label: 'Secure Orders', desc: 'Via WhatsApp' },
  { icon: Star, label: '500+ Happy Clients', desc: 'Trusted brand' },
];

const testimonials = [
  { name: 'Ayesha K.', text: 'The Oud collection is absolutely divine. Best quality I\'ve found anywhere.', rating: 5 },
  { name: 'Rahul M.', text: 'Baccarat Rouge smells identical to the original. Incredible value for money.', rating: 5 },
  { name: 'Priya S.', text: 'Fast delivery and premium packaging. Musky & Misty is now my go-to!', rating: 5 },
];

const Index = () => {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const featured = products.slice(0, 8);
  const bestSellers = products.filter(p => [5, 49, 95, 86].includes(p.id));

  return (
    <div>
      <Hero />

      {/* Trust Badges */}
      <section className="py-12 border-b border-border/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge, i) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 justify-center"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <badge.icon size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-body font-semibold text-foreground tracking-wide">{badge.label}</p>
                  <p className="text-[10px] text-muted-foreground font-body">{badge.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 md:py-28 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-primary/60 mb-4 font-body font-light">Curated Selection</p>
            <h2 className="font-heading text-3xl md:text-5xl gradient-gold-text mb-4">Featured Fragrances</h2>
            <p className="text-sm text-muted-foreground font-body max-w-md mx-auto">Hand-picked from our collection of over 100 premium perfume oils</p>
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

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-2 border border-primary/30 text-primary font-body tracking-[0.2em] uppercase text-xs px-10 py-3.5 rounded-full transition-all duration-500 hover:border-primary/60 hover:bg-primary/5 hover:scale-105"
            >
              View All Fragrances
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <CategorySection />

      {/* Best Sellers Banner */}
      <section className="py-20 md:py-28 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-primary/[0.03]" />
        <div className="container mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-primary/60 mb-4 font-body font-light">Most Loved</p>
            <h2 className="font-heading text-3xl md:text-5xl gradient-gold-text mb-4">Best Sellers</h2>
            <p className="text-sm text-muted-foreground font-body max-w-md mx-auto">Our customers' all-time favorites</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.map(p => (
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

      {/* Testimonials */}
      <section className="py-20 md:py-28 px-4 border-t border-border/20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-primary/60 mb-4 font-body font-light">Testimonials</p>
            <h2 className="font-heading text-3xl md:text-5xl gradient-gold-text">What Our Clients Say</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass rounded-2xl p-8 text-center relative"
              >
                <div className="flex justify-center gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground/70 font-body text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <p className="text-xs font-body font-semibold text-primary tracking-wider uppercase">{t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.06] via-primary/[0.02] to-primary/[0.06]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
        <div className="container mx-auto relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-5xl gradient-gold-text mb-4">Find Your Signature Scent</h2>
            <p className="text-sm text-muted-foreground font-body max-w-lg mx-auto mb-10">
              Over 100 premium fragrances starting from just ₹120. Order directly via WhatsApp for the fastest experience.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/products"
                className="gradient-gold-btn text-primary-foreground font-body font-semibold tracking-[0.2em] uppercase text-xs px-12 py-4 rounded-full gold-glow hover:gold-glow-strong transition-all duration-500 hover:scale-105"
              >
                Browse Collection
              </Link>
              <a
                href="https://wa.me/919999999999?text=Hi!%20I%27d%20like%20to%20know%20more%20about%20your%20fragrances."
                target="_blank"
                rel="noopener noreferrer"
                className="border border-primary/30 text-primary font-body tracking-[0.2em] uppercase text-xs px-10 py-4 rounded-full transition-all duration-500 hover:border-primary/60 hover:bg-primary/5"
              >
                Chat With Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
