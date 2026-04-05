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
      className="group relative rounded-2xl overflow-hidden bg-card border border-border/20 transition-all duration-500 hover:border-primary/30 hover:gold-glow"
    >
      {/* Wishlist */}
      <button
        onClick={(e) => {
          e.preventDefault();
          onToggleWishlist(id);
        }}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-background/70 backdrop-blur-sm transition-all duration-300 hover:bg-primary/20 hover:scale-110"
      >
        <Heart
          size={14}
          className={`transition-all duration-300 ${
            isWishlisted ? 'fill-primary text-primary' : 'text-foreground/40 hover:text-primary'
          }`}
        />
      </button>

      {/* Image */}
      <Link to={`/product/${id}`} className="block">
        <div className="relative overflow-hidden aspect-[3/4]">
          <img
            src={placeholderImg}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-80" />
          
          {/* Category badge */}
          <span className="absolute top-3 left-3 text-[9px] tracking-[0.2em] uppercase font-body bg-background/60 text-primary/90 px-2.5 py-1 rounded-full backdrop-blur-sm border border-primary/15">
            {category}
          </span>

          {/* Hover overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <div className="gradient-gold-btn text-center text-primary-foreground text-[10px] tracking-[0.15em] uppercase py-2.5 rounded-lg font-semibold font-body">
              View Details
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 pt-3">
          <h3 className="font-heading text-sm md:text-base text-foreground group-hover:text-primary transition-colors duration-300 leading-tight mb-1.5 truncate">
            {name}
          </h3>
          <p className="text-xs text-muted-foreground font-body">
            From <span className="text-primary font-medium">₹{price}</span>
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
