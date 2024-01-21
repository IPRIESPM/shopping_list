import { createClient } from '@supabase/supabase-js';

/*
  En este archivo se configura la conexión con la base de datos de Supabase.
*/

const supabaseConnection = createClient(
  'https://xnhqzxacjsxwapmsgogl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuaHF6eGFjanN4d2FwbXNnb2dsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUxNTgzODMsImV4cCI6MjAyMDczNDM4M30.5JMZwjTZkZFGHUu15aX37Rvz4lF1Zw-OkLsyLZCzRMs',
);

export default supabaseConnection;
