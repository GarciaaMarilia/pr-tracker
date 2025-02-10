import { api } from "../lib/axios";

interface DeletePrProps {
 id: string;
}

export async function deletePr({ id }: DeletePrProps) {
 try {
  if (!id) {
   return;
  }

  const response = await api.delete(`/pr/delete/${id}`);
  return response.data;
 } catch (error) {
  console.error(error);
 }
}
