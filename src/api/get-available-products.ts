import { api } from '@/lib/axios';

export interface GetAvailableProductsResponse {
  amount: number;
}

export async function getAvailableProducts() {
  const { data } = await api.get<GetAvailableProductsResponse>('/sellers/metrics/products/available');

  return data;
}
