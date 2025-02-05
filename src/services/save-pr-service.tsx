import { api } from "../lib/axios";
import { Benchmark, Cardio, Gym, Haltero, Types } from "../types/types";

export interface PrDataProps {
 type: Types;
 exercise: Benchmark | Gym | Haltero | Cardio;
 value: string;
 date: string;
}

export async function savePr({ type, exercise, value, date }: PrDataProps) {
 try {
  const token = localStorage.getItem("token");

  if (!token || !type || !exercise || !value || !date) {
   return;
  }
  const prData = {
   token,
   type,
   exercise,
   value,
   date,
  };

  const response = await api.post("/pr/register", prData);
  return response;
 } catch (error) {
  return error;
 }
}
