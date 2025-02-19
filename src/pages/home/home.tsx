import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChartSpline, LogOut, Plus } from "lucide-react";

import { Button } from "../../components/button";
import { DataToPlotProps } from "../../types/types";
import { useAuth } from "../../contexts/AuthContext";
import { ModalAdd } from "../../components/modal-add";
import { listPr } from "../../services/list-ps-services";
import { ModalGraph } from "../../components/modal-graph";
import { Types, Benchmark, Gym, Haltero, Cardio } from "../../types/enums";

export function HomePage() {
 const { logout } = useAuth();
 const navigate = useNavigate();
 const [loading, setLoading] = useState<boolean>(false);
 const [typeToListSelected, setTypeToListSelected] = useState<Types>();
 const [modalToSaveIsOpen, setModalToSaveIsOpen] = useState<boolean>(false);
 const [exerciseSelected, setExerciseSelected] = useState<
  Benchmark | Gym | Haltero | Cardio
 >();
 const [modalProgressionIsOpen, setModalProgressionIsOpen] =
  useState<boolean>(false);
 const [dataToPlot, setDataToPlot] = useState<DataToPlotProps[]>();

 const username = localStorage.getItem("username");

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
    setExerciseSelected(exercise);
    setLoading(true);
    const response = await listPr({ type: typeToListSelected, exercise });

    setDataToPlot(response?.prsResult?.data || []);
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
   <div className="flex flex-col space-y-3 sm:w-[400px] w-[300px] max-h-[400px] overflow-y-scroll no-scrollbar">
    {Object.values(exercises).map(
     (exercise: Benchmark | Gym | Haltero | Cardio, index: number) => {
      return (
       <div key={index} className="flex flex-row justify-between">
        <p>{exercise}</p>
        <Button onClick={() => handleModalProgression(exercise)}>
         {loading && exerciseSelected === exercise ? (
          <p className="hidden sm:inline">Chargement en cours...</p>
         ) : (
          <>
           <ChartSpline className="sm:hidden" />
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
  <div className="overflow-hidden flex sm:px-20 px-3 py-12 flex-col space-y-10">
   <div className="flex flex-row justify-between">
    <p className="text-3xl">
     Bienvenue, <p className="text-orange-400">{username}</p>
    </p>
    <div className="flex flex-row gap-4 items-center">
     <Button onClick={handleModalToSave}>
      <>
       <Plus className="sm:hidden" />
       <p className="hidden sm:inline ">Enregistrer référence</p>
      </>
     </Button>
     <button>
      <LogOut className="size-8" onClick={() => logout(navigate)} />
     </button>
    </div>
   </div>


   <div className="flex flex-col items-center space-y-10">
    <h1 className="text-2xl font-semibold">Vos références</h1>
    <div className="flex flex-row gap-3 max-w-sm sm:max-w-none">
     <Button
      variant="list"
      onClick={() => selectType(Types.HALTERO)}
      active={typeToListSelected === Types.HALTERO}
     >
      {Types.HALTERO}
     </Button>
     <Button
      variant="list"
      onClick={() => selectType(Types.BENCHMARK)}
      active={typeToListSelected === Types.BENCHMARK}
     >
      {Types.BENCHMARK}
     </Button>
     <Button
      variant="list"
      onClick={() => selectType(Types.GYM)}
      active={typeToListSelected === Types.GYM}
     >
      {Types.GYM}
     </Button>
     <Button
      variant="list"
      onClick={() => selectType(Types.CARDIO)}
      active={typeToListSelected === Types.CARDIO}
     >
      {Types.CARDIO}
     </Button>
    </div>
    {!typeToListSelected && (
     <div className="flex flex-row items-center gap-4">
      <h1 className="text-xl font-semibold">Choisissez le type d'exercice</h1>
      <img src="../../public/icon.png" width={40} />
     </div>
    )}
    <p className="text-2xl font-semibold py-2">{typeToListSelected}</p>
    {typeToListSelected && renderExerciseList()}
   </div>
   {modalToSaveIsOpen && <ModalAdd onClose={handleModalToSave} />}
 
   {modalProgressionIsOpen && typeToListSelected && exerciseSelected && (
    <ModalGraph
     data={dataToPlot}
     type={typeToListSelected}
     exercise={exerciseSelected}
     onClose={closeModalProgression}
    />
   )}
  </div>
 );
}
