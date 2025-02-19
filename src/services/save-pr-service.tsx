import { api } from "../lib/axios";
import { Benchmark, Cardio, Gym, Haltero, Types } from "../types/enums";

export interface PrDataProps {
 type: Types;
 exercise: Benchmark | Gym | Haltero | Cardio;
 value: string;
 date: string;
}

export async function savePr({ type, exercise, value, date }: PrDataProps) {
 try {
  const token = localStorage.getItem("token");

  if (!token) {
   console.error("UpdatePr error: No authentication token found");
   return;
  }

  if (!type || !exercise || !value || !date) {
   console.error("UpdatePr error: type, exercise, value and date are required");
   return;
  }

  const prData: PrDataProps = {
   type,
   exercise,
   value,
   date,
  };

  const response = await api.post("/pr/register", prData, {
   headers: { Authorization: `Bearer ${token}` },
  });
  return response;
 } catch (error) {
  console.error(error);
 }
}
