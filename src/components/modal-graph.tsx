import { useState } from "react";
import { Pen, Trash, X } from "lucide-react";
import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

import { ModalAdd } from "./modal-add";
import { ModalConfirm } from "./modal-confirm";
import { formatTime } from "../utils/formatTime";
import { formatDate } from "../utils/formatDate";
import { timeToSeconds } from "../utils/timeToSeconds";
import { deletePr } from "../services/delete-pr-service";
import { DataToEdit, DataToPlotProps } from "../types/types";
import { Benchmark, Cardio, Gym, Haltero, Types } from "../types/enums";

interface ModalGraphProps {
 data?: DataToPlotProps[];
 onClose: () => void;
 exercise: Benchmark | Gym | Haltero | Cardio;
 type: Types;
}

export function ModalGraph({ data, onClose, exercise, type }: ModalGraphProps) {
 const [dataToEdit, setDataToEdit] = useState<DataToEdit>();
 const [idPrToDelete, setIdPrToDelete] = useState<string>();
 const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState<boolean>(false);
 const [modalUpdateIsOpen, setModalUpdateIsOpen] = useState<boolean>(false);

 const formattedData =
  data &&
  data.map((item) => {
   const { id, date, value } = item;

   return {
    id: id,
    date: date, 
    formattedDate: formatDate(date),
    value: value.includes(":") ? timeToSeconds(value) : Number(value),
   };
  });

 const deletePR = async (id: string) => {
  try {
   if (id) {
    const response = await deletePr({ id });
    window.document.location.reload();
    return response;
   }
  } catch (error) {
   console.error(error);
  }
 };

 const handleDeletePr = (id: string) => {
  setIdPrToDelete(id);
  setModalDeleteIsOpen(true);
 };

 const handleUpdatePr = (dataToEdit: DataToEdit) => {
  setDataToEdit(dataToEdit);
  setModalUpdateIsOpen(true);
 };

 return (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
   <div className="sm:w-[65%] w-[80%] max-h-[70%] rounded-xl py-8 px-8 shadow-shape bg-zinc-900 space-y-5">
    <div className="flex flex-row justify-between pb-4">
     <div>
      <h2 className="font-lg text-xl font-semibold">Votre progression</h2>
      <h1 className="font-lg font-semibold">{exercise} </h1>
     </div>
     <button>
      <X onClick={onClose} />
     </button>
    </div>
    {data && data.length > 0 && formattedData ? (
     <>
      <div className="flex justify-center">
       <LineChart width={400} height={280} data={formattedData}>
        <XAxis dataKey="formattedDate" />
        <YAxis
         label={{
          value:
           type === Types.BENCHMARK || type === Types.CARDIO
            ? "Temps (s)"
            : type === Types.GYM
            ? "Quantité"
            : "Charge (kg)",
          angle: -90,
          position: "insideLeft",
         }}
        />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="orange" />
       </LineChart>
      </div>

      <div>
       {formattedData.map((data, index) => {
        return (
         <div
          key={index}
          className="flex flex-row items-start justify-between py-1"
         >
          <p className="font-semibold">{data.formattedDate}: </p>
          {type === Types.BENCHMARK || type === Types.CARDIO
           ? formatTime(data.value)
           : type === Types.HALTERO
           ? `${data.value} kg`
           : `${data.value} reps`}
          <div className="flex gap-3">
           <button onClick={() => handleUpdatePr(data)}>
            <Pen className="size-4" />
           </button>
           <button onClick={() => handleDeletePr(data.id)}>
            <Trash className="size-4" />
           </button>
          </div>
         </div>
        );
       })}
      </div>
     </>
    ) : (
     <div className="flex items-center justify-center">
      <p>Vous n'avez pas encore de références pour cet exercice.</p>
     </div>
    )}
    {modalDeleteIsOpen && idPrToDelete && (
     <ModalConfirm
      danger
      title="Confirmez-vous la suppression de ce PR ?"
      onClose={() => setModalDeleteIsOpen(false)}
      onDelete={() => deletePR(idPrToDelete)}
     />
    )}
    {modalUpdateIsOpen && (
     <ModalAdd
      edit
      type={type}
      exercise={exercise}
      dataToEdit={dataToEdit}
      onClose={() => setModalUpdateIsOpen(false)}
     />
    )}
   </div>
  </div>
 );
}
