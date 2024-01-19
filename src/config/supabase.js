import { createClient } from '@supabase/supabase-js';

/*
  En este archivo se configura la conexión con la base de datos de Supabase.
  cómo es pequeño aún, he aprovechado para añadir aquí las funciones que
  devuelven los datos de la base de datos.

  En un futuro, cuando la aplicación crezca, se debería separar la configuración
  de la conexión de las funciones que devuelven los datos.
*/

const supabaseConnection = createClient(
  'https://xnhqzxacjsxwapmsgogl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuaHF6eGFjanN4d2FwbXNnb2dsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUxNTgzODMsImV4cCI6MjAyMDczNDM4M30.5JMZwjTZkZFGHUu15aX37Rvz4lF1Zw-OkLsyLZCzRMs',
);

export default supabaseConnection;
