// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";

Deno.serve(async (req) => {
  const authHeader = req.headers.get("Authorization")!;

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    { global: { headers: { Authorization: authHeader } } },
  );

  const { data } = await supabaseClient.auth.getUser();
  const user = data.user;

  return new Response(JSON.stringify(user), {
    headers: { "Content-Type": "application/json" },
  });
});

/*

  hexString -> uint8Array

  const byteArray = [];

  for (let i = 0; i < hexString.length; i += 2) {
    byteArray.push(parseInt(hexString.substr(i, 2), 16));
  }
  ---
  decryptedKey

  const uint8Array = new Uint8Array(byteArray);


  const decipher = new Cbc(Aes, key, iv, Padding.PKCS7);

  const decryptedKey = decipher.decrypt(encryptedKey);
  const decryptedAddress = new TextDecoder().decode(decryptedKey);
*/
