import { FC, useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import { supabaseClient } from "../lib/supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import axios from "axios";

export interface IOutletContext {
  session: Session | null;
  address: string;
}

const LayOut: FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [address, setAddress] = useState<string>("");

  const getWalletCheck = async () => {
    if (!session) return;

    const response = await axios.get(
      `${import.meta.env.VITE_SUPABASE_PROJECT}/functions/v1/wallet-check`,
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );

    setAddress(response.data.address);
  };

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    getWalletCheck();
  }, [session]);

  if (!session) {
    return (
      <Auth supabaseClient={supabaseClient} appearance={{ theme: ThemeSupa }} />
    );
  } else {
    return (
      <>
        <Outlet context={{ session, address }} />
        <NavBar />
      </>
    );
  }
};

export default LayOut;
