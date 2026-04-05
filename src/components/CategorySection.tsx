import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Droplets, Candy, Crown } from 'lucide-react';
import products from '@/data/products.json';

const categories = [
  { name: 'Oud', icon: Sparkles, desc: 'Rich Arabian heritage blends with rare, smoky depth', gradient: 'from-amber-900/20 to-transparent' },
  { name: 'Fresh', icon: Droplets, desc: 'Clean, invigorating scents for everyday confidence', gradient: 'from-cyan-900/20 to-transparent' },
  { name: 'Sweet', icon: Candy, desc: 'Warm gourmand notes that linger beautifully', gradient: 'from-pink-900/20 to-transparent' },
  { name: 'Luxury', icon: Crown, desc: 'Premium designer-inspired fragrances', gradient: 'from-yellow-900/20 to-transparent' },
];

const CategorySection = () => {
  return (
    <section className="py-20 md:py-28 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="container mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-primary/60 mb-4 font-body font-light">Explore</p>
          <h2 className="font-heading text-3xl md:text-5xl gradient-gold-text mb-4">Shop by Collection</h2>
          <p className="text-sm text-muted-foreground font-body max-w-md mx-auto">Four distinctive collections, each crafted for a different mood</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, i) => {
            const count = products.filter(p => p.category === cat.name).length;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={`/products?category=${cat.name}`}
                  className="group relative block glass rounded-2xl p-6 md:p-8 text-center transition-all duration-500 hover:gold-glow hover:border-primary/30 overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-b ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors duration-500">
                      <cat.icon
                        size={24}
                        className="text-primary/70 group-hover:text-primary transition-colors duration-300"
                      />
                    </div>
                    <h3 className="font-heading text-lg md:text-xl text-foreground group-hover:text-primary transition-colors mb-2">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-muted-foreground font-body leading-relaxed mb-3 hidden md:block">{cat.desc}</p>
                    <p className="text-[10px] text-primary/50 font-body tracking-wider uppercase">{count} fragrances</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
