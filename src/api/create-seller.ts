import { api } from '@/lib/axios';

export interface CreateSellerBody {
  name: string;
  phone: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  avatarId: string;
}

export async function createSeller({ name, phone, email, password, passwordConfirmation, avatarId }: CreateSellerBody) {
  await api.post<CreateSellerBody>('/sellers', { name, phone, email, password, passwordConfirmation, avatarId });
}
