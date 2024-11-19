import { api } from '@/lib/axios';

export interface GetSoldProductsMonthResponse {
  amount: number;
}

export async function getSoldProductsMonth() {
  const { data } = await api.get<GetSoldProductsMonthResponse>('/sellers/metrics/products/sold');

  return data;
}
