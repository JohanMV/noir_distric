import { useState } from "react";
import { X } from "lucide-react";
import {
  Categories,
  FeaturedProducts,
  Hero,
  OfferBanner,
  TrustStrip,
} from "@/components/sections";
import { CartDrawer } from "@/features/cart/components";
import { useCart } from "@/features/cart/hooks";
import type { AddToCartInput } from "@/features/cart/types";
import { ProductDetailModal } from "@/features/catalog/components/ProductDetailModal";
import { ShopPage } from "@/features/catalog/components";
import { getCatalogProducts } from "@/features/catalog/services";
import { ContactSectionContainer } from "@/features/contact/components";
import { useHashRoute } from "@/hooks";
import { MainLayout } from "@/layouts";
import type { Product } from "@/types";

const products = getCatalogProducts();

function getSearchQuery(): string {
  const queryString = window.location.hash.split("?")[1] ?? "";
  return new URLSearchParams(queryString).get("q") ?? "";
}

export default function App() {
  const view = useHashRoute();
  const cart = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const handleSearch = (query: string) => {
    window.location.hash = `/tienda${query ? `?q=${encodeURIComponent(query)}` : ""}`;
  };

  const handleAddToCart = (input: AddToCartInput) => {
    cart.addToCart(input);
    setSelectedProduct(null);
    cart.openCart();
  };

  return (
    <MainLayout>
      {view === "shop" ? (
        <ShopPage
          products={products}
          searchQuery={getSearchQuery()}
          cartCount={cart.count}
          onCartOpen={cart.openCart}
          onSelectProduct={setSelectedProduct}
        />
      ) : (
        <main>
          <Hero
            cartCount={cart.count}
            onSearch={handleSearch}
            onCartOpen={cart.openCart}
          />
          <Categories />
          <FeaturedProducts
            products={products}
            onSelectProduct={setSelectedProduct}
          />
          <TrustStrip />
          <OfferBanner />
          <ContactSectionContainer />
        </main>
      )}

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />
      <CartDrawer
        isOpen={cart.isOpen}
        items={cart.items}
        onClose={cart.closeCart}
        onUpdateQuantity={cart.updateQuantity}
        onRemove={cart.removeItem}
        onClear={cart.clearCart}
      />

      <div
        className={`fixed right-4 bottom-4 z-[90] flex max-w-[calc(100%-2rem)] items-center gap-3 rounded-2xl bg-ink px-4 py-3 text-sm text-white shadow-card transition duration-300 ${
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
