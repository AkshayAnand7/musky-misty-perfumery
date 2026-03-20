import { MessageCircle } from 'lucide-react';

const Footer = () => {
  const whatsappNumber = '919999999999';
  const instagramUrl = 'https://instagram.com/muskyandmisty';

  return (
    <footer className="border-t border-border/30 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl gradient-gold-text mb-2">Musky & Misty</h3>
            <p className="text-sm text-muted-foreground font-body">Where Every Drop Defines Luxury</p>
          </div>

          {/* Links */}
          <div className="flex justify-center gap-6">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-body"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-body"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
              Instagram
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground text-right font-body">
            © 2026 Musky & Misty. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
