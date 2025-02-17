import { get } from "lodash";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, KeyRound, User } from "lucide-react";

import { api } from "../../lib/axios";
import { Button } from "../../components/button";

export function LoginPage() {
 const navigate = useNavigate();
 const [email, setEmail] = useState<string>("");
 const [password, setPassword] = useState<string>("");

 const authenticate = async () => {
  try {
   if (!email || !password) {
    console.log("Invalid Credentials");
   }

   const response = await api.post("/auth/login", { email, password });

   const token = get(response, "data.token");

   if (token) {
    localStorage.setItem("token", token);

    const user = get(response, "data.user");

    if (user) {
     const userId = get(user, "_id");
     localStorage.setItem("userId", userId);
     localStorage.setItem("username", get(user, "name"));
     navigate("/home");
    }
   } else {
    throw new Error("Authentication failed.");
   }
  } catch (error) {
   throw new Error("Invalid email or password");
  }
 };

 return (
  <div className="h-screen flex items-center justify-center">
   <div className="max-w-3xl w-full px-6 text-center space-y-10">
    <div className="flex flex-col items-center gap-3">
     <p className="flex flex-row text-4xl gap-2">
      Bienvenue sur <p className="text-yellow-600"> PR Tracker</p>
     </p>
    </div>

    <div className="h-16 px-4 rounded-xl flex items-center shadow-shape gap-3">
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

    <div className="h-16 px-4 rounded-xl flex items-center shadow-shape gap-3">
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
    <Button
     size="full"
     onClick={authenticate}
     disabled={!email || !password}
     variant={!email || !password ? "disabled" : "primary"}
    >
     Se conecter
     <ArrowRight className="size-5" />
    </Button>
   </div>
  </div>
 );
}
