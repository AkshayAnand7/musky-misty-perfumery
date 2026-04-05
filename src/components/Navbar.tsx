import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlist } from '@/hooks/useWishlist';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { wishlist } = useWishlist();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="font-heading text-xl md:text-2xl gradient-gold-text tracking-wider">
          Musky & Misty
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {[
            { to: '/', label: 'Home' },
            { to: '/products', label: 'Collection' },
          ].map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative text-[11px] font-body tracking-[0.2em] uppercase transition-colors duration-300 ${
                isActive(link.to) ? 'text-primary' : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              {link.label}
              {isActive(link.to) && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1.5 left-0 right-0 h-px bg-primary"
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          ))}

          <div className="flex items-center gap-5 ml-4 pl-4 border-l border-border/20">
            <Link
              to="/products"
              className="text-foreground/50 hover:text-primary transition-colors duration-300"
            >
              <Search size={16} />
            </Link>
            <Link
              to="/wishlist"
              className="relative text-foreground/50 hover:text-primary transition-colors duration-300"
            >
              <Heart size={16} className={wishlist.length > 0 ? 'text-primary' : ''} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-primary text-primary-foreground text-[8px] font-body font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-foreground/70 hover:text-primary transition-colors"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/20 mt-2"
          >
            <div className="flex flex-col p-6 gap-5">
              <Link to="/" className={`text-xs tracking-[0.2em] uppercase font-body transition-colors ${isActive('/') ? 'text-primary' : 'text-foreground/60'}`}>
                Home
              </Link>
              <Link to="/products" className={`text-xs tracking-[0.2em] uppercase font-body transition-colors ${isActive('/products') ? 'text-primary' : 'text-foreground/60'}`}>
                Collection
              </Link>
              <Link to="/wishlist" className={`text-xs tracking-[0.2em] uppercase font-body transition-colors flex items-center gap-2 ${isActive('/wishlist') ? 'text-primary' : 'text-foreground/60'}`}>
                <Heart size={14} /> Wishlist
                {wishlist.length > 0 && (
                  <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full">{wishlist.length}</span>
                )}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
