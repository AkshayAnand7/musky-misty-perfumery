import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import products from '@/data/products.json';
import { getDescription } from '@/lib/descriptions';
import { useWishlist } from '@/hooks/useWishlist';
import placeholderImg from '@/assets/perfume-placeholder.jpg';

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const { toggleWishlist, isWishlisted } = useWishlist();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-heading text-2xl text-foreground mb-4">Product Not Found</h2>
          <Link to="/products" className="text-primary hover:underline font-body text-sm">
            ← Back to Collection
          </Link>
        </div>
      </div>
    );
  }

  const description = getDescription(product.name, product.category);
  const whatsappMsg = encodeURIComponent(
    `Hi! I'm interested in ${product.name} from Musky & Misty. Could you share more details?`
  );

  return (
    <div className="min-h-screen pt-24 pb-24 md:pb-12 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Back */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-body mb-8"
        >
          <ArrowLeft size={16} /> Back to Collection
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden glass gold-glow aspect-[3/4]"
          >
            <img
              src={placeholderImg}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            <span className="absolute top-4 left-4 text-[10px] tracking-[0.2em] uppercase font-body bg-primary/20 text-primary px-3 py-1 rounded-full backdrop-blur-sm border border-primary/20">
              {product.category}
            </span>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl gradient-gold-text mb-3">
              {product.name}
            </h1>
            <p className="text-sm text-primary/70 tracking-widest uppercase mb-6 font-body">
              {product.category} Collection
            </p>
            <p className="text-foreground/60 font-body leading-relaxed mb-8 italic">
              "{description}"
            </p>

            {/* Price Table */}
            <div className="glass rounded-xl overflow-hidden mb-8 border border-border/30">
              <div className="grid grid-cols-4 text-center">
                {(['20ml', '30ml', '50ml', '100ml'] as const).map(size => (
                  <div key={size} className="p-4 border-r border-border/20 last:border-r-0">
                    <p className="text-xs text-muted-foreground font-body mb-1">{size}</p>
                    <p className="font-heading text-lg md:text-xl text-primary">
                      ₹{product.prices[size]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <a
                href={`https://wa.me/919999999999?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 gradient-gold-btn text-primary-foreground font-body font-semibold tracking-wider uppercase text-sm px-6 py-4 rounded-xl gold-glow hover:gold-glow-strong transition-all duration-300 hover:scale-[1.02]"
              >
                <MessageCircle size={18} />
                Order via WhatsApp
              </a>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-4 rounded-xl glass border transition-all duration-300 ${
                  isWishlisted(product.id)
                    ? 'border-primary/50 text-primary gold-glow'
                    : 'border-border/30 text-foreground/50 hover:border-primary/30 hover:text-primary'
                }`}
              >
                <Heart size={20} className={isWishlisted(product.id) ? 'fill-primary' : ''} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
