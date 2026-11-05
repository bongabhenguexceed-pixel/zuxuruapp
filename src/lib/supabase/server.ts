import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
export function createClient() {
  const cookieStore = cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase environment variables are missing.");
  return createServerClient(url, key, {
    cookies: {
      get(name: string) { return cookieStore.get(name)?.value; },
      set(name: string, value: string, options: Record<string, unknown>) {
        try { cookieStore.set({ name, value, ...(options as object) }); } catch {}
      },
      remove(name: string, options: Record<string, unknown>) {
        try { cookieStore.set({ name, value: "", ...(options as object) }); } catch {}
      }
    }
  });
}
