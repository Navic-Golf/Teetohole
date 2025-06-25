import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
  );

  const { data, error } = await supabase.from('feedback').select('*');

  return new Response(JSON.stringify({ data, error }), {
    status: error ? 500 : 200,
  });
}
