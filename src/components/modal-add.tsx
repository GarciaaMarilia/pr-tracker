import { useState } from "react";
import { X } from "lucide-react";

import { Button } from "./button";
import { Benchmark, Cardio, Gym, Haltero, Types } from "../types/types";

interface ModalAddProps {
 onClose: () => void;
}

const exerciseMapping = {
 [Types.HALTERO]: Haltero,
 [Types.BENCHMARK]: Benchmark,
 [Types.GYM]: Gym,
 [Types.CARDIO]: [],
};

export function ModalAdd({ onClose }: ModalAddProps) {
 const [typeToSaveSelected, setTypeToSaveSelected] = useState<Types>();
 const [exerciseToSaveSelected, setExerciseToSaveSelected] = useState<
  Benchmark | Gym | Haltero
 >();

 const renderExerciseList = () => {
  const exercises: (Benchmark | Gym | Haltero | Cardio)[] =
   exerciseMapping[typeToSaveSelected as Types] || [];

  return (
   <div className="gap-4 mt-4">
    <label htmlFor="option" className="text-white font-medium">
     Choisissez un exercise
    </label>
    <select
     id="exercises"
     name="exercises"
     className="w-full mt-2 px-4 py-2 bg-zinc-800 text-white rounded-md"
     onChange={(e) =>
      setExerciseToSaveSelected(e.target.value as Benchmark | Gym | Haltero)
     }
    >
     <option value="" disabled selected>
      Veuillez choisir un exercise
     </option>
     {Object.values(exercises).map(
      (exercise: Benchmark | Gym | Haltero | Cardio) => {
       return (
        <option key={exercise} value={exercise}>
         {exercise}
        </option>
       );
      }
     )}
    </select>
   </div>
  );
 };

 const renderInputs = () => {
  return (
   <div className="flex gap-4 mt-4">
    <div className="flex-1">
     <label htmlFor="information" className="text-white font-medium">
      {typeToSaveSelected === Types.HALTERO
       ? "Charge"
       : typeToSaveSelected === Types.GYM
       ? "Quantité"
       : "Temps"}
     </label>
     <input
      id="information"
      type="text"
      className="w-full mt-2 px-4 py-2 bg-zinc-800 text-white rounded-md"
      placeholder="Entrez un nom"
     />
    </div>

    <div className="flex-1">
     <label htmlFor="date" className="text-white font-medium">
      Date
     </label>
     <input
      id="date"
      type="date"
      className="w-full mt-2 px-4 py-2 bg-zinc-800 text-white rounded-md"
      defaultValue={new Date().toISOString().split("T")[0]}
     />
    </div>
   </div>
  );
 };
 return (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
   <div className="w-[60%] sm:h-[50%] rounded-xl py-8 px-8 shadow-shape bg-zinc-900 space-y-5">
    <div className="flex flex-row justify-between">
     <h2 className="font-lg text-xl font-semibold ">
      Enregistrer une nouvelle référence
     </h2>
     <button>
      <X onClick={onClose} />
     </button>
    </div>
    <div className="gap-4 mt-4">
     <label htmlFor="option" className="text-white font-medium">
      Choisissez un type
     </label>
     <select
      id="type"
      name="type"
      className="w-full mt-2 px-4 py-2 bg-zinc-800 text-white rounded-md"
      onChange={(e) => setTypeToSaveSelected(e.target.value as Types)}
     >
      <option value="" disabled selected>
       Veuillez choisir un type
      </option>
      {Object.values(Types).map((type) => {
       return (
        <option key={type} value={type}>
         {type}
        </option>
       );
      })}
     </select>
     {typeToSaveSelected && renderExerciseList()}
     {exerciseToSaveSelected && renderInputs()}
    </div>
    {typeToSaveSelected && exerciseToSaveSelected && (
     <div className="flex items-center justify-center pt-5">
      <Button>Enregistrer</Button>
     </div>
    )}
   </div>
  </div>
 );
}
