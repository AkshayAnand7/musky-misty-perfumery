import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

const Footer = () => {
  const whatsappNumber = '919999999999';
  const instagramUrl = 'https://instagram.com/muskyandmisty';

  return (
    <footer className="border-t border-border/20 pt-16 pb-8 px-4 hidden md:block">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-heading text-xl gradient-gold-text mb-3">Musky & Misty</h3>
            <p className="text-xs text-muted-foreground font-body leading-relaxed">
              Premium artisan fragrances crafted for those who appreciate the finer things in life.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-primary/60 font-body mb-4">Shop</h4>
            <div className="flex flex-col gap-2.5">
              {['Oud', 'Fresh', 'Sweet', 'Luxury'].map(cat => (
                <Link
                  key={cat}
                  to={`/products?category=${cat}`}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors font-body"
                >
                  {cat} Collection
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-primary/60 font-body mb-4">Navigate</h4>
            <div className="flex flex-col gap-2.5">
              <Link to="/" className="text-xs text-muted-foreground hover:text-primary transition-colors font-body">Home</Link>
              <Link to="/products" className="text-xs text-muted-foreground hover:text-primary transition-colors font-body">All Fragrances</Link>
              <Link to="/wishlist" className="text-xs text-muted-foreground hover:text-primary transition-colors font-body">Wishlist</Link>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase text-primary/60 font-body mb-4">Connect</h4>
            <div className="flex flex-col gap-2.5">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors font-body"
              >
                <MessageCircle size={14} /> WhatsApp
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors font-body"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-muted-foreground font-body">
            © 2026 Musky & Misty. All rights reserved.
          </p>
          <p className="text-[10px] text-muted-foreground/50 font-body">
            Premium Fragrance House
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
