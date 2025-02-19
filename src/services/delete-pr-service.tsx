import { api } from "../lib/axios";

interface DeletePrProps {
 id: string;
}

export async function deletePr({ id }: DeletePrProps) {
 try {
  if (!id) {
   return;
  }

  const token = localStorage.getItem("token");

  const response = await api.delete(`/pr/delete/${id}`, {
   headers: {
    Authorization: `Bearer ${token}`,
   },
  });
  return response.data;
 } catch (error) {
  console.error(error);
 }
}
