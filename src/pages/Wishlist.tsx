import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import { useWishlist } from '@/hooks/useWishlist';
import products from '@/data/products.json';

const Wishlist = () => {
  const { wishlist, toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="min-h-screen pt-24 pb-24 md:pb-12 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <Heart size={22} className="text-primary" />
          </div>
          <h1 className="font-heading text-3xl md:text-5xl gradient-gold-text mb-3">Your Wishlist</h1>
          <p className="text-xs text-muted-foreground font-body tracking-wider">
            {wishlisted.length} fragrance{wishlisted.length !== 1 ? 's' : ''} saved
          </p>
        </motion.div>

        {wishlisted.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {wishlisted.map(p => (
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
        ) : (
          <div className="text-center py-24">
            <p className="text-muted-foreground font-body text-sm mb-8">Your wishlist is empty. Start adding your favorite fragrances.</p>
            <Link
              to="/products"
              className="inline-block gradient-gold-btn text-primary-foreground font-body font-semibold tracking-[0.2em] uppercase text-xs px-10 py-3.5 rounded-full gold-glow hover:gold-glow-strong transition-all duration-300 hover:scale-105"
            >
              Explore Collection
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
