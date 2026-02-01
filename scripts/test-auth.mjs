import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config({ path: '.env.local' });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(url, anonKey);

const email = 'qkrehdrb0813@gmail.com';
const password = 'ehdfprl77';

console.log('Attempting to sign in with:');
console.log('Email:', email);
console.log('Password:', password);

const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});

console.log('\nResult:');
console.log('Data:', JSON.stringify(data, null, 2));
console.log('Error:', error);
