import { api } from '@/lib/axios';

export interface GetNumberOfViewsResponse {
  viewsPerDay: [
    {
      date: string;
      amount: number;
    },
  ];
}

export async function getViewsPerDay() {
  const { data } = await api.get<GetNumberOfViewsResponse>('/sellers/metrics/views/days');

  return data;
}
