
import Cocktails from "@/components/coktails";
import Hero from "@/components/hero";
import Art from "@/components/art";
import Menu from "@/components/menu";
import About from "@/components/about";
import Contact from "@/components/contact";
import {  getSale, getProductsByAllCategories } from "@/sanity/helpers";
import { DiscountBanner } from "@/components/DiscountBanner";

export default async function Home() {
  const sales = await getSale();

  // Get categories and products for the menu
  const { categories: menuCategories, productsByCategory } = await getProductsByAllCategories();

  // Get products by navigation categories
  // const trendingProducts = await getTrendingProducts();
  // const bestSellerProducts = await getBestSellerProducts();
  // const featuredProducts = await getFeaturedProducts();
  // const newArrivals = await getNewArrivals();

  return (
    <main>

      <Hero />
      <Cocktails />
      <About />
      <Art />
      <Menu categories={menuCategories} productsByCategory={productsByCategory} />
      <DiscountBanner sales={sales} />
      <Contact />

      {/* <ProductList
        products={trendingProducts}
        title={
          <>
            Trending <span className="text-lightBlue">Plants</span>
          </>
        }
        subtitle="Don&rsquo;t wait. The time will never be just right."
      /> */}

      {/* <PlantCards />
      
      <ProductList
        title={
          <>
            Best Seller <span className="text-lightBlue">Plants</span>
          </>
        }
        subtitle="Don&rsquo;t wait. The time will never be just right."
        products={bestSellerProducts}
      /> */}
{/* 
      <ProductList
        title={
          <>
            Featured <span className="text-lightBlue">Collection</span>
          </>
        }
        subtitle="Handpicked plants for your perfect space."
        products={featuredProducts}
      /> */}

      {/* <ProductList
        title={
          <>
            New <span className="text-lightBlue">Arrivals</span>
          </>
        }
        subtitle="Fresh additions to our plant family."
        products={newArrivals}
      /> */}
    </main>
  );
}
