import supabaseConnection from '../config/supabase';

/*
  conjunto de funciones que se encargan de hacer las consultas a la base de datos
  y retornar los datos que se necesitan.
*/

const updateProductDB = async (userData) => {
  try {
    const { data, error } = await supabaseConnection
      .from('product')
      .update(userData)
      .eq('id', userData.id)
      .select();

    if (error) return false;

    return data;
  } catch (error) {
    return false;
  }
};

const createProductDB = async (userData) => {
  try {
    const { data, error } = await supabaseConnection
      .from('product')
      .insert([userData])
      .select('*');

    if (error) return false;

    return data;
  } catch (error) {
    return false;
  }
};

const findProductByIdDB = async (id) => {
  try {
    const { data, error } = await supabaseConnection
      .from('product')
      .select()
      .eq('id', id);

    if (error) return false;

    return data[0];
  } catch (error) {
    return false;
  }
};

const getProductsDb = async () => {
  try {
    const { data, error } = await supabaseConnection
      .from('product')
      .select('*');

    if (error) return false;

    return data;
  } catch (error) {
    return false;
  }
};

const getProductsFilteredNumericBD = async (
  filter,
  ascending,
  order,
  search,
) => {
  const { data, error, code } = await supabaseConnection
    .from('product')
    .select('*')
    .order(order, { ascending })
    .lte(filter, search);

  if (error) return false;

  if (code === '42501') return false;

  return data;
};

const getProductsFilteredTextBD = async (Ufilter, ascending, order, search) => {
  const { data, error } = await supabaseConnection
    .from('product')
    .select('*')
    .order(order, { ascending })
    .filter(Ufilter, 'ilike', `${search}%`);

  if (error) return false;

  return data;
};

const deleteProductDB = async (id) => {
  try {
    const { data, error } = await supabaseConnection
      .from('product')
      .delete()
      .eq('id', id);

    if (error) return false;

    return data;
  } catch (error) {
    return false;
  }
};

export {
  updateProductDB,
  createProductDB,
  findProductByIdDB,
  getProductsDb,
  getProductsFilteredNumericBD,
  getProductsFilteredTextBD,
  deleteProductDB,
};
