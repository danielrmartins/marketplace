import { api } from '@/lib/axios';

export interface GetProductsQuery {
  search?: string | null;
  status?: string | null;
}

export interface GetProductsResponse {
  products: {
    id: string;
    title: string;
    description: number;
    status: 'available' | 'sold' | 'cancelled';
    priceInCents: number;
    category: {
      id: string;
      title: string;
      slug: string;
    };
    owner: {
      id: string;
      avatar: string | null;
      email: string;
      name: string;
      phone: string;
    };
    attachments: {
      id: string;
      url: string;
    }[];
  }[];
}

export async function getProducts({ search, status }: GetProductsQuery) {
  console.log({ search, status });
  const { data } = await api.get<GetProductsResponse>('/products/me', { params: { search, status } });

  return data;
}
