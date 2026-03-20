const categoryDescriptions: Record<string, string[]> = {
  Luxury: [
    "An opulent fusion of rare ingredients, crafted for those who demand nothing but the finest.",
    "A sophisticated symphony of deep, complex notes that leaves an unforgettable impression.",
    "Exquisitely blended for evening elegance, this fragrance embodies timeless luxury.",
    "A masterpiece of perfumery, radiating confidence and refined taste.",
  ],
  Fresh: [
    "A burst of crisp, invigorating notes that awakens the senses with every spritz.",
    "Clean, vibrant, and effortlessly refreshing — perfect for the modern individual.",
    "A breezy composition that captures the essence of a sunlit morning.",
    "Light yet captivating, this scent is your daily dose of freshness.",
  ],
  Sweet: [
    "A delightful blend of warm, sweet accords that wraps you in pure comfort.",
    "Irresistibly sweet with gourmand undertones, perfect for intimate moments.",
    "A luscious, velvety fragrance that lingers beautifully on the skin.",
    "Sweet, playful, and utterly enchanting — a scent that steals hearts.",
  ],
  Oud: [
    "A luxurious blend of rich oud and warm woody notes, perfect for evening elegance.",
    "Deep, smoky, and majestic — this oud-based fragrance commands presence.",
    "An authentic Arabian-inspired composition with rare oud at its heart.",
    "Rich and mystical, this oud masterpiece is a journey through the Orient.",
  ],
};

export const getDescription = (name: string, category: string): string => {
  const descriptions = categoryDescriptions[category] || categoryDescriptions.Luxury;
  const index = name.length % descriptions.length;
  return descriptions[index];
};
