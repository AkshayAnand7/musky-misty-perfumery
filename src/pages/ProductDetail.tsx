import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import products from '@/data/products.json';
import { getDescription } from '@/lib/descriptions';
import { useWishlist } from '@/hooks/useWishlist';
import placeholderImg from '@/assets/perfume-placeholder.jpg';

const sizes = ['20ml', '30ml', '50ml', '100ml'] as const;

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [selectedSize, setSelectedSize] = useState<typeof sizes[number]>('30ml');

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
    `Hi! I'm interested in ${product.name} (${selectedSize}) from Musky & Misty. Price: ₹${product.prices[selectedSize]}. Could you help me place an order?`
  );

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen pt-24 pb-24 md:pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-body mb-8 tracking-wider uppercase">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary transition-colors">Collection</Link>
          <span>/</span>
          <Link to={`/products?category=${product.category}`} className="hover:text-primary transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-foreground/70">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden border border-border/20 aspect-[3/4]"
          >
            <img
              src={placeholderImg}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
            <span className="absolute top-4 left-4 text-[9px] tracking-[0.2em] uppercase font-body bg-background/60 text-primary px-3 py-1.5 rounded-full backdrop-blur-sm border border-primary/15">
              {product.category}
            </span>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col justify-center"
          >
            <p className="text-[10px] text-primary/60 tracking-[0.3em] uppercase mb-3 font-body">{product.category} Collection</p>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl gradient-gold-text mb-4 leading-tight">
              {product.name}
            </h1>
            <p className="text-foreground/50 font-body text-sm leading-relaxed mb-8">
              {description}
            </p>

            {/* Size Selector */}
            <div className="mb-6">
              <p className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase font-body mb-3">Select Size</p>
              <div className="grid grid-cols-4 gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`relative p-3 rounded-xl text-center transition-all duration-300 border ${
                      selectedSize === size
                        ? 'border-primary/50 bg-primary/10 gold-glow'
                        : 'border-border/20 bg-card hover:border-primary/20'
                    }`}
                  >
                    {selectedSize === size && (
                      <Check size={10} className="absolute top-1.5 right-1.5 text-primary" />
                    )}
                    <p className="text-[10px] text-muted-foreground font-body mb-0.5">{size}</p>
                    <p className={`font-heading text-base md:text-lg ${selectedSize === size ? 'text-primary' : 'text-foreground/80'}`}>
                      ₹{product.prices[size]}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected price */}
            <div className="glass rounded-xl p-4 mb-8 border border-border/20">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-muted-foreground font-body">Selected: {selectedSize}</span>
                <span className="font-heading text-2xl md:text-3xl text-primary">₹{product.prices[selectedSize]}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <a
                href={`https://wa.me/919999999999?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 gradient-gold-btn text-primary-foreground font-body font-semibold tracking-[0.15em] uppercase text-xs px-6 py-4 rounded-xl gold-glow hover:gold-glow-strong transition-all duration-300 hover:scale-[1.02]"
              >
                <MessageCircle size={16} />
                Order via WhatsApp
              </a>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  isWishlisted(product.id)
                    ? 'border-primary/40 text-primary bg-primary/10 gold-glow'
                    : 'border-border/20 text-foreground/40 hover:border-primary/30 hover:text-primary bg-card'
                }`}
              >
                <Heart size={18} className={isWishlisted(product.id) ? 'fill-primary' : ''} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-20 md:mt-28">
            <div className="text-center mb-12">
              <p className="text-[10px] tracking-[0.4em] uppercase text-primary/60 mb-3 font-body font-light">You May Also Like</p>
              <h2 className="font-heading text-2xl md:text-3xl gradient-gold-text">Similar Fragrances</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map(p => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group relative rounded-2xl overflow-hidden bg-card border border-border/20 transition-all duration-500 hover:border-primary/30 hover:gold-glow"
                >
                  <Link to={`/product/${p.id}`} className="block">
                    <div className="relative overflow-hidden aspect-[3/4]">
                      <img src={placeholderImg} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-80" />
                    </div>
                    <div className="p-4 pt-3">
                      <h3 className="font-heading text-sm text-foreground group-hover:text-primary transition-colors truncate">{p.name}</h3>
                      <p className="text-xs text-muted-foreground font-body mt-1">From <span className="text-primary font-medium">₹{p.prices['20ml']}</span></p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
