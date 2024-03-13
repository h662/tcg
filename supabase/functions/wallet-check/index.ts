// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";
import { Wallet } from "https://esm.sh/ethers@6.11.1";
import { Aes } from "https://deno.land/x/crypto@v0.10.1/aes.ts";
import {
  Cbc,
  Padding,
} from "https://deno.land/x/crypto@v0.10.1/block-modes.ts";
import { corsHeaders } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  const authHeader = req.headers.get("Authorization")!;

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    { global: { headers: { Authorization: authHeader } } },
  );

  const { data } = await supabaseClient.auth.getUser();
  const user = data.user;

  const { data: existWallet } = await supabaseClient.from("wallet").select(
    "address",
  )
    .eq(
      "id",
      user?.id,
    ).single();

  if (existWallet) {
    return new Response(
      JSON.stringify(existWallet),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } else {
    const wallet = Wallet.createRandom();

    const te = new TextEncoder();

    const key = te.encode(Deno.env.get("WALLET_KEY")?.substring(0.32));
    const iv = new Uint8Array(16);

    const cipher = new Cbc(Aes, key, iv, Padding.PKCS7);

    const uint8Array = cipher.encrypt(te.encode(wallet.privateKey));

    const encryptedKey = Array.from(uint8Array).map((byte) =>
      ("0" + byte.toString(16)).slice(-2)
    ).join("");

    await supabaseClient.from("wallet").insert({
      id: user?.id,
      address: wallet.address,
      encrypted_key: encryptedKey,
    });

    const { data: newWallet } = await supabaseClient.from("wallet").select(
      "address",
    )
      .eq(
        "id",
        user?.id,
      ).single();

    return new Response(
      JSON.stringify(newWallet),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
