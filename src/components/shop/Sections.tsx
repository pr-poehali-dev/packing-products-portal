import Icon from "@/components/ui/icon";
import { Section, Product, PRODUCTS, CATEGORIES, PRICE_LIST, NAV_LINKS, HERO_IMG } from "./data";

interface ProductCardProps {
  product: Product;
  isFav: boolean;
  onFav: () => void;
  onCart: () => void;
}

export function ProductCard({ product, isFav, onFav, onCart }: ProductCardProps) {
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

interface SectionProps {
  navigate: (s: Section) => void;
  favorites: number[];
  toggleFav: (id: number) => void;
  addToCart: (product: Product) => void;
}

export function HomeSection({ navigate, favorites, toggleFav, addToCart }: SectionProps) {
  return (
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
              { icon: "Package" as const, title: "Полный ассортимент", desc: "Всё для упаковки товаров под любую площадку — WB, Ozon, Яндекс Маркет, СберМегаМаркет." },
              { icon: "Truck" as const, title: "Быстрая доставка", desc: "Доставка по Москве за 24 часа, по России — от 2 рабочих дней. Собственный автопарк." },
              { icon: "BadgePercent" as const, title: "Оптовые цены", desc: "Гибкая система скидок при увеличении объёма. Специальные условия для постоянных клиентов." },
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
  );
}

interface CatalogSectionProps {
  favorites: number[];
  toggleFav: (id: number) => void;
  addToCart: (product: Product) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
}

export function CatalogSection({ favorites, toggleFav, addToCart, activeCategory, setActiveCategory }: CatalogSectionProps) {
  const filteredProducts = activeCategory === "Все"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
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
  );
}

export function PriceListSection({ navigate }: { navigate: (s: Section) => void }) {
  return (
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
  );
}

export function DeliverySection() {
  return (
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
  );
}

export function ContactsSection() {
  return (
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
  );
}
