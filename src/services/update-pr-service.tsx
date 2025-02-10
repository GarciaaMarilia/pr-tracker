import { api } from "../lib/axios";
import { PrDataProps } from "./save-pr-service";

interface UpdatePrProps {
 id: string;
 dataPr: PrDataProps;
}

export async function UpdatePr({ id, dataPr }: UpdatePrProps) {
 try {
  const token = localStorage.getItem("token");

  if (!id) {
   return;
  }

  const newData = {
   token,
   ...dataPr,
  };

  const result = await api.put(`/pr/update/${id}`, newData);
  return result;
 } catch (error) {
  console.error(error);
 }
}
