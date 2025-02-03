import { ArrowRight, KeyRound, User } from "lucide-react";

import { Button } from "../../components/button";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
 const navigate = useNavigate();

 const authenticate = () => {
  navigate("/home");
 };
 return (
  <div className="h-screen flex items-center justify-center">
   <div className="max-w-3xl w-full px-6 text-center space-y-10">
    <div className="flex flex-col items-center gap-3">
     <p className="text-4xl">Bienvenue sur PR Tracker</p>
    </div>

    <div className="h-16 px-4 rounded-xl flex items-center shadow-shape gap-3">
     <div className="flex items-center gap-2">
      <User className="size-5" />
      <input
       type="text"
       placeholder="User"
       className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
      />
     </div>
    </div>

    <div className="h-16 px-4 rounded-xl flex items-center shadow-shape gap-3">
     <div className="flex items-center gap-2">
      <KeyRound className="size-5" />
      <input
       type="password"
       placeholder="Password"
       className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
      />
     </div>
    </div>
    <Button size="full" onClick={authenticate}>
     Continue
     <ArrowRight className="size-5" />
    </Button>
   </div>
  </div>
 );
}
