import { useState } from "react";
import { Eye } from "lucide-react";
import { CircularProgress } from "@mui/material";

import { Button } from "../../components/button";
import { ModalAdd } from "../../components/modal-add";
import { listPr } from "../../services/list-ps-services";
import { ModalGraph } from "../../components/modal-graph";
import { Types, Benchmark, Gym, Haltero, Cardio } from "../../types/types";

export function HomePage() {
 const [typeToListSelected, setTypeToListSelected] = useState<Types>();
 const [modalToSaveIsOpen, setModalToSaveIsOpen] = useState<boolean>(false);
 const [modalProgressionIsOpen, setModalProgressionIsOpen] =
  useState<boolean>(false);
 const [dataToPlot, setDataToPlot] = useState<
  { date: string; value: string }[]
 >([]);
 const [loading, setLoading] = useState<boolean>(false);

 const selectType = (type: Types) => {
  setTypeToListSelected(type);
 };

 const handleModalToSave = () => {
  setModalToSaveIsOpen((prev) => !prev);
 };

 const closeModalProgression = () => {
  setModalProgressionIsOpen(false);
 };

 const handleModalProgression = async (
  exercise: Benchmark | Gym | Haltero | Cardio
 ) => {
  try {
   if (typeToListSelected && exercise) {
    setLoading(true);
    const response = await listPr({ type: typeToListSelected, exercise });

    if (response && response.prsResult.data) {
     setDataToPlot(response.prsResult.data);
    }
    setModalProgressionIsOpen(true);
   }
  } catch (error) {
   console.error(error);
  } finally {
   setLoading(false);
  }
 };

 const exerciseMapping = {
  [Types.HALTERO]: Haltero,
  [Types.BENCHMARK]: Benchmark,
  [Types.GYM]: Gym,
  [Types.CARDIO]: Cardio,
 };

 const renderExerciseList = () => {
  const exercises = Object.values(
   exerciseMapping[typeToListSelected as Types] || {}
  );

  return (
   <div className="flex flex-col space-y-3 sm:w-dvh max-h-[400px] overflow-y-scroll no-scrollbar">
    {Object.values(exercises).map(
     (exercise: Benchmark | Gym | Haltero | Cardio, index: number) => {
      return (
       <div key={index} className="flex flex-row justify-between">
        <p>{exercise}</p>
        <Button onClick={() => handleModalProgression(exercise)}>
         {loading ? (
          <CircularProgress className="test-zinc-950" size={30} />
         ) : (
          <>
           <Eye className="sm:hidden" />
           <p className="hidden sm:inline">Voir votre progression</p>
          </>
         )}
        </Button>
       </div>
      );
     }
    )}
   </div>
  );
 };

 return (
  <div className="h-screen flex sm:px-40 px-8 py-12 flex-col space-y-10 ">
   <div className="flex flex-row justify-between">
    <p className="text-3xl">
     Bienvenue, <p className="text-yellow-600"> Marilia Garcia</p>
    </p>
    <Button onClick={handleModalToSave}>Enregistrer référence</Button>
   </div>

   <div className="flex flex-col items-center space-y-10">
    <h1 className="text-2xl font-semibold">Vos références</h1>
    <div className="flex flex-row gap-3">
     <Button variant="list" onClick={() => selectType(Types.HALTERO)}>
      {Types.HALTERO}
     </Button>
     <Button variant="list" onClick={() => selectType(Types.BENCHMARK)}>
      {Types.BENCHMARK}
     </Button>
     <Button variant="list" onClick={() => selectType(Types.GYM)}>
      {Types.GYM}
     </Button>
     <Button variant="list" onClick={() => selectType(Types.CARDIO)}>
      {Types.CARDIO}
     </Button>
    </div>
    <p className="text-2xl font-semibold py-2">{typeToListSelected}</p>
    {typeToListSelected && renderExerciseList()}
   </div>
   {modalToSaveIsOpen && <ModalAdd onClose={handleModalToSave} />}

   {modalProgressionIsOpen && (
    <ModalGraph onClose={closeModalProgression} data={dataToPlot} />
   )}
  </div>
 );
}
