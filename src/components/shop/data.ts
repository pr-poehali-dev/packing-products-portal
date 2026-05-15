const PRODUCTS_IMG = "https://cdn.poehali.dev/projects/0c4b7aba-e947-4c0a-9c69-c54f4888b459/files/e9024222-00fe-4ed3-b742-4b7a6a34d97b.jpg";

export const HERO_IMG = "https://cdn.poehali.dev/projects/0c4b7aba-e947-4c0a-9c69-c54f4888b459/files/87c631bc-9446-4274-bd2c-4334fa09888c.jpg";

export const PRODUCTS = [
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

export const CATEGORIES = ["Все", "Коробки", "Плёнки", "Скотч", "Бумага", "Пакеты", "Конверты", "Этикетки", "Наполнители"];

export const PRICE_LIST = [
  { name: "Короб картонный Т-22", sku: "KT-001", unit: "шт", price1: 18, price2: 16, price3: 14 },
  { name: "Воздушно-пузырчатая плёнка 50м", sku: "VP-050", unit: "рулон", price1: 890, price2: 820, price3: 750 },
  { name: "Стрейч-плёнка 500мм×23мкм", sku: "ST-500", unit: "рулон", price1: 320, price2: 290, price3: 260 },
  { name: "Скотч упаковочный 48мм", sku: "SK-048", unit: "шт", price1: 42, price2: 36, price3: 30 },
  { name: "Крафт-бумага 70г/м² 70см", sku: "KR-070", unit: "рулон", price1: 1200, price2: 1100, price3: 980 },
  { name: "Пакет zip-lock 30×40 см", sku: "ZL-3040", unit: "шт", price1: 3.5, price2: 3.0, price3: 2.5 },
  { name: "Термоэтикетка 58×40 мм", sku: "TE-5840", unit: "шт", price1: 0.8, price2: 0.65, price3: 0.5 },
];

export type Section = "home" | "catalog" | "pricelist" | "delivery" | "contacts";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  unit: string;
  qty: number;
}

export type Product = typeof PRODUCTS[0];

export const NAV_LINKS: { key: Section; label: string }[] = [
  { key: "home", label: "Главная" },
  { key: "catalog", label: "Каталог" },
  { key: "pricelist", label: "Прайс-лист" },
  { key: "delivery", label: "Доставка" },
  { key: "contacts", label: "Контакты" },
];
