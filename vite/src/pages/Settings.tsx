import { FC } from "react";
import { supabaseClient } from "../lib/supabase";

const Settings: FC = () => {
  return (
    <div className="bg-red-100 container flex justify-center items-center">
      <button onClick={() => supabaseClient.auth.signOut()}>Logout</button>
    </div>
  );
};

export default Settings;
