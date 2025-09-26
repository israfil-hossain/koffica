/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllProducts, getAllCategories } from "@/sanity/helpers";
import ProductGrid from "@/components/ProductGrid";
import CategoryFilter from "@/components/CategoryFilter";
import Container from "@/components/Container";


export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string; search?: string }>;
}) {
  const [products, categories, params] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
    searchParams,
  ]);

  // Filter products by category if specified
  const filteredProducts = params.category
    ? products.filter((product:any) =>
        product.categories?.some((cat: any) => cat.slug?.current === params.category)
      )
    : products;

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a: any, b: any) => {
    switch (params.sort) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  // Search filter
  const searchFilteredProducts = params.search
    ? sortedProducts.filter((product: any) =>
        product.name.toLowerCase().includes(params.search!.toLowerCase())
      )
    : sortedProducts;

  return (
    <Container className="py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Coffee Collection</h1>
        <p className="text-gray-300">
          Discover our premium selection of coffee beans from around the world
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:w-1/4">
          <CategoryFilter
            categories={categories}
            currentCategory={params.category}
            currentSort={params.sort}
            currentSearch={params.search}
          />
        </aside>

        {/* Products Grid */}
        <main className="lg:w-3/4">
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-300">
              {searchFilteredProducts.length} products found
            </p>
          </div>
          
          <ProductGrid products={searchFilteredProducts} />
        </main>
      </div>
    </Container>
  );
}
