import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Heart } from 'lucide-react';
import { useWishlist } from '@/hooks/useWishlist';

const MobileNav = () => {
  const location = useLocation();
  const { wishlist } = useWishlist();

  const links = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/products', icon: Search, label: 'Shop' },
    { to: '/wishlist', icon: Heart, label: 'Wishlist', badge: wishlist.length },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/90 backdrop-blur-xl border-t border-border/15 safe-area-inset-bottom">
      <div className="flex items-center justify-around py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]">
        {links.map(({ to, icon: Icon, label, badge }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`relative flex flex-col items-center gap-0.5 px-4 py-1 transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground/60'
              }`}
            >
              <div className="relative">
                <Icon size={18} className={isActive ? 'text-primary' : ''} />
                {badge ? (
                  <span className="absolute -top-1 -right-1.5 w-3 h-3 bg-primary text-primary-foreground text-[7px] font-bold rounded-full flex items-center justify-center">
                    {badge}
                  </span>
                ) : null}
              </div>
              <span className="text-[9px] tracking-wider uppercase font-body">{label}</span>
              {isActive && <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-primary rounded-full" />}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;
