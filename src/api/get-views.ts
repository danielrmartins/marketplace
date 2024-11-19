import { api } from '@/lib/axios';

export interface GetViewsResponse {
  amount: number;
}

export async function getViews() {
  const { data } = await api.get<GetViewsResponse>('/sellers/metrics/views');

  return data;
}
