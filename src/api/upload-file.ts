import { api } from '@/lib/axios';

export async function uploadFile(file: File) {
  const formData = new FormData();

  formData.append('files', file);

  return await api.post('/attachments', formData);
}
