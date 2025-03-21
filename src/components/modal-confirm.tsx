import { X } from "lucide-react";
import { Button } from "./button";

interface ModalConfirmProps {
 title: string;
 danger?: boolean;
 buttonTitle: string;
 onClose: () => void;
 onConfirm?: () => void;
}

export function ModalConfirm({
 title,
 danger,
 onClose,
 onConfirm,
 buttonTitle,
}: ModalConfirmProps) {
 return (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
   <div className="sm:w-[45%] w-[80%] max-h-[70%] rounded-xl py-8 px-8 shadow-shape bg-zinc-900 space-y-5">
    <div className="flex flex-row justify-between pb-4">
     <h2 className="font-lg text-xl font-semibold">{title}</h2>
     <button>
      <X onClick={onClose} />
     </button>
    </div>
    {danger && (
     <div className="flex items-center justify-center">
      <Button variant="danger" onClick={onConfirm}>
       {" "}
       {buttonTitle}{" "}
      </Button>
     </div>
    )}
   </div>
  </div>
 );
}
