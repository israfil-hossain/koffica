// Sample coffee products with external images
// This data can be used to populate your Sanity CMS

const coffeeProducts = [
  {
    name: "Ethiopian Yirgacheffe",
    description: "A bright and floral single-origin coffee with notes of lemon, tea, and flowers. Grown in the highlands of Ethiopia, this coffee offers a clean, wine-like acidity and a light to medium body.",
    price: 24.99,
    discount: 0,
    stock: 50,
    status: "new",
    roastLevel: "light",
    origin: "Ethiopia",
    weight: 250,
    grindType: "whole-bean",
    brewingMethod: ["pour-over", "drip", "french-press"],
    flavorNotes: ["lemon", "floral", "tea", "wine"],
    caffeine: "regular",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=500&fit=crop&crop=center",
    slug: "ethiopian-yirgacheffe"
  },
  {
    name: "Colombian Supremo",
    description: "A well-balanced medium roast with rich chocolate and caramel notes. This premium Colombian coffee offers a smooth, full body with a sweet finish that's perfect for any time of day.",
    price: 22.99,
    discount: 10,
    stock: 75,
    status: "popular",
    roastLevel: "medium",
    origin: "Colombia",
    weight: 250,
    grindType: "whole-bean",
    brewingMethod: ["espresso", "drip", "french-press"],
    flavorNotes: ["chocolate", "caramel", "nuts", "smooth"],
    caffeine: "regular",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500&h=500&fit=crop&crop=center",
    slug: "colombian-supremo"
  },
  {
    name: "Blue Mountain Jamaica",
    description: "One of the world's most sought-after coffees, grown in the Blue Mountains of Jamaica. Known for its mild flavor, lack of bitterness, and perfect balance of acidity and body.",
    price: 45.99,
    discount: 0,
    stock: 25,
    status: "premium",
    roastLevel: "medium",
    origin: "Jamaica",
    weight: 250,
    grindType: "whole-bean",
    brewingMethod: ["pour-over", "drip", "espresso"],
    flavorNotes: ["mild", "balanced", "smooth", "clean"],
    caffeine: "regular",
    image: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=500&h=500&fit=crop&crop=center",
    slug: "blue-mountain-jamaica"
  },
  {
    name: "Hawaiian Kona",
    description: "Grown on the volcanic slopes of Hawaii's Big Island, this coffee offers a smooth, rich flavor with low acidity. A true gourmet experience with hints of nuts and spice.",
    price: 38.99,
    discount: 15,
    stock: 30,
    status: "sale",
    roastLevel: "medium-dark",
    origin: "Hawaii, USA",
    weight: 250,
    grindType: "whole-bean",
    brewingMethod: ["drip", "french-press", "cold-brew"],
    flavorNotes: ["nuts", "spice", "smooth", "rich"],
    caffeine: "regular",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop&crop=center",
    slug: "hawaiian-kona"
  },
  {
    name: "French Roast Dark",
    description: "A bold, intense dark roast with smoky, robust flavors. This coffee features a shiny, dark bean with oils on the surface, delivering a strong, full-bodied cup with minimal acidity.",
    price: 19.99,
    discount: 0,
    stock: 100,
    status: "bestseller",
    roastLevel: "dark",
    origin: "Blend",
    weight: 250,
    grindType: "whole-bean",
    brewingMethod: ["espresso", "french-press", "drip"],
    flavorNotes: ["smoky", "bold", "robust", "intense"],
    caffeine: "high",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&h=500&fit=crop&crop=center",
    slug: "french-roast-dark"
  },
  {
    name: "Guatemalan Antigua",
    description: "A full-bodied coffee with a distinctive smoky flavor, grown in the volcanic soil of Antigua. Features spicy and chocolatey notes with a lingering finish.",
    price: 26.99,
    discount: 5,
    stock: 60,
    roastLevel: "medium-dark",
    origin: "Guatemala",
    weight: 250,
    grindType: "whole-bean",
    brewingMethod: ["espresso", "drip", "pour-over"],
    flavorNotes: ["smoky", "spicy", "chocolate", "full-bodied"],
    caffeine: "regular",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&h=500&fit=crop&crop=center",
    slug: "guatemalan-antigua"
  },
  {
    name: "Costa Rican Tarrazú",
    description: "A bright, clean coffee with excellent acidity and a medium body. Grown in the high altitudes of the Tarrazú region, known for producing some of Costa Rica's finest coffees.",
    price: 28.99,
    discount: 0,
    stock: 45,
    roastLevel: "medium",
    origin: "Costa Rica",
    weight: 250,
    grindType: "whole-bean",
    brewingMethod: ["pour-over", "drip", "aeropress"],
    flavorNotes: ["bright", "clean", "citrus", "medium-body"],
    caffeine: "regular",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=500&h=500&fit=crop&crop=center",
    slug: "costa-rican-tarrazu"
  },
  {
    name: "Decaf Colombian",
    description: "All the rich flavor of our Colombian Supremo without the caffeine. Swiss water processed to maintain the coffee's natural flavors while removing 99.9% of caffeine.",
    price: 24.99,
    discount: 0,
    stock: 40,
    roastLevel: "medium",
    origin: "Colombia",
    weight: 250,
    grindType: "whole-bean",
    brewingMethod: ["drip", "french-press", "pour-over"],
    flavorNotes: ["chocolate", "caramel", "smooth", "balanced"],
    caffeine: "decaf",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&h=500&fit=crop&crop=center",
    slug: "decaf-colombian"
  },
  {
    name: "Espresso Blend",
    description: "A carefully crafted blend designed specifically for espresso. Features a rich crema, balanced acidity, and notes of dark chocolate and caramel. Perfect for lattes and cappuccinos.",
    price: 21.99,
    discount: 0,
    stock: 80,
    status: "bestseller",
    roastLevel: "medium-dark",
    origin: "Blend",
    weight: 250,
    grindType: "whole-bean",
    brewingMethod: ["espresso"],
    flavorNotes: ["dark-chocolate", "caramel", "rich", "balanced"],
    caffeine: "high",
    image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=500&h=500&fit=crop&crop=center",
    slug: "espresso-blend"
  },
  {
    name: "Cold Brew Blend",
    description: "Specially selected and roasted for cold brewing. This blend produces a smooth, low-acid coffee that's perfect for cold brew concentrate. Rich and chocolatey when served cold.",
    price: 23.99,
    discount: 0,
    stock: 55,
    status: "new",
    roastLevel: "medium-dark",
    origin: "Blend",
    weight: 250,
    grindType: "coarse",
    brewingMethod: ["cold-brew"],
    flavorNotes: ["smooth", "chocolate", "low-acid", "rich"],
    caffeine: "regular",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&h=500&fit=crop&crop=center",
    slug: "cold-brew-blend"
  }
];

const coffeeCategories = [
  {
    title: "Single Origin",
    slug: "single-origin",
    description: "Coffee from a single farm, region, or country",
    featured: true,
    sortOrder: 1
  },
  {
    title: "Blends",
    slug: "blends", 
    description: "Carefully crafted combinations of different coffee beans",
    featured: true,
    sortOrder: 2
  },
  {
    title: "Dark Roast",
    slug: "dark-roast",
    description: "Bold, intense flavors with low acidity",
    featured: false,
    sortOrder: 3
  },
  {
    title: "Light Roast",
    slug: "light-roast",
    description: "Bright, floral, and fruity flavor profiles",
    featured: false,
    sortOrder: 4
  },
  {
    title: "Decaf",
    slug: "decaf",
    description: "All the flavor without the caffeine",
    featured: false,
    sortOrder: 5
  },
  {
    title: "Espresso",
    slug: "espresso",
    description: "Perfect for espresso-based drinks",
    featured: true,
    sortOrder: 6
  }
];

console.log('Coffee Products Data:');
console.log(JSON.stringify(coffeeProducts, null, 2));
console.log('\nCoffee Categories Data:');
console.log(JSON.stringify(coffeeCategories, null, 2));

module.exports = { coffeeProducts, coffeeCategories };
