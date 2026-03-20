import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="font-heading text-2xl md:text-3xl gradient-gold-text tracking-wider">
          Musky & Misty
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-sm font-body tracking-widest uppercase text-foreground/70 hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-sm font-body tracking-widest uppercase text-foreground/70 hover:text-primary transition-colors"
          >
            Collection
          </Link>
          <Link
            to="/products"
            className="text-sm font-body tracking-widest uppercase text-foreground/70 hover:text-primary transition-colors"
          >
            <Search size={18} />
          </Link>
          <Link
            to="/wishlist"
            className="text-sm font-body tracking-widest uppercase text-foreground/70 hover:text-primary transition-colors"
          >
            <Heart size={18} />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-foreground/70 hover:text-primary transition-colors"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass mt-2 mx-4 rounded-lg overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              <Link to="/" className="text-sm tracking-widest uppercase text-foreground/70 hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/products" className="text-sm tracking-widest uppercase text-foreground/70 hover:text-primary transition-colors">
                Collection
              </Link>
              <Link to="/wishlist" className="text-sm tracking-widest uppercase text-foreground/70 hover:text-primary transition-colors flex items-center gap-2">
                <Heart size={16} /> Wishlist
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
