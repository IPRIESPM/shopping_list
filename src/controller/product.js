/* eslint-disable prefer-destructuring */
import supabaseConnection from '../config/supabase';

/*
  Conjunto de funciones que se encargan de hacer las consultas a la base de datos
  y retornar los datos que se necesitan.
*/

const updateProductDB = async (userData) => {
  try {
    let response;
    const { data, error } = await supabaseConnection
      .from('product')
      .update(userData)
      .eq('id', userData.id)
      .select();

    if (error) response = false;
    else response = data;

    return response;
  } catch (error) {
    return false;
  }
};

const createProductDB = async (userData) => {
  try {
    let response;
    const { data, error } = await supabaseConnection
      .from('product')
      .insert([userData])
      .select('*');

    if (error) response = false;
    else response = data;

    return response;
  } catch (error) {
    return false;
  }
};

const findProductByIdDB = async (id) => {
  let response;
  try {
    const { data, error } = await supabaseConnection
      .from('product')
      .select()
      .eq('id', id);

    if (error) response = false;
    else response = data[0];

    return response;
  } catch (error) {
    return false;
  }
};

const getProductsDb = async () => {
  let response;
  try {
    const { data, error } = await supabaseConnection
      .from('product')
      .select('*');

    if (error) response = false;
    else response = data;

    return response;
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
  let response;
  const { data, error } = await supabaseConnection
    .from('product')
    .select('*')
    .order(order, { ascending })
    .lte(filter, search);

  if (error) response = false;
  else response = data;

  return response;
};

const getProductsFilteredTextBD = async (Ufilter, ascending, order, search) => {
  let response;
  const { data, error } = await supabaseConnection
    .from('product')
    .select('*')
    .order(order, { ascending })
    .filter(Ufilter, 'ilike', `${search}%`);

  if (error) response = false;
  else response = data;

  return response;
};

const deleteProductDB = async (id) => {
  let response;
  try {
    const { data, error } = await supabaseConnection
      .from('product')
      .delete()
      .eq('id', id);

    if (error) response = false;
    else response = data;

    return response;
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
