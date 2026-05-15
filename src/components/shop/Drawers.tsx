import Icon from "@/components/ui/icon";
import { CartItem, Product, PRODUCTS } from "./data";

interface CartDrawerProps {
  cart: CartItem[];
  onClose: () => void;
  onRemove: (id: number) => void;
  onUpdateQty: (id: number, delta: number) => void;
  onNavigateContacts: () => void;
}

export function CartDrawer({ cart, onClose, onRemove, onUpdateQty, onNavigateContacts: _ }: CartDrawerProps) {
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white h-full flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-bold text-lg">Корзина</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded">
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
                <button onClick={() => onUpdateQty(item.id, -1)} className="w-7 h-7 border border-border hover:bg-muted flex items-center justify-center text-sm">−</button>
                <span className="w-10 text-center text-sm font-mono">{item.qty}</span>
                <button onClick={() => onUpdateQty(item.id, 1)} className="w-7 h-7 border border-border hover:bg-muted flex items-center justify-center text-sm">+</button>
                <button onClick={() => onRemove(item.id)} className="ml-1 p-1 hover:text-destructive transition-colors">
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
  );
}

interface FavoritesDrawerProps {
  favorites: number[];
  onClose: () => void;
  onRemoveFav: (id: number) => void;
  onAddToCart: (product: Product) => void;
}

export function FavoritesDrawer({ favorites, onClose, onRemoveFav, onAddToCart }: FavoritesDrawerProps) {
  const favProducts = PRODUCTS.filter(p => favorites.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white h-full flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-bold text-lg">Избранное</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded">
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
                onClick={() => onAddToCart(p)}
                className="px-3 py-1.5 bg-foreground text-background text-xs font-medium hover:bg-foreground/90 transition-colors"
              >
                В корзину
              </button>
              <button onClick={() => onRemoveFav(p.id)} className="p-1 text-muted-foreground hover:text-destructive transition-colors">
                <Icon name="Trash2" size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
