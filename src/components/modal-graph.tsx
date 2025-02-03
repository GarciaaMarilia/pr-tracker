import { X } from "lucide-react";
import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

interface ModalGrapsProps {
 data?: { name: string; value: number }[];
 onClose: () => void;
}

export function ModalGraph({ data, onClose }: ModalGrapsProps) {
 return (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
   <div className="w-[40%] h-[50%] rounded-xl py-8 px-8 shadow-shape bg-zinc-900 space-y-5">
    <div className="flex flex-row justify-between pb-8">
     <h2 className="font-lg text-xl font-semibold">Votre progression</h2>
     <button>
      <X onClick={onClose} />
     </button>
    </div>
    {data ? (
     <div className="flex justify-center">
      <LineChart width={400} height={280} data={data}>
       <XAxis dataKey="name" />
       <YAxis />
       <Tooltip />
       <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
     </div>
    ) : (
     <div className="flex items-center justify-center">
      <p>Vous n'avez pas encore de références pour cet exercice.</p>
     </div>
    )}
   </div>
  </div>
 );
}
