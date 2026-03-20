import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Heart } from 'lucide-react';

const MobileNav = () => {
  const location = useLocation();

  const links = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/products', icon: Search, label: 'Shop' },
    { to: '/wishlist', icon: Heart, label: 'Wishlist' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass border-t border-border/30">
      <div className="flex items-center justify-around py-3">
        {links.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon size={20} />
              <span className="text-[10px] tracking-wider uppercase font-body">{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;
