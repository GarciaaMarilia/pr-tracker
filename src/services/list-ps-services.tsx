import { api } from "../lib/axios";
import { Benchmark, Cardio, Gym, Haltero, Types } from "../types/types";

export interface ListPrProps {
 type: Types;
 exercise: Benchmark | Gym | Haltero | Cardio;
}

export async function listPr({ type, exercise }: ListPrProps) {
 try {
  const token = localStorage.getItem("token");

  if (!token || !type || !exercise) {
   return;
  }

  const response = await api.post("/pr/list", { token, type, exercise });
  return response.data;
 } catch (error) {
  return error;
 }
}
