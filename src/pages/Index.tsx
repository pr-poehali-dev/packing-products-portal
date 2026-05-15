import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/0c4b7aba-e947-4c0a-9c69-c54f4888b459/files/87c631bc-9446-4274-bd2c-4334fa09888c.jpg";
const PRODUCTS_IMG = "https://cdn.poehali.dev/projects/0c4b7aba-e947-4c0a-9c69-c54f4888b459/files/e9024222-00fe-4ed3-b742-4b7a6a34d97b.jpg";

const PRODUCTS = [
  { id: 1, name: "Короб картонный Т-22", sku: "KT-001", category: "Коробки", price: 18, unit: "шт", minQty: 500, img: PRODUCTS_IMG, popular: true },
  { id: 2, name: "Воздушно-пузырчатая плёнка 50м", sku: "VP-050", category: "Плёнки", price: 890, unit: "рулон", minQty: 20, img: PRODUCTS_IMG, popular: true },
  { id: 3, name: "Стрейч-плёнка 500мм×23мкм", sku: "ST-500", category: "Плёнки", price: 320, unit: "рулон", minQty: 50, img: PRODUCTS_IMG, popular: false },
  { id: 4, name: "Скотч упаковочный 48мм", sku: "SK-048", category: "Скотч", price: 42, unit: "шт", minQty: 200, img: PRODUCTS_IMG, popular: false },
  { id: 5, name: "Крафт-бумага 70г/м² 70см", sku: "KR-070", category: "Бумага", price: 1200, unit: "рулон", minQty: 10, img: PRODUCTS_IMG, popular: true },
  { id: 6, name: "Пакет zip-lock 30×40 см", sku: "ZL-3040", category: "Пакеты", price: 3.5, unit: "шт", minQty: 5000, img: PRODUCTS_IMG, popular: false },
  { id: 7, name: "Конверт почтовый А4 белый", sku: "KO-A4W", category: "Конверты", price: 12, unit: "шт", minQty: 500, img: PRODUCTS_IMG, popular: false },
  { id: 8, name: "Термоэтикетка 58×40 мм", sku: "TE-5840", category: "Этикетки", price: 0.8, unit: "шт", minQty: 10000, img: PRODUCTS_IMG, popular: true },
  { id: 9, name: "Наполнитель бумажный", sku: "NB-001", category: "Наполнители", price: 380, unit: "кг", minQty: 30, img: PRODUCTS_IMG, popular: false },
];

const CATEGORIES = ["Все", "Коробки", "Плёнки", "Скотч", "Бумага", "Пакеты", "Конверты", "Этикетки", "Наполнители"];

const PRICE_LIST = [
  { name: "Короб картонный Т-22", sku: "KT-001", unit: "шт", price1: 18, price2: 16, price3: 14 },
  { name: "Воздушно-пузырчатая плёнка 50м", sku: "VP-050", unit: "рулон", price1: 890, price2: 820, price3: 750 },
  { name: "Стрейч-плёнка 500мм×23мкм", sku: "ST-500", unit: "рулон", price1: 320, price2: 290, price3: 260 },
  { name: "Скотч упаковочный 48мм", sku: "SK-048", unit: "шт", price1: 42, price2: 36, price3: 30 },
  { name: "Крафт-бумага 70г/м² 70см", sku: "KR-070", unit: "рулон", price1: 1200, price2: 1100, price3: 980 },
  { name: "Пакет zip-lock 30×40 см", sku: "ZL-3040", unit: "шт", price1: 3.5, price2: 3.0, price3: 2.5 },
  { name: "Термоэтикетка 58×40 мм", sku: "TE-5840", unit: "шт", price1: 0.8, price2: 0.65, price3: 0.5 },
];

type Section = "home" | "catalog" | "pricelist" | "delivery" | "contacts";

interface CartItem {
  id: number;
  name: string;
  price: number;
  unit: string;
  qty: number;
}

export default function Index() {
  const [section, setSection] = useState<Section>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [favOpen, setFavOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const addToCart = (product: typeof PRODUCTS[0]) => {
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

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.length;

  const filteredProducts = activeCategory === "Все"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  const favProducts = PRODUCTS.filter(p => favorites.includes(p.id));

  const navLinks: { key: Section; label: string }[] = [
    { key: "home", label: "Главная" },
    { key: "catalog", label: "Каталог" },
    { key: "pricelist", label: "Прайс-лист" },
    { key: "delivery", label: "Доставка" },
    { key: "contacts", label: "Контакты" },
  ];

  const navigate = (s: Section) => {
    setSection(s);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button onClick={() => navigate("home")} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-foreground flex items-center justify-center">
              <span className="text-background text-xs font-bold font-mono">PP</span>
            </div>
            <span className="font-bold text-lg tracking-tight">ПакПро</span>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <button
                key={l.key}
                onClick={() => navigate(l.key)}
                className={`text-sm font-medium transition-colors ${section === l.key ? "text-foreground border-b-2 border-foreground pb-0.5" : "text-muted-foreground hover:text-foreground"}`}
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => { setFavOpen(true); setCartOpen(false); }}
              className="relative p-2 hover:bg-muted rounded transition-colors"
            >
              <Icon name="Heart" size={20} />
              {favorites.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>
            <button
              onClick={() => { setCartOpen(true); setFavOpen(false); }}
              className="relative p-2 hover:bg-muted rounded transition-colors"
            >
              <Icon name="ShoppingCart" size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-foreground text-background text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              className="md:hidden p-2 hover:bg-muted rounded"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-white animate-fade-in">
            {navLinks.map(l => (
              <button
                key={l.key}
                onClick={() => navigate(l.key)}
                className={`w-full text-left px-6 py-3 text-sm font-medium border-b border-border last:border-0 ${section === l.key ? "text-foreground bg-muted" : "text-muted-foreground"}`}
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/30" onClick={() => setCartOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-bold text-lg">Корзина</h2>
              <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-muted rounded">
                <Icon name="X" size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                  <Icon name="ShoppingCart" size={40} />
                  <p className="mt-3 text-sm">Корзина пуста</p>
                </div>
              ) : cart.map(item => (
                <div key={item.id} className="flex items-start gap-4 py-4 border-b border-border last:border-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-tight">{item.name}</p>
                    <p className="text-xs text-muted-foreground mt-1 font-mono">{item.price.toLocaleString()} ₽ / {item.unit}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 border border-border hover:bg-muted flex items-center justify-center text-sm">−</button>
                    <span className="w-10 text-center text-sm font-mono">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 border border-border hover:bg-muted flex items-center justify-center text-sm">+</button>
                    <button onClick={() => removeFromCart(item.id)} className="ml-1 p-1 hover:text-destructive transition-colors">
                      <Icon name="Trash2" size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div className="p-6 border-t border-border bg-white">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Итого:</span>
                  <span className="font-bold text-xl font-mono">{cartTotal.toLocaleString()} ₽</span>
                </div>
                {cartTotal < 200000 && (
                  <p className="text-xs mb-4" style={{ color: 'hsl(var(--accent))' }}>
                    До минимального заказа: {(200000 - cartTotal).toLocaleString()} ₽
                  </p>
                )}
                <button className={`w-full py-3 font-semibold text-sm transition-colors ${cartTotal >= 200000 ? "bg-foreground text-background hover:bg-foreground/90" : "bg-muted text-muted-foreground cursor-not-allowed"}`}>
                  {cartTotal >= 200000 ? "Оформить заказ" : "Минимум заказа 200 000 ₽"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FAVORITES DRAWER */}
      {favOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/30" onClick={() => setFavOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-bold text-lg">Избранное</h2>
              <button onClick={() => setFavOpen(false)} className="p-2 hover:bg-muted rounded">
                <Icon name="X" size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {favProducts.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                  <Icon name="Heart" size={40} />
                  <p className="mt-3 text-sm">Нет отложенных товаров</p>
                </div>
              ) : favProducts.map(p => (
                <div key={p.id} className="flex items-center gap-4 py-4 border-b border-border last:border-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground font-mono mt-1">{p.price.toLocaleString()} ₽ / {p.unit}</p>
                  </div>
                  <button
                    onClick={() => addToCart(p)}
                    className="px-3 py-1.5 bg-foreground text-background text-xs font-medium hover:bg-foreground/90 transition-colors"
                  >
                    В корзину
                  </button>
                  <button onClick={() => toggleFav(p.id)} className="p-1 text-muted-foreground hover:text-destructive transition-colors">
                    <Icon name="Trash2" size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MAIN */}
      <main>
        {/* ===== HOME ===== */}
        {section === "home" && (
          <div className="animate-fade-in">
            <section className="relative overflow-hidden bg-foreground text-background">
              <div
                className="absolute inset-0 opacity-15 bg-cover bg-center"
                style={{ backgroundImage: `url(${HERO_IMG})` }}
              />
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-32">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 border border-background/30 px-3 py-1 text-xs font-mono text-background/70 mb-8">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    ОПТОВЫЕ ПОСТАВКИ · МИН. ЗАКАЗ 200 000 ₽
                  </div>
                  <h1 className="text-4xl md:text-6xl font-black leading-none tracking-tight mb-6">
                    Упаковка<br />для селлеров<br />маркетплейсов
                  </h1>
                  <p className="text-background/70 text-lg leading-relaxed mb-10 max-w-lg">
                    Профессиональные упаковочные материалы оптом. Работаем с продавцами Wildberries, Ozon, Яндекс Маркет и других площадок.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => navigate("catalog")}
                      className="px-8 py-4 bg-background text-foreground font-semibold hover:bg-background/90 transition-colors"
                    >
                      Перейти в каталог
                    </button>
                    <button
                      onClick={() => navigate("contacts")}
                      className="px-8 py-4 border border-background/40 text-background font-semibold hover:border-background/80 transition-colors"
                    >
                      Получить прайс
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="border-b border-border">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
                  {[
                    { value: "500+", label: "SKU в каталоге" },
                    { value: "1 200+", label: "Клиентов-селлеров" },
                    { value: "48 ч", label: "Срок доставки" },
                    { value: "200 000 ₽", label: "Минимальный заказ" },
                  ].map((s, i) => (
                    <div key={i} className="py-8 px-6 text-center">
                      <p className="text-2xl md:text-3xl font-black font-mono">{s.value}</p>
                      <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Популярное</p>
                  <h2 className="text-3xl font-black">Хиты продаж</h2>
                </div>
                <button
                  onClick={() => navigate("catalog")}
                  className="text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all text-muted-foreground hover:text-foreground"
                >
                  Весь каталог <Icon name="ArrowRight" size={16} />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {PRODUCTS.filter(p => p.popular).map(p => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    isFav={favorites.includes(p.id)}
                    onFav={() => toggleFav(p.id)}
                    onCart={() => addToCart(p)}
                  />
                ))}
              </div>
            </section>

            <section className="bg-muted py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-12">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Преимущества</p>
                  <h2 className="text-3xl font-black">Почему ПакПро</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { icon: "Package", title: "Полный ассортимент", desc: "Всё для упаковки товаров под любую площадку — WB, Ozon, Яндекс Маркет, СберМегаМаркет." },
                    { icon: "Truck", title: "Быстрая доставка", desc: "Доставка по Москве за 24 часа, по России — от 2 рабочих дней. Собственный автопарк." },
                    { icon: "BadgePercent", title: "Оптовые цены", desc: "Гибкая система скидок при увеличении объёма. Специальные условия для постоянных клиентов." },
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-8 border border-border">
                      <div className="w-10 h-10 bg-foreground flex items-center justify-center mb-5">
                        <Icon name={item.icon} size={20} className="text-background" />
                      </div>
                      <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
              <div className="bg-foreground text-background p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                <div>
                  <h2 className="text-3xl font-black mb-3">Готовы сделать заказ?</h2>
                  <p className="text-background/70 max-w-md">Оставьте заявку и наш менеджер свяжется с вами в течение 30 минут</p>
                </div>
                <button
                  onClick={() => navigate("contacts")}
                  className="shrink-0 px-8 py-4 bg-background text-foreground font-semibold hover:bg-background/90 transition-colors whitespace-nowrap"
                >
                  Оставить заявку
                </button>
              </div>
            </section>
          </div>
        )}

        {/* ===== CATALOG ===== */}
        {section === "catalog" && (
          <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <div className="mb-10">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Ассортимент</p>
              <h1 className="text-4xl font-black">Каталог</h1>
            </div>
            <div className="flex flex-wrap gap-2 mb-10">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-sm font-medium border transition-colors ${activeCategory === cat ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground text-muted-foreground hover:text-foreground"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  isFav={favorites.includes(p.id)}
                  onFav={() => toggleFav(p.id)}
                  onCart={() => addToCart(p)}
                />
              ))}
            </div>
          </div>
        )}

        {/* ===== PRICE LIST ===== */}
        {section === "pricelist" && (
          <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <div className="mb-10">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Актуальные цены</p>
              <h1 className="text-4xl font-black">Прайс-лист</h1>
              <p className="text-muted-foreground mt-3 max-w-xl">Цены указаны за единицу товара без НДС. Скидки рассчитываются от объёма заказа.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              {[
                { tier: "Базовый", range: "200 000 — 500 000 ₽", discount: "—", borderColor: "border-border" },
                { tier: "Стандарт", range: "500 001 — 1 000 000 ₽", discount: "−8%", borderColor: "border-foreground" },
                { tier: "Премиум", range: "от 1 000 001 ₽", discount: "−15%", borderColor: "border-orange-500" },
              ].map((t, i) => (
                <div key={i} className={`border-2 ${t.borderColor} p-6`}>
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">{t.tier}</p>
                  <p className="text-lg font-bold mb-1">{t.range}</p>
                  <p className="text-2xl font-black font-mono" style={{ color: i === 2 ? 'hsl(var(--accent))' : 'inherit' }}>{t.discount}</p>
                </div>
              ))}
            </div>
            <div className="border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-foreground text-background">
                      <th className="text-left px-4 py-3 font-semibold">Наименование</th>
                      <th className="text-left px-4 py-3 font-mono text-xs opacity-60">Артикул</th>
                      <th className="text-left px-4 py-3 font-semibold">Ед.</th>
                      <th className="text-right px-4 py-3 font-semibold">Базовый</th>
                      <th className="text-right px-4 py-3 font-semibold">Стандарт</th>
                      <th className="text-right px-4 py-3 font-semibold">Премиум</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {PRICE_LIST.map((row, i) => (
                      <tr key={i} className="hover:bg-muted transition-colors">
                        <td className="px-4 py-3 font-medium">{row.name}</td>
                        <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{row.sku}</td>
                        <td className="px-4 py-3 text-muted-foreground">{row.unit}</td>
                        <td className="px-4 py-3 text-right font-mono">{row.price1.toLocaleString()} ₽</td>
                        <td className="px-4 py-3 text-right font-mono font-semibold">{row.price2.toLocaleString()} ₽</td>
                        <td className="px-4 py-3 text-right font-mono font-bold" style={{ color: 'hsl(var(--accent))' }}>{row.price3.toLocaleString()} ₽</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="mt-8 bg-muted border border-border p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-semibold mb-1">Нужен полный прайс-лист?</p>
                <p className="text-sm text-muted-foreground">Отправим актуальный прайс со всеми позициями на email</p>
              </div>
              <button
                onClick={() => navigate("contacts")}
                className="shrink-0 px-6 py-3 bg-foreground text-background font-semibold text-sm hover:bg-foreground/90 transition-colors"
              >
                Запросить прайс
              </button>
            </div>
          </div>
        )}

        {/* ===== DELIVERY ===== */}
        {section === "delivery" && (
          <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <div className="mb-12">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Логистика</p>
              <h1 className="text-4xl font-black">Доставка</h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {[
                {
                  icon: "MapPin",
                  title: "Москва и МО",
                  items: [
                    "Доставка за 24 часа после подтверждения заказа",
                    "Собственный автопарк — до 10 тонн",
                    "Бесплатная доставка от 500 000 ₽",
                    "Стоимость доставки от 3 500 ₽",
                  ]
                },
                {
                  icon: "Truck",
                  title: "Регионы России",
                  items: [
                    "Доставка от 2 до 7 рабочих дней",
                    "Транспортные компании: СДЭК, ПЭК, Деловые Линии",
                    "Доставка на склады WB и Ozon",
                    "Консолидация грузов от нескольких SKU",
                  ]
                },
              ].map((block, i) => (
                <div key={i} className="border border-border p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-foreground flex items-center justify-center">
                      <Icon name={block.icon} size={20} className="text-background" />
                    </div>
                    <h2 className="text-xl font-bold">{block.title}</h2>
                  </div>
                  <ul className="space-y-3">
                    {block.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm">
                        <span className="mt-0.5 w-4 h-4 shrink-0 border border-foreground flex items-center justify-center">
                          <Icon name="Check" size={10} />
                        </span>
                        <span className="text-muted-foreground leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="bg-foreground text-background p-8 mb-8">
              <h2 className="text-xl font-bold mb-6">Условия оплаты</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { method: "Безналичный расчёт", desc: "С НДС и без НДС. Счёт выставляется в течение 1 часа после оформления заказа." },
                  { method: "Предоплата 100%", desc: "Отгрузка в течение 24 часов после поступления оплаты на расчётный счёт." },
                  { method: "Отсрочка платежа", desc: "Для постоянных клиентов с оборотом от 500 000 ₽/мес — отсрочка до 14 дней." },
                ].map((p, i) => (
                  <div key={i}>
                    <p className="font-semibold mb-2">{p.method}</p>
                    <p className="text-background/60 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-border p-6">
              <h3 className="font-bold mb-4">Упаковка и маркировка</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <p>Товар упаковывается на паллеты или в короба в соответствии с требованиями перевозчика.</p>
                <p>По запросу выполняем маркировку товара под требования Wildberries, Ozon и других маркетплейсов.</p>
              </div>
            </div>
          </div>
        )}

        {/* ===== CONTACTS ===== */}
        {section === "contacts" && (
          <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <div className="mb-12">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Связаться</p>
              <h1 className="text-4xl font-black">Контакты</h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-xl font-bold mb-6">Оставить заявку</h2>
                <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-2">Имя</label>
                      <input
                        type="text"
                        placeholder="Иван Иванов"
                        className="w-full border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors bg-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-2">Компания</label>
                      <input
                        type="text"
                        placeholder="ООО Ромашка"
                        className="w-full border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors bg-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-2">Телефон</label>
                    <input
                      type="tel"
                      placeholder="+7 (999) 000-00-00"
                      className="w-full border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="ivan@company.ru"
                      className="w-full border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors bg-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground uppercase tracking-wider mb-2">Сообщение</label>
                    <textarea
                      rows={4}
                      placeholder="Опишите ваш запрос или интересующие товары..."
                      className="w-full border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors bg-transparent resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-foreground text-background font-semibold hover:bg-foreground/90 transition-colors"
                  >
                    Отправить заявку
                  </button>
                  <p className="text-xs text-muted-foreground">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
                </form>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-6">Реквизиты и адрес</h2>
                <div className="space-y-6">
                  {[
                    { icon: "Phone", label: "Телефон", value: "+7 (495) 000-00-00" },
                    { icon: "Mail", label: "Email", value: "info@pakpro.ru" },
                    { icon: "Clock", label: "Режим работы", value: "Пн–Пт: 9:00 – 18:00" },
                    { icon: "MapPin", label: "Адрес офиса", value: "г. Москва, ул. Складская, 1, офис 201" },
                    { icon: "Warehouse", label: "Склад и самовывоз", value: "г. Москва, Южное Бутово, ул. Промышленная, 15" },
                  ].map((c, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-9 h-9 border border-border flex items-center justify-center shrink-0">
                        <Icon name={c.icon} size={16} />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{c.label}</p>
                        <p className="font-medium">{c.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 border border-border p-6 bg-muted">
                  <p className="font-semibold mb-3">Мессенджеры</p>
                  <div className="flex gap-3">
                    {["WhatsApp", "Telegram"].map(m => (
                      <button key={m} className="flex items-center gap-2 px-4 py-2 border border-border bg-white text-sm font-medium hover:border-foreground transition-colors">
                        <Icon name="MessageCircle" size={15} />
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
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
                  {navLinks.map(l => (
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

function ProductCard({
  product,
  isFav,
  onFav,
  onCart,
}: {
  product: typeof PRODUCTS[0];
  isFav: boolean;
  onFav: () => void;
  onCart: () => void;
}) {
  return (
    <div className="group bg-white border border-border hover-lift overflow-hidden">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <button
          onClick={onFav}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white border border-border transition-colors hover:border-foreground"
        >
          <Icon
            name="Heart"
            size={15}
            className={isFav ? "fill-red-500 text-red-500" : "text-muted-foreground"}
          />
        </button>
        {product.popular && (
          <div className="absolute top-3 left-3 px-2 py-0.5 bg-foreground text-background text-[10px] font-bold uppercase tracking-wider">
            Топ
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mb-1">{product.sku} · {product.category}</p>
        <h3 className="font-semibold text-sm leading-tight mb-3">{product.name}</h3>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-lg font-black font-mono">{product.price.toLocaleString()} ₽</p>
            <p className="text-[10px] text-muted-foreground">за {product.unit} · от {product.minQty.toLocaleString()} шт</p>
          </div>
          <button
            onClick={onCart}
            className="px-3 py-2 bg-foreground text-background text-xs font-semibold hover:bg-foreground/90 transition-colors flex items-center gap-1"
          >
            <Icon name="Plus" size={12} />
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
}