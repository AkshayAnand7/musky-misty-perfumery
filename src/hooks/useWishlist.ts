import { useState, useEffect, useCallback } from 'react';

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<number[]>(() => {
    const saved = localStorage.getItem('musky-wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('musky-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = useCallback((id: number) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  }, []);

  const isWishlisted = useCallback((id: number) => wishlist.includes(id), [wishlist]);

  return { wishlist, toggleWishlist, isWishlisted };
};
