import { Link } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
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
          className="text-center mb-10"
        >
          <Heart size={32} className="mx-auto mb-4 text-primary" />
          <h1 className="font-heading text-3xl md:text-5xl gradient-gold-text">Your Wishlist</h1>
          <p className="text-sm text-muted-foreground mt-3 font-body">
            {wishlisted.length} fragrance{wishlisted.length !== 1 ? 's' : ''} saved
          </p>
        </motion.div>

        {wishlisted.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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
          <div className="text-center py-20">
            <p className="text-muted-foreground font-body mb-6">Your wishlist is empty.</p>
            <Link
              to="/products"
              className="inline-block gradient-gold-btn text-primary-foreground font-body font-semibold tracking-widest uppercase text-sm px-8 py-3 rounded-full gold-glow hover:gold-glow-strong transition-all duration-300"
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
