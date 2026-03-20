import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import placeholderImg from '@/assets/perfume-placeholder.jpg';

interface ProductCardProps {
  id: number;
  name: string;
  category: string;
  price: number;
  isWishlisted: boolean;
  onToggleWishlist: (id: number) => void;
}

const ProductCard = ({ id, name, category, price, isWishlisted, onToggleWishlist }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="group relative glass rounded-xl overflow-hidden transition-all duration-500 hover:gold-glow"
    >
      {/* Wishlist */}
      <button
        onClick={(e) => {
          e.preventDefault();
          onToggleWishlist(id);
        }}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-background/60 backdrop-blur-sm transition-all duration-300 hover:bg-primary/20"
      >
        <Heart
          size={16}
          className={`transition-all duration-300 ${
            isWishlisted ? 'fill-primary text-primary' : 'text-foreground/50 hover:text-primary'
          }`}
        />
      </button>

      {/* Image */}
      <Link to={`/product/${id}`}>
        <div className="relative overflow-hidden aspect-[3/4]">
          <img
            src={placeholderImg}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
          
          {/* Category badge */}
          <span className="absolute top-3 left-3 text-[10px] tracking-[0.2em] uppercase font-body bg-primary/20 text-primary px-3 py-1 rounded-full backdrop-blur-sm border border-primary/20">
            {category}
          </span>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-heading text-base md:text-lg text-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground font-body mt-1">
            From <span className="text-primary font-semibold">₹{price}</span>
          </p>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <div className="gradient-gold-btn text-center text-primary-foreground text-xs tracking-widest uppercase py-2.5 rounded-lg font-semibold">
            View Details
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
