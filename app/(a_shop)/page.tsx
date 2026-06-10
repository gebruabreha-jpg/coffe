import CampaignBanner from "@/features/brand/components/CampaignBanner";
import ProductGrid from "@/features/shop/components/ProductGrid";

import { getProducts } from "@/lib/shopify/products";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main>
      {/* HERO */}
      <CampaignBanner />

      {/* FEATURED PRODUCTS */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">
          Featured Coffees
        </h2>

        <ProductGrid products={products} />
      </section>

      {/* BRAND STORY SECTION (light, not About page) */}
      <section className="py-20 px-6 bg-neutral-50">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-xl font-semibold mb-4">
            Direct from origin
          </h3>

          <p className="text-gray-600 leading-relaxed">
            Ethically sourced Ethiopian coffee, roasted fresh and delivered
            directly to your cup — preserving flavor, farmers, and origin.
          </p>
        </div>
      </section>

      {/* CATEGORY / COLLECTION STRIP (optional later) */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">
          Shop by Roast
        </h2>

        <div className="grid grid-cols-3 gap-4">
          <div className="p-6 bg-gray-100 rounded-xl">Light Roast</div>
          <div className="p-6 bg-gray-100 rounded-xl">Medium Roast</div>
          <div className="p-6 bg-gray-100 rounded-xl">Dark Roast</div>
        </div>
      </section>
    </main>
  );
}