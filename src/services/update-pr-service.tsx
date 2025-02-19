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
   console.error("UpdatePr error: ID is required");
   return;
  }

  if (!token) {
   console.error("UpdatePr error: No authentication token found");
   return;
  }

  if (!dataPr.type || !dataPr.exercise || !dataPr.value || !dataPr.date) {
   console.error("UpdatePr error: Invalid dataPr object", dataPr);
   return;
  }

  const newData: PrDataProps = {
   ...dataPr,
  };

  const result = await api.put(`/pr/update/${id}`, newData, {
   headers: { Authorization: `Bearer ${token}` },
  });
  return result;
 } catch (error) {
  console.error(error);
 }
}
