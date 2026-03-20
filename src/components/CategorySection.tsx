import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Droplets, Candy, Crown } from 'lucide-react';

const categories = [
  { name: 'Oud', icon: Sparkles, desc: 'Rich Arabian heritage' },
  { name: 'Fresh', icon: Droplets, desc: 'Clean & invigorating' },
  { name: 'Sweet', icon: Candy, desc: 'Warm & delightful' },
  { name: 'Luxury', icon: Crown, desc: 'Premium & exclusive' },
];

const CategorySection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-primary/70 mb-3 font-body">Explore</p>
          <h2 className="font-heading text-3xl md:text-5xl gradient-gold-text">Our Collections</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/products?category=${cat.name}`}
                className="group block glass rounded-xl p-6 md:p-8 text-center transition-all duration-500 hover:gold-glow hover:border-primary/30"
              >
                <cat.icon
                  size={32}
                  className="mx-auto mb-4 text-primary/60 group-hover:text-primary transition-colors duration-300"
                />
                <h3 className="font-heading text-lg md:text-xl text-foreground group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-2 font-body">{cat.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
