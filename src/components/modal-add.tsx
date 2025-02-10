import { useEffect, useState } from "react";
import { Save, X } from "lucide-react";

import { Button } from "./button";
import { DataToEdit } from "../types/types";
import { ModalConfirm } from "./modal-confirm";
import { UpdatePr } from "../services/update-pr-service";
import { PrDataProps, savePr } from "../services/save-pr-service";
import { Benchmark, Cardio, Gym, Haltero, Types } from "../types/enums";

interface ModalAddProps {
 onClose: () => void;
 edit?: boolean;
 dataToEdit?: DataToEdit;
 type?: Types;
 exercise?: Benchmark | Gym | Haltero | Cardio;
}

const exerciseMapping = {
 [Types.HALTERO]: Haltero,
 [Types.BENCHMARK]: Benchmark,
 [Types.GYM]: Gym,
 [Types.CARDIO]: Cardio,
};

export function ModalAdd({
 onClose,
 edit,
 dataToEdit,
 type,
 exercise,
}: ModalAddProps) {
 const [loading, setLoading] = useState<boolean>(false);
 const [typeToSaveSelected, setTypeToSaveSelected] = useState<Types>();
 const [exerciseToSaveSelected, setExerciseToSaveSelected] = useState<
  Benchmark | Gym | Haltero | Cardio
 >();
 const [valueToSave, setValueToSave] = useState<string>();
 const [modalConfirmIsOpen, setModalConfirmIsOpen] = useState<boolean>(false);
 const [dateToSave, setDateToSave] = useState<string>(new Date().toISOString());

 useEffect(() => {
  if (dataToEdit && type && exercise) {
   setTypeToSaveSelected(type);
   setExerciseToSaveSelected(exercise);
   setValueToSave(String(dataToEdit.value));
   setDateToSave(dataToEdit.date);
  }
 }, []);

 const handleSavePr = async () => {
  try {
   setLoading(true);
   if (
    typeToSaveSelected &&
    exerciseToSaveSelected &&
    valueToSave &&
    dateToSave
   ) {
    const prData: PrDataProps = {
     type: typeToSaveSelected,
     exercise: exerciseToSaveSelected,
     value: valueToSave,
     date: dateToSave,
    };
    const response = await savePr(prData);
    if (response) setModalConfirmIsOpen(true);
    return response;
   }
  } catch (error) {
   console.error(error);
  } finally {
   setLoading(false);
  }
 };

 const handleUpdatePr = async () => {
  try {
   setLoading(true);
   if (
    dataToEdit &&
    typeToSaveSelected &&
    exerciseToSaveSelected &&
    valueToSave
   ) {
    const id = dataToEdit.id;

    const dataPr: PrDataProps = {
     type: typeToSaveSelected,
     exercise: exerciseToSaveSelected,
     value: valueToSave,
     date: dateToSave,
    };

    const response = await UpdatePr({ id, dataPr });

    if (response) setModalConfirmIsOpen(true);

    return response;
   }
  } catch (error) {
   console.error(error);
  } finally {
   setLoading(false);
  }
 };

 const renderExerciseList = () => {
  const exercises =
   Object.values(exerciseMapping[typeToSaveSelected as Types]) || {};

  return (
   <div className="gap-4 mt-4">
    <label htmlFor="option" className="text-white font-medium">
     Choisissez un exercise
    </label>
    <select
     id="exercises"
     name="exercises"
     disabled={edit}
     value={exercise}
     onChange={(e) =>
      setExerciseToSaveSelected(e.target.value as Benchmark | Gym | Haltero)
     }
     className="w-full mt-2 px-4 py-2 bg-zinc-800 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
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
      type={
       typeToSaveSelected === Types.BENCHMARK ||
       typeToSaveSelected === Types.CARDIO
        ? "time"
        : "text"
      }
      step={
       typeToSaveSelected === Types.BENCHMARK ||
       typeToSaveSelected === Types.CARDIO
        ? "1"
        : undefined
      }
      value={valueToSave}
      placeholder="Entrez un nom"
      onChange={(event) => setValueToSave(event.target.value)}
      className="w-full mt-2 px-4 py-2 bg-zinc-800 text-white rounded-md"
     />
    </div>

    <div className="flex-1">
     <label htmlFor="date" className="text-white font-medium">
      Date
     </label>
     <input
      id="date"
      type="date"
      value={dateToSave}
      max={new Date().toISOString().split("T")[0]}
      defaultValue={new Date().toISOString().split("T")[0]}
      onChange={(event) => setDateToSave(event.target.value)}
      className="w-full mt-2 px-4 py-2 bg-zinc-800 text-white rounded-md"
     />
    </div>
   </div>
  );
 };

 const closeConfirmModal = () => {
  setModalConfirmIsOpen(false);
  window.document.location.reload();
 };

 return (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
   <div className="sm:w-[60%] w-[85%] sm:h-[50%] rounded-xl py-8 px-8 shadow-shape bg-zinc-900 space-y-5">
    <div className="flex flex-row justify-between">
     <h2 className="font-lg text-xl font-semibold ">
      {edit ? "Edit une référence" : "Enregistrer une nouvelle référence"}
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
      value={type}
      disabled={edit}
      onChange={(e) => setTypeToSaveSelected(e.target.value as Types)}
      className="w-full mt-2 px-4 py-2 bg-zinc-800 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
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
      <Button onClick={edit ? handleUpdatePr : handleSavePr}>
       {!loading && <Save />}
       {loading ? "Chargement en cours..." : edit ? "Modifier" : "Enregistrer"}
      </Button>
     </div>
    )}
    {modalConfirmIsOpen && (
     <ModalConfirm
      title={`Votre performance a été ${
       edit ? "modifiée" : "enregistrée"
      } avec succès !`}
      onClose={closeConfirmModal}
     />
    )}
   </div>
  </div>
 );
}
