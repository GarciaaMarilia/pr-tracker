import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, KeyRound, User } from "lucide-react";

import { Button } from "../../components/button";
import { useAuth } from "../../contexts/AuthContext";

export function LoginPage() {
 const { login } = useAuth();
 const navigate = useNavigate();
 const [email, setEmail] = useState<string>("");
 const [password, setPassword] = useState<string>("");

 return (
  <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
   <div className="flex flex-col max-w-3xl w-full px-6 items-center space-y-10 ">
    <img src="../../public/login-animation.gif" alt="animation" />
    <div className="flex flex-col items-center gap-3">
     <p className="flex flex-row sm:text-4xl text-3xl gap-2">
      Bienvenue sur <p className="text-orange-400"> PR Tracker</p>
     </p>
    </div>

    <div className="h-16 px-4 rounded-xl flex items-center shadow-shape gap-3 border">
     <div className="flex items-center gap-2">
      <User className="size-5" />
      <input
       type="text"
       placeholder="Adresse email"
       onChange={(event) => setEmail(event.target.value)}
       className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
      />
     </div>
    </div>

    <div className="h-16 px-4 rounded-xl flex items-center shadow-shape gap-3 border">
     <div className="flex items-center gap-2">
      <KeyRound className="size-5" />
      <input
       type="password"
       placeholder="Mot de passe"
       onChange={(event) => setPassword(event.target.value)}
       className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
      />
     </div>
    </div>
    <div className="flex items-center">
     <Button
      disabled={!email || !password}
      onClick={() => login(email, password, navigate)}
      variant={!email || !password ? "disabled" : "primary"}
     >
      Se conecter
      <ArrowRight className="size-5" />
     </Button>
    </div>
   </div>
  </div>
 );
}
