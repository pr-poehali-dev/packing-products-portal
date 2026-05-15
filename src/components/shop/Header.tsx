import Icon from "@/components/ui/icon";
import { Section, NAV_LINKS } from "./data";

interface HeaderProps {
  section: Section;
  navigate: (s: Section) => void;
  favoritesCount: number;
  cartCount: number;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
  onOpenFav: () => void;
  onOpenCart: () => void;
}

export default function Header({
  section,
  navigate,
  favoritesCount,
  cartCount,
  mobileMenuOpen,
  setMobileMenuOpen,
  onOpenFav,
  onOpenCart,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <button onClick={() => navigate("home")} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-foreground flex items-center justify-center">
            <span className="text-background text-xs font-bold font-mono">PP</span>
          </div>
          <span className="font-bold text-lg tracking-tight">ПакПро</span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(l => (
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
            onClick={onOpenFav}
            className="relative p-2 hover:bg-muted rounded transition-colors"
          >
            <Icon name="Heart" size={20} />
            {favoritesCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>
          <button
            onClick={onOpenCart}
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
          {NAV_LINKS.map(l => (
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
  );
}
