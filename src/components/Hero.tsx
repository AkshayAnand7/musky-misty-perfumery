import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Luxury perfume collection"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-background/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/20 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />
      </div>

      {/* Decorative gold lines */}
      <div className="absolute top-1/4 left-8 md:left-16 w-px h-32 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-1/3 right-8 md:right-16 w-px h-24 bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-1/3 left-12 md:left-24 w-20 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Decorative top line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-primary/80 mb-6 font-body font-light"
          >
            Exclusive Artisan Fragrances
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl gradient-gold-text mb-4 leading-[1.1] tracking-wide"
          >
            Musky & Misty
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="w-24 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent mx-auto my-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-base md:text-lg text-foreground/50 font-body font-light tracking-wider mb-12 max-w-md mx-auto"
          >
            Where Every Drop Defines Luxury
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/products"
              className="group relative inline-flex items-center justify-center gradient-gold-btn text-primary-foreground font-body font-semibold tracking-[0.2em] uppercase text-xs px-12 py-4 rounded-full gold-glow hover:gold-glow-strong transition-all duration-500 hover:scale-105 min-w-[200px]"
            >
              Shop Now
            </Link>
            <Link
              to="/products?category=Oud"
              className="inline-flex items-center justify-center border border-primary/30 text-primary/80 font-body tracking-[0.2em] uppercase text-xs px-10 py-4 rounded-full transition-all duration-500 hover:border-primary/60 hover:text-primary hover:bg-primary/5 min-w-[200px]"
            >
              Explore Oud
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground font-body">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={16} className="text-primary/50" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
