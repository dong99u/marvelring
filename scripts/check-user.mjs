import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config({ path: '.env.local' });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(url, key);

const { data, error } = await supabase
  .from('member')
  .select('member_id, username, email')
  .eq('username', 'eastking7979')
  .single();

console.log('Data:', JSON.stringify(data, null, 2));
console.log('Error:', error);
