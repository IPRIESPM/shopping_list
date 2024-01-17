import { createClient } from '@supabase/supabase-js';

/*
  En este archivo se configura la conexión con la base de datos de Supabase.
  cómo es pequeño aún, he aprovechado para añadir aquí las funciones que
  devuelven los datos de la base de datos.

  En un futuro, cuando la aplicación crezca, se debería separar la configuración
  de la conexión de las funciones que devuelven los datos.
*/

const supabaseConexion = createClient(
  'https://xnhqzxacjsxwapmsgogl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuaHF6eGFjanN4d2FwbXNnb2dsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUxNTgzODMsImV4cCI6MjAyMDczNDM4M30.5JMZwjTZkZFGHUu15aX37Rvz4lF1Zw-OkLsyLZCzRMs',
);

/*
  Esta función devuelve los datos de la base de datos, ordenados por el campo
  que se le pase cómo parámetro. El orden puede ser ascendente o descendente.

  El parámetro filter es el campo por el que se va a filtrar la búsqueda.
  El parámetro search es el texto que se va a buscar en el campo filter.

  En este caso el filtro se hace con el operador lte (less than or equal to),
  que devuelve los registros cuyo valor sea menor o igual al que se le pasa,
  siempre que el campo sea numérico.
*/
const getProductsNumeric = async (filter, ascending, order, search) => {
  const { data, error } = await supabaseConexion
    .from('product')
    .select('*')
    .order(order, { ascending })
    .lte(filter, search);

  if (error) {
    return false;
  }

  return data;
};

/*
  Esta función devuelve los datos de la base de datos, ordenados por el campo
  que se le pase cómo parámetro. El orden puede ser ascendente o descendente.

  Pero, a diferencia de la función anterior, en este caso el filtro se hace con
  el operador ilike, que devuelve los registros cuyo valor se encuentre dentro
  de manera case insensitive dentro del campo que se le pasa, sólo si el campo
  es de tipo texto.
*/

const getProducts = async (filter, ascending, order, search) => {
  const { data, error } = await supabaseConexion
    .from('product')
    .select('*')
    .order(order, { ascending })
    .filter(filter, 'ilike', `%${search}%`);

  if (error) {
    return false;
  }

  return data;
};

export { supabaseConexion, getProductsNumeric, getProducts };
