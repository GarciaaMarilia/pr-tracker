import { api } from "../lib/axios";
import { Benchmark, Cardio, Gym, Haltero, Types } from "../types/enums";

export interface ListPrProps {
 type: Types;
 exercise: Benchmark | Gym | Haltero | Cardio;
}

export async function listPr({ type, exercise }: ListPrProps) {
 try {
  const token = localStorage.getItem("token");

  if (!token) {
   console.error("UpdatePr error: No authentication token found");
   return;
  }

  if (!type || !exercise) {
   console.error("UpdatePr error: type and exercise are required");
   return;
  }

  const response = await api.post("/pr/list", { token, type, exercise });
  return response.data;
 } catch (error) {
  console.error(error);
 }
}
