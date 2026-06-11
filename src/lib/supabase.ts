import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// If env vars are missing, provide a lightweight mock so builds don't fail during static analysis or CI.
// In production you should set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
if (!url || !key) {
  // eslint-disable-next-line no-console
  console.warn(
    "Supabase env vars are missing. Using mock client. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY for real data."
  );

  // Minimal mock implementation used only when env vars are not present.
  // It supports the chained call used by `getCourses()` and returns empty data.
  const mock = {
    from: (_: string) => ({
      select: (_cols: string) => ({
        order: async () => ({ data: [], error: null }),
      }),
    }),
  } as unknown;

  export const supabase = mock as ReturnType<typeof createClient>;
} else {
  export const supabase = createClient(url, key);
}