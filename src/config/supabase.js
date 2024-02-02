import { createClient } from '@supabase/supabase-js';

/*
  En este archivo se configura la conexión con la base de datos de Supabase.
*/

const supabaseConnection = createClient(
  'https://flqhbsecfnyexpcdnrqa.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZscWhic2VjZm55ZXhwY2RucnFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4OTYzODIsImV4cCI6MjAyMjQ3MjM4Mn0.1gDjT2uc3qtO4U8KnQojV4_3GEKW-NtNy7yJigTXV7Y',
);

export default supabaseConnection;
