import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export async function GET() {
  const { data, error } = await supabase.from('feedback').select('*');

  return new Response(JSON.stringify({ data, error }), {
    status: error ? 500 : 200,
  });
}
