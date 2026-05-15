import { useState } from "react";
import { Section, CartItem, PRODUCTS, NAV_LINKS, Product } from "@/components/shop/data";
import Header from "@/components/shop/Header";
import { CartDrawer, FavoritesDrawer } from "@/components/shop/Drawers";
import {
  HomeSection,
  CatalogSection,
  PriceListSection,
  DeliverySection,
  ContactsSection,
} from "@/components/shop/Sections";
import Icon from "@/components/ui/icon";

export default function Index() {
  const [section, setSection] = useState<Section>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [favOpen, setFavOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + product.minQty } : i);
      return [...prev, { id: product.id, name: product.name, price: product.price, unit: product.unit, qty: product.minQty }];
    });
  };

  const removeFromCart = (id: number) => setCart(prev => prev.filter(i => i.id !== id));

  const updateQty = (id: number, delta: number) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };

  const toggleFav = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const cartCount = cart.length;

  const navigate = (s: Section) => {
    setSection(s);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header
        section={section}
        navigate={navigate}
        favoritesCount={favorites.length}
        cartCount={cartCount}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onOpenFav={() => { setFavOpen(true); setCartOpen(false); }}
        onOpenCart={() => { setCartOpen(true); setFavOpen(false); }}
      />

      {cartOpen && (
        <CartDrawer
          cart={cart}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
          onUpdateQty={updateQty}
          onNavigateContacts={() => navigate("contacts")}
        />
      )}

      {favOpen && (
        <FavoritesDrawer
          favorites={favorites}
          onClose={() => setFavOpen(false)}
          onRemoveFav={toggleFav}
          onAddToCart={addToCart}
        />
      )}

      <main>
        {section === "home" && (
          <HomeSection
            navigate={navigate}
            favorites={favorites}
            toggleFav={toggleFav}
            addToCart={addToCart}
          />
        )}
        {section === "catalog" && (
          <CatalogSection
            favorites={favorites}
            toggleFav={toggleFav}
            addToCart={addToCart}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        )}
        {section === "pricelist" && (
          <PriceListSection navigate={navigate} />
        )}
        {section === "delivery" && (
          <DeliverySection />
        )}
        {section === "contacts" && (
          <ContactsSection />
        )}
      </main>

      <footer className="border-t border-border bg-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-foreground flex items-center justify-center">
                  <span className="text-background text-xs font-bold font-mono">PP</span>
                </div>
                <span className="font-bold">ПакПро</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">Оптовые поставки упаковочных материалов для селлеров маркетплейсов</p>
            </div>
            <div className="flex flex-wrap gap-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3">Разделы</p>
                <div className="space-y-2">
                  {NAV_LINKS.map(l => (
                    <button key={l.key} onClick={() => navigate(l.key)} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3">Контакты</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>+7 (495) 000-00-00</p>
                  <p>info@pakpro.ru</p>
                  <p>Пн–Пт: 9:00–18:00</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
            <p>© 2025 ПакПро. Оптовая упаковка для маркетплейсов</p>
            <p>Минимальный заказ: 200 000 ₽</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
