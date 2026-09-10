import { CATALOG_API_BASE_URL } from "@/lib/config";

export interface CatalogItem {
  id: string;
  name: string;
  description: string | null;
  category: number;
  rarity: number;
  imageUrl: string | null;
  startingPrice: number;
  stock: number;
}

export function getCatalogItems(): Promise<Response> {
  return fetch(`${CATALOG_API_BASE_URL}/api/catalog/items?pageSize=100`);
}

export function listItemForSale(itemId: string, token: string, startingPrice: number): Promise<Response> {
  return fetch(`${CATALOG_API_BASE_URL}/api/catalog/inventory/${itemId}/list-for-sale`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ startingPrice }),
  });
}

export function startAuction(itemId: string, token: string): Promise<Response> {
  return fetch(`${CATALOG_API_BASE_URL}/api/catalog/items/${itemId}/start-auction`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
}
