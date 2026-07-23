import { X } from "lucide-react";
import {
  Categories,
  FeaturedProducts,
  Hero,
  OfferBanner,
  TrustStrip,
} from "@/components/sections";
import { useCart } from "@/features/cart/hooks";
import { ShopPage } from "@/features/catalog/components";
import { getCatalogProducts } from "@/features/catalog/services";
import { ContactSectionContainer } from "@/features/contact/components";
import { useHashRoute } from "@/hooks";
import { MainLayout } from "@/layouts";

const products = getCatalogProducts();

export default function App() {
  const view = useHashRoute();
  const cart = useCart();

  const handleSearch = (query: string) => {
    window.location.hash = `/tienda${query ? `?q=${encodeURIComponent(query)}` : ""}`;
  };

  return (
    <MainLayout>
      {view === "shop" ? (
        <ShopPage products={products} onAddToCart={cart.addToCart} />
      ) : (
        <main>
          <Hero cartCount={cart.count} onSearch={handleSearch} />
          <Categories />
          <FeaturedProducts products={products} onAddToCart={cart.addToCart} />
          <TrustStrip />
          <OfferBanner />
          <ContactSectionContainer />
        </main>
      )}

      <div
        className={`fixed right-4 bottom-4 z-50 flex max-w-[calc(100%-2rem)] items-center gap-3 rounded-2xl bg-ink px-4 py-3 text-sm text-white shadow-card transition duration-300 ${
          cart.lastAdded ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
        role="status"
        aria-live="polite"
      >
        {cart.lastAdded && (
          <>
            <span><strong>{cart.lastAdded.name}</strong> se añadió al carrito.</span>
            <button type="button" onClick={cart.clearNotification} className="grid size-8 place-items-center rounded-full bg-white/10 hover:bg-white/20" aria-label="Cerrar notificación">
              <X className="size-4" aria-hidden />
            </button>
          </>
        )}
      </div>
    </MainLayout>
  );
}
