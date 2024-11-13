import { api } from '@/lib/axios';

export interface GetProfileResponse {
  seller: {
    id: string;
    name: string;
    phone: string;
    email: string;
    avatar: {
      id: string;
      url: string;
    };
  };
}

export async function getProfile() {
  const { data } = await api.get<GetProfileResponse>('/sellers/me');

  return data;
}
